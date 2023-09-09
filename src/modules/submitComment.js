const submitComment = async (newComment) => {
  const commentURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/qNEqt1NyUkKxEIK764gq/comments';
  const requestBody = JSON.stringify(newComment);

  try {
    const response = await fetch(commentURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: requestBody,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default submitComment;
