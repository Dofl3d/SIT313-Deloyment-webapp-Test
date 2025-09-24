import React from "react";

const Card = (props) => {
  return (
    <div className="column card-container">
      <div className="card-placeholder"></div>
      <h3>{props.article || props.tutorial}</h3>
      <h4>Description</h4>
      <p>{props.description}</p>
      <div className="row rating-author">
        <div className="column small">
          <div className="row">
            <div className="column">
              <span style={{ color: '#FFD700', fontSize: '16px' }}>★</span>
            </div>
            <div className="column">
              <p>{props.grade}</p>
            </div>
          </div>
        </div>
        <div className="column large">
          <p>{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;