window.onload = function () {
  let heroVideoDirectory = "assets/videos/";
  let heroVideo = document.getElementById("hero-video");

  if (window.innerWidth < 768) {
    heroVideo.setAttribute(
      "src",
      heroVideoDirectory + "walking-animation-mobile.mp4"
    );
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "walking-animation.mp4");
  }

  const el = document.getElementById("loading-screen");
  el.classList.add("hidden");
  el.classList.remove("visible");
};

window.addEventListener("resize", function () {
  let heroVideo = document.getElementById("hero-video");
  let heroVideoDirectory = "assets/videos/";
  if (window.innerWidth < 768) {
    heroVideo.setAttribute(
      "src",
      heroVideoDirectory + "walking-animation-mobile.mp4"
    );
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "walking-animation.m4v");
  }
});

let projectsButton = document.getElementById("projectsHeaderLink");
projectsButton.addEventListener("click", function () {
  window.scrollBy(0, window.innerHeight);
});
