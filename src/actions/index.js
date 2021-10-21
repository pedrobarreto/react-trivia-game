import types from './types';

const { LOGIN_INFO } = types;

export const sendLoginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const removerEste = false; // Remover esse (apenas para parar error do linter)
