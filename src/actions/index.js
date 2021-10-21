import types from './types';

const { LOGIN_INFO } = types;

const sendLoginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export default sendLoginInfo; // Após criada outra action, faça o export individual remover o default quando criar outra action
