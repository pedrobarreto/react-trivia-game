import React from 'react';
import md5 from 'crypto-js/md5';

class FeedbackHeader extends React.Component {
  constructor() {
    super();
    this.generateInfos = this.generateInfos.bind(this);
  }

  generateInfos() {
    const { player: {
      name,
      email,
      score,
    } } = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    return { name, score, hash };
  }

  render() {
    const { name, score, hash } = this.generateInfos();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="Profile"
        />
        <div>
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </div>
      </header>
    );
  }
}

export default FeedbackHeader;
