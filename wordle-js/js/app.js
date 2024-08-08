window.addEventListener("DOMContentLoaded", () => {
  const entryBlock = document.querySelector(".wordle-block");
  let entryTag = ``;
  let areaTag = ``;

  for (let i = 0; i < 6; i++) {
    entryTag += `<div class="wordle-area" data-wordle-attempt=${i}>`;
    for (let k = 0; k < 5; k++) {
      entryTag += `<div class="wordle-each" data-wordle-each=${k}></div>`;
    }
    entryTag += `</div>`;
  }
  entryBlock.innerHTML = entryTag;
});
