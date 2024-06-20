const player = document.querySelector(".player");
const boxes = document.querySelectorAll(".box");
const newgame = document.querySelector(".btn");
const win = document.querySelector(".win");

let gameGrid;
let currentPlayer;

const winning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    player.innerText = `current player - ${currentPlayer}`;
    boxes.forEach((data, index) => {
        boxes[index].textContent = "";
        boxes[index].classList.remove("win")
    });
    
    // enable pointer after starting new game
    boxes.forEach((box) => {
        box.style.pointerEvents = "auto";
    });

}
init();

// to turn chances of the current-player
swapturn = () => {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    player.textContent = `current player - ${currentPlayer}`;
};

// to play new game
newgame.addEventListener("click", init);


// to chek the winner  or game tie
function checkgameOver() {
    let answer = "";
    winning.forEach((position) => {
        // condition chek that grid position empty nhi hona chahiyee and unde potion value same hone chhiye
        if (
            (gameGrid[position[0]] !== "" ||
                gameGrid[position[1]] !== "" ||
                gameGrid[position[2]] !== "") &&
            gameGrid[position[0]] === gameGrid[position[1]] &&
            gameGrid[position[0]] === gameGrid[position[2]]
        ) {
            if (gameGrid[position[0]] === "X") {
                answer = "X";

            } else {
                answer = "O";

            }
            // disable remaining boxes after winning
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            //add color for the winner box 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    if (answer !== "") {
        player.textContent = `winner - ${answer}`;
        newgame.classList.add("active");

    }
// to check box count 
    let boxCount = 0;
    gameGrid.forEach(box => {
        if (box != "") {
            boxCount++;

        }
    });
    // game tie logic if all cells are filled
    if (boxCount === 9) {
        player.textContent = `Game Tied "tough contestant" `;
        newgame.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].textContent = currentPlayer;
        gameGrid[index] = currentPlayer;

        swapturn();
        checkgameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
        console.log("clicked" + index);
    });
});
