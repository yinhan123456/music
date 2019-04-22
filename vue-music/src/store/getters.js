import state from "./state"

export default {
  currentSong(state) {
    var playMode = state.playMode;
    var songlist = state.songlist;
    var currentSongIndex = state.currentSongIndex;
    var shuffleArr = state.shuffleArr;
    if (playMode === 1) {
      return songlist[shuffleArr[currentSongIndex]];
    } else {
      return songlist[currentSongIndex];
    }
  }
}
