<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="ranking mhDeail" v-show="!loading">
      <div class="main">
        <div class="bgDiv">
          <img src="http://img.boook.cc/cartoon/static/img/ranking_bg.png" class="bgImg">
        </div>
        <div class="time">
          下周出榜时间: <span>{{nextTime}}</span> 09:00
        </div>
        <div class="bookshelfList">
          <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
          <tr class="bookshelfListMainTr" v-for="(item,index) in items" v-on:click="detail(item)">
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
      items:[],
      loading:true,
      nextTime:''
    }
  },
  components: {
		loading
	},
  created() {
		api.getTags().then(res => {
			this.tagMap = res.data;
		})
    api.pageitems({name : '周排行'}).then(res => {
      this.loading= false;
      this.items = res.data;
    }).catch(error=>{
      this.loading = false;
    })

    // 获取下周一日期
    var Stamp;
    Stamp = new Date();
    var num = 7-Stamp.getDay()+1;
    Stamp.setDate(Stamp.getDate() + num);
    var year = Stamp.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = Stamp.getMonth() +1; //获取当前月份(0-11,0代表1月)
    var mvar ='';
    if(month<10){
      mvar = '0' + month;
    }else{
      mvar = month+'';
    }
    var day = Stamp.getDate();
    var dvar ='';
    if(day<10){
      dvar = '0' + day;
    }else{
      dvar = day+'';
    }
    this.nextTime = mvar+'月'+dvar+'日';
  },
  filters: {
    tagFilter(tagId) {
      return tagMap[tagId]
    }
  },
  methods:{
    detail(item){
      this.$router.push({ path: '/index/intro/'+item.id });
    },
  }
};
</script>

<style scoped>

</style>
