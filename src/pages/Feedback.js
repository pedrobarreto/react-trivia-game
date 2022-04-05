import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import { PlayIcon, PresentationChartLineIcon } from '@heroicons/react/outline';

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
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 sm:border-solid sm:border-gray-200 sm:p-3 sm:border-2 sm:rounded-xl sm:shadow-md">
          <div className="mt-3">
            <img
              className="mx-auto h-12 w-auto"
              src={logo}
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Resultado</h2>
          </div>
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                <p className="font-mono text-center text-xl">
                  {assertions < AVERAGE ? this.lowScore() : this.highScore()}
                </p>
                <p className="font-mono text-center text-xl" data-testid="feedback-total-question">Acertos: {assertions}</p>
                <p className="font-mono text-center  text-xl"
                data-testid="feedback-total-score">Score: {score}</p>
              </div>
              <div className="mt-5">
                <Link to="/react-trivia-game">
                  <button data-testid="btn-play-again" type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-3">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlayIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
                    </span>
                    Jogar novamente
                  </button>
                </Link>
                <Link to="/ranking">
                  <button data-testid="btn-ranking" type="button" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PresentationChartLineIcon className="h-5 w-5 text-white group-hover:text-indigo-200" aria-hidden="true" />
                    </span>
                    Ver Ranking
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
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
