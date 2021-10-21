const endpointGetToken = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  const res = await fetch(endpointGetToken);
  const json = await res.json();
  return json.token;
};

export const fetchQuestions = async (token) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await res.json();
  return json;
};
