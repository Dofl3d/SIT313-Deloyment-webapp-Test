import React, { useState, useRef } from 'react';
import { 
  Container, 
  Grid, 
  Form, 
  Button, 
  Header as SemanticHeader,
  Segment,
  Dropdown,
  Message,
  Icon,
  Label
} from 'semantic-ui-react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { findDb } from '../firebase/findConfig';
import { useNavigate } from 'react-router-dom';
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
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const codeFiles = files.filter(file => {
      const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.html', '.css', '.java', '.cpp', '.c', '.php', '.rb', '.go'];
      return validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    });
    
    if (codeFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...codeFiles]);
      
      // If uploading code files, automatically read the first one
      if (codeFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCodeContent(e.target.result);
          setShowCodeEditor(true);
          
          // Auto-detect language from file extension
          const extension = codeFiles[0].name.split('.').pop().toLowerCase();
          const languageMap = {
            'js': 'javascript',
            'jsx': 'javascript',
            'ts': 'javascript',
            'tsx': 'javascript',
            'py': 'python',
            'html': 'xml',
            'css': 'css'
          };
          if (languageMap[extension]) {
            setLanguage(languageMap[extension]);
          }
        };
        reader.readAsText(codeFiles[0]);
      }
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the post data
      const postData = {
        type: postType,
        title: title.trim(),
        description: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: serverTimestamp(),
        author: 'Anonymous User', // You can replace this with actual user data
        status: 'active'
      };

      // Add article-specific fields
      if (postType === 'article') {
        postData.abstract = abstract.trim();
      }

      // Add code-related fields if code is provided
      if (showCodeEditor && codeContent && codeContent.trim() !== '// Write your code here\nconsole.log("Hello World!");') {
        postData.code = codeContent.trim();
        postData.language = language;
      }

      // Add uploaded files information if any
      if (uploadedFiles.length > 0) {
        postData.attachments = uploadedFiles.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type
        }));
      }

      // Save to Firestore posts collection
      await addDoc(collection(findDb, 'posts'), postData);
      
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
        setUploadedFiles([]);
        setShowCodeEditor(false);
      }, 3000);

    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
      // You could add error state and show error message to user
    }
  };

  const renderPreview = () => {
    return (
      <div>
        <h3>{title || 'Post Title'}</h3>
        <Label color="blue" size="small">{postType === 'article' ? 'Article' : 'Question'}</Label>
        
        {abstract && postType === 'article' && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f8f9fa', 
            borderLeft: '4px solid #007bff',
            margin: '1rem 0'
          }}>
            <strong>Abstract:</strong> {abstract}
          </div>
        )}
        
        {content && (
          <div style={{ marginBottom: '1rem' }}>
            {postType === 'article' ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <div>
                <h4>Description:</h4>
                <p>{content}</p>
              </div>
            )}
          </div>
        )}
        
        {showCodeEditor && codeContent && codeContent.trim() !== '// Write your code here\nconsole.log("Hello World!");' && (
          <div>
            <h4>Code ({language}):</h4>
            <pre style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              <code>{codeContent}</code>
            </pre>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Attached Files:</h4>
            {uploadedFiles.map((file, index) => (
              <Label key={index} style={{ margin: '2px' }}>
                <Icon name="file code" />
                {file.name}
              </Label>
            ))}
          </div>
        )}

        {tags && (
          <div style={{ marginTop: '1rem' }}>
            <h4>Tags:</h4>
            {tags.split(',').map((tag, index) => (
              <Label key={index} color="teal" size="small" style={{ margin: '2px' }}>
                {tag.trim()}
              </Label>
            ))}
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
            <div style={{ marginTop: '1rem' }}>
              <Button 
                color="blue" 
                onClick={() => navigate('/find-questions')}
              >
                <Icon name="search" />
                View All Posts
              </Button>
              <Button 
                basic 
                onClick={() => setSuccess(false)}
                style={{ marginLeft: '1rem' }}
              >
                Create Another Post
              </Button>
            </div>
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

                {/* Code Section for both articles and questions */}
                <Form.Field>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <Button
                      type="button"
                      toggle
                      active={showCodeEditor}
                      onClick={() => setShowCodeEditor(!showCodeEditor)}
                      icon
                      labelPosition="left"
                    >
                      <Icon name="code" />
                      {showCodeEditor ? 'Hide' : 'Add'} Code
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      icon
                      labelPosition="left"
                      style={{ marginLeft: '1rem' }}
                    >
                      <Icon name="upload" />
                      Upload Code File
                    </Button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".js,.jsx,.ts,.tsx,.py,.html,.css,.java,.cpp,.c,.php,.rb,.go"
                    multiple
                    style={{ display: 'none' }}
                  />

                  {uploadedFiles.length > 0 && (
                    <div style={{ marginBottom: '1rem' }}>
                      <Label.Group>
                        {uploadedFiles.map((file, index) => (
                          <Label key={index}>
                            <Icon name="file code" />
                            {file.name}
                            <Icon 
                              name="delete" 
                              onClick={() => removeFile(index)}
                              style={{ cursor: 'pointer' }}
                            />
                          </Label>
                        ))}
                      </Label.Group>
                    </div>
                  )}
                </Form.Field>

                {showCodeEditor && (
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