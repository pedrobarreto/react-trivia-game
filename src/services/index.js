const endpointGetToken = 'https://opentdb.com/api_token.php?command=request';
const DEFAULT_AMOUNT = 5;

export const fetchToken = async () => {
  const res = await fetch(endpointGetToken);
  const json = await res.json();
  return json.token;
};

export const fetchQuestions = async (token, amount = DEFAULT_AMOUNT, category = '', difficulty = '', type='') => {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}&category=${category}&difficulty=${difficulty}&type=${type}`);
  const json = await res.json();
  return json.results;
};

export const getCategories = async () => {
  const res = await fetch('https://opentdb.com/api_category.php');
  const json = await res.json();
  return json.trivia_categories;
}
