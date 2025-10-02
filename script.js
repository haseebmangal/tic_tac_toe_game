// accessing all the boxes and reset button
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// a variable to track the alternate turns
let turnO = true; // PlayerX, PlayerO

// Making array of winiing combinations
const winPtrns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");  
}

// Checking each elements of array through "forEach", 
// adding event listeners to all the boxes and handling the clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWin();
        }
)})

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Player ${winner} has won!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWin = () => {
    for (let pattern of winPtrns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("Winner");
                showWinner(pos1val);
            }
        }  
    }

}
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame)
