window.addEventListener("DOMContentLoaded", () => {
  const entryBlock = document.querySelector(".wordle-block");
  const keyboards = document.querySelectorAll(".wordle-key > div > div");
  let entryTag = ``;

  let each = 0;
  let attempt = 0;
  const answer = "apple";
  let isModal = false;
  let timer;

  for (let i = 0; i < 6; i++) {
    entryTag += `<div class="wordle-area" data-attempt=${i}>`;
    for (let k = 0; k < 5; k++) {
      entryTag += `<div class="wordle-each" data-each=${k}></div>`;
    }
    entryTag += `</div>`;
  }
  entryBlock.innerHTML = entryTag;

  const Next = () => {
    attempt += 1;
    each = 0;
    if (attempt === 6) {
      return gameOver();
    }
  };

  const Timer = () => {
    const currentTime = new Date();
    timer = setInterval(() => {
      const raiseTime = new Date();
      const minusTime = new Date(currentTime - raiseTime);
      document.querySelector(".timer-wrap").innerText = `${minusTime
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${minusTime
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  };

  const modalDisplay = () => {
    isModal = true;
    const modalContainer = document.querySelector(".wordle-msg");
    const modalCon = modalContainer.querySelector(".msg-con");
    const button = document.querySelector(".buttons button");

    button.addEventListener("click", () => {
      isModal = false;
      console.log(isModal);
      document.body.classList.remove("dimmed");
      modalContainer.style.display = "none";
    });

    if (isModal) {
      document.body.classList.add("dimmed");
      modalContainer.style.display = "flex";
      modalCon.innerText = "게임이 종료되었습니다.";
    }
  };

  const gameOver = () => {
    window.removeEventListener("keydown", keyInput);
    modalDisplay();
    clearInterval(timer);
  };

  const checkAnswer = () => {
    let correct = 0;
    // 정답확인하기
    for (let i = 0; i < 5; i++) {
      const eachInput = document.querySelector(
        `.wordle-area[data-attempt='${attempt}'] .wordle-each[data-each='${i}']`
      );
      const blocks = eachInput.innerText.toLowerCase();
      if (blocks === answer[i]) {
        eachInput.style.background = "#6aaa64";
        correct += 1;
        keyboards.forEach((el, idx) => {
          if (el.dataset.keyboard === blocks) {
            el.style.backgroundColor = "#6aaa64";
          }
        });
      } else if (answer.includes(blocks)) {
        eachInput.style.background = "#c9b458";
        keyboards.forEach((eel, idxx) => {});
        keyboards.forEach((el, idx) => {
          if (el.dataset.keyboard === blocks) {
            el.style.backgroundColor = "#c9b458";
          }
        });
      } else {
        eachInput.style.background = "#333";
        eachInput.style.color = "#fff";
      }
    }
    if (correct === 5) gameOver();
    else Next();
  };

  const Backspaces = () => {
    if (each > 0) {
      const prevBlock = document.querySelector(
        `.wordle-area[data-attempt='${attempt}'] .wordle-each[data-each='${
          each - 1
        }']`
      );
      prevBlock.innerText = "";
      prevBlock.style = "";
    }

    if (each !== 0) each -= 1;
  };

  const keyInput = (e) => {
    const eachTag = document.querySelector(
      `.wordle-area[data-attempt='${attempt}'] .wordle-each[data-each='${each}']`
    );
    if (e.key === "Backspace") Backspaces(eachTag);
    else if (each === 5) {
      if (e.keyCode === 13) {
        checkAnswer();
      } else {
        return;
      }
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      eachTag.innerText = e.key.toUpperCase();
      eachTag.style.border = "3px solid rgb(153,153,153)";
      each += 1;
    }
  };

  function keyboardClick() {}

  Timer();

  window.addEventListener("keydown", keyInput);
  keyboards.forEach((eeel) => {
    eeel.addEventListener("click", keyboardClick);
  });
});
