<template>
  <div :height="size+'px'" :width="size+'px'" :style="">
    <img :src="imgUrl">
  </div>
</template>

<script>
    export default {
        name: "picRotate",
      // props: {imgUrl, size}
    }
</script>

<style scoped lang="sass">
  div
    height: 280px
    width: 280px
    border-radius: 140px
    overflow: hidden
    animation: imgRotate 10s linear infinite
    &>img
      width: 100%
</style>
