<template>
<div>
	<div>
		<div class="index">
			<div class="group">
				<!--header-->
				<headbar leftName="首页" rightName="分类" leftUrl="#/index" rightUrl="#/index/typeshow" rightButtonType="search"></headbar>
				<!--tag list-->
				<div class="groupMenu">
					<div :class="['groupTitle', listQuery.tagId == '全部' ? 'groupTitleSelect' : '' ]" v-on:click="changeTab('全部')">
						<div class="groupBottomBorder">
							全部
						</div>
					</div>
					<template v-for="(vaule, key) in tagMap">
						<div :class="['groupTitle', listQuery.tagId == key ? 'groupTitleSelect' : '' ]" v-on:click="changeTab(key)">
							<div class="groupBottomBorder">
								{{vaule}}
							</div>
						</div>
					</template>
				</div>
				<div class="sortBut">
					<span :class="[listQuery.sortBy == 'recommend' ? 'sortButSelect' : '']" v-on:click="changeSort('recommend')">推荐</span> |
					<span :class="[listQuery.sortBy == 'hot' ? 'sortButSelect' : '']" v-on:click="changeSort('hot')">最火热</span> |
					<span :class="[listQuery.sortBy == 'new' ? 'sortButSelect' : '']" v-on:click="changeSort('new')">新上线</span>
				</div>
				<table cellpadding="0" cellspacing="0" class="bookshelfListMain typeshowBookshelfListMain">
					<template v-for="cartoon in list">
						<tr class="bookshelfListMainTr"  v-on:click="detail(cartoon)">
							<td class="bookshelfListMainImg">
								<img :src="cartoon.coverImg">
							</td>
							<td class="bookshelfListMainText">
								<div class="bookshelfListMainTitle">
									{{cartoon.name}}
								</div>
								<div class="bookshelfListMainDes">
									{{cartoon.desc}}
								</div>
								<div class="bookshelfListMainImgDiv">
									<img src="../assets/img/icon/eye.png"><span>{{cartoon.vReadNum >= 10000 ? String(cartoon.vReadNum / 10000).split('.')[0]+'万' : cartoon.vReadNum}}</span>
									<img src="../assets/img/icon/zan.png"><span>{{cartoon.zanNum >= 10000 ? String(cartoon.zanNum / 10000).split('.')[0]+'万' : cartoon.zanNum}}</span>
								</div>
							</td>
						</tr>
					</template>
				</table>
			<div class="noContent" style="display:none;">
				<img src="http://img.boook.cc/cartoon/static/img/nodata.png"><br>
					主人 , 我正在努力的上传新漫画哦 !
			</div>
			<div class="loading" v-show="loading">
				<img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
			</div>
			<div class="noData" v-show="no_data">
				<img src="http://img.boook.cc/cartoon/static/img/nodata.png">主人 , 我也是有底线的哦
			</div>
			<!--footer-->
			<footbar selectNo="2"></footbar>
			<div class="bottom_div">
			</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import loading from '@/components/Loading'
import headbar from '@/components/Headbar'
import footbar from '@/components/Footbar'
import api from '@/service/api.js'

export default {
	data() {
		return {
			loading: false, //显示加载动画
			no_data: false, //没有数据
      tagMap: {},
      list: [],
      listQuery: {
        page: 0,
        tagId: '全部',
        pageSize: 10,
        sortBy: 'recommend'
      }
		}
	},
	components: {
		loading,
		headbar,
		footbar
	},
  created() {
    this.next();
    //加载标签
		api.getTags().then(res => {
			console.info("tags加载成功。")
			this.tagMap = res.data;
		})
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.myScroll',()=>{
      if (this.loading || this.no_data) {
        return;
      }
      var webheight = $(document).height();//网页高度
      var top = document.documentElement.scrollTop + document.body.scrollTop; //滚动高度
      if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
        this.next();
      }
    });
  },
  methods: {
		changeTab(tagId) {
			this.listQuery.tagId = tagId;
			this.reload();
		},
		changeSort(sort) {
			this.listQuery.sortBy = sort;
			this.reload();
		},
    reload() {
			//重新初始化
      this.list = [];
      this.no_data = false;
			this.listQuery.page = 0;
			//加载
      this.next();
    },
    next() {
      if (this.no_data) {
        $(".noData").show();
        return;
      }
      this.listQuery.page++;
			this.loading = true;
			api.getTypeshow(this.listQuery).then(res => {
				if (res.data.length < this.listQuery.pageSize) {
					this.no_data = true;
				}
				for (var item of res.data) {
					this.list.push(item);
				}
				this.loading = false;
      }).catch(error=>{
        this.loading = false;
      })
    },
    detail(item) {
      this.$router.push({path: '/index/intro/' + item.id});
    },
  }
};
</script>
<style scoped>

</style>
