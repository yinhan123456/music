<template>
    <scroll-y class="recommend" ref="recommend">
        <div class="container">
          <slider :picData="pd"></slider>
          <div class="playlist">
            <h2>推荐歌单</h2>
            <ul>
              <li v-for="item of playlist" :disstid="item.dissid" @click="recommendSonglist">
                  <div class="pic">
                    <img v-lazy="item.imgurl">
                  </div>
                  <div class="descript">
                    <p>{{item.dissname}}</p>
                    <p class="supplementary">{{item.creator.name}}</p>
                  </div>
              </li>
            </ul>
          </div>
        </div>
        <router-view></router-view>
      </scroll-y>
</template>

<script>
  import Slider from "@/base/slider/slider";
  import ScrollY from "@/base/scrollY/scrollY";
  import {refreshAfterPlayerShow} from "@/common/js/dom"

  export default {
    name: "recommend",
    data() {
      return {
        pd: [],
        playlist: []
      }
    },
    components: {Slider, ScrollY},
    computed: {
      playerShow() {
        return this.$store.state.playerShow;
      }
    },
    watch: {
      playerShow() {
          refreshAfterPlayerShow(this.$refs.recommend);
      }
    },
    methods: {
      recommendSonglist(e) {
        var disstid = e.currentTarget.getAttribute("disstid");
        this.$router.push(`/recommend/${disstid}`);
      }
    },
    beforeCreate() {
      this.$axios.get("/api/slider").then((response) => {
        this.pd = response.data.data.slider;
      });
      this.$axios.get("/api/r-playlist").then((response) => {
        this.playlist = response.data.data.list;
      });
    },
    activated() {
      this.$nextTick(function() {
        if (this.playerShow) refreshAfterPlayerShow(this.$refs.recommend);
      });
    }
  }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .recommend
    width: 100%
    position: absolute
    top: 90px
    bottom: 0
    h2
      text-align: center
    .playlist
      list-style: none
      margin-top: 10px
      li
        text-decoration: none
        color: black
        width: 93%
        display: flex
        margin: 20px auto
        flex-direction: row
        .pic
          width: 22%
          min-width: 60px
          padding-right: 15px
          img
            width: 100%
        .descript
          width: auto
          display: flex
          flex-direction: column
          justify-content: space-around


</style>
