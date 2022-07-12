import { Notify } from 'notiflix/build/notiflix-notify-aio';
const ref = {
  form: document.querySelector('.form'),
};

ref.form.addEventListener('submit', event => {
  event.preventDefault();

  const firstDelay = +event.target.elements.delay.value;
  const delayStep = +event.target.elements.step.value;
  const amount = +event.target.elements.amount.value;
  let delay = firstDelay;

  for (let i = 1; i <= amount; i += 1, delay += delayStep) {
    createPromise(i, delay)
      .then(x => {
        console.log(x);
      })
      .catch(y => {
        console.log(y);
      });
  }
});


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
       
      } else {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        
      }
    }, delay);
  })
}
