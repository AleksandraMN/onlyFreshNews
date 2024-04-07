
import {loaderHTML, newsList} from '../script.js';
import fetchRequest from './fetchRequest.js';
import {deleteList} from './helper.js';
import renderNewsElement from './renderList.js';


const formSearch = document.querySelector('.form-search');
const searchInput = document.querySelector('.search-input');
// const options = document.querySelectorAll('option');
const searchSubmit = document.querySelector('.search-submit');
export const title = document.querySelector('.title');
const jsChoice = document.querySelector('.js-choice');


export const sendingForm = () => {
  let country;
  let text;

  jsChoice.addEventListener('change', (e) => {
    country = jsChoice.value;
    text = jsChoice.options[jsChoice.selectedIndex].text;
  });

  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
    let q = searchInput.value;

    if (country === '' || country === undefined) {
      country = 'ru';
      text = 'Россия';
    }
    if (q === '') {
      q = 'news';
    }
    console.log(q);
    console.log(country);
    console.log(text);
    console.log(jsChoice.value);
    console.log(jsChoice.options[jsChoice.selectedIndex].text);

    if (e.submitter === searchSubmit) {
      deleteList(newsList[0]);
      deleteList(newsList[1]);

      return Promise.all([
        fetchRequest(`top-headlines?q=${q}&country=${country}&pageSize=8`, {
          callback: renderNewsElement,
        }),
        fetchRequest(`top-headlines?q=${q}&country=${country}&pageSize=4`, {
          callback: renderNewsElement,
        })])
          .then((values) => {
            loaderHTML.classList.remove('spinner');
            title.textContent = `По вашему запросу найдено:`;
            newsList[0].append(...values[0]);
            newsList[1].append(...values[1]);
          });
    }

    formSearch.reset();
  });
};


