import React from 'react';
import Header from '../components/Header';
import { generateInfos } from '../utils/localStorage';

class Feedback extends React.Component {
  render() {
    const { score, assertions } = generateInfos();
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">Voce foi horrivel</span>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
      </div>
    );
  }
}

export default Feedback;
