import { LOGIN_INFO, SET_SCORE } from '../actions/types';

const INITIAL_STATE = {
  name: 'Default User',
  email: '',
  assertions: 0,
  score: 0,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SET_SCORE:
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  default:
    return state;
  }
};

export default loginReducer;
