// FindQuestionPage.js
// This component allows users to search and filter questions from the database.
// It fetches questions from Firebase Firestore and displays them, updating in real-time.
import React, { useState, useEffect } from 'react';
import { Container, Header, Input, Dropdown, Grid, Button, Segment, Message, Icon, Statistic } from 'semantic-ui-react';
import { collection, getDocs, orderBy, query, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import QuestionCard from './QuestionCard';

const FindQuestionPage = () => {
  // State for questions, search, filter, and expanded card
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch questions from Firestore in real-time
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(data);
      setLoading(false);
    }, (err) => {
      setError('Failed to fetch questions: ' + err.message);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Filtered and searched questions
  const filteredQuestions = questions.filter(q => {
    const matchesType = typeFilter === 'all' || q.type === typeFilter;
    const matchesSearch =
      q.title?.toLowerCase().includes(search.toLowerCase()) ||
      q.description?.toLowerCase().includes(search.toLowerCase()) ||
      (q.tags && q.tags.join(' ').toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Handle expand/collapse
  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await deleteDoc(doc(db, 'questions', id));
    } catch (err) {
      setError('Failed to delete: ' + err.message);
    }
  };

  // Dropdown options for type filter
  const typeOptions = [
    { key: 'all', value: 'all', text: 'All Types' },
    { key: 'question', value: 'question', text: 'Questions' },
    { key: 'article', value: 'article', text: 'Articles' }
  ];

  return (
    <Container style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <Header as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
        Find Your Questions
      </Header>
      <Segment>
        <Grid stackable>
          <Grid.Row columns={3}>
            <Grid.Column width={8}>
              <Input
                icon="search"
                placeholder="Search by title, description, or tags..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                fluid
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown
                selection
                options={typeOptions}
                value={typeFilter}
                onChange={(e, { value }) => setTypeFilter(value)}
                fluid
              />
            </Grid.Column>
            <Grid.Column width={4} textAlign="right">
              <Statistic size="mini" color="blue">
                <Statistic.Value>{filteredQuestions.length}</Statistic.Value>
                <Statistic.Label>Results</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {error && <Message negative>{error}</Message>}
      {loading ? (
        <Segment loading style={{ minHeight: 200 }} />
      ) : filteredQuestions.length === 0 ? (
        <Message info>No questions found. Try a different search or filter.</Message>
      ) : (
        <Grid stackable>
          {filteredQuestions.map(q => (
            <Grid.Row key={q.id}>
              <Grid.Column width={16}>
                <QuestionCard
                  question={q}
                  isExpanded={expandedId === q.id}
                  onExpand={() => handleExpand(q.id)}
                  onDelete={() => handleDelete(q.id)}
                />
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
      )}
    </Container>

  );
};

export default FindQuestionPage;
