import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      console.log('Logging in with:', { email, password });
      const storedEmails = JSON.parse(localStorage.getItem('emails')) || [];

    // Step 2: Add new email to the array
    storedEmails.push(email,password);

    // Step 3: Save updated array back to localStorage
    localStorage.setItem('emails', JSON.stringify(storedEmails));

    console.log('All Emails:', storedEmails);
       
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setShowAlert(false);
      }, 1500);
    } 
    else {
      setShowAlert(true);
    }
  };

  return (
    <Container 
      className="mt-5"
      style={{
        minHeight: '100vh',
        padding: '2rem 0'
      }}
    >
      <Row className="justify-content-md-center">
        <Col md={6} lg={5}>
          <Card 
            className="shadow-lg border-0" 
            style={{ 
              borderRadius: '1rem',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{ 
                height: '10px', 
              }} 
            />
            
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h3 
                  className="mb-2" 
                  style={{ 
                    color: '#333',
                    fontWeight: '600'
                  }}
                >
                  Welcome 
                </h3>
                <p style={{ color: '#6c757d' }}>Sign in to your account</p>
              </div>

              {showAlert && (
                <Alert 
                  variant="danger" 
                  className="py-2"
                  style={{ 
                    borderRadius: '0.5rem',
                    border: 'none',
                    backgroundColor: 'rgba(220,53,69,0.1)',
                    color: '#dc3545'
                  }}
                >
                  Please enter both email and password.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label style={{ color: '#495057', fontWeight: '500' }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                   
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      border: '1px solid #ced4da',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label style={{ color: '#495057', fontWeight: '500' }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem',
                      border: '1px solid #ced4da',
                      backgroundColor: '#f8f9fa'
                    }}
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2"
                  disabled={isLoading}
                  style={{
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: 'black',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'black';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'black';
                    e.target.style.transform = 'translateY(0px)';
                  }}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <a 
                  href="#" 
                  style={{ 
                    color: '#667eea',
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#5a6fd8'}
                  onMouseOut={(e) => e.target.style.color = '#667eea'}
                >
                  Forgot password?
                </a>
              </div>
              
              <div className="text-center mt-3">
                <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                  Don't have an account?{' '}
                  <a 
                    href="#" 
                    style={{ 
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#5a6fd8'}
                    onMouseOut={(e) => e.target.style.color = '#667eea'}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;