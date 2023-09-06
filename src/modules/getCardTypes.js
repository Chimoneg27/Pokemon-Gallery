// function to fetch card types
const getCardTypes = (types, ul) => {
  types.forEach((type) => {
    const typeLi = document.createElement('li');
    typeLi.innerText = type.type.name;
    ul.append(typeLi);
  });
};

export default getCardTypes;