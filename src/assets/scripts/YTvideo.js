$(window).on('load', () => {
  const video = document.querySelector('[data-video]');

  if (video) {
    let videoId = $('#player').attr('data-video-id');

    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        videoId: videoId,
      });
    }
  
    onYouTubeIframeAPIReady();
  
    const button = video.querySelector('[data-video-button]')
  
    button.onclick = function() {
      player.playVideo()
      video.classList.add('active')
    }
  }
})
