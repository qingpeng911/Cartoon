<template>
	<div>
    <loading v-show="loading"></loading>
    <div class="message" v-show="!loading">
      <table cellpadding="0" cellspacing="0" class="head">
      <tr>
        <td class="head_left">
          <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
        </td>
        <td align="center" class="title" style="padding-left: 30px;">
          系统通知
        </td>
        <td class="head_right" style="width: 80px;">
        </td>
      </tr>
      </table>
    </div>
    <div class="noContent" v-if="list.length == 0">
      <img src="http://img.boook.cc/cartoon/static/img/empty.png"><br>
      当前没有系统通知哦~ ●ω●
    </div>
    <div class="loading" v-show="next_loading">
      <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
    </div>
    <div class="noData" v-if="no_more && list.length > 0">
      没有更多了
    </div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import api from '@/service/api.js'

export default {
  data() {
    return {
      loading:false,
      next_loading: false,
      no_more: false,
      list:[]
    }
  },
  components: {
		loading
	},
  created(){
  }
};
</script>
<style scoped>

</style>
