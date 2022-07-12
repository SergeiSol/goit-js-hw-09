import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
let timerDeadline;
const refs = {
    button: document.querySelector('button'),
    start: document.querySelector("#datetime-picker"),
};
refs.button.setAttribute('disabled', 'true')

refs.button.addEventListener('click', () => {
    timer.start(timerRef, timerDeadline);
    refs.button.setAttribute('disabled', 'true')
})

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      if (selectedDates[0] < Date.now()) {
        //   alert("Please choose a date in the future")
          Report.warning('invalid-Date', 'Please choose a date in the future', 'Close');
          return;
      }
      timerDeadline = selectedDates[0];
      refs.button.removeAttribute('disabled')
  },
};


const calendars = flatpickr(refs.start, options);

const timerRef = document.querySelector('.timer');


const timer = {
    intervalId: null,
    start(roorSelector, deadline) {
        
        let now = Date.now()
        let delta = deadline - now;
        if (delta <= 0) {
            
            Report.warning('invalid-Date', 'Please choose a date in the future', 'Close');
            return;
        }
        this.intervalId = setInterval(() => {
            now = Date.now();
            let delta = deadline - now;
            const data = this.convertMs(delta)
    
            if (delta <= 0) {
                //alert("DEADLINE !!!");
                Report.success("DEADLINE !!!", 'Time off', 'Close');
                clearInterval(this.intervalId);
                
                return;
            }
            this.updateTextContent(roorSelector, data)

        }, 1000);
    },
    convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
       
    },
    updateTextContent(roorSelector, { days, hours, minutes, seconds }) {
        //console.log("div",days)
        const daysRef = roorSelector.querySelector('[data-days]');
        const hoursRef = roorSelector.querySelector('[data-hours]');
        const minutesRef = roorSelector.querySelector('[data-minutes]');
        const secondsRef = roorSelector.querySelector('[data-seconds]');
        //console.log(seconds)
        daysRef.textContent = this.addLeadinfZero(days);
        hoursRef.textContent = this.addLeadinfZero(hours);
        minutesRef.textContent = this.addLeadinfZero(minutes);
        secondsRef.textContent = this.addLeadinfZero(seconds);
    },
    addLeadinfZero(value) {
        return String(value).padStart(2, 0)
    }
};
