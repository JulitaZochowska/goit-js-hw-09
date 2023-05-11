import Notiflix from 'notiflix';

const inputDelay = document.querySelector('input[name="delay"]');
const inputDelayStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const form = document.querySelector('.form');

const logSubmit = event => {
  //zeby strona sie nie odswiezala, tylko na form mozna to zrobić
  event.preventDefault();
  //musimy uzyc funkcji parseInt bo liczby traktowal ja stringi i 100+0 to dla niego 1000
  const delay = parseInt(inputDelay.value);
  const delayStep = parseInt(inputDelayStep.value);
  const amount = parseInt(inputAmount.value);

  for (let i = 0; i < amount; i++) {
    const position = i;
    const promiseDelay = delay + i * delayStep;
    //wywolanie funcji createPromise
    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );

        // console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    //console.log(`Rejected promise ${position} in ${delay}ms`);
  }
};
//definicja funkcji createPromise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
//mozna by to zrobić na buttonie, do buttona jest event "click"
//jak na buttonie zrobisz to strona będzie się odświezać i będziesz tracić wpisane do inputów dane
form.addEventListener('submit', logSubmit);
