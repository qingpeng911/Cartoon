<template>
	<div>
    <loading v-show="loading"></loading>
    <div class="group bugList" v-show="!loading">
      <table cellpadding="0" cellspacing="0" class="head">
      <tr>
        <td class="head_left">
          <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
        </td>
        <td align="center" class="title">
          已购漫画
        </td>
        <td class="head_right">
        </td>
      </tr>
      </table>
      <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
      <tr class="bookshelfListMainTr" v-for="item in list" v-on:click="detail(item)">
        <td class="bookshelfListMainImg">
          <img :src="item.coverImg">
        </td>
        <td class="bookshelfListMainText">
          <div class="bookshelfListMainTitle">
            {{item.cartoonName}}
          </div>
          <div class="bookshelfListMainDes">
            {{item.author}}
          </div>
          <div class="bookshelfListMainText">
            已购{{item.chapterIds.length}}话
          </div>
        </td>
      </tr>
      </table>
      <div class="noContent" v-if="list.length == 0">
        <img src="http://img.boook.cc/cartoon/static/img/empty.png"><br>
          您还没有购买过漫画哦 ~ ●ω●
          <router-link :to="{path:'/index'}">
            <div class="noContentBut">再去逛逛</div>
          </router-link>
      </div>
      <div class="loading" v-show="next_loading">
        <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
      </div>
      <div class="noData" v-show="no_more && list.length != 0">
        <img src="http://img.boook.cc/cartoon/static/img/nodata.png">没有更多了
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
      no_more: false,
      list: [],
      hasData: false,
      page: 0,
      pageSize: 10,
      loading: true
    }
  },
  components: {
		loading
	},
  created() {
    this.fetchData();
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.myScroll',()=>{
      if (this.next_loading || this.no_more) {
        return;
      }
      var webheight = $(document).height();//网页高度
      var top = document.documentElement.scrollTop + document.body.scrollTop; //滚动高度
      if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
        this.fetchData();
      }
    });
  },
  methods: {
    fetchData() {
      if (this.no_more) return;
      this.page++;
      this.next_loading = true;
      api.getBuyRecordList({pageSize: this.pageSize, page: this.page}).then(res => {
        console.log(res);
        if (res.data.length < 10) {
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
    },
    detail(item) {
      this.$router.push({path: '/index/intro/' + item.cartoonId});
    },
  }
};
</script>
<style scoped>

</style>
