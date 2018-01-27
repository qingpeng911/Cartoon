<template>
<div>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="index">
			<div>
				<!--header-->
				<headbar leftName="首页" rightName="分类" leftUrl="/" rightUrl="#/index/typeshow" leftSelected="true" rightButtonType="search"></headbar>

				<!--banner-->
				<banner></banner>
				<table cellspacing="0" cellpadding="0" class="menu">
				<tr class="menu_img">
					<td>
						<a href="#/index/week" class=""><img src="http://img.boook.cc/cartoon/static/img/week_rank.png"></a>
					</td>
					<td>
						<a href="#/index/new" class=""><img src="http://img.boook.cc/cartoon/static/img/new_rank.png"></a>
					</td>
					<td>
						<a href="#/index/finished" class=""><img src="http://img.boook.cc/cartoon/static/img/finish_rank.png"></a>
					</td>
					<td>
						<a href="#/index/typeshow" class=""><img src="http://img.boook.cc/cartoon/static/img/typeshow.png"></a>
					</td>
				</tr>
				<tr class="menu_text">
					<td>
						周排行
					</td>
					<td>
						新作榜
					</td>
					<td>
						完结榜
					</td>
					<td>
						<span>分类</span>
					</td>
				</tr>
				</table>
				<div class="line">
				</div>
				<!--热门精选-->
				<div class="group_main_title">
					<span>热门精选</span>
					<a href="#/index/recommend/热门推荐">
					<div class="group_main_gd ">
						更多 <img src="../assets/img/icon/more.png" class="rightImg">
					</div>
					</a>
				</div>
				<div class="group3_main">
					<template v-for="hot in hotItems">
						<router-link :to="{path:'/index/intro/'+hot.id}">
							<div class="group3">
								<div class="group3_img">
									<img :src="hot.coverImg">
								</div>
								<div class="group3_text">
									<div class="group_title">
										{{hot.name}}
									</div>
									<div class="group_des">
										{{hot.desc}}
									</div>
								</div>
							</div>
						</router-link>
					</template>
				</div>
			</div>
			<!--佳作必看-->
			<div class="line"></div>
			<div class="group_main_title">
				<span>佳作必看</span>
				<a href="#/index/recommend/佳作精选">
					<div class="group_main_gd ">
						更多 <img src="../assets/img/icon/more.png" class="rightImg">
					</div>
				</a>
			</div>
			<div class="group_main">
				<template v-for="good in goodItems">
					<router-link :to="{path:'/index/intro/'+good.id}">
						<table cellspacing="0" cellpadding="0" class="group1">
							<tr>
								<td class="group1_left">
									<img :src="good.coverImg">
								</td>
								<td class="group1_right">
									<div class="group1_title">
										{{good.name}}
									</div>
									<div class="group1_des">
										<div class="newZ">
											更至{{good.chapterNum}}话
										</div>
										<div class="group1_type">
											 {{  tagMap[good.tagId] }}
										</div>
										<div class="group1_readSum">
											<img src="../assets/img/icon/eye.png">{{String(good.vReadNum / 10000).split('.')[0]}}万
										</div>
									</div>
								</td>
							</tr>
						</table>
					</router-link>
				</template>
			</div>
			<!--新作上架-->
			<div class="line"></div>
			<div class="group_main_title">
				<span>新作上架</span>
				<a href="#/index/recommend/新作出炉" class="">
				<div class="group_main_gd ">
					更多 <img src="../assets/img/icon/more.png" class="rightImg">
				</div>
				</a>
			</div>
			<div class="group2_main">
				<template v-for="item in newItems">
					<router-link :to="{path:'/index/intro/'+item.id}">
					<div class="group2">
						<div class="group2_img">
							<img :src="item.coverImg">
						</div>
						<div class="group2_text_div">
							<div class="group2_text">
								<div class="group_title">
									{{item.name}}
								</div>
								<div class="group_des">
									{{item.desc}}									
								</div>
							</div>
						</div>
					</div>
					</router-link>
				</template>
			</div>
			<!--免费专区-->
			<div class="line"></div>
			<div class="group_main_title">
				<span>免费专区</span>
				<a href="#/index/free" class="">
				<div class="group_main_gd ">
					更多 <img src="../assets/img/icon/more.png" class="rightImg">
				</div>
				</a>
			</div>
			<div class="group_main">
				<template v-for="free in freeItems">
					<router-link :to="{path:'/index/intro/'+free.id}">
						<table cellspacing="0" cellpadding="0" class="group1">
							<tr>
								<td class="group1_left">
									<img :src="free.coverImg">
								</td>
								<td class="group1_right">
									<div class="group1_title">
										{{free.name}}
									</div>
									<div class="group1_des">
										<div class="newZ">
											更至{{free.chapterNum}}话
										</div>
										<div class="group1_type">
											{{  tagMap[free.tagId] }}
										</div>
										<div class="group1_readSum">
											<img src="../assets/img/icon/eye.png">{{free.vReadNum >= 10000 ? String(free.vReadNum / 10000).split('.')[0]+'万' : free.vReadNum}}
										</div>
									</div>
								</td>
							</tr>
						</table>
					</router-link>
				</template>
			</div>
			<!--footer-->
			<footbar selectNo="2"></footbar>
			<div class="bottom_div">
			</div>
		</div>
	</div>
</div>
</template>

<script>
import loading from '@/components/Loading'
import banner from '@/components/Banner'
import headbar from '@/components/Headbar'
import footbar from '@/components/Footbar'
import api from '@/service/api.js'

export default {
	data() {
		return {
			itemMap: {
				"新作出炉":[],
				"佳作精选":[],
				"热门推荐":[]
			},
			tagMap: {},
			loading: true //显示加载动画
		}
	},
	components: {
		loading,
		headbar,
		banner,
		footbar
	},
  computed: {
    newItems: function () {
      return this.itemMap['新作出炉'].slice(0, 4)
    },
    goodItems: function () {
      return this.itemMap['佳作精选'].slice(0, 6)
    },
    hotItems: function () {
      return this.itemMap['热门推荐'].slice(0, 6)
    },
    freeItems: function () {
      return this.itemMap['免费专区']
		},
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {
    $(window).on('scroll.myScroll', () => {
      window.setTimeout(() => {
        var top = document.documentElement.scrollTop + document.body.scrollTop;
        if (this.$route.path.indexOf("/index/home") !== -1) {
          this.$store.commit('SET_SCROLL_TOP', top);
        }
      }, 500)
    });
  },
  created() {
    var d = new Date();
    var Y = d.getFullYear() + '-';
    var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';

    var D = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
		var date = Y + M + D;
		//加载首页内容数据
		api.ApiHome().then(res => {
			console.info("首页数据加载成功。")
			this.itemMap = res.data;
			this.$store.commit('SET_ITEM_MAP', this.itemMap);
			window.setTimeout(() => {
				var scrollTop = this.$store.getters.scrollTop;
				window.scrollTo(0, scrollTop);
			}, 100)
			this.loading = false;
		}).catch(error=>{
			this.loading = false;
		});
		
		//加载标签
		api.getTags().then(res => {
			console.info("tags加载成功。")
			this.tagMap = res.data;
		})
		this.$store.commit('SET_TAG_MAP', this.tagMap);
  },
  methods: {}
};
</script>
<style scoped>

</style>
