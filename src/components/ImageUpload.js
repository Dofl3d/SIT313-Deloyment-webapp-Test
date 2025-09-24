// ImageUpload.js
// This component handles image selection and uploading to Firebase Storage.
// It provides a file input and uploads the selected image, returning the image URL.
import React, { useState } from 'react';
import { Button, Image, Message, Segment, Progress } from 'semantic-ui-react';

const ImageUpload = ({ onImageSelect }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (1MB limit for Base64 storage in Firestore)
      if (file.size > 1024 * 1024) {
        setError('Image size should be less than 1MB');
        return;
      }

      setError('');
      setLoading(true);
      
      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setPreview(base64String);
        onImageSelect(base64String);
        setLoading(false);
      };
      
      reader.onerror = () => {
        setError('Error reading file');
        setLoading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect(null);
    // Reset file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <Segment>
      <div style={{ marginBottom: '1em' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="image-upload"
        />
        
        <label htmlFor="image-upload">
          <Button as="span" secondary loading={loading}>
            {loading ? 'Processing...' : 'Choose Image'}
          </Button>
        </label>
        
        {preview && (
          <Button 
            color="red" 
            basic 
            onClick={removeImage}
            style={{ marginLeft: '10px' }}
          >
            Remove Image
          </Button>
        )}
      </div>

      <Message info size="small">
        <p><strong>Image Storage:</strong> Images are stored as Base64 in Firestore (max 1MB)</p>
      </Message>

      {error && <Message negative>{error}</Message>}
      
      {loading && <Progress percent={50} active>Converting image...</Progress>}
      
      {preview && (
        <div style={{ marginTop: '1em' }}>
          <Image src={preview} size="medium" bordered />
          <p style={{ color: 'green' }}>✅ Image ready for upload</p>
        </div>
      )}
    </Segment>
  );
};

export default ImageUpload;
