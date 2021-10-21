import { LOGIN_INFO, SET_SCORE } from './types';

export const sendLoginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});
