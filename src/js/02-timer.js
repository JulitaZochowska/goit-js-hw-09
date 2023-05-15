import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const picker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerID = null;
let selectedDate = null;

const options = {
  //włącza selektor czasu
  enableTime: true,
  //wyświetla czas uwzględniając AM/PM
  time_24hr: true,
  //terazniejsza data
  defaultDate: new Date(),
  //o ile minut przesuwasz w kalendarzu (czy jedno kliknięcie w strzałkę
  //boczną to 1 minuta czy 5 minut)
  minuteIncrement: 1,
  //fukcja uruchamiana przy kazdym zamknięciu kalendarza
  onClose(selectedDates) {
    //ustawiłam wartość tej zmiennej na wybraną datę po zamknięciu kalendarza
    const now = new Date();
    const ms = selectedDates[0] - now;
    //wybór daty
    if (ms < 0) {
      startBtn.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      //czyli jak wychodzimy z kalendarza, to jedyne czego chcemy, to
      //zeby zapisał nam datę, która wybraliśmy
      selectedDate = selectedDates[0];
    }
  },
};
flatpickr(picker, options);

//kliknięcie na przycisk strat
const onClick = () => {
  startBtn.setAttribute('disabled', '');

  timerID = setInterval(() => {
    const now = new Date();
    const ms = selectedDate - now;
    const convertedMs = convertMs(ms);

    if (
      //ms to milisekundy
      ms <= 0
      //tak nie mozna, bo days nie sa inputami, musialabys wziac innerHTML, prasowac
      //(days.value <= 0) &
      //(hours.value <= 0) &
      // (minutes.value <= 0) &
      // (seconds.value <= 0)
    ) {
      clearInterval(timerID);
      //mozna to tez zrobic przy uzyciu biblioteki  notiflix
      window.alert('Time gone!');
    } else {
      //ustawia zawartość elementu HTML, który ma atrybut `data-days`
      //, na wartość zwróconą przez funkcję `addLeadingZero`
      days.innerHTML = addLeadingZero(convertedMs.remainingDays);
      hours.innerHTML = addLeadingZero(convertedMs.remainingHours);
      minutes.innerHTML = addLeadingZero(convertedMs.remainingMinutes);
      seconds.innerHTML = addLeadingZero(convertedMs.remainingSeconds);
    }
  }, 1000);
};

//odliczanie czasu
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  let remainingDays, remainingHours, remainingMinutes, remainingSeconds;
  // Remaining days
  remainingDays = Math.floor(ms / day);
  // Remaining hours
  remainingHours = Math.floor((ms % day) / hour);
  // Remaining minutes
  remainingMinutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  remainingSeconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { remainingDays, remainingHours, remainingMinutes, remainingSeconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(number) {
  if (number < 10) {
    const numberWithZero = number.toString().padStart(2, '0');
    return numberWithZero;
  } else {
    return number;
  }
}

// const convertedObject = convertMs(140000);
// console.log(addLeadingZero(convertedObject.remainingMinutes));

startBtn.addEventListener('click', onClick);
