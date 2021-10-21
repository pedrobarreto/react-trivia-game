import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import addTokenInStorage from '../utils/localStorage';
import sendLoginInfo from '../actions'; // mudar aqui quando tirar o default
import fetchToken from '../services';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.redirectToConfig = this.redirectToConfig.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  enableButton() {
    const { name, email } = this.state;
    return (name.length === 0 || email.length === 0);
  }

  redirectToConfig() {
    const { history } = this.props;
    history.push('/config');
  }

  async handleClick() {
    const { setLoginToStore, history } = this.props;
    setLoginToStore(this.state);
    const token = await fetchToken();
    addTokenInStorage(token);
    history.push('/game');
  }

  render() {
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectToConfig }
        >
          Configurações
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
