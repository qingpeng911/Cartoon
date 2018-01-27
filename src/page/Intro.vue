<template>
	<div>
		<!--加载中动画-->
		<loading v-show="loading"></loading>
		<div v-show="!loading">
			<div class="detail">
				<div class="headMain">
					<div class="headMainImgBg">
						<img src="http://img.boook.cc/cartoon/static/img/cover_bg.png">
					</div>
					<div class="headMainImg">
						<img :src="cartoon.coverImg">
					</div>
					<table cellpadding="0" cellspacing="0" class="detailHead detailRollOff">
					<tr>
						<td class="head_left">
							<a href="javascript:history.back(-1);"><img src="../assets/img/icon/back.png"></a>
						</td>
						<td class="title">
							{{cartoon.name}}
						</td>
						<td class="head_right">
							<div class="follow active" style="line-height: 18px;" v-show="!collect" v-on:click="follow()">
								<span>+</span> 收藏
							</div>
							<div class="has_follow" v-show="collect" v-on:click="follow()">
								已收藏
							</div>
						</td>
					</tr>
					</table>
					<div class="headMainImgText">
						<div class="headMainImgTitle">
							{{cartoon.name}}
						</div>
						<div class="headMainImgType">
							{{  tagMap[cartoon.tagId] }}
						</div>
					</div>
				</div>
				<table cellspacing="0" cellpadding="0" class="tabBut">
					<tr>
						<td v-on:click="changeTab(false)">
							<div :class="['introductionBut', showChapter ? '' : 'tabButSelect' ]">
								详情
							</div>
						</td>
						<td v-on:click="changeTab(true)">
							<div :class="['anthologyBut', showChapter ? 'tabButSelect' : '' ]">
								选集
							</div>
						</td>
					</tr>
				</table>
				<div class="introductionMain" v-show="!showChapter">
					<div class="introductionMainTitle">
						作品简介
					</div>
					<div class="introductionMainText">
						{{cartoon.desc}}
					</div>
					<div class="introductionMainAuthor">
						作者 : {{cartoon.author}}
					</div>
					<table class="followAndBrowse">
					<tr>
						<td>
							<div class="followDiv">
								<img src="../assets/img/icon/eye.png"> 总浏览 <span>{{cartoon.vreadNum >= 10000 ? String(cartoon.vreadNum / 10000).split('.')[0]+'万' : cartoon.vreadNum}}</span>
							</div>
						</td>
						<td>
							<div class="browseDiv">
								<img src="../assets/img/icon/zan.png"> 点赞 <span>{{cartoon.zanNum >= 10000 ? String(cartoon.zanNum / 10000).split('.')[0]+'万' : cartoon.zanNum}}</span>
							</div>
						</td>
					</tr>
					</table>
				</div>
				<!--选集-->
				<div class="anthologyMain"  v-show="showChapter">
					<div class="anthologyMainHead">
            <span v-if="cartoon.status">【已完结】</span>
            <span v-else>【连载中】</span><span class="total_data_hua">共{{cartoon.chapterNum}}话</span>
            <div class="anthologyMainHeadSort" v-show="!isSortDesc" v-on:click="handleSort('desc')">
                <span>正序</span><img src="../assets/img/icon/asc.png">
            </div>
            <div class="anthologyMainHeadSort" v-show="isSortDesc" v-on:click="handleSort('asc')">
                <span>倒序</span><img src="../assets/img/icon/desc.png">
            </div>
          </div>
          <div class="detailMenu">
            <div class="detailMenuList">
                <div v-for="c in chapterList" class="titleDiv">
                  <router-link :to="{path:'/index/chapter/details/'+c.id}">
                    <div :class="['title','already', lastRead.chapterNum == c.num ? '' : 'alreadyOff' ]" v-show="c.num > 0">
                      {{c.num}}话
                    </div>
                    <div :class="['title','already', lastRead.chapterNum == 0 ? '' : 'alreadyOff' ]" v-show="c.num == 0">
                      预告
                    </div>
                    <div class="needBuyDiv" v-show="!c.free">
                      <img src="../assets/img/icon/lock.png" v-show="!c.sub">
                      <img src="../assets/img/icon/unlock.png" v-show="c.sub">
                    </div>
                  </router-link>
                </div>
            </div>
          </div>
				</div>
				<div class="bottom_div"></div>
				<table cellspacing="0" cellpadding="0" class="bottom_but">
					<tr class="but_text">
						<td class="bottomReadButTitle">
							<span>{{lastRead.chapterNum}}话</span>
						</td>
						<td class="bottomReadButTd">
							<router-link :to="{path:'/index/chapter/details/'+lastRead.chapterId}" class="bottomReadBut">
								开始阅读
							</router-link>
						</td>
					</tr>
				</table>
			</div>
			<router-link to="/index" style="position: fixed; bottom: 60px; right: 15px;">
				<img src="../assets/img/icon/back_home.png" style="width: 42px;">
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
		tagMap : {},
        max_page: 5,
        page: 1,
        loading: true,
        cartoonId: '',
        sort: 'asc',
        chapterList: [],
        newIndex: 0,
        collect: false,
        lastRead: {
          chapterId: "",
          chapterNum: 0
        },
        collection: {},
        cartoon: {
          "id": "",
          "name": "",
          "tagId": "",
          "author": "",
          "desc": "",
          "money": 39,
          "coverImg": "",
          "rankImg": "",
          "updateUser": "s0",
          "status": false,
          "enable": false,
          "vReadNum": 0,
          "feedNum": 0,
          "storeNum": 0,
          "chapterNum": 1,
          "currentChapter": 1,
        },
        isHiden: false,
        showChapter: false,
        showAdvert: false,
      }
	},
	components: {
		loading
	},
    created() {
      //加载标签
      api.getTags().then(res => {
      console.info("tags加载成功。")
      this.tagMap = res.data;
      })
      this.init();
    },
    computed: {
      // 计算更新到第几个章节， 否则 回报 undefined
      updateChapter() {
        if (this.chapterList !== undefined
          && this.chapterList[this.newIndex] !== undefined
          && this.chapterList[this.newIndex].updateTime !== undefined) {
          let date = parseTime(this.chapterList[this.newIndex].updateTime, '{y}-{m}-{d}');
          return `${date} 更新到${this.cartoon.currentChapter - 1}话`;
        }
        return '';
      },
      updateLastReadNum() {
        return this.lastRead.chapterNum;
      },
      isSortDesc(){
        return this.sort == 'desc';
      }
    },
    watch: {
      collect: function (newValue, oldValue) {
        localStorage.setItem("curCollect", newValue);
      }
    },
    beforeDestroy: function () {
      $(window).off('.myScroll');
    },
    mounted: function () {
      $(window).on('scroll.myScroll', () => {
        if (document.body.scrollTop > 240) {
          $(".detailHead").addClass("detailRollOn");
          $(".detailHead").removeClass("detailRollOff");
        } else {
          $(".detailHead").addClass("detailRollOff");
          $(".detailHead").removeClass("detailRollOn");
        }
      });
    },
    methods: {
      init() {
        this.cartoonId = this.$route.params.id;
        //加载数据
        api.getDetail({cartoonId: this.cartoonId}).then(res => {
          console.log("漫画详情加载成功。");
          this.cartoon = res.data['cartoon'];
          this.chapterList = res.data['chapterList'];
          this.lastRead = res.data['readRecord'];
          this.collect = res.data['collect'];
        //this.sort = getMhSort(this.cartoon.id);
        //this.handleSort(this.sort);
          if (this.chapterList.length > 16) {
            this.isHiden = true;
          } else {
            this.isHiden = false;
          }
          this.loading = false;
        }).catch(error=>{
          this.loading = false;
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      changeTab(isShowChapter) {
        this.showChapter = isShowChapter;
      },
      handleSort(sort) {
        this.sort = sort;
        if (this.sort == 'desc') {
          this.newIndex = 0;
          this.chapterList.sort(function (a, b) {
            return b.num - a.num
          });
        } else {
          this.newIndex = this.chapterList.length - 1;
          this.chapterList.sort(function (a, b) {
            return a.num - b.num
          });
        };
      },
      follow() {
        this.collection = {
          cartoonId: this.cartoonId
        };

        if (this.lastRead.chapterId && this.lastRead.chapterId.length !== 0) {
          this.collection.chapterId = this.lastRead.chapterId;
        } else {
          this.collection.chapterId = this.chapterList[0].id;
        }
        var index = layer.load(2);
        if (this.collect == false) {
          api.collect(this.collection).then(res => {
            layer.close(index);
            this.collect = true;
            layer.msg('收藏成功!');
          }).catch(error=>{
            layer.close(index);
          })
        } else {
          api.collect(this.collection).then(res => {
            layer.close(index);
            this.collect = false;
            layer.msg('取消收藏!');
          }).catch(error=>{
            layer.close(index);
          })
        }
      },
    }
};
</script>

<style scoped>
.has_follow{
	line-height: 27px;
    background-color: rgba(255, 255, 255, 0.7);
    color: rgb(105, 105, 105);
	font-size: 14px;
    border-radius: 20px;
    height: 25px;
    padding: 0 10px;
    margin-top: 9px;
    margin-right: 15px;
}

.detail .headMainImgText {
    position: relative;
    bottom: 155px;
    height: 0;
    color: #fff;
    padding: 20px;
}
</style>
