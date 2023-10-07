// JavaScript
const audio = document.getElementById("audio");
const playPauseButton = document.getElementById("play-pause");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const currentTimeSpan = document.getElementById("current-time");
const durationSpan = document.getElementById("duration");
const seekBar = document.getElementById("seek-bar");
const volumeBar = document.getElementById("volume-bar");
const muteButton = document.getElementById("mute");
const playlistList = document.getElementById("playlist-list").getElementsByTagName("li");

let currentSongIndex = 0;
let isDraggingSeekBar = false;

// Lista de canciones
const playlist = [
    "cancion1.mp3",
    "cancion2.mp3",
    "cancion3.mp3"
];

// Función para actualizar la barra de progreso
function updateSeekBar() {
    if (!isDraggingSeekBar) {
        seekBar.value = (audio.currentTime / audio.duration) * 100;
    }

    const currentTime = formatTime(audio.currentTime);
    currentTimeSpan.textContent = currentTime;
}

// Función para actualizar la duración total
function updateDuration() {
    const duration = formatTime(audio.duration);
    durationSpan.textContent = duration;
}

// Función para reproducir o pausar la canción
function togglePlayPause() {
  if (audio.paused) {
      audio.play();
      playPauseButton.textContent = "Pause";
  } else {
      audio.pause();
      playPauseButton.textContent = "Play";
  }
}

// Event listener para el botón de play/pause
playPauseButton.addEventListener("click", togglePlayPause);

// Event listener para controlar el estado de reproducción
audio.addEventListener("play", function() {
    playPauseButton.textContent = "Pause";
});

audio.addEventListener("pause", function() {
    playPauseButton.textContent = "Play";
});
// Función para reproducir la canción anterior
function playPrevSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        loadAndPlaySong();
    }
}

// Función para reproducir la siguiente canción
function playNextSong() {
    if (currentSongIndex < playlist.length - 1) {
        currentSongIndex++;
        loadAndPlaySong();
    }
}

// Función para cambiar el volumen
function changeVolume() {
    audio.volume = volumeBar.value;
}

// Función para mutear/desmutear
function toggleMute() {
    audio.muted = !audio.muted;
    updateMuteButton();
}

// Función para actualizar el botón de mute
function updateMuteButton() {
    if (audio.muted) {
        muteButton.innerHTML = "&#128263;";
    } else {
        muteButton.innerHTML = "&#128266;";
    }
}

// Función para cargar y reproducir la canción actual
function loadAndPlaySong() {
    audio.src = playlist[currentSongIndex];
    audio.load();
    audio.play();
    updatePlayPauseButtonState();
}

// Función para formatear el tiempo en minutos y segundos
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Actualizar la barra de progreso y la duración cuando se carga la metainformación del audio
audio.addEventListener("loadedmetadata", function () {
    updateDuration();
});

// Actualizar la barra de progreso mientras se reproduce la canción
audio.addEventListener("timeupdate", function () {
    updateSeekBar();
});

// Cambiar la posición de reproducción cuando se cambia la posición de la barra de progreso
seekBar.addEventListener("input", function () {
    isDraggingSeekBar = true;
    const newPosition = (seekBar.value / 100) * audio.duration;
    audio.currentTime = newPosition;
});

// Terminar de arrastrar la barra de progreso
seekBar.addEventListener("mouseup", function () {
    isDraggingSeekBar = false;
});

// Cambiar el volumen cuando se cambia la posición de la barra de volumen
volumeBar.addEventListener("input", function () {
    changeVolume();
});

// Cambiar el estado de mutear/desmutear al hacer clic en el botón de mute
muteButton.addEventListener("click", function () {
    toggleMute();
});

// Reproducir la canción anterior al hacer clic en el botón "Anterior"
prevSongButton.addEventListener("click", function () {
    playPrevSong();
});

// Reproducir la siguiente canción al hacer clic en el botón "Siguiente"
nextSongButton.addEventListener("click", function () {
    playNextSong();
});

// Reproducir una canción de la lista de reproducción al hacer clic en ella
for (let i = 0; i < playlistList.length; i++) {
    playlistList[i].addEventListener("click", function () {
        currentSongIndex = i;
        loadAndPlaySong();
    });
}

// Iniciar la primera canción al cargar la página
loadAndPlaySong();
