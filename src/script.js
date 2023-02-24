const play = () => {
  var audio = new Audio('audio/unsorted/tree.mp3');
  audio.play();
}

// start
window.onload = () => {
  document.getElementById('play')
    .addEventListener('click', play);
}
