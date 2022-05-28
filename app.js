const { createApp } = Vue;

// --------------------------------------- //

const landingHero = createApp({
  data() {
    return {
      heroVideo: "walking-animation.m4v",
      isPlaying: false,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      styleObject: {
        position: "fixed",
        height: "100%",
        width: "100%",
        transform: "translateY(0px)",
        transition: "transform 1s ease-in-out",
      },
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
      if (window.scrollY > this.windowHeight / 4) {
        this.styleObject.transform = `translateY(${-this.windowHeight}px)`;
      } else if (window.scrollY < this.windowHeight / 4) {
        this.styleObject.transform = `translateY(0px)`;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.windowWidth < 768) {
      console.log("mobile");
      this.heroVideo = "walking-animation-mobile.mp4";
    }
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
});

landingHero.mount("#landingHero");

// --------------------------------------- //

const landingBody = createApp({
  data() {
    return {
      windowHeight: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
      styleObject: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: -1,
        opacity: 0,
      },
      footerHeight: window.innerHeight,
    };
  },
  methods: {
    handleScroll() {
      if (window.scrollY < this.windowHeight / 4) {
        this.styleObject.top = this.windowHeight / 4 + "px";
      }
      this.styleObject.opacity = (window.scrollY / this.windowHeight) * 3;
      this.footerHeight = 80;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
});

landingBody.mount("#landingBody");
