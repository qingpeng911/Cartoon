<template>
	<div>
    <loading v-show="loading"></loading>
    <div class="recharge" style="background-color: white;" v-show="!loading">
      <table cellpadding="0" cellspacing="0" class="head">
      <tr>
        <td class="head_left">
          <a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
        </td>
        <td align="center" class="title">
          金币充值
        </td>
        <td class="head_right">
        </td>
      </tr>
      </table>
      <div class="yhq"></div>
      <div class="money_main">

        <div class="money_main_list" v-for="item in products" v-on:click="selectPay(item)">
          <div :class="['money_main_div', selectItem.id == item.id ? 'select' : '' ]">
            <div class="giveMoney">
              <div>
                <img src="../assets/img/icon/checked.png" style="transform: rotate(26deg); height: 10px;">
              </div>
            </div>
            <div class="gold" style="padding-top: 2px;">
              <img src="../assets/img/icon/money.png"><span>{{item.amount / 100 * money_radio}}</span>
            </div>
            <div class="zs_dabi" v-if="item.giftAmount != 0">
              赠送{{item.giftAmount / 100 * money_radio}}
            </div>
            <div class="group_money">
              ￥{{item.amount / 100}}
            </div>
          </div>
        </div>

      </div>
      <div class="des"><div class="desTitle"><div>充值说明</div></div> <div class="desLine"></div>
        1.尊敬的读者您好，漫画的免费章节之后就进入到VIP收费章节,兑换比率为1元=100阅读币,30元可以兑换3338个阅读币,可以看很多部漫画，而一部漫画的创作往往需要几年的时间;<br>
        2.未完结的漫画作品,本漫画平台会持续更新,请一定要收藏和持续关注喔;<br>
        3.漫画的创作很不容易,真诚期待您可以支持正版,充值越多赠送越多,您的支持是对作者最大的鼓励;<br>
        4.您在平台购买收费服务成功后,漫画平台将即时收取费用，虚拟产品不提供退费服务，敬请谅解;<br>
        5.若充值遇到任何问题,可咨询客服微信:
      </div>
      <div style="height: 35px;"></div>
      <div class="bottomDiv">
        <div class="bottomDiv_but" v-on:click="pay()">
          立即充值
        </div>
        <div class="bottomDiv_left" style="margin-right: 20px;">
          <span class="bottomDiv_left_money" style="display: inline-block; text-align: right;">
          支付金额 : 
            <span class="bottomDiv_left_money_1" style="color: red;">￥ </span>
            <span class="bottomDiv_left_money_2" style="color: red;">{{selectItem.amount / 100}}</span>
          </span>
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
      loading: true,
      fromRoute: {},
      fromChapterId: '',
      money_radio: 100,
      products: [
        {
          id: '1',
          amount: 1000,
          giftAmount: 0,
          defaultSelect:false,
          firstBuy:false,
        },
        {
          id: '2',
          amount: 3000,
          giftAmount: 600,
          defaultSelect:false,
          firstBuy:false,
        },
        {
          id: '3',
          amount: 5000,
          giftAmount: 1600,
          defaultSelect:true,
          firstBuy:false,
        },
        {
          id: '4',
          amount: 8000,
          giftAmount: 3000,
          defaultSelect:false,
          firstBuy:false,
        },
        {
          id: '5',
          amount: 10000,
          giftAmount: 4000,
          defaultSelect:false,
          firstBuy:false,
        },
        {
          id: '6',
          amount: 20000,
          giftAmount: 10000,
          defaultSelect:false,
          firstBuy:false,
        },
      ],
      selectItem: {
        id: '3',
        amount: 5000,
      },
      isClick: false
    }
  },
  components: {
		loading
	},
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fromRoute = from);
  },
  created() {
    api.getProductList().then(res => {
      this.products = res.data;
      this.money_radio = res.money_radio;
      for (let item of this.products) {
        if (item.defaultSelect) {
          this.selectItem = item;
        }
      }
      this.loading = false;
    }).catch(error=>{
      this.loading = false;
    });
  },
  mounted: function () {
  },
  methods: {
    pay() {
      let index = layer.load(2);
      if (this.selectItem.id == '') {
        layer.close(index);
        layer.msg('请选择充值金额！');
        return;
      }
      if(true){
        layer.close(index);
        layer.msg('仅测试使用');
        return;
      }
      let query = {
        selectId: this.selectItem.id,
        fromUrl: this.fromRoute.fullPath
      };

      if (this.fromRoute && this.fromRoute.name == 'chapter') {
        query.fromChapterId = this.fromRoute.params.chapterId;
      }

      console.log(this.fromRoute);

      if (!this.isClick) {
        request.post('/api/wxpay/recharge', query).then(res => {
          if (res && res.success) {
            this.onBridgeReady(res.data);
          }
        });
      }
    },

    onBridgeReady(data) {
      this.isClick = true;
      let vm = this;
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
        appId: data.appId,
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: data.signType,
        paySign: data.paySign,
      }, function (res) {
        vm.isClick = false;
        console.log("支付结果", res);
        if (res.err_msg == "get_brand_wcpay_request:cancel") {
          console.log("用户取消支付");
          request.get('/api/wxpay/cancel/' + data.orderId, {}).then(cancel => {
            console.log(cancel);
          });
        } else if (res.err_msg == "get_brand_wcpay_request:ok") {
          console.log("支付成功");
          request.get('/api/wxpay/success/' + data.orderId, {}).then(success => {
            console.log(success);
            if (vm.fromRoute && vm.fromRoute.path) {
              console.log('支付成功', vm.fromRoute);
              vm.$router.push({path: vm.fromRoute.path, replace: true});
            }
          });
        } else {
          request.post('/api/wxpay/fail/' + data.orderId, res).then(fail => {
            console.log(fail);
            let index = layer.load(2);
            layer.close(index);
            layer.msg(res.err_desc);
          });
        }
      });
    },
    selectPay(item) {
      this.selectItem = item;
    },
  }
};
</script>
<style scoped>

</style>
