const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerID = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const intervalFunction = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};
const onClick = () => {
  timerID = setInterval(intervalFunction, 1000);
  startBtn.setAttribute('disabled', '');
};
const offClick = () => {
  clearInterval(timerID);
  startBtn.removeAttribute('disabled');
};
startBtn.addEventListener('click', onClick);
stopBtn.addEventListener('click', offClick);
