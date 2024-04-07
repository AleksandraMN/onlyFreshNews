

const renderNewsElement = async (err, result) => {
  if (err) {
    console.warn(err, result);
    return;
  }

  const articles = result.articles.map(article => {
    const li = document.createElement('li');
    li.classList.add('news-item');

    const imgEl = document.createElement('img');
    imgEl.classList.add('news-image');
    imgEl.style.height = '200px';
    imgEl.src = article.urlToImage || '/img/unsplash.svg';
    imgEl.alt = article.title;

    const h3El = document.createElement('h3');
    h3El.classList.add('news-title');
    const aEl = document.createElement('a');
    aEl.classList.add('news-link');
    aEl.href = article.url;
    aEl.target = '_blank';
    aEl.textContent = `${article.title}`;
    h3El.append(aEl);

    const pEl = document.createElement('p');
    pEl.classList.add('news-description');
    pEl.textContent = article.description;

    const divEl = document.createElement('div');
    divEl.classList.add('news-footer');
    const timeEl = document.createElement('time');
    timeEl.classList.add('news-datetime');
    timeEl.setAttribute('datetime', article.publishedAt);
    const spanEl = document.createElement('span');
    spanEl.classList.add('news-date');
    const date = new Date(article.publishedAt);
    const options1 = {year: 'numeric', month: '2-digit', day: '2-digit'};
    spanEl.textContent = new Intl.DateTimeFormat('en', options1).format(date);
    timeEl.append(spanEl);
    const options2 = {hour: '2-digit', minute: '2-digit', hour12: false};
    timeEl.append(new Intl.DateTimeFormat(undefined, options2).format(date));

    const pElem = document.createElement('p');
    pElem.classList.add('news-author');
    pElem.textContent = article.author;
    divEl.append(timeEl, pElem);

    li.append(imgEl, h3El, pEl, divEl);
    return li;
  });
  return articles;
};

export default renderNewsElement;


