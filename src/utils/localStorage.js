const TOKEN = 'token';

/**
 * Verifica a existência do Token no localStorage.
 * Caso não exista, cria-o.
 * @returns {void}
 */
const verifyTokenInStorage = () => {
  if (!localStorage.getItem(TOKEN)) {
    localStorage.setItem(TOKEN, '');
  }
};

const addTokenInStorage = (token) => {
  verifyTokenInStorage();
  localStorage.setItem(TOKEN, token);
};

export default addTokenInStorage;
