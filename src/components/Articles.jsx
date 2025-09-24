import React from 'react';
import ArticleCard from './ArticleCard';

const Articles = () => {
  return (
    <div className="articles-section">
      <h2>Featured Articles</h2>
      <div className="row" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {[...Array(6)].map((_, i) => (
          <ArticleCard key={i} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button className="seeMore">See all articles</button>
      </div>
    </div>
  );
};

export default Articles;