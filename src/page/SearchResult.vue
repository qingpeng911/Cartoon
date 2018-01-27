<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="searchList" v-show="!loading">
      <table cellspacing="0" cellpadding="0" class="searchHead">
        <tr>
          <td class="searchHeadInputTd">
            <div>
              <img src="../assets/img/icon/search-y.png">
              <input placeholder="请输入搜索内容" type="text" v-model="keyword">
            </div>
          </td>
          <td class="searchHeadBut" v-on:click="search()">
            搜索
          </td>
        </tr>
      </table>
      <div class="bookshelfList">
        <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
          <template v-for="item in list">
          <tr class="bookshelfListMainTr" v-on:click="detail(item)">
            <td class="bookshelfListMainImg">
              <img :src="item.rankImg">
            </td>
            <td class="bookshelfListMainText">
              <div class="bookshelfListMainTitle">
                {{item.name}}
              </div>
              <div style="height: 0px; float: right;">
              </div>
              <div class="bookshelfListMainDes">
                {{item.author}}
              </div>
              <div class="bookshelfListMainType">
                {{  tagMap[item.tagId] }}
              </div>
              <div class="bookshelfListMainImgDiv">
                <img src="../assets/img/icon/eye.png"><span>{{item.vReadNum >= 10000 ? String(item.vReadNum / 10000).split('.')[0]+'万' : item.vReadNum}}</span>
                <img src="../assets/img/icon/zan.png"><span>{{item.zanNum >= 10000 ? String(item.zanNum / 10000).split('.')[0]+'万' : item.zanNum}}</span>
              </div>
            </td>
          </tr>
          </template>
        </table>
        <div class="noContent" v-show="no_content">
          <img src="http://img.boook.cc/cartoon/static/img/empty.png"><br>
            翻遍箱底也找不到主人想要的... 乀(ˉεˉ乀) 
        </div>
        <div class="loading" v-show="loading_next">
          <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
        </div>
        <div class="noData" v-show="no_more">
          <img src="http://img.boook.cc/cartoon/static/img/nodata.png">没有更多了
        </div>
      </div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import api from '@/service/api.js'
import {getStore, setStore, removeStore} from '@/utils/mUtils'

export default {
  data() {
    return {
      tagMap: {},
      no_more:false,
      no_content:false,
      page:0,
      loading:false,
      loading_next:false,
      list:[],
      keyword:''
    }
  },
  components: {
		loading
	},
  created() {
    this.keyword = this.$route.params.keyword;
    if (this.keyword!='') {
      this.next();
    }
    api.getTags().then(res => {
			this.tagMap = res.data;
		})
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {

    //下拉加载
    $(window).on('scroll.myScroll',()=>{
      if(this.loading_next || this.no_more){
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
    search(){
      if (this.keyword!='') {
        this.list =[];
        this.page=0;
        this.no_more=false;
        this.no_content=false;
        this.next();
      }
    },
    next() {
      if(this.loading_next){
        return;
      }
      this.page++;
      this.loading_next=true;
      api.doSearch({keyword:this.keyword,pageSize:10, page:this.page}).then(res=>{
        if(res.data.length == 0 && this.page == 1){
          this.no_content=true;
        }else if (res.data.length < 10) {
          this.no_more=true;
        }
        for (var item of res.data){
          this.list.push(item);
        }
        this.loading_next=false;
        this.loading = false;
      }).catch(error=>{
        this.loading = false;
        this.loading_next = false;
      })
    },
    detail(item){
      this.$router.push({ path: '/index/intro/'+item.id });
    },
  }
};
</script>

<style scoped>

</style>
