<template>
	<table cellspacing="0" cellpadding="0" class="bottom_but">
		<tr class="but_img">
			<td>
				<router-link :to="{path:'/index/new/hot'}">
					<img src="../assets/img/icon/fresh-grey.png" v-show="selectNo != 1">
					<img src="../assets/img/icon/fresh.png" v-show="selectNo == 1">
				</router-link>
			</td>
			<td>
				<router-link :to="{path:'/index'}">
					<img src="../assets/img/icon/home-grey.png" v-show="selectNo != 2">
					<img src="../assets/img/icon/home.png" v-show="selectNo == 2">
				</router-link>
			</td>
			<td>
				<router-link :to="{path:'/index/bookshelf/history'}">
					<img src="../assets/img/icon/store-grey.png" v-show="selectNo != 3">
					<img src="../assets/img/icon/store.png" v-show="selectNo == 3">
				</router-link>
			</td>
			<td>
				<router-link :to="{path:'/index/personal/user_center'}">
					<img src="../assets/img/icon/person-grey.png" v-show="selectNo != 4">
					<img src="../assets/img/icon/person.png" v-show="selectNo == 4">
				</router-link>
				<div class="myMsg" style="display: none;">
				</div>
			</td>
		</tr>
		<tr class="but_text">
				<td :class="[selectNo == 1 ? 'but_text_select' : '' ]">
					<router-link :to="{path:'/index/new/hot'}">
					抢鲜
					</router-link>
				</td>
				<td :class="[selectNo == 2 ? 'but_text_select' : '' ]">
					<router-link :to="{path:'/index'}">
					首页
					</router-link>
				</td>
				<td :class="[selectNo == 3 ? 'but_text_select' : '' ]">
					<router-link :to="{path:'/index/bookshelf/history'}">
					书柜
					</router-link>
				</td>
				<td :class="[selectNo == 4 ? 'but_text_select' : '' ]">
					<router-link :to="{path:'/index/personal/user_center'}">
					我的
					</router-link>
				</td>
		</tr>
	</table>
</template>

<style scoped>
	.bottom_but .but_text .but_text_select a{
    	color: #fcca01;
	}
</style>

<script>
export default {
  name: 'Footbar',
  data () {
    return {
    }
  },
  props: ['selectNo']
}
</script>
