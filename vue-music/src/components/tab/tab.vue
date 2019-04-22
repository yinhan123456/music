<template>
    <div class="tab">
      <router-link tag="div" to="/recommend" class="nav"><span>推荐</span></router-link>
      <router-link tag="div" to="/singer" class="nav"><span>歌手</span></router-link>
      <router-link tag="div" to="/rank" class="nav"><span>排行</span></router-link>
      <router-link tag="div" to="/search" class="nav"><span>搜索</span></router-link>
    </div>
</template>

<script>
    export default {
        name: "tab"
    }
</script>

<style scoped lang="sass">
  @import "@/common/style/variable.sass"
  .tab
    height: 40px
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    .nav
      border-bottom: 3px transparent solid
      &.router-link-active
        color: $color-theme
        border-bottom-color: $color-theme
</style>
