const API_URL = 'https://apis.is/company?name=';
const input = document.getElementsByTagName("input");
const btn = document.getElementsByTagName("button");
/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */
btn[0].addEventListener("click",search);


function search(e){
  e.preventDefault();
  if(!(input[0].value == null || input[0] ==='')){
    if(typeof input[0].value === 'string'){
      console.log("input is string");
    }
  }
}
/*const program = (() => {
  function init(companies) {

  }

  return {
    init,
  };
})(); */

document.addEventListener('DOMContentLoaded', () => {
 // program.init(companies);
});
