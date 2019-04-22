<template>
    <div class="player" ref="player" v-if="playerShow">
      <div class="playerMax" v-show="playerMax">
        <div class="playerHeader">
          <Icon type="ios-arrow-down" class="icon iconColor" size="40" @click="playerMaxToggle" />
          <h2>{{songName}}</h2>
        </div>
        <div class="playerMain">
          <p>{{singerName}}</p>
          <div class="disc"><div ref="discAnimate"><img :src="imgUrl"></div></div>
          <div class="lyricBox" ref="lyricBox" @click="lyricToggle">
            <lyric :lyric="lyric" ref="lyric" :currentTime="currentTime"></lyric>
          </div>
          <div class="progress">
            <span>{{timeFormat(sliderValue)}}</span>
            <Slider v-model.lazy="sliderValue" :max="songDuration"
                    class="slider" @on-change="changeCurrentTime"
                    show-tip="never"></Slider>
            <span>{{timeFormat(songDuration)}}</span>
          </div>
        </div>
        <div class="playerControl">
          <Icon type="ios-repeat" size="50"
                class="repeat iconColor"
                v-if="playMode===0" @click="playModeToggle" />
          <Icon type="ios-shuffle" class="iconColor"
                size="50" v-if="playMode===1" @click="playModeToggle" />
          <i class="repeat-single" v-if="playMode===2" @click="playModeToggle">
            <Icon type="ios-repeat" class="iconColor" size="50" />
            <span class="iconColor">1</span>
          </i>
          <Icon type="ios-rewind" size="50" class="iconColor" @click="prevSong"></Icon>
          <Icon type="ios-play" size="50" class="iconColor" @click="play" v-if="!playing"></Icon>
          <Icon type="ios-pause" size="50" class="iconColor" @click="pause" v-if="playing"></Icon>
          <Icon type="ios-fastforward" class="iconColor" size="50" @click="nextSong"></Icon>
          <Icon type="ios-list" size="50" class="iconColor"
                @click.stop="mySonglistShowToggle"></Icon>
        </div>
      </div>
      <div class="playerMin" v-if="!playerMax" @click="playerMaxToggle">
        <div class="playerMinPic">
          <img :src="imgUrl">
        </div>
        <div class="playerMinInfo">
          <p>{{songName}}</p>
          <p>{{singerName}}</p>
        </div>
        <div class="playerMinControl">
          <Icon type="ios-play" size="30" class="iconColor"
                @click.stop="play" v-if="!playing"></Icon>
          <Icon type="ios-pause" size="30" class="iconColor"
                @click.stop="pause" v-if="playing"></Icon>
          <Icon type="ios-more" size="30" class="iconColor"
                @click.stop="mySonglistShowToggle"></Icon>
        </div>
      </div>
      <div class="mySonglist" v-if="mySonglistShow"><my-songlist></my-songlist></div>
      <audio :src="songUrl" autoplay ref="audio"
             @loadeddata="loadeddata"
             @ended="nextSong" :loop="playMode===2" @play="audioPlay" @pause="audioPause"></audio>
    </div>
</template>

