import './style.css';
import getCardTypes from './modules/getCardTypes.js';
import postLikes from './modules/postLikes.js';
import fetchLikes from './modules/fetchLikes.js';

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
  const detailsDiv = document.createElement('div');
  const left = document.createElement('div');
  left.classList.add('left');
  detailsDiv.classList.add('popupDetails');
  modalBox.innerHTML = `
      <div class="popup">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeData.id}.png" alt="${pokeData.name}" />
          <h2>${pokeData.name}</h2>
          <button class="closePopupBtn">&times;</button>
      </div>
  `;
  const popup = document.querySelector('.popup');
  const pokeType = document.createElement('ul');
  pokeType.innerHTML = 'Type(s): ';
  pokeType.classList.add('types');
  detailsDiv.innerHTML = `
      <div class='right'>
      <p>Region: Kanto</p>
      </div>
  `;
  // detailsDiv.appendChild(pokeType);
  left.innerHTML = `
  <p>Rank: #${pokeData.id}</p>
  `;
  detailsDiv.appendChild(left);
  left.appendChild(pokeType);
  popup.appendChild(detailsDiv);

  getCardTypes(pokeData.types, pokeType);

  const closePopupBtn = modalBox.querySelector('.closePopupBtn');
  closePopupBtn.addEventListener('click', () => {
    modalBox.style.display = 'none';
  });

  modalBox.style.display = 'flex';
};

// renderFetchedData
const renderPokemonData = async (pokeData) => {
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('poke-dex');
  pokemonImage(pokeData.id, pokeCard);

  pokeCard.innerHTML += `
  <div class="likes">
    <p class="poke-name">${pokeData.name}</p>
    <div>
     <span class='likes-btn'><i class="far fa-heart" aria-hidden="true"></i></span>
    </div>
  </div>  
  `;

  // display likes
  const likesDisplay = document.createElement('p');
  const displayLikes = async () => {
    const dataLikes = await fetchLikes();
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('contain');
    let pokeLikes = 0;
    const likes = dataLikes.find((like) => like.item_id === pokeData.id);
    likesDisplay.classList.add('likes-counter');
    if (likes) {
      pokeLikes = likes.likes;
    }

    likesDisplay.textContent = `${pokeLikes} likes`;
    containerDiv.appendChild(likesDisplay);
    pokeCard.appendChild(containerDiv);
  };

  pokeCard.innerHTML += `
      <button class='popupBtn'>Comment</button>
      `;

  cardBoxes.appendChild(pokeCard);

  const popupBtn = pokeCard.querySelector('.popupBtn');
  popupBtn.addEventListener('click', () => {
    openPopup(pokeData);
  });

  // post likes and update
  const handleLikePost = async () => {
    const likesBtn = pokeCard.querySelector('.likes-btn');
    likesDisplay.innerHTML = '';
    const likesObj = { item_id: pokeData.id };
    likesBtn.addEventListener('click', async () => {
      await postLikes(likesObj);
      await displayLikes();
    });
  };
  handleLikePost();
  displayLikes();
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
