import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sendLoginInfo from '../actions';
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
    const { setLoginToStore, history } = this.props;
    const { name, email } = this.state;
    setLoginToStore(this.state);
    this.setState({ name, email }, async () => {
      await fetchToken();
      history.push('/game-screen');
    });
  }

  render() {
    // const { redirect } = this.state;
    // if (redirect) return <Redirect to="xablau" />;
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
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
