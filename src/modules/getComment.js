const getComment = async (id, div) => {
  const commentURL = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/qNEqt1NyUkKxEIK764gq/comments?item_id=${id}`;
  const response = await fetch(commentURL);
  const data = await response.json();
  const commentData = data;

  div.innerHTML = '';
  commentData.forEach((comment) => {
    div.innerHTML += `<p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>`;
  });
};

export default getComment;