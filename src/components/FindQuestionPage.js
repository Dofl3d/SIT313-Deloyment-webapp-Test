// FindQuestionPage.js
// This component allows users to search and filter questions from the database.
// It fetches questions from Firebase Firestore and displays them, updating in real-time.
import React, { useState, useEffect } from 'react';
import { Container, Header, Input, Dropdown, Grid, Segment, Message, Statistic, Button, Icon } from 'semantic-ui-react';
import { collection, orderBy, query, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { findDb } from '../firebase/findConfig';
import { addSampleData } from '../firebase/seedData';
import QuestionCard from './QuestionCard';

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    tag: '',
    date: '',
    type: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  // Real-time data fetching from 'posts' collection
  useEffect(() => {
    console.log('Setting up Firestore listener for posts...');
    const q = query(collection(findDb, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('Firestore snapshot received, docs count:', querySnapshot.docs.length);
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Processed questions data:', questionsData);
      setQuestions(questionsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching questions:', error);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Apply filters whenever questions or filters change
  useEffect(() => {
    let filtered = [...questions];

    // Filter by title
    if (filters.title.trim()) {
      filtered = filtered.filter(q => 
        q.title?.toLowerCase().includes(filters.title.toLowerCase()) ||
        q.description?.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Filter by tag
    if (filters.tag) {
      filtered = filtered.filter(q => 
        q.tags && q.tags.some(tag => 
          tag.toLowerCase().includes(filters.tag.toLowerCase())
        )
      );
    }

    // Filter by type
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(q => q.type === filters.type);
    }

    // Filter by date
    if (filters.date) {
      const filterDate = new Date(filters.date);
      filtered = filtered.filter(q => {
        if (q.createdAt && q.createdAt.toDate) {
          const questionDate = q.createdAt.toDate();
          return questionDate.toDateString() === filterDate.toDateString();
        }
        return false;
      });
    }

    setFilteredQuestions(filtered);
  }, [filters, questions]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteDoc(doc(findDb, 'posts', questionId));
        setExpandedCard(null);
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Error deleting post. Please try again.');
      }
    }
  };

  const handleCardExpand = (questionId) => {
    setExpandedCard(expandedCard === questionId ? null : questionId);
  };

  const clearFilters = () => {
    setFilters({ title: '', tag: '', date: '', type: 'all' });
  };

  const handleAddSampleData = async () => {
    setLoading(true);
    await addSampleData();
    // Data will automatically update via the real-time listener
  };

  // Get unique tags for dropdown
  const uniqueTags = [...new Set(
    questions.flatMap(q => q.tags || [])
  )].map(tag => ({ key: tag, text: tag, value: tag }));

  // Statistics
  const stats = {
    total: questions.length,
    questions: questions.filter(q => q.type === 'question').length,
    articles: questions.filter(q => q.type === 'article').length,
    filtered: filteredQuestions.length
  };

  return (
    <Container>
      <Header as="h1" icon textAlign="center">
        <Icon name="search" />
        Find Questions & Articles
        <Header.Subheader>
          Discover and explore community posts
        </Header.Subheader>
      </Header>

      {/* Statistics */}
      <Segment>
        <Statistic.Group size="mini" widths="four">
          <Statistic>
            <Statistic.Value>{stats.total}</Statistic.Value>
            <Statistic.Label>Total Posts</Statistic.Label>
          </Statistic>
          <Statistic color="blue">
            <Statistic.Value>{stats.questions}</Statistic.Value>
            <Statistic.Label>Questions</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>{stats.articles}</Statistic.Value>
            <Statistic.Label>Articles</Statistic.Label>
          </Statistic>
          <Statistic color="orange">
            <Statistic.Value>{stats.filtered}</Statistic.Value>
            <Statistic.Label>Showing</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
      
      {/* Filter Section */}
      <Segment>
        <Header as="h3">
          <Icon name="filter" />
          Filters
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Input
                fluid
                placeholder="Search by title or description..."
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
                icon="search"
                iconPosition="left"
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                fluid
                placeholder="Filter by tag"
                selection
                clearable
                options={uniqueTags}
                value={filters.tag}
                onChange={(e, { value }) => handleFilterChange('tag', value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                fluid
                placeholder="Post type"
                selection
                options={[
                  { key: 'all', text: 'All Types', value: 'all' },
                  { key: 'question', text: 'Questions', value: 'question' },
                  { key: 'article', text: 'Articles', value: 'article' }
                ]}
                value={filters.type}
                onChange={(e, { value }) => handleFilterChange('type', value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Input
                fluid
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Button 
                onClick={clearFilters} 
                secondary 
                fluid
                icon
                labelPosition="left"
              >
                <Icon name="eraser" />
                Clear Filters
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      {/* Questions List */}
      <Segment loading={loading}>
        <Header as="h3">
          <Icon name="list" />
          Posts ({filteredQuestions.length})
        </Header>
        
        {!loading && filteredQuestions.length === 0 ? (
          <Message icon info>
            <Icon name="info circle" />
            <Message.Content>
              <Message.Header>No posts found</Message.Header>
              {questions.length === 0 ? (
                <div>
                  <p>No posts have been created yet. Be the first to post!</p>
                  <Button 
                    color="blue" 
                    onClick={handleAddSampleData}
                    style={{ marginTop: '10px' }}
                  >
                    <Icon name="plus" />
                    Add Sample Data
                  </Button>
                </div>
              ) : (
                'Try adjusting your filters or create a new post.'
              )}
            </Message.Content>
          </Message>
        ) : (
          <Grid>
            {filteredQuestions.map(question => (
              <Grid.Column width={16} key={question.id}>
                <QuestionCard
                  question={question}
                  isExpanded={expandedCard === question.id}
                  onExpand={() => handleCardExpand(question.id)}
                  onDelete={() => handleDeleteQuestion(question.id)}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </Segment>
    </Container>
  );
};

export default FindQuestionPage;