import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenFromStorage } from '../utils/localStorage';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${getTokenFromStorage()}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{userName}</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.user.name,
});

export default connect(mapStateToProps)(Header);
