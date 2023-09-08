const itemsCounter=async()=>{
    const sourceUrl = 'https://pokeapi.co/api/v2/pokemon?limit=9';
      const response = await fetch(sourceUrl);
      const data = await response.json();
      const pokeArray = data.results.length;
      return pokeArray
}
export default itemsCounter;