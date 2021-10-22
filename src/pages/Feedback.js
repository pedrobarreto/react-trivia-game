import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { generateInfos } from '../utils/localStorage';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = generateInfos();
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">Voce foi horrivel</span>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
      </div>
    );
  }
}

export default Feedback;
