<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div v-show="!loading">
      <div class="group">
        <table cellpadding="0" cellspacing="0" class="head">
          <tr>
            <td class="head_left">
              <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
            </td>
            <td align="center" class="title">
              免费专区
            </td>
            <td class="head_right">
            </td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
					<template v-for="cartoon in items">
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
      </div>
      <div class="loading" v-show="next_loading">
        <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
      </div>
      <div class="noData" v-show="!have_data">
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
      page:0,
      have_data:true,
      items:[],
      loading:true,
      next_loading:false
    }
  },
  components: {
    loading
  },
  computed: {
  },
  created() {
    this.next();
  },
  beforeDestroy: function () {
    $(window).off('.free');
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.free',()=>{
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
  methods:{
    next() {
      if(!this.have_data){
        $(".noData").show();
        return;
      }
      this.page++;
      this.next_loading=true;
      api.getFree({pageSize:10, page:this.page}).then(res => {
        this.loading=false;
        this.next_loading=false;
        if (res.data.length < 10) {
          this.have_data=false;
        }
        for (var item of res.data){
          this.items.push(item);
        }
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
