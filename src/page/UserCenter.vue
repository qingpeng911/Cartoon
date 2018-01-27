<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div class="index" v-show="!loading">
      <div class="personal">
        <div class="userImg listBottomBorder">
          <div>
            <img :src="wxUser.headimgurl">
          </div>
          <div class="title">
            {{wxUser.nickName}}
          </div>
          <div class="signBut" v-show="!sign" v-on:click="openSign()" style="background: rgb(252, 202, 1); color: white;">
            <span>签到</span>
          </div>
          <div class="signBut" v-show="sign" v-on:click="openSign()" style="background-color: darkgray;color: white;">
            <span>已签到</span>
          </div>
        </div>
        <div class="list">
          <router-link :to="{path:'/index/personal/account'}">
          <div class="listDiv ">
            <img src="../assets/img/icon/wallet.png" class="listImgLeft">我的钱包
            <div class="listImgRight">
              <span class="dabi_number">{{wxUser.giftMoney + wxUser.orderMoney}}</span>金币 &nbsp;<img src="../assets/img/icon/more.png" class="rightNext">
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/index/recharge'}">
          <div class="listDiv listBottomBorder">
            <img src="../assets/img/icon/recharge.png" class="listImgLeft ">我要充值
            <div class="listImgRight" style="color: red;">
              <img src="../assets/img/icon/more.png" class="rightNext">
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/index/personal/buylist'}">
          <div class="listDiv">
            <img src="../assets/img/icon/shop_cart.png" class="listImgLeft listImgLeft">已购漫画
            <div class="listImgRight">
              <img src="../assets/img/icon/more.png" class="rightNext">
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/index/personal/notice'}">
          <div class="listDiv ">
            <img src="../assets/img/icon/msg.png" class="listImgLeft">系统通知
            <div class="listImgRight">
              <img src="../assets/img/icon/more.png" class="rightNext">
            </div>
          </div>
          </router-link>
          
          <!-- 
          <router-link :to="{path:'/index/personal/autobuy'}">
          <div class="listDiv listBottomBorder">
            <img src="../assets/img/icon/setting.png" class="listImgLeft listImgLeft3">付费管理
            <div class="listImgRight">
              <img src="../assets/img/icon/more.png" class="rightNext">
            </div>
          </div>
          </router-link>

          <router-link :to="{path:'/index/personal/feedback'}">
          <div class="listDiv">
            <img src="../assets/img/icon/feedback.png" class="listImgLeft">我要反馈
            <div class="listImgRight">
              <img src="../assets/img/icon/more.png" class="rightNext">
            </div>
            <div id="fkSum" class="news" style="display: none;">
              1
            </div>
          </div>
          </router-link> 
          -->
          <div class="bottom_div">
          </div>
        </div>
        <div id="signDiv" class="signDiv">
          <div class="signMain">
            <div class="signMain_head">
              每周一数据重置
              <router-link :to="{path:'/index/sign/rule'}">
              <div>
                活动规则
              </div>
              </router-link> 
            </div>
            <div class="signMain_title" v-show="!sign" v-on:click="signSave()" style="background: rgb(252, 202, 1);">
              签到
            </div>
            <div class="signMain_title" v-show="sign" v-on:click="signSave()" style="background-color: darkgray;">
              已签到
            </div>
            <div class="signMain_des">
              签到领<span class="mt">{{dayMoney}}</span>个金币
            </div>
            <div class="signMain_date">
              <table>
              <tr>
                <td>
                  周一
                </td>
                <td>
                  周二
                </td>
                <td>
                  周三
                </td>
                <td>
                  周四
                </td>
                <td>
                  周五
                </td>
                <td>
                  周六
                </td>
                <td>
                  周日
                </td>
              </tr>
              <tr class="weekQd">
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['1']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['1'] && dayOfWeek >= 1">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['2']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['2'] && dayOfWeek >= 2">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['3']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['3'] && dayOfWeek >= 3">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['4']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['4'] && dayOfWeek >= 4">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['5']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['5'] && dayOfWeek >= 5">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['6']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['6'] && dayOfWeek >= 6">
                  </span>
                </td>
                <td>
                  <span>
                    <img src="../assets/img/icon/yes.png" v-show="recordMap['7']">
                    <img src="../assets/img/icon/no.png" v-show="!recordMap['7'] && dayOfWeek >= 7">
                  </span>
                </td>
              </tr>
              </table>
            </div>
          </div>
          <div class="signDes">
            <div class="signLine">
              <div class="signLine1">
              </div>
              <div class="signLine2">
              </div>
            </div>
            <div class="signDes_head">
              签到领金币
              <span>连续签到7天额外送<span class="lxmt">{{addMoney}}金币</span></span>
            </div>
            <table cellpadding="0" cellspacing="0">
            <tr style="text-align: center;">
              <td>
                1天
              </td>
              <td>
                2天
              </td>
              <td>
                3天
              </td>
              <td>
                4天
              </td>
              <td>
                5天
              </td>
              <td>
                6天
              </td>
              <td>
                7天
              </td>
            </tr>
            <tr>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="mt">
                  {{dayMoney}}
                </div>
                金币
              </td>
              <td>
                <div class="lx">
                  {{dayMoney + addMoney}}
                </div>
                金币
              </td>
            </tr>
            </table>
          </div>
        </div>
        <!--footer-->
        <footbar selectNo="4"></footbar>
        <div class="bottom_div">
        </div>
      </div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import footbar from '@/components/Footbar'
import api from '@/service/api.js'

export default {
  data() {
    return {
      sign: false,
      payIndex: 1,
      dayOfWeek: 1,
      addMoney: 70,
      dayMoney: 35,
      recordMap: {},
      wxUser: {
        headimgurl: '',
        nickName: '',
        giftMoney: 0, 
        orderMoney: 0
      },
      showfbMsg:false,
      loading:true
    }
  },
  components: {
		loading,
		footbar
	},
  created() {
    api.getUserInfo().then(res => {
      console.info(res);
      if (res.data) {
        this.wxUser = res.data['wxUser'];
      }
      this.qd();
    })
  },
  beforeDestroy: function () {
    layer.close(this.payIndex);
    $(".layui-layer-shade").css("display", "none");
  },
  methods: {
    openSign() {
      this.payIndex = layer.open({
        type: 1,
        title: false,
        closeBtn: 1,
        anim: 4,
        area: ['85%', '430px'],
        skin: 'layui-layer-nobg', //没有背景色
        shadeClose: true,
        content: $('#signDiv'),
        end: function () {
          $('#signDiv').css("display", "none");
        }
      });
    },
    qd() {
      api.getSignList().then(res => {
        console.info(res);
        this.dayOfWeek = res.data['dayOfWeek'];
        this.recordMap = res.data['records'];
        this.addMoney = res.data['addMoney'];
        this.dayMoney = res.data['dayMoney'];
        if(this.recordMap[this.dayOfWeek]){
          this.sign = true;
        }
        this.loading = false;
      })
    },
    signSave() {
      if (!this.sign) {
        api.doSign().then(res => {
          if (res.success) {
            this.sign = true;
            layer.closeAll();
            layer.msg("签到成功,获得" + res.data.todayMoney + "金币！");
            this.qd();
            this.wxAccount = res.data.wxAccount;
          }
        })
      } else {
        layer.msg("您今天已签到过了哦，请明天再来吧！");
      }
    }
  }
};
</script>
<style scoped>
</style>
