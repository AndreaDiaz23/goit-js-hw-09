const startBut = document.querySelector('[data-start]');
const stopBut = document.querySelector('[data-stop]');

let changeColor = null;

startBut.addEventListener('click', startColor);
stopBut.addEventListener('click', stopColor);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function newColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function startColor() {
    startBut.disabled = true;
    changeColor = setInterval(newColor, 1000);
}

function stopColor() {
    startBut.disabled = false;
    clearInterval(changeColor);
}
