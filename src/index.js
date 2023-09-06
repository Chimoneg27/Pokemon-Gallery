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

const openPopup = (pokeData) => {
  const modalBox = document.querySelector('.modal');
  modalBox.innerHTML = `
      <div class="popup">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png" alt="${pokeData.name}" />
          <h3>${pokeData.name}</h3>
          <p>#${pokeData.id}</p>
          <button class="closePopupBtn">Close</button>
      </div>
  `;
  const popup = document.querySelector('.popup');
  const pokeType = document.createElement('ul');
  pokeType.innerHTML = 'Type(s)';
  pokeType.classList.add('types');
  popup.appendChild(pokeType);

  getCardTypes(pokeData.types, pokeType);

  const closePopupBtn = modalBox.querySelector('.closePopupBtn');
  closePopupBtn.addEventListener('click', () => {
    modalBox.style.display = 'none';
  });

  modalBox.style.display = 'flex';
};

// renderFetchedData
const renderPokemonData = (pokeData) => {
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('poke-dex');
  pokemonImage(pokeData.id, pokeCard);

  const pokemonName = document.createElement('h2');
  pokemonName.innerText = pokeData.name;
  pokeCard.appendChild(pokemonName);

  pokeCard.innerHTML += `
      <button class='popupBtn'>Comment</button>
      `;

  cardBoxes.appendChild(pokeCard);

  const popupBtn = pokeCard.querySelector('.popupBtn');
  popupBtn.addEventListener('click', () => {
    openPopup(pokeData);
  });
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
