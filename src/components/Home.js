import React from 'react';
// ...existing code...
// Import your existing components
import AppHeader from './Header';
import Banner from './Banner';
import Articles from './Articles';
import Tutorials from './Tutorials';
import Email from './Email';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="app-container">
      <AppHeader />
      <Banner />
      <Articles />
      <Tutorials />
      <Email />
      <Footer />
    </div>
  );
};

export default Home;