const { createApp } = Vue

createApp({

    data() {
        return {
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            translateY: 'translateY(0)',
            letterSpacing: '2rem',
            heroVideo: "walking-animation.m4v",
        }
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
            if (window.scrollY > 50) {
                this.translateY = `translateY(-${this.windowHeight}px)`;
            } else {
                this.translateY = 'translateY(0)';
            }
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
            console.log(this.windowWidth);
            if (this.windowWidth < 768) {
                this.letterSpacing = '1rem';
                this.heroVideo = "walking-animation-mobile.mp4";
            } else {
                this.letterSpacing = '2rem';
                this.heroVideo = "walking-animation.m4v";
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleResize)
        if (this.windowWidth < 768) {
            this.letterSpacing = '1rem';
            this.heroVideo = "walking-animation-mobile.mp4";
        }
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize', this.handleResize)
    }

}).mount('#main')