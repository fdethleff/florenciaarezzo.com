const { createApp } = Vue;

const landingHero = createApp({
  data() {
    return {
      isPlaying: false,
      devicePixelRatio: window.devicePixelRatio,
      styleObject: {
        position: "absolute",
        top: "0px",
        transform: "translateY(0px)",
        zIndex: 1,
      },
    };
  },
  methods: {
    playVideo() {
      let video = document.getElementById("header-video");
      if (this.isPlaying == false) {
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    },
    handleScroll() {
      let translationY = (-window.scrollY / devicePixelRatio) * 2;
      this.styleObject.transform = `translateY(${translationY}px)`;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
});

landingHero.mount("#landingHero");

const landingBody = createApp({
  data() {
    return {
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      styleObject: {
        position: "absolute",
        top: "0px",
        zIndex: -1,
        opacity: 0,
      },
    };
  },
  methods: {
    handleScroll() {
      console.log(window.scrollY);
      console.log(this.windowHeight);
      if (window.scrollY < this.windowHeight / devicePixelRatio) {
        this.styleObject.top = window.scrollY + "px";
      }
      this.styleObject.opacity =
        (window.scrollY / this.windowHeight) * devicePixelRatio;
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
