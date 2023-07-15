document.querySelector(".clipboard").addEventListener("click", () => {
  let range = document.createRange();
  document.querySelector(".tick").style.display = "block";
  range.selectNode(document.getElementById(".snippet"));
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.designMode = "on";
  window.getSelection().removeAllRanges(); // to deselect
});
