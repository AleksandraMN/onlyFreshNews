

export const toggleLoader = () => {
  const loaderHTML = document.querySelector('#loader');
  const isHidden = loaderHTML.hasAttribute('hidden');
  if (isHidden) {
    // loaderHTML.removeAttribute('hidden');
    loaderHTML.classList.add('spinner');
  } else {
    // loaderHTML.setAttribute('hidden', 'true');
    loaderHTML.classList.remove('spinner');
  }
};


