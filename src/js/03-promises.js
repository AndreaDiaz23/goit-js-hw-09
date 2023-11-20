import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });  
        }
      }, delay);
    });
  };
  
/* const formulario = document.querySelector('.form'); */


document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();
  /* formulario.addEventListener('sumbit', calculateForm(eventoProm) {
    eventoProm.preventDefault(); */
    const delay = parseInt(this.elements.delay.value);
    const step = parseInt(this.elements.step.value);
    const amount = parseInt(this.elements.amount.value);

  
  for (let i = 0; i < amount; i++) {
    const currentDelay = delay + step * i;
    createPromise(i + 1, currentDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    }
  });



