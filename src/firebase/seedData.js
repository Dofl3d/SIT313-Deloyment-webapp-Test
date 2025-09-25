// seedData.js
// This file contains sample data to populate your Firestore database
// Run this once to add sample posts to your database

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { findDb } from './findConfig';

const samplePosts = [
  {
    type: 'question',
    title: 'How to handle async/await in React hooks?',
    description: 'I am trying to use async/await with useEffect but getting warnings. What is the best practice for handling asynchronous operations in React hooks?',
    code: `useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchData();
}, []);`,
    language: 'javascript',
    tags: ['react', 'javascript', 'async-await', 'hooks'],
    author: 'React Developer',
    status: 'active',
    createdAt: serverTimestamp()
  },
  {
    type: 'article',
    title: 'Understanding Firebase Firestore Security Rules',
    description: 'A comprehensive guide to setting up and understanding Firestore security rules to protect your data.',
    abstract: 'Learn how to write effective Firestore security rules that protect your data while allowing legitimate access.',
    tags: ['firebase', 'firestore', 'security', 'database'],
    author: 'Firebase Expert',
    status: 'active',
    createdAt: serverTimestamp()
  },
  {
    type: 'question',
    title: 'Python list comprehension vs map() function',
    description: 'When should I use list comprehension versus the map() function in Python? What are the performance differences?',
    code: `# List comprehension
numbers = [1, 2, 3, 4, 5]
squared_lc = [x**2 for x in numbers]

# Using map()
squared_map = list(map(lambda x: x**2, numbers))

print("List comprehension:", squared_lc)
print("Map function:", squared_map)`,
    language: 'python',
    tags: ['python', 'list-comprehension', 'map', 'performance'],
    author: 'Python Enthusiast',
    status: 'active',
    createdAt: serverTimestamp()
  },
  {
    type: 'article',
    title: 'Modern CSS Grid Layout Techniques',
    description: 'Explore advanced CSS Grid techniques for creating responsive and flexible layouts in modern web applications.',
    abstract: 'Master CSS Grid with practical examples and learn how to create complex layouts with minimal code.',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  padding: 20px;
}

.grid-item {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`,
    language: 'css',
    tags: ['css', 'grid', 'layout', 'responsive-design'],
    author: 'CSS Specialist',
    status: 'active',
    createdAt: serverTimestamp()
  },
  {
    type: 'question',
    title: 'Best practices for REST API design',
    description: 'What are the current best practices for designing RESTful APIs? Should I use PUT or PATCH for updates?',
    tags: ['api', 'rest', 'backend', 'web-development'],
    author: 'Backend Developer',
    status: 'active',
    createdAt: serverTimestamp()
  }
];

// Function to add sample data to Firestore
export const addSampleData = async () => {
  try {
    console.log('Adding sample data to Firestore...');
    
    for (const post of samplePosts) {
      const docRef = await addDoc(collection(findDb, 'posts'), post);
      console.log('Document written with ID: ', docRef.id);
    }
    
    console.log('Sample data added successfully!');
    return true;
  } catch (error) {
    console.error('Error adding sample data: ', error);
    return false;
  }
};

// Export sample data for reference
export { samplePosts };