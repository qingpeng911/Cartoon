<template>
	<table cellpadding="0" cellspacing="0" class="head">
		<tr>
			<td class="head_left">
			</td>
			<td align="center">
				<table class="head_but">
				<tr>
						<template v-if="leftSelected">
							<td class="head_but_click">
								{{leftName}}
							</td>
						</template>
						<template v-else>
							<td>
								<a v-bind:href="leftUrl">{{leftName}}</a>
							</td>
						</template>
					
						<template v-if="leftSelected">
							<td>
								<a v-bind:href="rightUrl">{{rightName}}</a>
							</td>
						</template>
						<template v-else>
							<td class="head_but_click">
								{{rightName}}
							</td>
						</template>
				</tr>
				</table>
			</td>
			<template v-if="rightButtonType == 'search'">
				<td class="head_right">
					<router-link :to="{path:'/index/search'}">
						<img src="../assets/img/icon/search.png">
					</router-link>
				</td>
			</template>
			<template v-else-if="rightButtonType == 'edit'">
				<td class="head_right" v-on:click="childSwitchEdit()">
					<img src="../assets/img/icon/edit.png">
				</td>
			</template>
			<template v-else-if="rightButtonType == 'cancel'">
				<td class="head_right" v-on:click="childSwitchEdit()">
					<img src="../assets/img/icon/cancel.png">
				</td>
			</template>
			<template v-else="rightButtonType == 'none'">
				<td class="head_right">
				</td>
			</template>
		</tr>
	</table>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'Headbar',
  data () {
    return {
    }
  },
  props: ['leftName', 'rightName','leftUrl','rightUrl','leftSelected','rightButtonType'],
  methods:{
	childSwitchEdit(){
	  this.$emit('childMethod'); 
	  //第一个参数名为调用的方法名，第二个参数为需要传递的参数
	}
  }
}
</script>
