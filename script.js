// accessing all the boxes and reset button
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newGameBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// a variable to track the alternate turns
let turnO = true; // PlayerX, PlayerO
let count = 0; // to track the number of turns played

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

// function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");  
    resetBoard();

}

// Checking each elements of array through "forEach", 
// adding event listeners to all the boxes and handling the clicks
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) { // true means Player O's turn
            box.innerText = "O";
            box.classList.add('mark-o');
            box.style.backgroundColor = '#cfe8ff';
            box.style.color = "#003a6b";
            
        } else { // false means Player X's turn
            box.innerText = "X";
            box.classList.add('mark-x');
            box.style.backgroundColor = '#ffd9d9';
            box.style.color = "#7a0000";
            
        }
        box.disabled = true;
        count++;

        let isWinner = checkWin();
        if (count === 9 && !isWinner) {
           gameDraw();
           resetBoard();
        }
        turnO = !turnO;
    });
    })

    function resetBoard() {
    boxes.forEach(box => {
    // Remove any classes if you added them elsewhere
    box.classList.remove('mark-o', 'mark-x', 'win');

    // Clear all inline styles that affect appearance
    box.style.backgroundColor = '';
    box.style.color = '';
    box.style.outline = '';
    box.style.border = '';

    // Reset content & state
    box.innerText = '';
    box.disabled = false;
    })};
    count = 0;
    turnO = true;

// function to handle game draw
const gameDraw = () => {
   msg.innerText = "Game was a Draw!";
   msgContainer.classList.remove("hide");
   disableBoxes();
   resetBoard()
;}

// function to disable boxes
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

// function to enable boxes
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

// function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulation, Player ${winner} has won!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetBoard();
}
// function to check the winning combinations
const checkWin = () => {
    for (let pattern of winPtrns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }  
    }

}

// adding event listener to reset button
newGameBtn.addEventListener("click", resetGame);

resetBtn.addEventListener("click", resetGame )

