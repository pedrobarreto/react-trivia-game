const endpointGetToken = 'https://opentdb.com/api_token.php?command=request';
const DEFAULT_AMOUNT = 5;

export const fetchToken = async () => {
  const res = await fetch(endpointGetToken);
  const json = await res.json();
  return json.token;
};

export const fetchQuestions = async (token, amount = DEFAULT_AMOUNT) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const json = await res.json();
  return json.results;
};
