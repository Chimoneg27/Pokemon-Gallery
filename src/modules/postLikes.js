const postLikes = async (data) => {
  const appId = 'qNEqt1NyUkKxEIK764gq';
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${appId}/likes/`;
  try {
    const postData = await fetch(`${url}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),

    });
    const response = await postData.json();
    return response.ok;
  } catch (error) {
    return error.message;
  }
};

export default postLikes;