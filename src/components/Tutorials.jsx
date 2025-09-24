import React from 'react';
import TutorialCard from './TutorialCard';

const Tutorials = () => {
  return (
    <div className="tutorials-section">
      <h2>Featured Tutorials</h2>
      <div className="row" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {[...Array(6)].map((_, i) => (
          <TutorialCard key={i} />
        ))}
      </div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button className="seeMore">See all tutorials</button>
      </div>
    </div>
  );
};

export default Tutorials;