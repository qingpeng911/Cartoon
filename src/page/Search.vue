<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="search" v-show="!loading">
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
      <div class="content">
        <div class="title">
          热门搜索
        </div>
        <div class="hotBut">
          <template v-for="item in hotList">
            <router-link :to="{path:'/index/intro/'+item.cartoonId}" class="bottomReadBut">
              <div>
                {{item.name}}
              </div>
            </router-link>
          </template>
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
      keyword: '',
      deleteFlag:false,
      historys:[],
      hotList:[],
      loading:true
    }
  },
  components: {
		loading
	},
  created() {
    // this.historyList();
    api.getHotkeys().then(res=>{
      this.hotList= res.data;
      this.loading = false;
    }).catch(error=>{
      this.loading = false;
    })
  },
  ready: function () {
  },
  methods: {
    search() {
      let _keyword = this.keyword;
      if (_keyword != '') {
        this.$router.push({ path: '/index/search/result/'+_keyword });
      } else {
        layer.msg('请输入您想搜索的内容!');
      }
    },
    delHistory() {
      removeStore("search_historys");
      layer.msg('历史记录已清空!');
      this.historyList();
    },
    historyList() {
      this.historys = getStore("search_historys");
      console.info(this.historys)
    },
    delName(keyword) {
      this.deleteFlag = true;
      for(var i=0; i< this.historys.length; i++) {
        if(this.historys[i] == keyword) {
          this.historys.splice(i, 1);
          break;
        }
      }
      layer.msg('删除成功!');
      setStore("search_historys",this.historyList);
      setTimeout(function () {
        this.deleteFlag = true;
      }, 500)
    },
    hotBut(item){
      if (!this.deleteFlag) {
        this.$router.push({ path: '/index/search/result/'+item });
      }
    }
  }
};
</script>

<style scoped>

</style>
