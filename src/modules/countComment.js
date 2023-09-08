const countComments = async (id) => {
  const commentURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/qNEqt1NyUkKxEIK764gq/comments?item_id=${id}`;
  const response = await fetch(commentURL);
  const data = await response.json();
  return data.length;
};

export default countComments;