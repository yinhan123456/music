<template>
    <div class="remSonglist">
      <songlist :title="title" :songlistData="data" :songlistImg="songlistImg"></songlist>
    </div>
</template>

<script>
    import Songlist from "../../base/songlist/songlist";
    export default {
      name: "recoommendDetail",
      components: {Songlist},
      data() {
          return {
            title: "",
            data: [],
            songlistImg: ""
          }
      },
      created() {
          this.$axios.get(`/api/r-playlist/${this.$route.params.disstid}`)
            .then((res) => {
              this.title = res.data.dissname;
              this.songlistImg = res.data.logo;
              var arr = [];
              for (var item of res.data.songlist) {
                let obj = {};
                obj.songName = item.songname;
                obj.songmid = item.songmid;
                obj.singerName = item.singer;
                obj.albumName = item.albumname;
                obj.albummid = item.albummid;
                obj.payplay = item.pay.payplay;
                arr.push(obj);
              }
              this.data = arr;
            })
      }
    }
</script>

<style scoped lang="sass">
  .remSonglist
    width: 100%
    position: fixed
    top: 0
    bottom: 0
    background: white
</style>
