window.addEventListener("DOMContentLoaded", () => {
  let resultArray = [];
  let res;
  const buttons = document.querySelectorAll(".button button");

  function buttonOnclick() {
    if (resultArray.length === 0 && this.dataset.type === "num") {
      resultArray.push(this.textContent);
    } else if (resultArray.length === 1) {
      if (this.dataset.type === "num") {
        resultArray[0] = this.textContent;
      } else if (this.dataset.type === "cal") {
        resultArray.push(this.textContent);
      }
    } else if (resultArray.length === 2) {
      if (this.dataset.type === "num") {
        resultArray.push(this.textContent);
      }
    } else if (resultArray.length === 3) {
      if (this.dataset.type === "submit") {
        switch (this.textContent) {
          case "AC":
            resultArray = [];
            res = undefined;
            break;
          case "=":
            switch (resultArray[1]) {
              case "+":
                res = parseInt(resultArray[0]) + parseInt(resultArray[2]);
                resultArray = [];
                break;
              case "-":
                res = parseInt(resultArray[0]) - parseInt(resultArray[2]);
                resultArray = [];
                break;
              case "X":
                res = parseInt(resultArray[0]) * parseInt(resultArray[2]);
                resultArray = [];
                break;
              case "/":
                res = parseInt(resultArray[0]) / parseInt(resultArray[2]);
                resultArray = [];
                break;
            }
        }
      }
    }
    if (res !== "undefined" || resultArray.length !== 0) {
      document.querySelector("#cal-res").innerText = res;
    } else if (res === "undefined") {
      document.querySelector("#cal-res").innerText = "";
    }
  }

  buttons.forEach((el, idx) => {
    el.addEventListener("click", buttonOnclick);
  });
});
