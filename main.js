window.addEventListener("scroll", function () {
  let hero = document.getElementById("hero");
  let blackout = document.getElementById("blackout");
  let content = document.getElementById("content");
  if (window.scrollY > 50) {
    hero.style.transform = `translateY(-${window.innerHeight}px)`;
    blackout.style.opacity = 0;
  } else {
    hero.style.transform = "translateY(0)";
    blackout.style.opacity = 1;
  }
  if (window.scrollY > 200) {
    content.style.position = "absolute";
  } else {
    content.style.position = "fixed";
  }
});

window.onload = function () {
  let heroVideoDirectory = "assets/videos/";
  let heroVideo = document.getElementById("hero-video");
  let blackout = document.getElementById("blackout");

  blackout.style.height = `${window.innerHeight * 2.1}px`;

  if (window.innerWidth < 768) {
    heroVideo.setAttribute(
      "src",
      heroVideoDirectory + "walking-animation-mobile.mp4"
    );
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "walking-animation.m4v");
  }
};

window.addEventListener("resize", function () {
  let heroVideo = document.getElementById("hero-video");
  if (window.innerWidth < 768) {
    heroVideo.setAttribute(
      "src",
      heroVideoDirectory + "walking-animation-mobile.mp4"
    );
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "walking-animation.m4v");
  }
});

document.getElementById("clickMe").addEventListener("click", function () {
  let heroVideo = document.getElementById("hero-video");
  if (heroVideo.paused) {
    heroVideo.play();
  } else {
    heroVideo.pause();
  }
});
