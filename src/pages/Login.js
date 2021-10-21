import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTokenInStorage } from '../utils/localStorage';
import { sendLoginInfo as sendLoginInfoAction } from '../actions';
import { fetchToken } from '../services';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
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
    return (name.length === 0 || email.length === 0);
  }

  async handleClick() {
    const { sendLoginInfo, history } = this.props;
    sendLoginInfo(this.state);
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
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.redirectToConfig }
          >
            Configurações
          </button>
        </Link>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendLoginInfo: (value) => dispatch(sendLoginInfoAction(value)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  sendLoginInfo: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
