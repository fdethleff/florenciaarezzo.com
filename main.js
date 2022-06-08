const { createApp } = Vue;

createApp({
  data() {
    return {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      translateY: "translateY(0)",
      heroVideo: "walking-animation.m4v",
      contentOpacity: 0,
    };
  },
  methods: {
    playVideo() {
      let video = document.getElementById("hero-video");
      if (this.isPlaying == false) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
    handleScroll() {
      if (window.scrollY > 100) {
        this.translateY = `translateY(-${this.windowHeight}px)`;
        this.contentOpacity = 1;
      } else {
        this.translateY = "translateY(0)";
        this.contentOpacity = 0;
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 768) {
        this.heroVideo = "walking-animation-mobile.mp4";
      } else {
        this.heroVideo = "walking-animation.m4v";
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    if (this.windowWidth < 768) {
      this.heroVideo = "walking-animation-mobile.mp4";
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  },
}).mount("#main");
