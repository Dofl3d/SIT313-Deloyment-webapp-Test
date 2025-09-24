import React from 'react';
import { faker } from '@faker-js/faker';

const ArticleCard = () => {
  const title = faker.company.catchPhrase();
  const description = faker.lorem.sentences(2);
  const author = faker.person.fullName();
  const rating = (Math.random() * 1 + 4).toFixed(1); // 4.0 - 5.0
  const imageUrl = `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/400/200`;
  return (
    <div className="article-card" style={{border: '1px solid #eee', borderRadius: 8, margin: 12, padding: 16, maxWidth: 400}}>
      <img src={imageUrl} alt="Article" style={{width: '100%', borderRadius: 8}} />
      <h3>{title}</h3>
      <p>{description}</p>
      <div style={{fontStyle: 'italic', color: '#888'}}>By {author}</div>
      <div style={{color: '#FFD700', fontWeight: 'bold'}}>★ {rating}</div>
    </div>
  );
};

export default ArticleCard;
