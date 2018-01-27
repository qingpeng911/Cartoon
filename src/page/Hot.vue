<template>
<div>
	<!--加载中动画-->
	<loading v-show="loading"></loading>
	<div>
		<div class="index" v-show="!loading">
			<div class="new">
				<!--header-->
				<headbar leftName="关注" rightName="热门" leftUrl="#/index/new/follow" rightUrl="#/index/new/hot" rightButtonType="search"></headbar>
				<div class="newList">
					<template v-for="item in list">
					<div class="newListMian">
						<div class="newTitle">
							<span class="newTitleType" style="background-color: rgb(242, 42, 9);">{{item.type}}</span>
							<span class="newTitleText">{{item.name}}</span>
							<router-link :to="{path:'/index/intro/'+item.cartoonId}">
								<div class="newTitleLefe newTitleLeftArrow">
									全集<img src="../assets/img/icon/more.png" class="rightNext">
								</div>
							</router-link>
						</div>
						<router-link :to="{path:'/index/chapter/details/'+item.chapterId}">
							<div class="newImgDiv">
								<img :src="item.coverImg">
							</div>
							<div class="newTitle">
								<span class="newTitlezj">{{item.updateTime}}更新至{{item.curNum}}话</span>
								<div class="newTitleLefe">
									<img src="../assets/img/icon/eye.png"><span>{{item.readNum >= 10000 ? String(item.readNum / 10000).split('.')[0]+'万' : item.readNum}}</span>
									<img src="../assets/img/icon/zan.png"><span>{{item.zanNum >= 10000 ? String(item.zanNum / 10000).split('.')[0]+'万' : item.zanNum}}</span>
								</div>
							</div>
						</router-link>
					</div>
					</template>
				</div>
        <div class="loading" v-show="next_loading">
          <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
        </div>
				<div class="noData" v-show="!have_data">
					<img src="http://img.boook.cc/cartoon/static/img/nodata.png">没有更多了
				</div>
			</div>
			<!--footer-->
			<footbar selectNo="1"></footbar>
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
      have_data: true,
      loading: true,
      next_loading: false,
      list: [],
      end: false,
      page: 0,

    }
  },
  components: {
	loading,
	headbar,
	footbar
  },
  created() {
    this.next();
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.myScroll', () => {
      if (this.next_loading || !this.have_data) {
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
    next() {
      this.next_loading = true;
      if (!this.have_data) {
        $(".noData").show();
        return;
      }
      this.page++;
      api.getHot({pageSize:10, page:this.page}).then(res => {
        if (res.data.length < 10) {
          this.have_data = false;
        }
        for (var item of res.data) {
          this.list.push(item);
        }
        this.$nextTick(() => {
          if (this.page === 1) {
            window.scrollTo(0, 1)
            window.scrollTo(0, 0)
          }
        })
        this.loading = false;
        this.next_loading = false;
      }).catch(error=>{
        this.loading = false;
        this.next_loading = false;
      });
    }

  },
};
</script>
<style scoped>

</style>
