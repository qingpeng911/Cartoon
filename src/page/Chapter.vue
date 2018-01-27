<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div v-show="!loading">
      <div class="chapter">
          <div class="read mhDeail">
            <div class="head">
              <table cellpadding="0" cellspacing="0" class="headTable head">
              <tr>
                <td class="head_left">
                  <a><img src="../assets/img/icon/back-y.png" class="readHeadLeftImg" v-on:click="back()"></a>
                </td>
                <td align="center" v-if="curChapter.num != 0">
                  第{{curChapter.num}}话 {{curChapter.name}}
                </td>
                <td align="center" v-if="curChapter.num == 0">
                  预告
                </td>
                <td class="head_right">
                  <router-link :to="{path:'/index/intro/'+curChapter.cartoonId}" class="bottomReadBut">
                    全集
                  </router-link>
                </td>
              </tr>
              </table>
            </div>
            <div class="readMain">
              <p>
                <template v-for="imgUrl in curChapter.contents">
                  <img :src="imgUrl" class="lazy">
                </template>
              </p>
            </div>
            <table cellspacing="0" cellpadding="0" class="readMenu">
            <tr class="readMenuImg">
              <td v-on:click="doLike()">
                <img src="../assets/img/icon/zan-y.png" class="like" v-if="faceLike">
                <img src="../assets/img/icon/zan-g.png" class="like" v-if="!faceLike">
              </td>
              <td v-on:click="follow()">
                <img src="../assets/img/icon/follow-y.png" class="follow" v-if="collect">
                <img src="../assets/img/icon/follow-g.png" class="follow" v-if="!collect">
              </td>
            </tr>
            <tr class="readMenuText">
              <td>
                <span class="likeText">赞</span>
              </td>
              <td class="followText">
                    收藏
              </td>
            </tr>
            </table>
            <table cellspacing="10" cellpadding="0" class="filpBut">
            <tr>
              <td class="prev">
                <div v-on:click="upperChapterClick()">
                  <img src="../assets/img/icon/more.png"> {{upperChapterLabel}}
                </div>
              </td>
              <td class="next">
                <div v-on:click="nextChapterClick()">
                  {{nextChapterLabel}}
                  <img src="../assets/img/icon/more.png" class="rightNext">
                </div>
              </td>
            </tr>
            </table>
          </div>
          <!--back home-->
          <a href="#/index" style="position: fixed; bottom: 60px; right: 15px;">
            <img src="../assets/img/icon/back_home.png" style="width: 42px;">
          </a>
          <!--付费拦截-->
          <div id="pay_info" class="readPayDiv" style="display: none;">
            <div class="payDivDes">
              <img src="../assets/img/icon/money.png"> 亲 , 该章节为付费章节,需要购买才能阅读
            </div>
            <div class="payDivText">
              【购买本章节】
            </div>
            <div class="payDivMoney">
              价格 ：<span class="payDivMoneySpan">{{cartoon.cost}}金币</span>
                    <span style="color:red;" v-show="needRecharge">[余额不足!]</span>
            </div>
            <div class="payDivBut" v-if="needRecharge" v-on:click="toRecharge()">
              立即充值
            </div>
            <div class="payDivBut" v-else v-on:click="payCost()">
              确认购买
            </div>
            <div class="payDivBottomDes" v-on:click="changeAutoPay()">
              <img src="../assets/img/icon/yes.png" v-if="autoPay">
              <img src="../assets/img/icon/noSelect-small.png" v-else>
               余额充足时点击下一话自动扣费,不再提醒
            </div>
            <div class="payDivMoneyDes">
              我的钱包 : {{myMoney}} 金币
            </div>
          </div>
      </div>
		</div>
	</div>
</template>

