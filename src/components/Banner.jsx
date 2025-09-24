import React from 'react';
import { faker } from '@faker-js/faker';


const Banner = () => {
  // Use faker for random description
  const description = faker.lorem.sentence();
  // Use picsum.photos for a random banner image
  const imageUrl = `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/1200/300`;
  return (
    <div className="banner-section">
      <div className="banner-image">
        <img 
          src={imageUrl}
          alt="Featured Banner" 
          className="coverImage"
        />
        <div className="banner-text">
          <h2>Inlanefreight</h2>
          |<p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;