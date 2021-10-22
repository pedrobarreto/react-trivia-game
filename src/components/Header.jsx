import React from 'react';
import { generateInfos } from '../utils/localStorage';

class Header extends React.Component {
  render() {
    const { name, score, hash } = generateInfos();
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

export default Header;
