// QuestionCard.js
// This component displays a single question's summary and details.
// It shows the question text, description, and image if available.
import React from 'react';
import { Card, Button, Label, Image, Segment, Icon, Grid, Header } from 'semantic-ui-react';

const QuestionCard = ({ question, isExpanded, onExpand, onDelete }) => {
  const formatDate = (timestamp) => {
    if (timestamp && timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return 'No date';
  };

  const formatTags = (tags) => {
    if (!tags || !Array.isArray(tags)) return [];
    return tags.slice(0, 5); // Show first 5 tags
  };

  const getTypeIcon = (type) => {
    return type === 'question' ? 'help circle' : 'file text';
  };

  const getTypeColor = (type) => {
    return type === 'question' ? 'blue' : 'green';
  };

  return (
    <Card 
      fluid 
      className={`question-card ${isExpanded ? 'expanded' : ''}`}
      style={{ marginBottom: '1em' }}
    >
      <Card.Content>
        <Card.Header style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icon name={getTypeIcon(question.type)} color={getTypeColor(question.type)} />
          {question.title}
        </Card.Header>
        
        <Card.Meta>
          <Icon name="calendar" />
          {formatDate(question.createdAt)}
          <span style={{ marginLeft: '15px' }}>
            <Icon name="tag" />
            {question.type}
          </span>
        </Card.Meta>
        
        <Card.Description style={{ marginTop: '10px' }}>
          {isExpanded ? 
            question.description : 
            `${question.description?.substring(0, 200)}${question.description?.length > 200 ? '...' : ''}`
          }
        </Card.Description>

        {/* Tags Display */}
        {question.tags && question.tags.length > 0 && (
          <div style={{ margin: '15px 0' }}>
            {formatTags(question.tags).map((tag, index) => (
              <Label 
                key={index} 
                color="blue" 
                size="small"
                style={{ marginRight: '5px', marginBottom: '5px' }}
              >
                <Icon name="tag" />{tag}
              </Label>
            ))}
            {question.tags.length > 5 && (
              <Label size="small" basic>
                +{question.tags.length - 5} more
              </Label>
            )}
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <Segment style={{ marginTop: '15px' }}>
            <Grid>
              <Grid.Row>
                {/* Image Display */}
                {question.imageBase64 && (
                  <Grid.Column width={16}>
                    <Header as="h5">
                      <Icon name="image" />
                      Attached Image
                    </Header>
                    <Image 
                      src={question.imageBase64} 
                      size="large" 
                      bordered
                      style={{ marginBottom: '15px' }} 
                    />
                  </Grid.Column>
                )}
                
                {/* Full Content */}
                <Grid.Column width={16}>
                  <Header as="h5">
                    <Icon name="file text" />
                    Full Description
                  </Header>
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                    {question.description}
                  </p>
                </Grid.Column>

                {/* All Tags */}
                {question.tags && question.tags.length > 0 && (
                  <Grid.Column width={16}>
                    <Header as="h5">
                      <Icon name="tags" />
                      All Tags ({question.tags.length})
                    </Header>
                    <div>
                      {question.tags.map((tag, index) => (
                        <Label 
                          key={index} 
                          color="teal" 
                          size="medium" 
                          style={{ margin: '3px' }}
                        >
                          {tag}
                        </Label>
                      ))}
                    </div>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Segment>
        )}
      </Card.Content>
      
      <Card.Content extra>
        <div className="ui two buttons">
          <Button 
            basic 
            color="green" 
            onClick={onExpand}
            icon
            labelPosition="left"
          >
            <Icon name={isExpanded ? 'compress' : 'expand'} />
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          <Button 
            basic 
            color="red" 
            onClick={onDelete}
            icon
            labelPosition="left"
          >
            <Icon name="trash" />
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
