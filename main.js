$(document).ready(function () {
  var bannerVideo = document.getElementById("banner-video");
  $("button").click(() => {
    bannerVideo.play();
    $("button").html("");
  });
});