<script>
  import {Base64} from "js-base64";
  import Lyric from "../../base/lyric/lyric";
  import mySonglist from "../../base/mySonglist/mySonglist"

    export default {
      name: "player",
      components: {Lyric, mySonglist},
      data() {
          return {
            playerShift: true,
            songUrl: "",
            sliderValue: 0,
            currentTime: 0,
            songDuration: 0,
            lyric: "",
            lyricMax: false,
            loopSingle: false
          }
      },
      methods: {
        playerMaxToggle() {
            this.$store.commit("playerMaxToggle");
            // if (this.timeInt) clearInterval(this.timeInt);
          },
        play() {
          console.log("play");
          this.$refs.audio.play();
        },
        pause() {
          console.log("pause");
          this.$refs.audio.pause();
        },
        audioPlay() {
          this.$store.commit("play");
          if (this.$refs.lyric) this.$refs.lyric.seek(this.currentTime*1000);
          if (this.$refs.discAnimate) {
            this.$refs.discAnimate.style["animation-play-state"] = "running";
          }
        },
        audioPause() {
          this.$store.commit("pause");
          this.$refs.lyric.stop();
          this.$refs.discAnimate.style["animation-play-state"] = "paused";
        },
        nextSong() {
          this.$store.commit("nextSong");
        },
        prevSong() {
          this.$store.commit("prevSong");
        },
        loadeddata(e) {
          if (this.timeInt) clearInterval(this.timeInt);
          var ele = e.target;
          this.songDuration = ele.duration;
          this.timeInt = setInterval(()=>{
            this.currentTime = this.$refs.audio.currentTime;
          }, 1000);
          this.getLyric(this.currentSong.songmid)
            .then((res) => {
              this.lyric = Base64.decode(res.data);
            })
        },
        timeFormat(second) {
          var s = parseInt(second % 60);
          var m = parseInt(second/60);
          if (s < 10) s = "0" + s;
          if (m < 10) m = "0" + m;
          return `${m}:${s}`
        },
        getLyric(songmid) {
          return this.$axios.get(`/api/lyric/${songmid}`);
        },
        lyricToggle() {
          var box = this.$refs.lyricBox;
          this.lyricMax = !this.lyricMax;
          if (this.lyricMax) {
            box.style.top = "90px";
          } else {
            box.style.top = "440px";
          }
        },
        changeCurrentTime(val) {
          this.$refs.audio.currentTime = val;
          this.$refs.lyric.seek(val*1000);
          this.$refs.audio.play();
        },
        mySonglistShowToggle() {this.$store.commit("mySonglistShowToggle");},
        playModeToggle() {this.$store.commit("playModeToggle");}
      },
      computed: {
        playerShow() {return this.$store.state.playerShow},
        currentSong() {return this.$store.getters.currentSong;},
        songName() {return this.currentSong.songName;},
        singerName() {return this.currentSong.singerName.map((val)=>val.name).join("/");},
        imgUrl() {
          var albummid = this.currentSong.albummid;
          var url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`;
          return url;
        },
        playerMax() {return this.$store.state.playerMax;},
        playing() {return this.$store.state.playing;},
        mySonglistShow() {return this.$store.state.mySonglistShow;},
        playMode() {return this.$store.state.playMode;}
      },
      watch: {
        playing(val) {
        },
        currentSong(songObj, oldSongObj) {
          if (songObj !== oldSongObj) {
            var songmid = songObj.songmid;
            if (songObj.payplay === 1) {
              if (this.$refs.lyric) this.$refs.lyric.stop();
              this.$refs.discAnimate.style["animation-play-state"] = "paused";
              alert("付费歌曲");
            } else {
              this.$axios.get(`/api/song/${songmid}`)
                .then((res) => {
                  if (res.data) {
                    songObj.purl = res.data;
                    this.songUrl = `http://isure.stream.qqmusic.qq.com/${songObj.purl}`;
                    this.$store.commit("play");
                  } else {
                    if (this.$refs.lyric) this.$refs.lyric.stop();
                    this.$refs.discAnimate.style["animation-play-state"] = "paused";
                    alert("境外服务器受限");
                  }
                });
            }
          }

        },
        currentTime(val) {
          this.sliderValue = val;
        },
      },
      mounted() {
      }
    }
</script>

<style scoped lang="sass">
  .player
    .playerMax
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      z-index: 5
      background: white
      .playerHeader
        line-height: 50px
        text-align: center
        .icon
          position: absolute
          line-height: 50px
          left: 0
      .playerMain
        text-align: center
        .disc
          background: black
          height: 300px
          width: 300px
          margin: 20px auto
          border-radius: 50%
          display: flex
          justify-content: center
          align-items: center
          &>div
            height: 260px
            width: 260px
            border-radius: 50%
            overflow: hidden
            animation: imgRotate 20s linear infinite
            &>img
              width: 100%
        .lyricBox
          position: fixed
          width: 100%
          top: 430px
          bottom: 170px
        .progress
          width: 100%
          height: 30px
          position: absolute
          bottom: 110px
          display: flex
          justify-content: space-around
          align-items: center
          .slider
            width: 75%
      .playerControl
        height: 100px
        width: 100%
        position: absolute
        bottom: 0
        display: flex
        justify-content: space-around
        align-items: center
        .repeat-single
          position: relative
          span
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
    .playerMin
      position: fixed
      z-index: 5
      bottom: 0
      width: 100%
      height: 60px
      background: white
      .playerMinPic
        height: 60px
        float: left
        &>img
          height: 100%
      .playerMinInfo
        height: 60px
        width: 50%
        float: left
        margin-left: 15px
        display: flex
        flex-direction: column
        justify-content: space-around
        p
          width: 100%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
      .playerMinControl
        height: 60px
        width: 100px
        float: right
        display: flex
        justify-content: space-around
        align-items: center
    .mySonglist
      position: fixed
      top: 300px
      bottom: 0
      width: 100%
      z-index: 20

  @keyframes imgRotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

</style>
