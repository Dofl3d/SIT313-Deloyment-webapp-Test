import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { 
  Container, 
  Grid, 
  Card, 
  Button, 
  Header as SemanticHeader,
  Message,
  Divider,
  Form
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method with billing details
    const { error: stripeError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    // In a real application, you would send the payment method to your backend
    // For demo purposes, we'll simulate a successful payment
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect to home after successful payment
      setTimeout(() => {
        navigate('/home', { 
          state: { 
            message: 'Premium subscription activated! Welcome to Premium DEV@Deakin!' 
          }
        });
      }, 2000);
    }, 2000);
  };

  if (success) {
    return (
      <Message positive>
        <Message.Header>Payment Successful!</Message.Header>
        <p>Your premium subscription has been activated. Redirecting to home...</p>
      </Message>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Message negative>
          <Message.Header>Payment Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      <Form.Field required>
        <label>Cardholder Name</label>
        <input
          type="text"
          placeholder="Name on card"
          value={cardholderName}
          onChange={e => setCardholderName(e.target.value)}
          disabled={loading}
        />
      </Form.Field>

      <Form.Field>
        <label>Card Information</label>
        <div style={{ 
          padding: '10px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          backgroundColor: 'white'
        }}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
      </Form.Field>

      <Button 
        type="submit" 
        disabled={!stripe || loading || !cardholderName}
        loading={loading}
        color="orange"
        size="large"
        fluid
      >
        {loading ? 'Processing...' : 'Pay $9.99'}
      </Button>
    </Form>
  );
};

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Container style={{ padding: '2rem 0', minHeight: '80vh' }}>
        <Grid centered>
          <Grid.Column mobile={16} tablet={12} computer={8}>
            <Card fluid>
              <Card.Content>
                <SemanticHeader as="h2" textAlign="center">
                  Complete Your Purchase
                </SemanticHeader>
                
                <Divider />
                
                <div style={{ marginBottom: '2rem' }}>
                  <h3>Premium Plan - $9.99/month</h3>
                  <p>You'll get access to:</p>
                  <ul>
                    <li>Custom themes & banners</li>
                    <li>Advanced content controls</li>
                    <li>Analytics dashboard</li>
                    <li>Priority support</li>
                    <li>Unlimited posts</li>
                  </ul>
                </div>

                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Button basic onClick={() => navigate('/plans')}>
                    Back to Plans
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default Payment;