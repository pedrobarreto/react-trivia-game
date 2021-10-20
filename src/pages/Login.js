import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addTokenInStorage from '../utils/localStorage';
import sendLoginInfo from '../actions';
import fetchToken from '../services';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  enableButton() {
    const { name, email } = this.state;
    if (name.length === 0 || email.length === 0) return true;
    return false;
  }

  handleClick() {
    const { setLoginToStore } = this.props;
    setLoginToStore(this.state);
    this.setState({ redirect: true }, async () => {
      const token = await fetchToken();
      addTokenInStorage(token);
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) return <Redirect to="/game-screen" />;
    return (
      <>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.enableButton() }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setLoginToStore: (value) => dispatch(sendLoginInfo(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setLoginToStore: PropTypes.func.isRequired,
};
