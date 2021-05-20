<template>
	<view class="content">
		
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import api from '@/api/index.js';
	import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
	export default {
		data() {
			return {
				
			}
		},
		components: {uniIcons},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '首页'
			})
		},
		computed: {
		    i18n () {  
		        return this.$t('setUp')
		    }  
		},
		mounted() {
		
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
	}
</style>
