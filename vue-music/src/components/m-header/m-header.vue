<template>
    <div class="m-header">
      <h1>
        Vue-Music
      </h1>
    </div>
</template>

<script>
    export default {
        name: "m-header"
    }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .m-header
    background: $color-theme
    color: white
    line-height: 50px
    text-align: center
</style>
