
// up arrow

let upArrow = document.getElementById('btn-back-to-top');
let downArrow = document.getElementById('btn-down-one-screen');

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
    upArrow.style.display = 'block';
    downArrow.style.display = 'none';
    down
  } else {
    upArrow.style.display = 'none';
    downArrow.style.display = 'block';
  }
}

upArrow.addEventListener('click', backToTop);
downArrow.addEventListener('click', downOneScreen);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function downOneScreen() {
  document.body.scrollTop = window.innerHeight + 1;
  document.documentElement.scrollTop = window.innerHeight + 1;
}

