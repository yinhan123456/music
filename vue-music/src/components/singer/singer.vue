<template>
  <div class="singer">
    <scroll-y class="scrollY" ref="scrollY">
      <div class="singerlist" ref="singerlist">
        <ul class="hotlist" :index="0" ref="listItem">
          <h2>热门</h2>
          <li v-for="item of hotlist" :mid="item.singer_mid">
            <img v-lazy="item.singer_pic" class="pic">
            <p class="name">{{item.singer_name}}</p>
          </li>
        </ul>
        <ul class="seqlist" v-for="item of seqlist" :index="item.index"
            ref="targetItem listItem">
          <h2>{{String.fromCharCode(item.index + 64)}}</h2>
          <li v-for="singer of item.singerlist" :mid="singer.singer_mid">
            <img v-lazy="singer.singer_pic" class="pic">
            <p class="name">{{singer.singer_name}}</p>
          </li>
        </ul>
      </div>
      <div class="shortcut" ref="shortcut">
        <ul>
          <li :i="0" :class="{currentInd: currentInd == 0}"
              @click="scrollTo(0)">
            热</li>
          <li v-for="i of 24" :shortcutIndex="i"
              :class="{currentInd: currentInd == i}"
              @click="scrollTo(i)">
            {{String.fromCharCode(i+64)}}
          </li>
        </ul>
      </div>
    </scroll-y>
    <router-view></router-view>
  </div>

</template>

<script>
    import ScrollY from "@/base/scrollY/scrollY";
    import {refreshAfterPlayerShow} from "@/common/js/dom"

    export default {
      name: "singer",
      data() {
          return {
            hotlist: [],
            seqlist: [],
            currentInd: 0,
            heightList: []
          }
      },
      components: {ScrollY},
      computed: {
        playerShow() {
          return this.$store.state.playerShow;
        }
      },
      watch: {
        playerShow() {
          if (this.playerShow) refreshAfterPlayerShow(this.$refs.scrollY);
        }
      },
      methods: {
        scrollTo(i) {
          this.$refs.scrollY.scrollToElement(`ul[index = "${i}"]`);
          this.currentInd = i;
        }
      },
      created() {
        this.$axios.get("/api/singerlist/hot").then((response) => {
          this.hotlist = response.data.splice(0, 20);
        });
        this.$axios.get("/api/singerlist/seq").then((response) =>{
          this.$nextTick(function() {
            this.seqlist = response.data;
          });
        })
      },
      activated() {
        this.$nextTick(function() {
          if (this.playerShow) refreshAfterPlayerShow(this.$refs.scrollY);
        });
      },
      mounted() {
        // var that = this;
        // var shortcut = this.$refs.shortcut;
        // var shortcutHeight = shortcut.clientHeight;
        // shortcut.addEventListener("touchstart", function(event) {
        //   event.stopPropagation();
        //   var touchStart = event.targetTouches[0];
        //   that.currentInd = touchStart.target.getAttribute("index");
        //   that.$refs.scrollY.scrollToElement(that.$refs.targetItem);
        // });
        //点击获取歌单事件
        this.$refs.singerlist.addEventListener("click", (event) => {
          var mid = event.target.getAttribute("mid") || event.target.parentElement.getAttribute("mid");
          if (mid) {
            this.$router.push({path: `/singer/${mid}`})
          }
        });
      }
    }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .singer
    width: 100%
  .scrollY
    width: 100%
    position: absolute
    top: 90px
    bottom: 0
    .shortcut
      position: absolute
      top: 35px
      right: 0
      ul
        list-style: none
        width: 30px
        text-align: center
        li
          height: 20px
        .currentInd
          color: $color-theme
    .singerlist
      ul
        list-style: none
        margin-left: 10px
        li
          width: 100%
          margin: 10px 0
          display: flex
          align-items: center
          z-index: 1
          .pic
            width: 58px
            height: 58px
            border-radius: 29px
            margin: 0 20px
            z-index: 0
          .name
</style>
