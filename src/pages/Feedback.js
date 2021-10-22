import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">Voce foi horrivel</span>
      </div>
    );
  }
}

export default Feedback;
