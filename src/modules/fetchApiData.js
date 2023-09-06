import getMoreCardInfo from './getMoreCardInfo.js';

// function to fetch data from the Api (getPokemon)
const fetchApiData = async () => {
  const sourceUrl = 'https://pokeapi.co/api/v2/pokemon?limit=4';
  try {
    const response = await fetch(sourceUrl);
    const data = await response.json();
    const pokeArray = data.results;
    pokeArray.forEach((pokemon) => {
      getMoreCardInfo(pokemon);
    });
    return pokeArray;
  } catch (error) {
    return error.messsage;
  }
};

export default fetchApiData;