// variable
// let playing = false;
// let sec = 10;
// let count = 10;

// const el = {
//   board: document.querySelector(".board"),
//   control: document.querySelector(".control"),
//   timePanel: document.querySelector(".timePanel"),
//   count: document.querySelector(".count"),
//   alert: document.querySelector(".alert"),
//   result: document.querySelector(".result"),
// };

// const sounds = {
//   bgm: new Audio("./sound/bg.mp3"),
//   carrot: new Audio("./sound/carrot_pull.mp3"),
//   bug: new Audio("./sound/bug_pull.mp3"),
//   alert: new Audio("./sound/alert.wav"),
//   win: new Audio("./sound/game_win.mp3"),
// };

// function randomCoords(elSize) {
//   const size = {
//     horizontal: window.innerWidth,
//     vertical: window.innerHeight,
//   };
//   const halfSize = size.vertical / 2;

//   return {
//     x: Math.floor(Math.random() * (size.horizontal - elSize)),
//     y: Math.floor(Math.random() * (halfSize - elSize) + halfSize),
//   };
// }

// function generateItem(type) {
//   const size = type === "carrot" ? 80 : 50;
//   const coords = randomCoords(size);
//   const el = document.createElement("div");
//   el.setAttribute("class", `item ${type}`);
//   el.setAttribute("data-type", `${type}`);
//   el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1)`;
//   el.addEventListener("click", (event) => {
//     pickItem(event.target);
//   });
//   el.addEventListener("mouseenter", () => {
//     el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1.3)`;
//   });
//   el.addEventListener("mouseout", () => {
//     el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1)`;
//   });

//   return el;
// }

// function pickItem(item) {
//   const { type } = item.dataset;

//   item.remove();

//   if (type === "carrot") {
//     count = count - 1;
//     el.count.innerHTML = count;
//   } else {
//     stopGame();
//   }
// }

// function itemBatch() {
//   for (let i = 0; i < count; i++) {
//     const carrot = generateItem("carrot");
//     const bug = generateItem("bug");

//     el.board.appendChild(carrot);
//     el.board.appendChild(bug);
//   }
// }

// function countDown() {
//   return setInterval(function () {
//     if (playing) {
//       if (sec < 0) {
//         stopGame();
//       } else {
//         el.timePanel.innerHTML = `${sec > 9 ? sec : "0" + sec}`;
//         sec--;
//       }
//     }
//   }, 1000);
// }

// function startGame() {
//   playing = true;
//   el.control.innerHTML = "정지";
//   el.count.innerHTML = count;
//   countDown();
//   itemBatch();
// }

// function stopGame() {
//   playing = false;
//   el.control.innerHTML = "시작";
//   clearInterval(countDown);
// }

// function game() {
//   !playing ? startGame() : stopGame();
// }

// function resetGame() {
//   playing = false;
//   sec = 10;
//   count = 10;
//   el.control.innerHTML = "시작";
//   el.board.innerHTML = "";
//   el.timePanel.innerHTML = "-";
// }

// function gameResult() {
//   if (count === 0) {
//     console.log("you win");
//   } else {
//     console.log("you lose");
//   }
// }

// window.addEventListener("DOMContentLoaded", () => {
//   el.control.addEventListener("click", game);
// });

let time = 10;
let count = 10;
let playing = false;
let isPause = false;

const el = {
  board: document.querySelector(".board"),
  control: document.querySelector(".control"),
  timer: document.querySelector(".timer"),
  count: document.querySelector(".count"),
  alert: document.querySelector(".alert"),
  result: document.querySelector(".result"),
};
const sounds = {
  bgm: new Audio("./sound/bg.mp3"),
  carrot: new Audio("./sound/carrot_pull.mp3"),
  bug: new Audio("./sound/bug_pull.mp3"),
  alert: new Audio("./sound/alert.wav"),
  win: new Audio("./sound/game_win.mp3"),
};
const MESSAGE = {
  pause: "REPLAY?",
  win: "YOU WIN",
  lose: "YOU LOSE",
};

/**
 *  승리 조건 / text: YOU WIN
 *      - 당근 클릭으로 모든 카운트 차감 시
 *
 *  패배 조건 / text: YOU LOSE
 *      - 벌레 클릭 시
 *      - 시간 내 카운트 차감 못했을 시
 *  정지 조건 / text: REPLAY
 *      - 정지 버튼 눌렀을 시
 */

function timerDraw() {
  console.log("timerDraw");
  if (playing && !isPause) {
    el.timer.innerHTML = time;
    time--;
    if (time < 0) {
      playing = false;
      isPause = false;
    }
  }
}

function clickItems(target) {
  const { type } = target.dataset;
  if (type === "carrot") {
    mediaControl("carrot", "top");
    mediaControl("carrot", "play");
  } else {
    mediaControl("bug", "top");
    mediaControl("bug", "play");
  }
}

function generateItem(type) {
  function randomCoords(elSize) {
    const size = {
      horizontal: window.innerWidth,
      vertical: window.innerHeight,
    };
    const halfSize = size.vertical / 2;

    return {
      x: Math.floor(Math.random() * (size.horizontal - elSize)),
      y: Math.floor(Math.random() * (halfSize - elSize) + halfSize),
    };
  }

  const size = type === "carrot" ? 80 : 50;
  const coords = randomCoords(size);
  const el = document.createElement("div");
  el.setAttribute("class", `item ${type}`);
  el.setAttribute("data-type", `${type}`);
  el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1)`;
  el.addEventListener("click", (event) => {
    clickItems(event.target);
  });
  el.addEventListener("mouseenter", () => {
    el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1.3)`;
  });
  el.addEventListener("mouseout", () => {
    el.style.transform = `translate(${coords.x}px, ${coords.y}px) scale(1)`;
  });

  return el;
}

function randomViewItems() {
  for (let i = 0; i < count; i++) {
    const carrot = generateItem("carrot");
    const bug = generateItem("bug");

    el.board.appendChild(carrot);
    el.board.appendChild(bug);
  }
}

/**
 *  타이머 시작, 요소 랜덤배치, 요소 클릭 이벤트, 사운드 재생
 */

function mediaControl(name, control) {
  if (control === "stop") {
    sounds[name].pause();
    sounds[name].currentTime = 0;
  } else {
    sounds[name].play();
  }
}

function alertControl(type) {
  el.alert.classList.remove("on");
  el.alert.classList.add("on");
  console.log("type", type);
}

function resetGame() {
  time = 10;
  count = 10;
  playing = false;
  isPause = false;
}

function stopGame() {
  playing = false;
  mediaControl("bgm", "stop");
  clearInterval(timer);

  if (timer > 0 && count > 0) {
    alertControl("pause");
    el.result.textContent = MESSAGE.pause;
  } else {
    alertControl("lose");
    el.result.textContent = MESSAGE.lose;
  }
}

function startGame() {
  playing = true;
  mediaControl("bgm", "play");
  randomViewItems();
  timer = setInterval(timerDraw, 1000);
}

function changeButton(el, is) {
  // is: true = 정지상태(플레이버튼) / is: false = 플레이상태(정지버튼)
  if (is) {
    el.classList.remove("fa-play");
    el.classList.add("fa-stop");
  } else {
    el.classList.remove("fa-stop");
    el.classList.add("fa-play");
  }
}

function game(event) {
  const button = event.currentTarget.children[0];
  const isStop = button.classList.contains("fa-play");

  changeButton(button, isStop);

  if (isStop) {
    startGame();
  } else {
    stopGame();
  }
}

el.control.addEventListener("click", (event) => {
  game(event);
});
