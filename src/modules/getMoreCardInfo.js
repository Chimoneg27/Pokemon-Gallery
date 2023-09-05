import renderFetchedData from "./renderFetchedData.js";

// function to get more card info
const getMoreCardInfo= async(pokemon)=>{
    const sourceUrl = pokemon.url;
    fetch(sourceUrl)
        .then(response => response.json())
        .then((pokeData) => {
            renderFetchedData(pokeData);
        })
        .catch((error) => {
            return error.message;
        });
}

export default getMoreCardInfo