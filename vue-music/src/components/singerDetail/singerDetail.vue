<template>
    <div class="singerDetail">
      <songlist :title="singerName" :songlistData="data" :songlistImg="songlistImg"></songlist>
    </div>
</template>

<script>
  import songlist from "@/base/songlist/songlist"
    export default {
        name: "singerDetail",
      data() {
          return {
            data: [],
            singerName: "",
            songlistImg: ""
          }
      },
      components: {songlist},
      props: {
          singerData: {}
      },
      methods: {
        getSonglist(mid) {
          this.$axios.get(`/api/songlist/${mid}`)
            .then((res) => {
              this.data = res.data;
              this.singerName = res.data.singer_name;
              var arr = [];
              for (var item of this.data.list) {
                let obj = {};
                obj.songName = item.musicData.songname;
                obj.songmid = item.musicData.songmid;
                obj.singerName = item.musicData.singer;
                obj.albumName = item.musicData.albumname;
                obj.albummid = item.musicData.albummid;
                obj.payplay = item.musicData.pay.payplay;
                arr.push(obj);
              }
              this.data = arr;
            })
        }
      },
      created() {
          this.getSonglist(this.$route.params.mid);
          this.songlistImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.$route.params.mid}.jpg?max_age=2592000`;
      }
    }
</script>

<style scoped lang="sass">
  .singerDetail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: white
    z-index: 2
</style>
