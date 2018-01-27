<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="ranking mhDeail endList" v-show="!loading">
      <div class="main">
        <div class="bgDiv">
          <img src="http://img.boook.cc/cartoon/static/img/finish_bg.png" class="bgImg">
        </div>
        <div class="time">
          亲 , 完结的漫画都在这里展示哦
        </div>
        <div class="bookshelfList">
          <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
          <tr class="bookshelfListMainTr" v-for="(item,index) in list" v-on:click="detail(item)">
            <td class="bookshelfListMainImg">
              <img :src="item.rankImg">
            </td>
            <td class="bookshelfListMainText">
              <div class="bookshelfListMainTitle">
                {{item.name}}
              </div>
              <div class="bookRight" style="height: 0px; float: right; margin-top: 10px;">
                <img src="http://img.boook.cc/cartoon/static/img/No1.png" v-show="index == 0">
                <img src="http://img.boook.cc/cartoon/static/img/No2.png" v-show="index == 1">
                <img src="http://img.boook.cc/cartoon/static/img/No3.png" v-show="index == 2">
                <span v-show="index > 2">{{index+1}}</span>
              </div>
              <div class="bookshelfListMainDes">{{item.author}}</div>
              <div class=" bookshelfListMainType">{{  tagMap[item.tagId] }}</div>
              <div class="bookshelfListMainDesText">更新到第{{item.currentChapter}}话</div>
            </td>
          </tr>
          </table>
          <div class="loading" v-show="next_loading">
            <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
          </div>
          <div class="noData" v-show="!have_data">
            <img src="http://img.boook.cc/cartoon/static/img/nodata.png">没有更多了
          </div>
        </div>
      </div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import api from '@/service/api.js'
export default {
  data() {
    return {
      tagMap:{},
      have_data:true,
      page:0,
      loading:true,
      next_loading:false,
      list:[]
    }
  },
  components: {
    loading
  },
  created() {
    api.getTags().then(res => {
			this.tagMap = res.data;
		})
    this.next();
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.myScroll',()=>{
      if(this.loading || !this.have_data){
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
      if(!this.have_data){
        $(".noData").show();
        return;
      }
      this.page++;
      this.next_loading=true;
      api.getFinished({pageSize:10, page:this.page}).then(res => {
        this.loading = false;
        if (res.data.length < 10) {
          this.have_data=false;
        }
        for (var item of res.data){
          this.list.push(item);
        }
        this.next_loading=false;
      }).catch(error=>{
        this.loading = false;
        this.next_loading = false;
      });
    },
    detail(item){
      this.$router.push({ path: '/index/intro/'+item.id });
    },
  }
};
</script>

<style scoped>

</style>
