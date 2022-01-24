const boxes = document.querySelectorAll('.box');
const playerText = document.querySelector('#playerTurn');
const clearBtn = document.querySelector('#clearBtn');
const scoreBoxX = document.querySelector('.scoreBox-x');
const scoreBoxO = document.querySelector('.scoreBox-o');

const spaces = [];
const o = 'O';
const x = 'X';
currentPlayer = o;

const clear = () => {
  spaces.forEach((space, i) => {
    spaces[i] = null;
  });
  boxes.forEach((box) => {
    box.innerHTML = '';
  });
  drawBoard();
  playerText.innerHTML = `${currentPlayer}'s turn`;
};

const stopPlay = () => {
  boxes.forEach((box, i) => {
    box.removeEventListener('click', boxClicked);
  });
}

const playerWon = () => {
  let winner = false;
  if (spaces[0] === currentPlayer) {
    if ((spaces[1] === currentPlayer && spaces[2] === currentPlayer)
    || (spaces[4] === currentPlayer && spaces[8] === currentPlayer)
    || (spaces[3] === currentPlayer && spaces[6] === currentPlayer)) {
      winner = true;
    }
  } else if ((spaces[1] === currentPlayer && spaces[4] === currentPlayer && spaces[7] === currentPlayer)
  || (spaces[2] === currentPlayer && spaces[4] === currentPlayer && spaces[6] === currentPlayer)
  || (spaces[2] === currentPlayer && spaces[5] === currentPlayer && spaces[8] === currentPlayer)
  || (spaces[3] === currentPlayer && spaces[4] === currentPlayer && spaces[5] === currentPlayer)
  || (spaces[6] === currentPlayer && spaces[7] === currentPlayer && spaces[8] === currentPlayer)) {
    winner = true;
  } else {
    winner = false;
  }
  if (winner) {
    playerText.innerHTML = `${currentPlayer} wins!`;
    stopPlay();
    if (currentPlayer === o) {
      scoreBoxO.innerHTML = parseInt(scoreBoxO.innerHTML,10)+1;
    } else {
      scoreBoxX.innerHTML = parseInt(scoreBoxX.innerHTML,10)+1;
    }
  }
  return winner;
};

const isADraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) {
      draw++;
    }
  });
  if (draw === 9) {
    stopPlay();
    playerText.innerHTML = `Draw`;
    return true;
  }
}

const boxClicked = (e) => {
  const clickedId = e.target.id;
  if (!spaces[clickedId]) {
    spaces[clickedId] = currentPlayer;
    e.target.innerHTML = currentPlayer;
    if (playerWon()) {
      playerText.innerHTML = `${currentPlayer} wins!`;
      return;
    } else if (isADraw()) {
      return;
    }
    currentPlayer = currentPlayer === o ? x : o;
    playerText.innerHTML = `${currentPlayer}'s turn`;
  }
};

const drawBoard = () => {
  if (boxes && clearBtn) {
    boxes.forEach((box, i) => {
      box.addEventListener('click', boxClicked);
      let borderStr = '';
      if (i < 3) {
        borderStr += 'border-bottom: 1px solid #854D42;';
      }
      if (i % 3 === 0) {
        borderStr += 'border-right: 1px solid #854D42;';
      }
      if (i % 3 === 2) {
        borderStr += 'border-left: 1px solid #854D42;';
      }
      if (i > 5) {
        borderStr += 'border-top: 1px solid #854D42;';
      }
      box.style = borderStr;
    });
    clearBtn.addEventListener('click', clear);
    playerText.innerHTML = `${currentPlayer}'s turn`;
  }
};

drawBoard();