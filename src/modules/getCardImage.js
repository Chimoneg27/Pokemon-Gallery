
// function to fetch images of the data
const getCardImages=(imageId, container)=>{
    let image = document.createElement('img');
    image.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageId}.png`
    container.append(image);
}

export default getCardImages