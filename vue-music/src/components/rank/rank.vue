<template>
  <scroll-y class="scroll" ref="scroll">
    <div>
      <div v-for="(item, index) of topList" :index="index" class="rankItem" @click="rankSongList">
        <div><img v-lazy="item.frontPicUrl" class="rankPic"></div>
        <div class="rankTxt">
          <p v-for="it of item.song">
            {{it.title}}<span class="supplementary"> - {{it.singerName}}</span></p>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </scroll-y>
</template>

<script>
    import ScrollY from "../../base/scrollY/scrollY";
    import Songlist from "../../base/songlist/songlist";
    import {refreshAfterPlayerShow} from "@/common/js/dom"
    export default {
      name: "rank",
      components: {Songlist, ScrollY},
      data() {
          return {
            topList: {},
            songlistData: {},
            title: ""
          }
      },
      methods: {
        rankSongList(e) {
          var index = e.currentTarget.getAttribute("index");
          var topId = this.topList[index].topId;
          if (topId !== 201) {
            var period = this.topList[index].period;
            this.$router.push({"path": `/rank/${topId}/${period}`});
          }
        }
      },
      watch: {
        topList(val) {
          // console.log(val)
        },
        playerShow() {
          refreshAfterPlayerShow(this.$refs.scroll);
        }
      },
      computed: {
        playerShow() {
          return this.$store.state.playerShow;
        }
      },
      created() {
          this.$axios.get("/api/rank2")
            .then((res) => {
              this.topList = res.data;
            })
      },
      mounted() {
      },
      activated() {
        this.$nextTick(function() {
          if (this.playerShow) refreshAfterPlayerShow(this.$refs.scroll);
        });
      }
    }
</script>

<style scoped lang="sass">
  .scroll
    width: 100%
    position: absolute
    top: 90px
    bottom: 0
    &> div
      width: 100%
  .rankItem
    width: 90%
    margin: 15px auto
    display: flex
    justify-content: flex-start
    .rankPic
      width: 100px
      &>img
        width: 100%
    .rankTxt
      width: 75%
      display: flex
      flex-direction: column
      justify-content: space-around
      margin-left: 15px
      &>p
        width: 90%
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

</style>
