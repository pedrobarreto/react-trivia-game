import types from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.LOGIN_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default loginReducer;
