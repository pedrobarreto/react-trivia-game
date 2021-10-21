const TOKEN = 'token';

export const addTokenInStorage = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getTokenFromStorage = () => {
  if (localStorage[TOKEN]) return localStorage[TOKEN];
  return '';
};
