<template>
  <div class="rankDetail">
    <songlist :title="title" :songlistData="data" :songlistImg="songlistImg"></songlist>
  </div>
</template>

<script>
    import Songlist from "../../base/songlist/songlist";
    export default {
      name: "rankDetail",
      components: {Songlist},
      data() {
          return {
            data: [],
            title: "",
            songlistImg: ""
          }
      },
      computed: {
      },
      created() {
        var topId = this.$route.params.topId;
        var period = this.$route.params.period;
        this.$axios.get(`/api/rank/${topId}/${period}`)
          .then((res) => {
            this.title = res.data.detail.data.data.title;
            this.songlistImg = res.data.detail.data.data.headPicUrl;
            var arr = [];
            for (let item of res.data.detail.data.songInfoList) {
              let obj = {};
              obj.songName = item.name;
              obj.songmid = item.mid;
              obj.singerName = item.singer;
              obj.albumName = item.album.name;
              obj.albummid = item.album.mid;
              obj.payplay = item.pay.payplay;
              arr.push(obj);
            }
            this.data = arr;
          })
      },
      mounted() {
      }
    }
</script>

<style scoped lang="sass">
  .rankDetail
    position: fixed
    width: 100%
    top: 0
    bottom: 0
    background: white
</style>
