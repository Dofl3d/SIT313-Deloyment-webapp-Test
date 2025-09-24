import React from 'react';
import { Container, Grid, Card, Button, Icon, List, Header as SemanticHeader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Plans = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planType) => {
    if (planType === 'premium') {
      navigate('/payment', { state: { plan: 'premium' } });
    } else {
      // Handle free plan selection (maybe update user profile)
      alert('Free plan selected! You can start using basic features.');
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ padding: '2rem 0', minHeight: '80vh' }}>
        <SemanticHeader as="h1" textAlign="center" style={{ marginBottom: '3rem' }}>
          Choose Your Plan
        </SemanticHeader>
        
        <Grid centered>
          <Grid.Row>
            {/* Free Plan */}
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>
                    <Icon name="gift" size="large" color="blue" />
                    <div style={{ marginTop: '1rem' }}>Free Plan</div>
                  </Card.Header>
                  <Card.Meta>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
                      $0<span style={{ fontSize: '1rem' }}>/month</span>
                    </div>
                  </Card.Meta>
                  <Card.Description>
                    <List>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Basic article reading
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Community access
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Limited post creation
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Basic tutorials
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button 
                    fluid 
                    basic 
                    color="blue"
                    onClick={() => handleSelectPlan('free')}
                  >
                    Current Plan
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>

            {/* Premium Plan */}
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <Card fluid color="orange">
                <Card.Content textAlign="center">
                  <Card.Header>
                    <Icon name="star" size="large" color="orange" />
                    <div style={{ marginTop: '1rem' }}>Premium Plan</div>
                  </Card.Header>
                  <Card.Meta>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
                      $9.99<span style={{ fontSize: '1rem' }}>/month</span>
                    </div>
                  </Card.Meta>
                  <Card.Description>
                    <List>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Everything in Free Plan
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Custom themes & banners
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Advanced content controls
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Analytics dashboard
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Priority support
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Unlimited posts
                      </List.Item>
                      <List.Item>
                        <Icon name="check" color="green" />
                        Custom messaging
                      </List.Item>
                    </List>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button 
                    fluid 
                    color="orange"
                    onClick={() => handleSelectPlan('premium')}
                  >
                    Upgrade Now
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Plans;