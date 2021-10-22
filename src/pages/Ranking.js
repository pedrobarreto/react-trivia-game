import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRankings } from '../utils/localStorage';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Xablau</h2>
        {getRankings().map(({ name, score, picture }, i) => (
          <div key={ i }>
            <p data-testid={ `player-name-${i}` }>
              {name}
            </p>
            <p data-testid={ `player-score-${i}` }>
              {score}
            </p>
            <img src={ picture } alt={ name } />
          </div>
        ))}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Jogar de Novo
          </button>

        </Link>
      </div>

    );
  }
}
