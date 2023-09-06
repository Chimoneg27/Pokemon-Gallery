import './style.css';

let cardBoxes = document.querySelector('.card-boxes');

const getPokemon = async () => {
    const sourceUrl = "https://pokeapi.co/api/v2/pokemon?limit=6"
    try {
        const response = await fetch(sourceUrl)
        const data = await response.json();
        const pokeArray = data.results;
        pokeArray.forEach((pokemon) => {
            getMoreInfo(pokemon);
        })
    } catch (error) {
        console.error("Error fetching data:", error)
    }
}
// getMoreCardInfo;
const getMoreInfo = (pokemon) => {
    const sourceUrl = pokemon.url;
    fetch(sourceUrl)
        .then(response => response.json())
        .then((pokeData) => {
            renderPokemonData(pokeData);
        })
        .catch((error) => {
            console.error("Error fetching more info:", error);
        });
}

// renderFetchedData
const renderPokemonData = (pokeData) => {
    let pokeCard = document.createElement('div');
    pokeCard.classList.add('poke-dex');
    // console.log(pokeData.moves);
    pokemonImage(pokeData.id, pokeCard);

    let pokemonName = document.createElement('h2');
    pokemonName.innerText = pokeData.name;
    pokeCard.appendChild(pokemonName);

    let moves = shorterArr(pokeData.moves);
    console.log(moves)
    let pokeType = document.createElement('ul');
    pokeCard.appendChild(pokeType);

    generatePokeTypes(pokeData.types, pokeType);

    pokeCard.innerHTML += `
    <p>#${pokeData.id}</p>
    `;

    cardBoxes.appendChild(pokeCard);
}
// getCardType
const generatePokeTypes = (types, ul) => {
    types.forEach((type) => {
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

const shorterArr = (moveSet) => {
    let shortArr = moveSet.slice(0, 3);
    return shortArr;
}
// getCardImages
const pokemonImage = (pokeID, container) => {
    let image = document.createElement('img');
                                                                                            //imageID
    image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`
    container.append(image);
}

getPokemon();
