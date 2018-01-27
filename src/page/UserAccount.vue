<template>
	<div>
    <loading v-show="loading"></loading>
    <div class="money" v-show="!loading">
      <table cellpadding="0" cellspacing="0" class="moneyHead">
      <tr>
        <td class="head_left">
          <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
        </td>
        <td align="center" class="title" style="padding-left: 30px;">
          我的钱包
        </td>
        <td class="head_right" style="width: 80px;">
          <!-- 
          <router-link :to="{path:'/index/personal/expense'}">
            金币明细
          </router-link> 
          -->
        </td>
      </tr>
      </table>
      <img src="http://img.boook.cc/cartoon/static/img/money_bg.png" class="moneyImg">
      <div class="moneyText">
        我的金币
      </div>
      <div class="moneySum">
        <img src="../assets/img/icon/money.png">{{wxAccount.giftMoney + wxAccount.orderMoney}}
      </div>
      <router-link :to="{path:'/index/recharge'}">
      <div class="moneyBut">
        立即充值
      </div>
      </router-link>
    </div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import api from '@/service/api.js'

export default {
  data() {
    return {
      loading:true,
      wxAccount: {
        giftMoney: 0, 
        orderMoney: 0
      },
    }
  },
  components: {
		loading
	},
  created(){
    api.getUserMoney().then(res=>{
      console.info(res)
      this.wxAccount = res.data.wxAccount;
      this.loading = false;
    }).catch(error=>{
      this.loading = false;
    })
  }
};
</script>
<style scoped>

</style>
