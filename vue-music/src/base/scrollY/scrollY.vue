<template>
    <div class="scrollY" ref="scrollY">
      <slot></slot>
    </div>
</template>

<script>
  import BScroll from "better-scroll";
    export default {
      name: "scrollY",
      props: {
        probeType: 0
      },
      methods: {
        scrollToElement(ele, time, offsetX, offsetY) {
          this.scroll.scrollToElement(ele, time, offsetX, offsetY);
        },
        refresh() {
          this.scroll.refresh();
        }
      },
      //该mounted调用了两次
      mounted() {
        this.$nextTick(() => {
          var scrollY = this.$refs.scrollY;
          this.scroll = new BScroll(scrollY, {
            scrollX: false,
            scrollY: true,
            click: true,
            probeType: this.probeType
          });
          this.scroll.on("scroll", (pos) => {
            this.$emit("scroll", pos);
          });
          this.scroll.on("touchEnd", (pos) => {
            this.$emit("touchEnd", pos);
          })
        })
      }
    }
</script>

<style scoped lang="sass">
  .scrollY
    overflow: hidden
</style>
