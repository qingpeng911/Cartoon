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
              {{type}}
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
      have_data:false,
      type:'',
      items:[],
      loading:true
    }
  },
  components: {
    loading
  },
  computed: {
  },
  created() {
    this.type = this.$route.params.type;
    api.pageitems({name : this.type}).then(res => {
      this.loading= false;
      if (res.success) {
        this.items = res.data;
      }
      if (this.items.length == 0) {
        this.have_data = false;
      }
    }).catch(error=>{
      this.loading = false;
    })
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
