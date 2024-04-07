

const fetchRequest = async (postfix, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method: 'get',
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`https://newsapi.org/v2/${postfix}`, {
      headers: {
        'X-Api-Key': '2d0d1a23bbba48338e1a50861cb24610',
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;
