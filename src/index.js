// 공통 변수
const startPage = document.querySelector('.start-page')

const winnerPage = document.querySelector('.winner-page')

const startPlayersEl = document.querySelector('.start-players')

const player1El = document.querySelector('.player1-name')

const player2El = document.querySelector('.player2-name')


// 사용자 이름 입력 값 함수
function player1(name){
  if(name === ''){return 'Player1';}else{
    return name;
  }
}

function player2(name){
  if(name === ''){return 'Player2';}else{
    return name;
  }
}

// 게임 로직

// 현재 바둑돌 색깔 - 흑돌일 시 1, 백돌일 시 2

let currentStone = 1

// 게임판 초기값
let boardState = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// 게임 상태
function drawBoard() {
  document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
      if (boardState[rowIndex][colIndex] === 1) {
        colEl.classList.add("black");
      } else {
        colEl.classList.remove("black");
      }
      if (boardState[rowIndex][colIndex] === 2) {
        colEl.classList.add("white");
      } else {
        colEl.classList.remove("white");
      }
    });
  });

// 승리 시 화면 변화
  if (omok(boardState) === 1) {
    document.querySelector('.winner').textContent = player1(startPlayersEl.player1.value)
    document.querySelector('.winner-page').classList.add('winner1-act')
  } else if(omok(boardState) === 2) {
    document.querySelector('.winner').textContent = player2(startPlayersEl.player2.value)
    document.querySelector('.winner-page').classList.add('winner2-act')
  }
}


// 승리 체크 로직

function omok(arr) {

  // 가로줄
  for (let i = 0; i < 15; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < 15; j++) {
      if (currentPlayer !== arr[i][j]) {
        currentPlayer = arr[i][j];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }

  // 세로줄
  for (let i = 0; i < 15; i++) {
    let currentPlayer;
    let count;
    for (let j = 0; j < 15; j++) {
      if (currentPlayer !== arr[j][i]) {
        currentPlayer = arr[j][i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }

  // 대각선 왼쪽 : 중앙을 가로지르는 줄
  {
    let currentPlayer;
    let count;
    for (let i = 0; i < 15; i++) {
      if (currentPlayer !== arr[i][i]) {
        currentPlayer = arr[i][i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 대각선 왼쪽 : 중앙을 중심으로 좌측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[i + j][j]) {
          currentPlayer = arr[i + j][j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 왼쪽 : 중앙을 중심으로 우측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j][i + j]) {
          currentPlayer = arr[j][i + j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 오른쪽 : 중앙을 가로지르는 줄
  {
    let currentPlayer;
    let count;
    for (let i = 0; i < 15; i++) {
      if (currentPlayer !== arr[i][14 - i]) {
        currentPlayer = arr[i][14 - i];
        count = 1;
      } else {
        count++;
      }
      if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
        return currentPlayer;
      }
    }
  }
  // 대각선 오른쪽 : 중앙을 중심으로 좌측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j][14 - j - i]) {
          currentPlayer = arr[j][14 - j - i];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  // 대각선 오른쪽: 중앙을 중심으로 우측 줄들 - 5개가 연속으로 놓일 수 있는 줄까지만 체크
  {
    let currentPlayer;
    let count;
    for (let i = 1; i < 12; i++) {
      for (let j = 0; j < 15 - i; j++) {
        if (currentPlayer !== arr[j + i][14 - j]) {
          currentPlayer = arr[j + i][14 - j];
          count = 1;
        } else {
          count++;
        }
        if ((currentPlayer === 1 || currentPlayer === 2) && count === 5) {
          return currentPlayer;
        }
      }
    }
  }
  return 0;
}

// 게임 진행 로직
document.querySelectorAll(".row").forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll(".col").forEach((colEl, colIndex) => {
    colEl.addEventListener("click", e => {
        if (!omok(boardState)) {
          // 놓여진 돌이 없을 때만 실행
          if (boardState[rowIndex][colIndex] === 0){
            boardState[rowIndex][colIndex] = currentStone;
            currentStone = boardState[rowIndex][colIndex] === 1 ? 2 : 1;
          }

          // 현재 턴 표시
          if (currentStone === 1){
            player1El.classList.add('current-turn')
            player2El.classList.remove('current-turn')
          } else if (currentStone === 2){
            player2El.classList.add('current-turn')
            player1El.classList.remove('current-turn')
          }

          drawBoard();
        }
    });
  });
});

// 시작하기 버튼 이벤트 리스너
document.querySelector('.start-btn').addEventListener('click', e=> {
  startPage.classList.add('start-act')
  player1El.classList.add('current-turn')
  player1El.textContent = player1(startPlayersEl.player1.value)
  player2El.textContent = player2(startPlayersEl.player2.value)
})

// 게임 종료 시 재시작 버튼 이벤트리스너
document.querySelector('.restart-btn').addEventListener('click', e=> {

  boardState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  currentStone = 1;
  // 게임이 초기화 될 때 플레이어 1의 턴으로 되돌아간다.
  document.querySelector(".player1").classList.add("turn");
  document.querySelector(".player2").classList.remove("turn");
  drawBoard();

  winnerPage.classList.remove('winner1-act')
  winnerPage.classList.remove('winner2-act')

  startPlayersEl.player1.value = ''
  startPlayersEl.player2.value = ''

  startPage.classList.remove('start-act');
})


// 리셋 버튼 이벤트리스너

document.querySelector(".reset-btn").addEventListener("click", e => {

  boardState = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  currentStone = 1;
  drawBoard();

  startPage.classList.add('start-act');
});

// 기본 화면
drawBoard();
