import Vue from 'vue'
import Router from 'vue-router'
import Recommend from "@/components/recommend/recommend"
import Singer from "@/components/singer/singer"
import Rank from "@/components/rank/rank"
import Search from "@/components/search/search"
import SingerDetail from "@/components/singerDetail/singerDetail"
import RankDetail from "@/components/rankDetail/rankDetail"
import RecommendDetail from "@/components/recommendDetail/recommendDetail"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      component: Recommend,
      children: [
        {
          path: ":disstid",
          component: RecommendDetail
        }
      ]
    },
    {
      path: "/singer",
      component: Singer,
      children: [
        {
          path: ":mid",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/rank",
      component: Rank,
      children: [
        {
          path: ":topId/:period",
          component: RankDetail
        }
      ]

    },
    {
      path: "/search",
      component: Search
    }
  ]
})
