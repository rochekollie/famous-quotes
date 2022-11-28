export async function queryResource(query) {
  const url = `https://api.quotable.io/search/quotes?query=${query}&fields=content`;
  const response = await fetch(url);
  const {results} = await response.json();
  return results;
}

export async function getQuotes(query) {
  return await queryResource(query);
}
