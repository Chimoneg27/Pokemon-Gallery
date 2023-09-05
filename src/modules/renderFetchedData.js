import getCardImages from "./getCardImage.js";
import getCardTypes from "./getCardTypes.js";

let cardBoxes = document.querySelector('.card-boxes');
// const cards = document.querySelector('.poke-info');

//  a function to display the cards 
const renderFetchedData=(pokeData)=>{
    let pokeCard = document.createElement('div');
    pokeCard.classList.add('poke-dex');
    console.log(pokeData)
    console.log(pokeData.id)
    getCardImages(pokeData.id, pokeCard);


    let pokemonName = document.createElement('h2');
    pokemonName.innerText = pokeData.name;
    pokeCard.appendChild(pokemonName);

    let moves = shorterArr(pokeData.moves);
    console.log(moves)
    let pokeType = document.createElement('ul');
    pokeCard.appendChild(pokeType);

    getCardTypes(pokeData.types, pokeType);

    pokeCard.innerHTML += `
    <p>#${pokeData.id}</p>
    `;
    cardBoxes.appendChild(pokeCard);
}

export default renderFetchedData;