<template>
	<div>
		<div class="signDes" style="">
      <table cellpadding="0" cellspacing="0" class="head">
      <tr>
        <td class="head_left">
          <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
        </td>
        <td align="center" class="title">
          活动规则
        </td>
        <td class="head_right">
        </td>
      </tr>
      </table>
      <div class="signDesMain">
        <div class="title">
          【活动规则】
        </div>
        <div class="content">
          1，周一至周日共7天为一个签到周期
          <br>
          2，每天签到送{{dayMoney}}金币，连续签到7天，第7天额外送{{addMoney}}金币
          <br>
          3，如果有一天断签，这周将无法获得额外的{{addMoney}}金币
          <br>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
import api from '@/service/api.js'

export default {
  data() {
    return {
      dayMoney:35,
      addMoney:70
    }
  },
  created(){
    api.getSignConfig().then(res=>{
      console.info(res)
      this.dayMoney = res.dayMoney;
      this.addMoney = res.addMoney;
    })
  }
};
</script>
<style scoped>

</style>
