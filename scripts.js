/* eslint-disable no-console */
const API_URL = 'https://apis.is/company?name=';
/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */

const program = (() => {
  function init(companies) {
    const input = companies[0].children[1].children[0];
    const btn = companies[0].children[1].children[1];
    const mainDiv = companies[0].children[2];
    function search(e) {
      mainDiv.innerHTML = '';
      e.preventDefault();
      const request = new XMLHttpRequest();
      const img = document.createElement('img');
      const txt = document.createElement('p');
      const div = document.createElement('div');
      let searchValue = '';
      txt.innerHTML = 'Leita að fyrirtækjum...';
      div.appendChild(img);
      div.appendChild(txt);
      img.src = 'loading.gif';
      div.classList.add('loading');
      if (!(input.value === '' || input.value == null)) {
        searchValue = API_URL + input.value;
        request.open('GET', searchValue);
        request.onload = () => {
          if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            div.remove();
            if (data.results.length < 1) {
              mainDiv.innerHTML = 'Ekkert fyrirtæki fannst fyrir leitarstreng';
            } else {
              const hlutir = ['Lén', 'Kennitala', 'Heimilsfang'];
              const items = ['name', 'sn', 'address'];
              for (let i = 0; i < data.results.length; i += 1) {
                if (data.results[i].active === 1) {
                  const dl = document.createElement('dl');
                  const activeDiv = document.createElement('div');
                  activeDiv.classList.add('company');
                  activeDiv.classList.add('company--active');
                  for (let k = 0; k < hlutir.length; k += 1) {
                    const dt = document.createElement('dt');
                    const dd = document.createElement('dd');
                    dt.innerHTML = hlutir[k];
                    dl.appendChild(dt);
                    dd.innerHTML = data.results[i][items[k]];
                    dl.appendChild(dd);
                    activeDiv.appendChild(dl);
                  }
                  mainDiv.appendChild(activeDiv);
                } else {
                  const dl = document.createElement('dl');
                  const inactiveDiv = document.createElement('div');
                  inactiveDiv.classList.add('company');
                  inactiveDiv.classList.add('company--inactive');
                  for (let k = 0; k < hlutir.length - 1; k += 1) {
                    const dt = document.createElement('dt');
                    const dd = document.createElement('dd');
                    dt.innerHTML = hlutir[k];
                    dl.appendChild(dt);
                    dd.innerHTML = data.results[i][items[k]];
                    dl.appendChild(dd);
                    inactiveDiv.appendChild(dl);
                  }
                  mainDiv.appendChild(inactiveDiv);
                }
              }
            }
          } else {
            div.remove();
            mainDiv.innerHTML = 'Villa við að sækja gögn';
          }
        };
        request.send();
        mainDiv.appendChild(div);
      } else {
        mainDiv.innerHTML = 'Lén verður að vera strengur';
      }
    }
    btn.addEventListener('click', search);
  }
  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const companies = document.getElementsByTagName('section');
  program.init(companies);
});
