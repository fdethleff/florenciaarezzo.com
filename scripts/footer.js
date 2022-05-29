const footer = Vue.createApp({
  data() {
    return {
      windowWidth: window.innerWidth,
      isMobileViewport: false,
    };
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 768) {
        this.isMobileViewport = true;
      } else {
        this.isMobileViewport = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    if (this.windowWidth < 768) {
      this.isMobileViewport = true;
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
});

footer.mount("#footer");
