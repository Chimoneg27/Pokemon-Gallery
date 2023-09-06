// function to fetch images of the data
const getCardImages = (imageId, container) => {
  console.log(imageId);
  const image = document.createElement('img');
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imageId}.png`;
  container.append(image);
};

export default getCardImages;