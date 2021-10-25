import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTokenInStorage, saveScoreInStorage } from '../utils/localStorage';
import { sendLoginInfo as sendLoginInfoAction } from '../actions';
import { fetchToken } from '../services';
import { LockClosedIcon } from '@heroicons/react/solid';
import { CogIcon } from '@heroicons/react/outline'
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
    const { sendLoginInfo, history } = this.props;
    sendLoginInfo(this.state);
    const token = await fetchToken();
    addTokenInStorage(token);
    saveScoreInStorage();
    history.push('/game');
  }

  render() {
    return (
      <>
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 sm:border-solid sm:border-gray-200 sm:p-3 sm:border-2 sm:rounded-xl sm:shadow-md">
            <div className="relative mt-3">
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre para jogar</h2>
              <Link to="/settings" className="absolute top-1 right-2">
                <button
                  type="button"
                  data-testid="btn-settings"
                  onClick={this.redirectToConfig}
                >
                  <CogIcon className="h-8 w-8 text-indigo-500 group-hover:text-indigo-200" aria-hidden="true" />
                </button>
              </Link>
            </div>
            <form className="mt-8 space-y-6" onSubmit={this.handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="input-player-name" className="sr-only">
                    Nome
                  </label>
                  <input
                    id="input-player-name"
                    data-testid="input-player-name"
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nome"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    data-testid="input-gravatar-email"
                    onChange={ this.handleChange }
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 mb-1"
                  data-testid="btn-play"
                  disabled={ this.enableButton() }
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-200" aria-hidden="true" />
                  </span>
                  Jogar
                </button>
              </div>
            </form>
          </div>
        </div>
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
