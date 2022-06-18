setTimeout(function () {
  document.getElementById("loader").classList.add("hidden");
}, 2000);

window.onload = function () {
  let heroVideoDirectory = "assets/videos/";
  let heroVideo = document.getElementById("hero-video");
  let blackout = document.getElementById("blackout");

  blackout.style.height = `${window.innerHeight * 2.33}px`;

  if (window.innerWidth < 768) {
    heroVideo.setAttribute(
      "src",
      heroVideoDirectory + "walking-animation-mobile.mp4"
    );
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "walking-animation.m4v");
  }
};

window.addEventListener("scroll", function () {
  let hero = document.getElementById("hero");
  let blackout = document.getElementById("blackout");
  let content = document.getElementById("content");
  if (window.scrollY > 10) {
    hero.style.transform = `translateY(-${window.innerHeight}px)`;
    blackout.style.opacity = 0;
    let dynamicTopValue = Math.min(window.innerHeight / 5, window.scrollY);
    content.style.top = `${dynamicTopValue}px`;
  } else {
    hero.style.transform = "translateY(0)";
    blackout.style.opacity = 1;
  }
});

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

document.getElementById("clickMe").addEventListener("click", function () {
  let heroVideo = document.getElementById("hero-video");
  if (heroVideo.paused) {
    heroVideo.play();
  } else {
    heroVideo.pause();
  }
});

document
  .getElementById("projectsHeaderLink")
  .addEventListener("click", function () {
    hero.style.transform = `translateY(-${window.innerHeight}px)`;
    blackout.style.opacity = 0;
    let dynamicTopValue = Math.min(window.innerHeight / 5, window.scrollY);
    content.style.top = `${dynamicTopValue}px`;
  });
