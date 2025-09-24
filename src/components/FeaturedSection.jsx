import React from 'react';
import Card from './Card';

const FeaturedSection = ({ title, items }) => (
  <div className="ui segment">
    <h2>{title}</h2>
    <div className="ui three column grid">
      {items.map((item, index) => (
        <div className="column" key={index}>
          <Card {...item} />
        </div>
      ))}
    </div>
    <div className="ui center aligned">
      <button className="ui button">See all {title.toLowerCase()}</button>
    </div>
  </div>
);

export default FeaturedSection;