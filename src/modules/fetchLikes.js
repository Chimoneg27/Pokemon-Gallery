const fetchLikes = async () => {
  const appId = 'qNEqt1NyUkKxEIK764gq';
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`;
  const data = await fetch(`${url}`);
  const dataArray = await data.json();

  return dataArray;
};

export default fetchLikes;