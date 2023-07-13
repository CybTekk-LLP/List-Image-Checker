function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#list-image").attr("src", e.target.result);
      $("li").css({ "list-style-image": `url(${e.target.result})` });
      $(".file-upload-image").attr("src", e.target.result);
      document
        .querySelector(".image-upload-wrap")
        .classList.remove("image-dropping");
    };
    reader.readAsDataURL(input.files[0]);
  }
}

var dragTimer;
$(document).on("dragover", function (e) {
  var dt = e.originalEvent.dataTransfer;
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
