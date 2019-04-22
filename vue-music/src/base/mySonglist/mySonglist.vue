<template>
    <div class="mySonglist">
      <div></div>
      <scroll-y class="scroll">
        <ul class="list">
          <li v-for="(item, index) of songlist" class="item" :index="index" @click="changeCurrentSongIndex(index)" >
            <span class="songName"
                  :class="{currentSong: index === currentSongIndex}">
              {{item.songName}}</span><Icon type="md-close" class="icon" @click="delSong(index)"/>
          </li>
        </ul>
      </scroll-y>
      <div class="close" @click="close">关闭</div>
    </div>
</template>

<script>
    import ScrollY from "../scrollY/scrollY";
    export default {
      name: "mySonglist",
      data() {
        return {
          show: true
        }
      },
      components: {ScrollY},
      computed: {
        songlist() {
          return this.$store.state.songlist;
        },
        playMode() {
          return this.$store.state.playMode;
        },
        shuffleArr() {
          return this.$store.state.shuffleArr;
        },
        currentSongIndex() {
          var currentSongIndex = this.$store.state.currentSongIndex;
          if (this.playMode === 1 ) {
            return this.shuffleArr[currentSongIndex];
          } else {
            return currentSongIndex;
          }
        }
      },
      methods: {
        close() {
          this.$store.commit("mySonglistShowToggle");
        },
        delSong(index) {
          console.log(index);
          this.$store.commit("delSong", index)
        },
        changeCurrentSongIndex(index) {
          this.$store.commit("changeCurrentSongIndex", index);
        }
      },
      mounted() {
      }
    }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .mySonglist
    width: 100%
    background: white
    .scroll
      position: absolute
      top: 10px
      bottom: 41px
      width: 100%
      .list
        width: 100%
        .item
          height: 30px
          .songName
            margin-left: 15%
          .currentSong
            color: $color-theme
          .icon
            float: right
            margin-right: 10%
            color: $warning-color
    .close
      position: absolute
      bottom: 0
      line-height: 40px
      width: 100%
      text-align: center
      border-top: 1px solid $color-theme
      color: $color-theme
</style>
