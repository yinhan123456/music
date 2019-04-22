<template>
    <scroll-y class="scroll" ref="scroll">
      <div>
        <p v-for="(item, index) of lyricLines"
           ref="lyricLine"
           :index = "index"
           :class="{currentLine: index === currentIndex}"
           class="txt supplementary"
        >{{item.txt}}</p>
      </div>
    </scroll-y>
</template>

<script>
    import ScrollY from "../scrollY/scrollY";
    import LyricParse from "lyric-parser";

    export default {
      name: "lyric",
      components: {ScrollY},
      data() {
        return {
          lyricLines: [],
          currentIndex: 0
        }
      },
      props: {
        lyric: ""
      },
      watch: {
        lyric() {
          if (this.lyricObj) this.lyricObj.stop();
          this.lyricObj = new LyricParse(this.lyric, this.lyricHandler);
          this.lyricLines = this.lyricObj.lines;
          this.play();
        }
      },
      methods: {
        lyricHandler({lineNum, txt}) {
          this.currentIndex = lineNum;
          this.$refs.scroll.scrollToElement(this.$refs.lyricLine[lineNum], 500, 0, true);
        },
        play() {
          this.$nextTick(function() {
            this.lyricObj.play();
          });
        },
        stop() {
          this.$nextTick(function() {
            if (this.lyricObj) this.lyricObj.stop();
          });
        },
        seek(time) {
          if (this.lyricObj) this.lyricObj.seek(time);
        }
      },
      mounted() {
        this.$refs.scroll.$el.addEventListener("resize", () => {
          this.$refs.scroll.refresh();
        })
      }
    }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .scroll
    width: 100%
    height: 100%
    overflow: hidden
    background: white
    .txt
      line-height: 25px
    .currentLine
      color: black
      font-weight: bold
      font-size: $normal-font-size

    jjjjjjjjjjjjjjjjjjj
</style>
