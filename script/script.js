import fetchRequest from './modules/fetchRequest.js';
import {sendingForm} from './modules/form.js';
import {deleteList} from './modules/helper.js';
import {toggleLoader} from './modules/loading.js';
import renderNewsElement from './modules/renderList.js';

export const loaderHTML = document.querySelector('#loader');
export const newsList = document.querySelectorAll('.news-list');
console.log(newsList);

const initNews = async () => {
  toggleLoader();
  deleteList(newsList[0]);
  deleteList(newsList[1]);

  return Promise.all([
    fetchRequest('top-headlines?country=ru&pageSize=8', {
      callback: renderNewsElement,
    }),
    fetchRequest('top-headlines?country=ru&pageSize=4', {
      callback: renderNewsElement,
    })]).then((array) => {
    loaderHTML.classList.remove('spinner');
    newsList[0].append(...array[0]);
    newsList[1].append(...array[1]);
  });
};

const init = async () => {
  await initNews();
  await sendingForm();
};

init();

