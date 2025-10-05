function Api(path = '') {
  const url = process.env.REACT_APP_API_URL;
  return `${url}/${path}`;
}

export default Api;
