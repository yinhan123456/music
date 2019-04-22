<template>
  <div class="slider" ref="slider">
    <div class="container" ref="container">
        <a v-for="item of picData" :href="item.linkUrl">
          <img :src="item.picUrl" class="pic">
        </a>
    </div>
    <div class="dots" v-if="showDots">
      <span v-for="(i, j) of picData" :class="{dot: j === currentIndex}"></span>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

    export default {
      name: "slider",
      data() {
        return {
          currentIndex: 0,
          showDots: false
        }
      },
      props: {
        picData: {
          type: Array,
          default: []
        }
      },
      methods: {
        initWidth() {
          var width = this.$refs.slider.clientWidth;
          var container = this.$refs.container;
          var len = this.picData.length;
          for (let child of container.children) {
            child.style.width = `${width}px`;
          }
          //better-scroll需要在原本的container前后添加两个元素
          container.style.width = `${width*(len+2)}px`;
        },
        initSlider() {
          this.slider = new BScroll(this.$refs.slider, {
            scrollY: false,
            scrollX: true,
            click: true,
            momentum: false,
            bounce: false,
            snap: {
              loop: true,
              threshold: 0.3
            }
          });
          this.slider.on("scrollEnd", () => {
            this.currentIndex = this.slider.currentPage.pageX - 1;
          });
        },
        cyclePlay() {
          if (this.timeInterval) clearInterval(this.timeInterval);
          this.timeInterval = setInterval(() => {
            this.slider.next();
          }, 3000);
        },
        stopCyclePlay() {
          clearInterval(this.timeInterval);
        }
      },
      watch: {
        picData(newVal) {
          this.$nextTick(() => {
            this.initWidth();
            this.initSlider();
            this.cyclePlay();
            this.showDots = true;
            window.addEventListener("resize", () => {
              this.initWidth();
              this.slider.refresh();
            });
            //利用better-scroll中的scrollStart与touchEnd事件控制轮播
            //自动轮播时，会自动触发scrollEnd事件
            this.slider.on("scrollStart", ()=>{
              this.stopCyclePlay();
            });
            this.slider.on("touchEnd", ()=>{
              this.cyclePlay();
            });
          })
        }
      },
      deactivated() {
        this.stopCyclePlay();
      },
      activated() {
        this.$nextTick(function() {
          this.initWidth();
          if (this.slider) this.slider.refresh();
          this.cyclePlay();
        });
      },
      beforeDestroy() {
        this.stopCyclePlay();
      }
    }
</script>

<style scoped lang="sass">
  .slider
    width: 100%
    overflow: hidden
    position: relative
    .dots
      width: 100%
      text-align: center
      position: absolute
      z-index: 10
      bottom: 5px
      span
        display: inline-block
        width: 6px
        height: 6px
        border-radius: 3px
        background: white
        opacity: .6
        margin: 4px
      .dot
        opacity: 1
        width: 15px
  a
    display: inline-block
    .pic
      width: 100%
</style>
