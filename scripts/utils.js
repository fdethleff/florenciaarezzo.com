let upArrow = document.getElementById("btn-back-to-top");
let downArrow = document.getElementById("btn-down-one-screen");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > window.innerHeight ||
    document.documentElement.scrollTop > window.innerHeight
  ) {
    if (upArrow) {
      upArrow.style.display = "block";
    }
    if (downArrow) {
      downArrow.style.display = "none";
    }
  } else {
    if (upArrow) {
      upArrow.style.display = "none";
    }
    if (downArrow) {
      downArrow.style.display = "block";
    }
  }
}

if (upArrow) {
  upArrow.addEventListener("click", backToTop);
}

if (downArrow) {
  downArrow.addEventListener("click", downOneScreen);
}

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function downOneScreen() {
  document.body.scrollTop = window.innerHeight + 1;
  document.documentElement.scrollTop = window.innerHeight + 1;
}
