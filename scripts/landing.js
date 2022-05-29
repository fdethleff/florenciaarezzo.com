const landing = Vue.createApp({
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
    };
  },
  methods: {
    handleScroll() {
      if (window.scrollY < this.windowHeight / 4) {
        this.styleObject.top = this.windowHeight / 2 + "px";
      }
      this.styleObject.opacity = (window.scrollY / this.windowHeight) * 3;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
});

landing.mount("#landing");
