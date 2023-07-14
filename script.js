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
$(document).on("dragover", function (e) {
  let dt = e.originalEvent.dataTransfer;
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
$(document).on("dragleave", function (e) {
  dragTimer = window.setTimeout(function () {
    document
      .querySelector(".image-upload-wrap")
      .classList.remove("image-dropping");
  }, 25);
});

let adjuster = document.querySelectorAll(".adjuster");

function adjustIcons(iconHeight) {
  let el = document.querySelector("li");
  let fontSizeOfList = parseFloat(
    window.getComputedStyle(el, null).getPropertyValue("font-size")
  );
  adjuster.forEach(
    (icon) => (icon.style.top = `${-iconHeight / 2 + fontSizeOfList / 4}px`)
  );
  console.log(`${-iconHeight / 2 + fontSizeOfList / 4}px`);
  codeOutput(`${-iconHeight / 2 + fontSizeOfList / 4}px`);
}

let up = document.querySelector(".up");
let down = document.querySelector(".down");
let fontSizeOfList = document.querySelector(".font-size");

up.addEventListener("click", () => {
  adjuster.forEach(
    (icon) => (icon.style.top = parseInt(icon.style.top) - 1 + "px")
  );
  codeOutput(adjuster[0].style.top);
});
down.addEventListener("click", () => {
  adjuster.forEach(
    (icon) => (icon.style.top = parseInt(icon.style.top) + 1 + "px")
  );
  codeOutput(adjuster[0].style.top);
});

function codeOutput(topValue) {
  document
    .querySelector(".codeYouNeed")
    .setAttribute("style", `top:${topValue}; position:relative;`);
}
