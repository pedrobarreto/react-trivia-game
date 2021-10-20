const endpointGetToken = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  const res = await fetch(endpointGetToken);
  const json = await res.json();
  return json.token;
};

export default fetchToken;
