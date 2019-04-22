<template>
  <div class="songlist">
    <div class="songlistTitle">
      <h3><Icon type="ios-arrow-back" class="icon iconColor" @click="back"/> {{title}}</h3>
    </div>
    <div class="pic" ref="pic">
      <div ref="picImg" :style="`background-image: url(${songlistImg})`">
        <h3 @click="playAll" ref="playAll">播放全部</h3>
      </div>
    </div>
    <scroll-y class="scroll" ref="scroll"
              @scroll="scroll" @touchEnd="touchEnd"
              :probeType="3">
      <div>
        <ul class="list" @click="musicPlay">
          <li v-for="(item, i) of songlistData" class="listitem" :index="i">
            <p>{{item.songName}}</p>
            <p class="supplementary">{{singername(item.singerName)}} . {{item.albumName}}</p>
          </li>
        </ul>
      </div>
    </scroll-y>
  </div>
</template>

<script>
  import scrollY from "@/base/scrollY/scrollY";
  import {refreshAfterPlayerShow} from "@/common/js/dom"

  export default {
    name: "songlist",
    components: {scrollY},
    data() {
        return {
        }
    },
    props: ["title", "songlistData", "songlistImg"],
      //数据结构
      //{songName, songmid, singerName, albumName, albumMid, payplay}
    computed: {
      playerShow() {
        return this.$store.state.playerShow;
      },
      picH() {
        return this.$refs.pic.clientHeight;
      }
    },
    watch: {
      playerShow() {
        refreshAfterPlayerShow(this.$refs.scroll)
      }
    },
    methods: {
      singername(arr) {
        var name = arr.map((val) => {return val.name});
        name = name.join("/");
        return name
      },
      scroll(pos) {
        if (pos.y > 0) {
          var p = pos.y/this.picH;
          var scale = 1 + p;
          this.$refs.pic.style.transition = "";
          this.$refs.pic.style.transform = `translate(0, ${pos.y/2}px) scale(${scale})`;
        }

        var width = this.$refs.scroll.$el.clientWidth;
        if (-pos.y > width - 40) {
          this.$refs.pic.style.height = "40px";
          this.$refs.pic.style.zIndex = 5;
        } else {
          this.$refs.pic.style.height = "100%";
          this.$refs.pic.style.zIndex = 1;
        }

      },
      touchEnd(pos) {
        if (pos.y > 0) {
          this.$refs.pic.style.transition = "transform .5s";
          this.$refs.pic.style.transform = "scale(1) translate(0, 0)";
        }
      },
      back() {
        this.$router.back();
      },
      playerShowToggle() {
        this.$store.commit("playerShowToggle");
      },
      playerMaxToggle() {
        this.$store.commit("playerMaxToggle");
      },
      refreshShuffleArr() {
        this.$store.commit("refreshShuffleArr")
      },
      musicPlay(e) {
        var index = e.target.getAttribute("index") || e.target.parentElement.getAttribute("index");
        var songObj = this.songlistData[index];
        this.addSong(songObj);
        if (!this.playerShow) {
          this.playerShowToggle();
          this.playerMaxToggle();
        }
      },
      playAll() {
        this.$store.commit("loadSonglist", this.songlistData);
        if (!this.playerShow) {
          this.playerShowToggle();
          this.playerMaxToggle();
        }
      },
      addSong(song) {
        this.$store.commit("addSong", song);
        this.refreshShuffleArr();
      }
    },
    created() {
      this.$nextTick(function() {
        this.$refs.scroll.$el.style.top = this.$refs.scroll.$el.clientWidth + "px";
      })
    },
    mounted() {
      this.$nextTick(function() {
        if (this.playerShow) refreshAfterPlayerShow(this.$refs.scroll);
      });
    }
  }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .songlist
    width: 100%
    .songlistTitle
      position: fixed
      text-align: center
      width: 100%
      height: 40px
      top: 0
      line-height: 40px
      z-index: 11
      background: transparent
      .icon
        position: absolute
        left: 0
        font-size: 40px
    .pic
      position: absolute
      width: 100%
      overflow: hidden
      top: 0
      z-index: 1
      &>div
        width: 100%
        padding-top: 100%
        background-repeat: no-repeat
        background-size: 100%
        position: relative
        &>h3
          border: 2px solid $color-theme
          width: 120px
          line-height: 32px
          margin: auto
          border-radius: 16px
          text-align: center
          position: absolute
          bottom: 10px
          left: 0
          right: 0
          color: $color-theme
    .scroll
      width: 100%
      position: absolute
      top: 40px
      bottom: 0
      z-index: 2
      overflow: visible
      .list
        background: white
        .listitem
          height: 60px
          width: 80%
          margin: 15px auto
          display: flex
          flex-direction: column
          justify-content: space-around

</style>
