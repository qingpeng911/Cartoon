import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import Intro from '@/page/Intro'
import Typeshow from '@/page/Typeshow'
import Week from '@/page/Week'
import New from '@/page/New'
import Finish from '@/page/Finish'
import Recommend from '@/page/Recommend'
import Free from '@/page/Free'
import Hot from '@/page/Hot'
import Follow from '@/page/Follow'
import Chapter from '@/page/Chapter'
import Search from '@/page/Search'
import SearchResult from '@/page/SearchResult'
import History from '@/page/History'
import Collection from '@/page/Collection'
import UserCenter from '@/page/UserCenter'
import SignRule from '@/page/SignRule'
import UserAccount from '@/page/UserAccount'
import UserRecharge from '@/page/UserRecharge'
import BuyList from '@/page/BuyList'
import AdminNotice from '@/page/AdminNotice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home', //首页
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index', //首页
      component: Index
    },
    {
      path: '/index/intro/:id',
      name: 'intro', //漫画简介
      component: Intro
    },
    {
      path: '/index/typeshow',
      name: 'typeshow', //分类
      component: Typeshow
    },
    {
      path: '/index/week',
      name: 'week', //周排行
      component: Week
    },
    {
      path: '/index/new',
      name: 'new', //新作榜
      component: New
    },
    {
      path: '/index/finished',
      name: 'finish', //完结榜
      component: Finish
    },
    {
      path: '/index/recommend/:type',
      name: 'recommend', //查看更多
      component: Recommend
    },
    {
      path: '/index/free',
      name: 'free', //免费专区
      component: Free
    },
    {
      path: '/index/new/hot',
      name: 'hot', //抢先-热门
      component: Hot
    },
    {
      path: '/index/new/follow',
      name: 'follow', //抢先-关注
      component: Follow
    },
    {
      path: '/index/chapter/details/:chapterId',
      name: 'chapter', //内容
      component: Chapter
    },
    {
      path: '/index/search',
      name: 'search', //搜索
      component: Search
    },
    {
      path: '/index/search/result/:keyword',
      name: 'searchResult', //搜索结果
      component: SearchResult
    },
    {
      path: '/index/bookshelf/history',
      name: 'history', //书柜-历史
      component: History
    },
    {
      path: '/index/bookshelf/collection',
      name: 'collection', //书柜-历史
      component: Collection
    },
    {
      path: '/index/personal/user_center',
      name: 'user_center', //个人中心
      component: UserCenter
    },
    {
      path: '/index/personal/account',
      name: 'account', //个人账户
      component: UserAccount
    },
    {
      path: '/index/sign/rule',
      name: 'sign_rule', //签到帮助
      component: SignRule
    },
    {
      path: '/index/recharge',
      name: 'recharge', //充值
      component: UserRecharge
    },
    {
      path: '/index/personal/buylist',
      name: 'buylist', //已购漫画
      component: BuyList
    },
    {
      path: '/index/personal/notice',
      name: 'notice', //系统通知
      component: AdminNotice
    },
  ]
})
