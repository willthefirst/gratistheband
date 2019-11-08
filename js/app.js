$(document).foundation();

alert('sss');

$('.welcome_ausdsdio').click(function() {
  if (this.paused == false) {
      this.pause();
      alert('music paused');
  } else {
      this.play();
      alert('music playing');
  }
});
