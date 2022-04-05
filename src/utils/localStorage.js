import md5 from 'crypto-js/md5';
import store from '../store';

const TOKEN = 'token';
const STATE = 'state';
const RANKING = 'ranking';

export const addTokenInStorage = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getTokenFromStorage = () => {
  if (localStorage[TOKEN]) return localStorage[TOKEN];
  return '';
};

export const getUserInfo = () => {
  if (localStorage[STATE]) return localStorage[STATE];
  return {};
};

export const saveScoreInStorage = (assertions = 0, score = 0) => {
  const { user: { name, email } } = store.getState();
  localStorage.setItem(STATE, JSON.stringify({
    player: { name, email, assertions, score },
  }));
};

export function generateInfos() {
  if (!localStorage[STATE]) return { name: 'Default User', score: 0, hash: '', assertions: 0 }
  const { player: {
    name,
    email,
    score,
    assertions,
  } } = JSON.parse(localStorage.getItem(STATE));
  const hash = md5(email).toString();
  return { name, score, hash, assertions };
}

export function addRanking(name, score, picture) {
  if (localStorage[RANKING]) {
    const array = JSON.parse(localStorage[RANKING]);
    array.push({ name, score, picture });
    localStorage[RANKING] = JSON.stringify(array);
  } else {
    localStorage.setItem(RANKING, JSON.stringify([{ name, score, picture }]));
  }
}

export function getRankings() {
  if (localStorage[RANKING]) {
    const array = JSON.parse(localStorage[RANKING]);
    array.sort(({ score: a }, { score: b }) => b - a);
    return array;
  }
  return [];
}
