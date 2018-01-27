<template>
<div>
	<!--加载中动画-->
	<loading v-show="loading"></loading>
	<div>
		<div class="index" v-show="!loading">
			<div class="history">
				<!--header-->
				<headbar leftName="收藏" rightName="历史" leftUrl="#/index/bookshelf/collection" rightUrl="#/index/bookshelf/history" :rightButtonType="rightButtonType" v-on:childMethod="switchEdit"></headbar>
				<div class="bookshelfList">
          <table cellpadding="0" cellspacing="0" class="bookshelfListMain">
            <template v-for="(item,index) in list">
            <tr class="bookshelfListMainTr" v-on:click="itemClick(item,index)">
              <td class="bookshelfListChoiceBut editDiv" v-show="edit">
                <img src="../assets/img/icon/select_no.png" v-if="delNum.indexOf(index) == -1">
                <img src="../assets/img/icon/select_yes.png" v-if="delNum.indexOf(index) !== -1">
              </td>
              <td class="bookshelfListMainImg">
                <img :src="item.coverImg">
              </td>
              <td class="bookshelfListMainText">
                <div class="bookshelfListMainTitle">
                  {{item.name}}
                </div>
                <div class="bookshelfListMainDes bookshelfListMainDesAutor">
                  {{item.author}}
                </div>
                <div class="bookshelfListMainDes">
                  更新到{{item.allNum}}话
                </div>
              </td>
              <td class="bookRight">
                <img src="../assets/img/icon/book.png">
                <div>
                  续看{{item.curNum}}话
                </div>
              </td>
            </tr>
            </template>
            </table>
				</div>
        <div class="noContent" v-if="list.length == 0">
          <img src="http://img.boook.cc/cartoon/static/img/empty.png"><br>
            那么多好东西居然都没看 ~ ㄟ(▔＾▔ㄟ)
            <router-link :to="{path:'/index'}">
              <div class="noContentBut">赶紧去逛逛</div>
            </router-link>
        </div>
        <div class="bottomChoiceBut editDiv" v-show="edit">
          <table cellspacing="0" cellpadding="0">
          <tr>
            <td class="editAll" v-on:click="editAll()" v-show="!selectAll">
              <img src="../assets/img/icon/select_yes.png">
              <span>全选</span>
            </td>
            <td class="editAll editAllSelect" v-on:click="editAll()" v-show="selectAll">
              <img src="../assets/img/icon/cancel-y.png">
              <span>取消</span>
            </td>
            <td v-on:click="handleDel()">
              <template v-if="delNum.length == 0">
                <img src="../assets/img/icon/delete-g.png" class="delImg"> 删除
              </template>
              <template v-else-if="delNum.length > 0">
                <img src="../assets/img/icon/delete-y.png" class="delImg"> 删除
              </template>
            </td>
          </tr>
          </table>
        </div>
        <div class="loading" v-show="next_loading">
          <img src="../assets/img/icon/loading.gif">正在玩命加载! 请稍等...
        </div>
				<div class="noData" v-if="no_more && list.length > 0">
          没有更多了
				</div>
			</div>
			<!--footer-->
			<footbar selectNo="3"></footbar>
			<div class="bottom_div">
			</div>
		</div>
	</div>
</div>
</template>

<script>
import loading from '@/components/Loading'
import headbar from '@/components/Headbar'
import footbar from '@/components/Footbar'
import api from '@/service/api.js'

export default {
  data() {
    return {
      rightButtonType:'edit',
      edit: false,
      selectAll: false,
      todeatilType: true,
      hasSubmit:false,
      list: [],
      delNum: [],
      no_more: false,
      loading: true,
      next_loading:false,
      page: 0
    }
  },
  components: {
    loading,
    headbar,
    footbar
  },
  created() {
    console.log(this.list)
    this.getList();
  },
  beforeDestroy: function () {
    $(window).off('.myScroll');
  },
  mounted: function () {
    //下拉加载
    $(window).on('scroll.myScroll',()=>{
      if (this.next_loading || this.no_more) {
        return;
      }
      var webheight = $(document).height();//网页高度
      var top = document.documentElement.scrollTop + document.body.scrollTop; //滚动高度
      if ((200 + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
        this.getList();
      }
    });
  },
  methods: {
    getList() {
      if (this.no_more) {
        return;
      }
      this.page++;
      this.next_loading = true;
      api.getReadRecordsList({pageSize: 10, page: this.page}).then(res => {
        if (res.data.length < 10) {
          this.no_more = true;
        }
        for (var item of res.data) {
          this.list.push(item);
        }
        if(this.list.length == 0){
          this.rightButtonType = 'none';
        }
        this.loading = false;
        this.next_loading = false;
      }).catch(error=>{
          this.loading = false;
          this.next_loading = false;
      })
    },
    itemClick(item,index){
      //非编辑状态
      if (this.todeatilType) {
        this.$router.push({path: '/index/intro/' + item.cartoonId});
      //编辑状态
      } else {
        //取消选中
        if(this.delNum.indexOf(index) !== -1){
          for (var i = 0; i < this.delNum.length; i++) {
            if (this.delNum[i] == index) {
              this.delNum.splice(i, 1)
            }
          }
        //选中
        }else{
          this.delNum.push(index)
        }
        console.log(this.delNum)
      }
    },
    switchEdit(){
      this.edit = !this.edit;
      if(this.edit){
        this.rightButtonType = 'cancel';
        this.todeatilType = false;
      }else{
        this.rightButtonType = 'edit';
        this.todeatilType = true;
      }
    },
    handleDel() {
      this.delNum.sort(function(a,b){return b-a})
      if (this.delNum.length == 0) {
        layer.msg('亲 , 请点击选择要删除的漫画哦!');
        return;
      } else {
        this.hasSubmit = true;
        var arrlist = this.list;
        var len = this.delNum.length;
        for (var i = 0; i < len; i++) {
          var cobj = arrlist[this.delNum[i]]
          arrlist.splice(this.delNum[i],1)
          console.log(cobj.cartoonId)
          api.deleteReadRecords(cobj.cartoonId).then(res => {
            this.hasSubmit = false;
          })
        }
        layer.msg('删除了 '+len+' 条记录!');
        this.list=arrlist
      }
      this.delNum =[] //每次删除操作后，记录数组要清空
      this.edit = false //删除操作后要退出编辑模式
      if(this.list.length == 0){
        this.rightButtonType = 'none';
      }else{
        this.rightButtonType = 'edit';
      }
    },
    editAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        for (var i = 0; i < this.list.length; i++) {
          this.delNum.push(i);
        }
      } else {
        this.delNum = [];
      }
    }
  }
};
</script>
<style scoped>

</style>
