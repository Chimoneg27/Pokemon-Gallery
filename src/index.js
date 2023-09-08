import './style.css';
import pokemonLogo from './assets/pokemonLogo.png';
import getCardTypes from './modules/getCardTypes.js';
import Comment from './modules/commentObj.js';
import submitComment from './modules/submitComment.js';
import getComment from './modules/getComment.js';
import shorterArray from './modules/shorterArray.js';
import countComments from './modules/countComment.js';
import postLikes from './modules/postLikes.js';
import fetchLikes from './modules/fetchLikes.js';
import itemsCounter from './modules/itemsCounter.js';



document.addEventListener("DOMContentLoaded",async()=>{
  const countItems= await itemsCounter();
  const itemsDisplay= document.querySelector(".home-items");
  itemsDisplay.innerHTML=`SpaceShips (${countItems})`;
})

const cardBoxes = document.querySelector('.card-boxes');
const logo = document.querySelector('.logo');
logo.innerHTML = `
  <img src="${pokemonLogo}" alt="logo-img" />
`;

const pokemonImage = (pokeID, container) => {
  const image = document.createElement('img');
  image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`;
  container.append(image);
};

const openPopup = async (pokeData) => {
  const modalBox = document.querySelector('.modal');
  const right = document.createElement('div');
  right.classList.add('right');

  const detailsDiv = document.createElement('div');

  detailsDiv.classList.add('popupDetails');

  const commentDiv = document.createElement('div');
  commentDiv.classList.add('commentBox');

  const form = document.createElement('form');

  const left = document.createElement('div');
  left.classList.add('left');

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

  left.innerHTML = `
  <p>Rank: #${pokeData.id}</p>
  `;

  form.innerHTML = `
  <input type='text' name='userName' placeholder='Enter Your Name' required></input>
  <textarea name="comment" id="comment" maxlength="120"></textarea>
  <button type="submit" id="formBtn">Comment</button>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = document.querySelector('input[name="userName"]');
    const commentInput = document.getElementById('comment');
    const userName = user.value;
    const comment = commentInput.value;

    const newComment = new Comment(pokeData.id, userName, comment);

    await submitComment(newComment);

    const commentText = `${new Date().toLocaleString()} ${userName}: ${comment}`;
    const commentElement = document.createElement('p');
    commentElement.textContent = commentText;

    const thoughts = document.querySelector('.opinions');
    thoughts.appendChild(commentElement);

    getComment(pokeData.id, thoughts);

    const commentCount = await countComments(pokeData.id);
    commentDiv.innerHTML = `
      <h2>Comments(${commentCount})</h2>
    `;
    user.value = '';
    commentInput.value = '';
  });

  const moves = shorterArray(pokeData.moves);

  moves.forEach((set) => {
    right.innerHTML = `
      <p>Region: Kanto</p>
      <p>Basic Move: ${set.move.name}</p>
    `;
  });

  const thoughts = document.createElement('div');
  thoughts.classList.add('opinions');
  getComment(pokeData.id, thoughts);

  const commentCount = await countComments(pokeData.id);
  commentDiv.innerHTML = `
    <h2>Comments(${commentCount})</h2>
  `;

  detailsDiv.appendChild(right);
  detailsDiv.appendChild(left);
  left.appendChild(pokeType);
  popup.appendChild(detailsDiv);
  popup.appendChild(commentDiv);
  popup.appendChild(thoughts);
  popup.appendChild(form);

  getCardTypes(pokeData.types, pokeType);
  const closePopupBtn = modalBox.querySelector('.closePopupBtn');
  closePopupBtn.addEventListener('click', () => {
    modalBox.style.display = 'none';
  });

  modalBox.style.display = 'flex';
};


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
  const sourceUrl = 'https://pokeapi.co/api/v2/pokemon?limit=9';
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
