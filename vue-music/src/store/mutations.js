import state from "./state"

export default {
  playerShowToggle(state) {
    state.playerShow = true;
  },
  playerMaxToggle(state) {
    state.playerMax = !state.playerMax;
  },
  play(state) {
    state.playing = true;
  },
  pause(state) {
    state.playing = false;
  },
  loadSonglist(state, songlist) {
    state.songlist = songlist;
    state.currentSongIndex = 0;
    state.playing = true;
  },
  addSong(state, song) {
    var songlist = state.songlist;
    if (songlist.length === 0) state.songlist.push(song);
    else {
      var a = state.songlist.some(function (val, index) {
        if (val == song) {
          state.currentSongIndex = index;
          return true;
        }
      });
      if (!a) {
        state.songlist.splice(state.currentSongIndex + 1, 0, song);
        state.currentSongIndex++;
      }
    }
  },
  delSong(state, index) {
    var currentIndex = state.currentSongIndex;
    var len = state.songlist.length;
    state.songlist.splice(index, 1);
    if (index < currentIndex) state.currentSongIndex--;
    if(index === len-1) state.currentSongIndex = 0;
  },
  nextSong(state) {
    var len = state.songlist.length;
    if (state.currentSongIndex === len -1) state.currentSongIndex = 0;
    else state.currentSongIndex++;
  },
  prevSong(state) {
    var len = state.songlist.length;
    if (state.currentSongIndex === 0) state.currentSongIndex = len -1;
    else state.currentSongIndex--;
  },
  changeCurrentSongIndex(state, index) {
    state.currentSongIndex = index;
  },
  mySonglistShowToggle(state) {
    state.mySonglistShow = !state.mySonglistShow;
  },
  refreshShuffleArr(state) {
    var currentSongIndex = state.currentSongIndex;
    var len = state.songlist.length;
    var arr = [];
    for (var i = 0; i < len; i++){
      if (i === currentSongIndex) continue;
      arr.push(i);
    }
    len = len - 1;
    for (var k = 0; k < len; k++) {
      var j = Math.floor(Math.random()*len);
      if (j === k) continue;
      var a = arr[j];
      var b = arr[k];
      arr[j] = b;
      arr[k] = a;
    }
    arr.splice(currentSongIndex, 0, currentSongIndex);
    state.shuffleArr = arr;
  },
  playModeToggle(state) {
    if (state.playMode === 2) state.playMode = 0;
    else if (state.playMode === 0) {
      this.commit("refreshShuffleArr");
      state.playMode++;
    }
    else state.playMode++;
  }
}
