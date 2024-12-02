document.addEventListener('DOMContentLoaded', function() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    let isPlaying = false;

    // Set volume to 50%
    backgroundMusic.volume = 0.5;

    // Function to toggle music
    function toggleMusic() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            backgroundMusic.play();
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    }

    // Add click event listener to music toggle button
    musicToggle.addEventListener('click', toggleMusic);
});
