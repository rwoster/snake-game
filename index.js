// HTML ELEMENTS
const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const gameOverEl = document.querySelector(".game-over");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
const speed = 0.9;
let timerId;

function createGrid() {
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
    }
}
createGrid();

function startGame() {
    gameOverEl.style.display = "none";
    currentSnake.forEach((index) =>
        squares[index].classList.remove("snake")
    );
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    direction = 1;
    score = 0;
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    // move();
    generateApples();
    addSnakes();
    timerId = setInterval(move, intervalTime);
}

function addSnakes() {
    currentSnake.forEach((index) =>
        squares[index].classList.add("snake")
    );
}
addSnakes();

function move() {
    if (
        // BOTTOM
        (currentSnake[0] + width >= width * width &&
            direction === width) ||
        // RIGHT
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        // LEFT
        (currentSnake[0] % width === 0 && direction === -1) ||
        // TOP
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains(
            "snake"
        )
    )
        return gameOver();

    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        generateApples();

        score++;
        scoreDisplay.textContent = score;
        //speed up snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }

    squares[currentSnake[0]].classList.add("snake");
}
move();

function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function gameOver() {
    clearInterval(timerId);
    gameOverEl.style.display = "block";
}

function control(e) {
    switch (e.key) {
        // DOWN ARROW
        case "Down":
            direction = width;
        case "ArrowDown":
            direction = width;
            break;
        // UP ARROW
        case "Up":
            direction = -width;
        case "ArrowUp":
            direction = -width;
            break;
        // LEFT ARROW
        case "Left":
            direction = -1;
        case "ArrowLeft":
            direction = -1;
            break;
        // RIGHT ARROW
        case "Right":
            direction = 1;
        case "ArrowRight":
            direction = 1;
            break;
        default:
            break;
    }
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
