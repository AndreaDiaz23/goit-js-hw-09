import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startBut = document.querySelector('[data-start]');
const daysEle = document.querySelector('[data-days]');
const hoursEle = document.querySelector('[data-hours]');
const minEle = document.querySelector('[data-minutes]');
const secEle = document.querySelector('[data-seconds]');

startBut.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      startBut.removeAttribute('disabled');
    } else {
      startBut.setAttribute('disabled', 'true');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(datetimePicker, options);

let intervalo;

function startCountdown() {
  const endDate = new Date(datetimePicker.value).getTime();

  intervalo = setInterval(() => {
    const currentDate = new Date().getTime();
    const tiempoDif = endDate - currentDate;

    if (tiempoDif <= 0) {
      clearInterval(intervalo);
      updateTimer(0, 0, 0, 0);
    } else {
      const { days, hours, minutes, seconds } = convertMs(tiempoDif);
      updateTimer(days, hours, minutes, seconds);
    }
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  daysEle.textContent = addLeadingZero(days);
  hoursEle.textContent = addLeadingZero(hours);
  minEle.textContent = addLeadingZero(minutes);
  secEle.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBut.addEventListener('click', startCountdown);
