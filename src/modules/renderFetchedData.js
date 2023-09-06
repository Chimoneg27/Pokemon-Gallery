import getCardImages from './getCardImage.js';
import getCardTypes from './getCardTypes.js';

// let cardBoxes = document.querySelector('.card-boxes');
// console.log(cardBoxes)
// const cards = document.querySelector('.poke-info');

//  a function to display the cards
const renderFetchedData = (pokeData) => {
  const cardBoxes = document.querySelector('.card-boxes');
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('poke-dex');
  getCardImages(pokeData.id, pokeCard);

  const pokemonName = document.createElement('h2');
  pokemonName.innerText = pokeData.name;
  pokeCard.appendChild(pokemonName);

  const moves = shorterArr(pokeData.moves);
  console.log(moves);
  const pokeType = document.createElement('ul');
  pokeCard.appendChild(pokeType);

  getCardTypes(pokeData.types, pokeType);

  pokeCard.innerHTML += `
    <p>#${pokeData.id}</p>
    `;
  cardBoxes.appendChild(pokeCard);
};

export default renderFetchedData;