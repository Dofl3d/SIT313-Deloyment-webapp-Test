import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Form, 
  Button, 
  Header as SemanticHeader,
  Segment,
  Dropdown,
  Message
} from 'semantic-ui-react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import Header from './Header';
import Footer from './Footer';

const CreatePost = () => {
  const [postType, setPostType] = useState('article');
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [content, setContent] = useState('');
  const [codeContent, setCodeContent] = useState('// Write your code here\nconsole.log("Hello World!");');
  const [language, setLanguage] = useState('javascript');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const postTypes = [
    { key: 'article', text: 'Article', value: 'article' },
    { key: 'question', text: 'Question', value: 'question' }
  ];

  const languages = [
    { key: 'javascript', text: 'JavaScript', value: 'javascript' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'xml', text: 'HTML/XML', value: 'xml' },
    { key: 'css', text: 'CSS', value: 'css' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate post creation
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false);
        setTitle('');
        setAbstract('');
        setContent('');
        setCodeContent('// Write your code here\nconsole.log("Hello World!");');
        setTags('');
      }, 2000);
    }, 1500);
  };

  const renderPreview = () => {
    return (
      <div>
        <h3>{title || 'Post Title'}</h3>
        {abstract && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderLeft: '4px solid #007bff',
            marginBottom: '1rem'
          }}>
            <strong>Abstract:</strong> {abstract}
          </div>
        )}
        {content && (
          <div style={{ marginBottom: '1rem' }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
        {postType === 'question' && codeContent && (
          <div>
            <h4>Code ({language}):</h4>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              <code>{codeContent}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  if (success) {
    return (
      <div>
        <Header />
        <Container style={{ padding: '2rem 0', minHeight: '80vh' }}>
          <Message positive size="large">
            <Message.Header>Post Created Successfully!</Message.Header>
            <p>Your {postType} has been published and is now visible to the community.</p>
          </Message>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Container style={{ padding: '2rem 0', minHeight: '80vh' }}>
        <SemanticHeader as="h1" textAlign="center" style={{ marginBottom: '2rem' }}>
          Create New Post
        </SemanticHeader>

        <Grid>
          <Grid.Column width={10}>
            <Segment>
              <Form onSubmit={handleSubmit}>
                <Form.Field required>
                  <label>Post Type</label>
                  <Dropdown
                    placeholder="Select post type"
                    fluid
                    selection
                    options={postTypes}
                    value={postType}
                    onChange={(e, { value }) => setPostType(value)}
                  />
                </Form.Field>

                <Form.Field required>
                  <label>Title</label>
                  <input
                    placeholder="Enter your post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Field>

                {postType === 'article' && (
                  <Form.Field>
                    <label>Abstract</label>
                    <Form.TextArea
                      placeholder="Write a brief abstract for your article"
                      value={abstract}
                      onChange={(e) => setAbstract(e.target.value)}
                      rows={3}
                    />
                  </Form.Field>
                )}

                <Form.Field>
                  <label>Content {postType === 'article' ? '(Markdown supported)' : ''}</label>
                  <Form.TextArea
                    placeholder={
                      postType === 'article' 
                        ? "Write your article content here. You can use **markdown** formatting!"
                        : "Describe your question or problem in detail"
                    }
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                  />
                </Form.Field>

                {postType === 'question' && (
                  <>
                    <Form.Field>
                      <label>Programming Language</label>
                      <Dropdown
                        placeholder="Select language"
                        fluid
                        selection
                        options={languages}
                        value={language}
                        onChange={(e, { value }) => setLanguage(value)}
                      />
                    </Form.Field>

                    <Form.Field>
                      <label>Code</label>
                      <div style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                        <CodeMirror
                          value={codeContent}
                          options={{
                            mode: language,
                            theme: 'material',
                            lineNumbers: true,
                            lineWrapping: true
                          }}
                          onBeforeChange={(editor, data, value) => {
                            setCodeContent(value);
                          }}
                        />
                      </div>
                    </Form.Field>
                  </>
                )}

                <Form.Field>
                  <label>Tags</label>
                  <input
                    placeholder="Enter tags separated by commas (e.g., react, javascript, web-dev)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </Form.Field>

                <Button 
                  type="submit" 
                  color="blue" 
                  size="large"
                  loading={loading}
                  disabled={!title || loading}
                >
                  {loading ? 'Publishing...' : `Publish ${postType === 'article' ? 'Article' : 'Question'}`}
                </Button>
              </Form>
            </Segment>
          </Grid.Column>

          <Grid.Column width={6}>
            <Segment>
              <SemanticHeader as="h3">Preview</SemanticHeader>
              {renderPreview()}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default CreatePost;