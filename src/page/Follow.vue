<template>
<div>
	<!--加载中动画-->
	<loading v-show="loading"></loading>
	<div>
		<div class="index" v-show="!loading">
			<div class="new">
				<!--header-->
				<headbar leftName="关注" rightName="热门" leftUrl="#/index/new/follow" rightUrl="#/index/new/hot" leftSelected="true" rightButtonType="search"></headbar>
				<div class="newList">
					<template v-for="item in list">
            <div class="newListMian">
              <div id="ct_1502985600" class="newTimeText">
                <img src="../assets/img/icon/new.png"><span> 第{{item.curNum}}话</span>
                <div class="newTitleLefe">
                    <img src="../assets/img/icon/eye.png"><span>{{item.readNum >= 10000 ? String(item.readNum / 10000).split('.')[0]+'万' : item.readNum}}</span>
                    <img src="../assets/img/icon/zan.png"><span>{{item.zanNum >= 10000 ? String(item.zanNum / 10000).split('.')[0]+'万' : item.zanNum}}</span>
                </div>
              </div>
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
              </router-link>
            </div>
					</template>
				</div>
        <div class="loading" v-show="next_loading">
          <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
        </div>
				<div class="noContent" v-show="no_content">
					<img src="http://img.boook.cc/cartoon/static/img/empty.png"><br>
					亲,你还没有关注的漫画哦 ! ~QAQ~
          <router-link :to="{path:'/index'}">
						<div class="noContentBut">再去逛逛</div>
					</router-link>
				</div>
        <div class="noData" v-show="no_more">
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
      list: [],
      no_more: false,
      no_content: false,
      loading: true,
      next_loading: false,
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
    $(window).on('scroll.myScroll',()=>{
      if (this.next_loading || this.no_content) {
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
      this.page++;
      api.getFollow({pageSize:10, page:this.page}).then(res => {
        if (res.data.length == 0 && this.page == 1) {
          this.no_content = true;
        }
        if (res.data.length < 10 && !this.no_content) {
          this.no_more = true;
        }
        for (var item of res.data) {
          this.list.push(item);
        }
        this.loading = false;
        this.next_loading = false;
      }).catch(error=>{
          this.loading = false;
          this.next_loading = false;
      });
    }
  }
};
</script>
<style scoped>

</style>
