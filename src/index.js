import './style.css';
import getCardTypes from './modules/getCardTypes.js';

const cardBoxes = document.querySelector('.card-boxes');

// getCardImages
const pokemonImage = (pokeID, container) => {
  const image = document.createElement('img');
  // imageID
  image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
  container.append(image);
};

// renderFetchedData
const renderPokemonData = (pokeData) => {
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('poke-dex');
  pokemonImage(pokeData.id, pokeCard);

  const pokemonName = document.createElement('h2');
  pokemonName.innerText = pokeData.name;
  pokeCard.appendChild(pokemonName);

  //   const moves = shorterArray(pokeData.moves);
  const pokeType = document.createElement('ul');
  pokeCard.appendChild(pokeType);

  getCardTypes(pokeData.types, pokeType);

  pokeCard.innerHTML += `
      <p>#${pokeData.id}</p>
      `;

  cardBoxes.appendChild(pokeCard);
};

// getMoreCardInfo;
const getMoreInfo = (pokemon) => {
  const sourceUrl = pokemon.url;
  fetch(sourceUrl)
    .then((response) => response.json())
    .then((pokeData) => {
      renderPokemonData(pokeData);
    })
    .catch((error) => error.message);
};

const getPokemon = async () => {
  const sourceUrl = 'https://pokeapi.co/api/v2/pokemon?limit=6';
  try {
    const response = await fetch(sourceUrl);
    const data = await response.json();
    const pokeArray = data.results;
    pokeArray.forEach((pokemon) => {
      getMoreInfo(pokemon);
    });
    return pokeArray;
  } catch (error) {
    return error.message;
  }
};

getPokemon();