<script>
import loading from '@/components/Loading'
import {getStore, setStore, removeStore} from '@/utils/mUtils'
import api from '@/service/api.js'
  export default {
    data() {
      return {
        curChapter: {
          cartoonId: '',
          cartoonName: '',
          num: undefined,
          name: '',
          coverImg: '',
          contents: [],
          desc: '',
          free: true,
          readNum: 0
        },
        qrCode: '',
        needQrCode: false,
        upperChapter: {},
        nextChapter: {},
        qrCodeIndex: undefined,
        wxUserAccount: {
          giftMoney: 0,
          orderMoney: 0
        },
        autoPay: true,
        chapterId: '',
        scrollHeight: 0,
        payIndex: '',
        cartoon: {
          cost: 0
        },
        myMoney: 0,
        needRecharge: true,
        collect: false,
        like: false,
        faceLike: false,
        isPay: false,
        showAdvert: false,
        advertUrl: '',
        loading: true
      }
    },
    components: {
      loading
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': function (to, from) {
        this.load();
      }
    },
    created() {
        this.init();
    },
    computed: {
      isNeedPay(){
        return !this.curChapter.free && !this.isPay;
      },

      showPayMoney() {
        if (this.cartoon != undefined && this.cartoon.cost != undefined) {
          return this.cartoon.cost;
        }
      },

      isCollect() {
        return this.collect === true;
      },

      upperChapterLabel() {
        let label = "上一话";
        let chapter = null;
        if (this.upperChapter !== undefined && this.upperChapter !== null) {
          chapter = this.upperChapter;
        } else {
          chapter = this.curChapter;
        }

        if (chapter.num == 0) label = "预告";
        else if (chapter.num == 1) label = "第一话";
        else label = "上一话";

        return label;
      },
      nextChapterLabel() {
        return this.nextChapter === undefined || this.nextChapter === null ? '返回首页' : '下一话';
      }
    },

    beforeDestroy: function () {
      layer.close(this.payIndex);
      layer.close(this.qrCodeIndex);
      $(".layui-layer-shade").css("display", "none");
      $(window).off('.chapter');
    },

    mounted: function () {
      if (this.isNeedPay) {
        this.beforePay;
      }
      $(window).on('scroll.chapter', () => {
        $(".headTable").removeClass("readShowHead");
        $(".readMenuTable").removeClass("readShowReadMenu");
        $(".readMenuTable").hide();
        if ((200 + $(window).scrollTop()) > ($(document).height() - $(window).height())) {
          $(".headTable").addClass("readShowHead");
        }
      })
    },

    methods: {
      init() {
        this.load()
      },
      back() {
        this.$router.go(-1);
      },
      openQrcode() {
        this.qrCodeIndex = layer.open({
          type: 1,
          title: false,
          area: ['220px', '220px'],
          scrollbar: false,
          skin: 'layui-layer-nobg', //没有背景色
          content: "<img src='" + this.qrCode + "' style='width: 100%; height: 100%' >",
          cancel: function (index, layero) {
            layer.msg("请先关注公众号");
            return false;
          }
        });
        $(".layui-layer-content").css("overflow", "hidden");
      },
      load() {
        this.chapterId = this.$route.params.chapterId;
        api.getChapters({chapterId:this.chapterId}).then(res => {
          console.log(res.data);
          this.cartoon = res.data['cartoon'];
          this.cartoonId = this.cartoon.id;
          this.curChapter = res.data['curChapter'];
          this.upperChapter = res.data['upperChapter'];
          this.nextChapter = res.data['nextChapter'];
          this.isPay = res.data['isPay'];
          this.wxUserAccount = res.data['wxUserAccount'];
          this.needQrCode = res.data['follow'];
          this.qrCode = "https://open.weixin.qq.com/qr/code?username=gh_4881b602aac9";
          //this.qrCode = res.data['qrCodeUrl'];
          this.myMoney = this.wxUserAccount.giftMoney + this.wxUserAccount.orderMoney;
          this.needRecharge = this.cartoon.cost > this.myMoney;
          this.faceLike = getStore("faceLike_"+this.curChapter.id);
          this.like = this.faceLike;
          this.collect = res.data['collect']
          this.$nextTick(() => {
            window.scrollTo(0, this.scrollHeight);
            if (this.needQrCode) {
              this.openQrcode();
            }
            if (!this.isPay && !this.curChapter.free) {
              this.beforePay();
            }
            this.reportReadRecord();
          });
          this.loading = false;
        }).catch(error=>{
          this.loading = false;
        });
      },

      changeAutoPay() {
        this.autoPay = !this.autoPay;
      },

      //更新阅读记录
      reportReadRecord() {
        let readRecord = {
          chapterId: this.chapterId,
          cartoonId: this.curChapter.cartoonId,
          chapterNum: this.curChapter.num
        };
        console.log(readRecord);
        api.updateReadRecords(readRecord).then(res => {
            console.log("阅读记录已更新")
        });
      },

      readMain() {
        var scrollTop = $(document).scrollTop();
        var height = $(document).height();
        if ($(".headTable").attr("class").indexOf("readShowHead") > -1) {
          $(".headTable").removeClass("readShowHead");
          $(".readMenuTable").removeClass("readShowReadMenu");
          $(".readMenuTable").hide();
        } else {
          $(".headTable").addClass("readShowHead");
          if ((170 + $(window).scrollTop()) < ($(document).height() - $(window).height())) {
            $(".readMenuTable").addClass("readShowReadMenu");
            $(".readMenuTable").show();
          }
        }
      },
      
      follow() {
        this.collection = {
          chapterId: this.chapterId,
          cartoonId: this.curChapter.cartoonId
        }

        var is_follow = 1;
        if ($(".follow").text().indexOf("已收藏") > -1) {
          is_follow = 0;
        }
        var index = layer.load(2);
        if (this.collect == false) {
          console.log(this.collection)
          api.collect(this.collection).then(res => {
            layer.close(index);
            this.collect = true;
            layer.msg('收藏成功!');
          }).catch(error=>{
            layer.close(index);
          })
        } else {
          console.log(this.collection)
          api.collect(this.collection).then(res => {
            layer.close(index);
            this.collect = false;
            layer.msg('取消收藏!');
          }).catch(error=>{
            layer.close(index);
          })
        }
      },

      //付费拦截
      beforePay() {
        this.payIndex = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          offset: '44px',
          anim:2,
          area: ['100%', '317px'],
          skin: 'layui-anim-up',
          offset: 'rb',
          clickable: true,
          content: $("#pay_info"),
          end: function () {
            $('#pay_info').css("display", "none");
          }
        });
        $(".read").attr("style", "height:" + ($(window).height() - 200) + "px; overflow: hidden;");
        $(".layui-layer-shade").css("top", "44px");
      },

      // 确认支付
      payCost() {
        let query = {
          chapterId: this.$route.params.chapterId,
          autoPay: this.autoPay
        };
        api.payCost(query).then((res) => {
          console.log(res);
          this.wxUserAccount = res.data.wxUserAccount;
          if (res.success) {
            this.curChapter = res.data['curChapter'] || this.curChapter;
            $(".read").attr("style", "");
            $(".layui-layer-shade").css("display", "none");
            layer.close(this.payIndex);
          } else {
            let index = layer.load(2);
            layer.close(index);
            layer.msg(res.data.msg);
          }
        });
      },

      //点赞
      doLike() {
        //todo 处理点击喜欢
        console.log("doLike");
        this.faceLike = !this.faceLike;
        if (this.like) {
          if(this.faceLike){
            layer.msg('您已经赞过了哦');
          }
          return;
        }
        layer.msg('点赞数+1');
        let query = {};
        query.cartoonId = this.curChapter.cartoonId;
        query.chapterId = this.curChapter.id;
        api.zan(query).then(res => {
          this.like = true;
          this.faceLike = true;
          setStore("faceLike_"+this.curChapter.id);
        })
      },

      // 上一话
      upperChapterClick() {
        console.log("----> upper replace");
        if (this.upperChapter === undefined || this.upperChapter === null) {
          this.$router.replace({path: '/index/chapter/details/' + this.curChapter.id, replace: true});
        } else {
          this.$router.replace({path: '/index/chapter/details/' + this.upperChapter.id, replace: true});
        }
      },

      // 下一话
      nextChapterClick() {
        console.log("----> next");
        if (this.nextChapter === undefined || this.nextChapter === null) {
          this.$router.replace({path: '/index', replace: true});
        } else {
          this.$router.replace({name: 'chapter', params: {chapterId: this.nextChapter.id}});
        }
      },

      toRecharge() {
        this.$router.push({path: '/index/recharge'});
      },
    }
  }
</script>

<style scoped>

</style>
