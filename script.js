function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      let listIcon = e.target.result;
      let image = new Image();
      image.src = listIcon;
      image.onload = function () {
        adjustIcons(this.height);
      };
      document.getElementById("list-image").src = listIcon;
      document.getElementById(
        "myList"
      ).style.listStyleImage = `url(${e.target.result})`;
      document
        .querySelector(".image-upload-wrap")
        .classList.remove("image-dropping");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

let dragTimer;
document.addEventListener("dragstart", function (e) {
  e.dataTransfer.setData("image", e.target.id);
});

document.addEventListener("dragover", function (e) {
  e.preventDefault();
  let dt = e.dataTransfer;
  if (
    dt.types &&
    (dt.types.indexOf
      ? dt.types.indexOf("Files") != -1
      : dt.types.contains("Files"))
  ) {
    document
      .querySelector(".image-upload-wrap")
      .classList.add("image-dropping");
    window.clearTimeout(dragTimer);
  }
});

document.addEventListener("dragleave", function (e) {
  e.preventDefault();
  dragTimer = window.setTimeout(function () {
    document
      .querySelector(".image-upload-wrap")
      .classList.remove("image-dropping");
  }, 25);
});
let adjuster = document.querySelectorAll(".adjuster");
let fontSizeOfList;
let up = document.querySelector(".up");
let down = document.querySelector(".down");
let iconImage = document.getElementById("list-image");
let algorithm = document.querySelector(".algorithm");
let count = 0;
let fontSizeInput = document.getElementById("font-size");

function adjustIcons(iconHeight) {
  let el = document.querySelector("li");
  fontSizeOfList =
    fontSizeInput.value ||
    parseFloat(window.getComputedStyle(el, null).getPropertyValue("font-size"));
  adjuster.forEach(
    (icon) => (icon.style.top = `${-iconHeight / 2 + fontSizeOfList / 4}px`)
  );
  // console.log(`${-iconHeight / 2 + fontSizeOfList / 4}px`);
  codeOutput(
    `${-iconHeight / 2 + fontSizeOfList / 4}`,
    iconHeight,
    fontSizeOfList,
    0
  );
}

up.addEventListener("click", () => {
  adjuster.forEach(
    (icon) => (icon.style.top = parseInt(icon.style.top) - 1 + "px")
  );
  count -= 1;
  codeOutput(
    parseInt(adjuster[0].style.top),
    iconImage.height,
    fontSizeOfList,
    count
  );
});
down.addEventListener("click", () => {
  adjuster.forEach(
    (icon) => (icon.style.top = parseInt(icon.style.top) + 1 + "px")
  );
  count += 1;
  codeOutput(
    parseInt(adjuster[0].style.top),
    iconImage.height,
    fontSizeOfList,
    count
  );
});
fontSizeInput.addEventListener("input", () => {
  fontSizeOfList = fontSizeInput.value || "16";
  adjuster.forEach((icon) => (icon.style.fontSize = fontSizeOfList + "px"));
  adjustIcons(iconImage.height);
});

function codeOutput(topValue, iconHeight, fontSizeOfList = 16, count) {
  console.log(
    `The algorithm is: ${fontSizeOfList}/4 [fontsize/4] - ${iconHeight}/2 [listicon/2] + (${count}) [±error] = ${topValue}px`
  );
  algorithm.textContent = `The algorithm is: ${fontSizeOfList}/4 [fontsize/4] - ${iconHeight}/2 [listicon/2] + (${count}) [±error] = ${topValue}px`;
  document.querySelectorAll(
    ".color3"
  )[2].textContent = `top:${topValue}px; position:relative`;
}
