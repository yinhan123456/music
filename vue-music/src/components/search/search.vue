<template>
  <div class="search">
    <div>
      <i-input :value.sync="value" placeholder="请输入..." class="searchInput"></i-input>
      <div class="searchHot">
        <p>热门搜索</p>
        <div></div>
      </div>
      <div class="searchHis">
        <p>搜索历史</p>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
    import ScrollY from "../../base/scrollY/scrollY";
    export default {
      name: "search",
      components: {ScrollY},
      data() {
          return {
            value: ""
          }
      }
    }
</script>

<style scoped lang="sass">
  .search
    width: 100%
    position: fixed
    top: 90px
    bottom: 0
    .searchInput
      width: 80%
      margin: 0 auto
      padding: 20px 0
      display: block
    .searchHot
      width: 80%
      margin: 20px auto
      height: 200px
      border: 1px black solid
    .searchHis
      width: 80%
      margin: 20px auto
      height: 200px
      border: 1px black solid
    jjjjjjjjjjjjjjjjjjjj
</style>
