const { createApp } = Vue;

const landingHero = createApp({
  data() {
    return {
      isPlaying: false,
      styleObject: {
        position: "absolute",
        height: "100%",
        width: "100%",
        transform: "translateY(0px)",
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
      this.styleObject.transform = `translateY(${-window.scrollY}px)`;
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
      if (window.scrollY < this.windowHeight) {
        this.styleObject.top = window.scrollY + "px";
      }
      this.styleObject.opacity = window.scrollY / this.windowHeight;
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
