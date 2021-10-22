import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        { assertions < AVERAGE ? this.lowScore() : this.highScore() }
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  assertions: user.assertions,
});

export default connect(mapStateToProps, null)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};
