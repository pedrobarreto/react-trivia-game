import { LOGIN_INFO, SET_SCORE, SET_CONFIG, RESET_CONFIG } from './types';

export const sendLoginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const setConfig = (payload) => ({
  type: SET_CONFIG,
  payload,
});

export const resetConfig = () => ({
  type: RESET_CONFIG,
});
