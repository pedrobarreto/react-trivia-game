import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AVERAGE = 3;

class Feedback extends React.Component {
  lowScore() {
    return (
      <span data-testid="feedback-text">Podia ser melhor...</span>
    );
  }

  highScore() {
    return (
      <span data-testid="feedback-text">Mandou bem!</span>
    );
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        { assertions < AVERAGE ? this.lowScore() : this.highScore() }
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>

        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">
            Ver Ranking
          </button>
        </Link>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  assertions: user.assertions,
  score: user.score,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
