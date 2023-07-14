document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowUp":
      document.querySelector(".up").click();
      break;
    case "ArrowDown":
      document.querySelector(".down").click();
  }
});
