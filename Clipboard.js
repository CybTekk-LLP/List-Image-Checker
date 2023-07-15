document.querySelector(".clipboard").addEventListener("click", () => {
  document.querySelector(".tick").style.display = "block";
  let copyText = `<li class="yourIconOnLeft"><span class="codeYouNeed" style="${
    document.querySelectorAll(".color3")[2].textContent
  }">${document.querySelector(".algorithm").textContent}</span></li>`;
  navigator.clipboard.writeText(copyText);
  document.querySelector(".clipboard").classList.add("clipboard2");
  setTimeout(() => {
    document.querySelector(".clipboard").classList.remove("clipboard2");
  }, 3000);
});
