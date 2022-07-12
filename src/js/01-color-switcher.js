const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    bodyStule: document.body.style,
};

refs.start.addEventListener('click', onStartBtnClick);
refs.stop.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBodyChangeColor() { }

function onStartBtnClick() {
    timeOutId = setInterval(() => {
        const color = getRandomHexColor();
        console.log(color);
        document.body.style.backgroundColor = color;
    }, 1000);

    refs.start.disabled = true;
    refs.stop.disabled = false;
}

function onStopBtnClick() {
    clearInterval(timeOutId);
    refs.start.disabled = false;
    refs.stop.disabled = true;
}




