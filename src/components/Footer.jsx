import React from 'react';

const Footer = () => (
  <div className="ui inverted vertical footer segment">
    <div className="ui container">
      <div className="ui three column grid">
        <div className="column">
          <h4>Explore</h4>
          <div className="ui link list">
            <button className="item" type="button">Home</button>
            <button className="item" type="button">Articles</button>
            <button className="item" type="button">Tutorials</button>
          </div>
        </div>
        <div className="column">
          <h4>Support</h4>
          <div className="ui link list">
            <button className="item" type="button">FAQs</button>
            <button className="item" type="button">Help</button>
            <button className="item" type="button">Contact Us</button>
          </div>
        </div>
        <div className="column">
          <h4>Stay connected</h4>
          <div className="ui horizontal list">
            <button className="item" type="button" aria-label="Facebook"><i className="facebook icon"></i></button>
            <button className="item" type="button" aria-label="Twitter"><i className="twitter icon"></i></button>
            <button className="item" type="button" aria-label="Instagram"><i className="instagram icon"></i></button>
          </div>
        </div>
      </div>
      <div className="ui center aligned">
        DEV@Deakin 2022
        <div className="ui horizontal list">
          <button className="item" type="button">Privacy Policy</button>
          <button className="item" type="button">Terms</button>
          <button className="item" type="button">Code of Conduct</button>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;