window.onload = function () {
  let heroVideoDirectory = "assets/videos/";
  let heroVideo = document.getElementById("hero-video");

  if (window.innerWidth < 768) {
    heroVideo.setAttribute("src", heroVideoDirectory + "three_amigos_sm.mp4");
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "three_amigos_lg.mp4");
  }

  const el = document.getElementById("loading-screen");
  el.classList.add("hidden");
  el.classList.remove("visible");
};

window.addEventListener("resize", function () {
  let heroVideo = document.getElementById("hero-video");
  let heroVideoDirectory = "assets/videos/";
  if (window.innerWidth < 768) {
    heroVideo.setAttribute("src", heroVideoDirectory + "three_amigos_sm.mp4");
  } else {
    heroVideo.setAttribute("src", heroVideoDirectory + "three_amigos_lg.mp4");
  }
});

let projectsButton = document.getElementById("projectsHeaderLink");
projectsButton.addEventListener("click", function () {
  window.scrollBy(0, window.innerHeight);
});

document.getElementById("audio-button").addEventListener("click", function () {
  // toggle audio on and off
  let video = document.getElementById("hero-video");
  video.muted = !video.muted;

  // if not muted switch to class audio-button-off
  let audio_button = document.getElementById("audio-button");
  if (video.muted) {
    audio_button.classList.remove("audio-button-on");
    audio_button.classList.add("audio-button-off");
    audio_button.setAttribute("src", "assets/icons/sound-off-icon.svg");
  }

  // if muted switch to class audio-button-on
  else {
    audio_button.classList.remove("audio-button-off");
    audio_button.classList.add("audio-button-on");
    audio_button.setAttribute("src", "assets/icons/sound-full-icon.svg");
  }
});
