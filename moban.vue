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
			// http://romannurik.github.io/AndroidAssetStudio/nine-patches.html#source.type=image&sourceDensity=160&name=img1
			// http://blog.applicationloader.net/blog/zh/88.html ios 上架 教程
			// https://developer.apple.com/account/#/welcome
			// App Store Connect
			// http://18.177.251.246:81/OTC
			// http://18.177.251.246/uweb/swagger-ui.html#!/user-controller/saveReceiveAccountUsingPOST
			// http://18.177.251.246/auth/swagger-ui.html
			// uni.showLoading({title: '加载中'});uni.hideLoading();
			// uni.showToast({ title: "即将跳转", icon: 'none' });uni.hideToast();
			// https://www.runoob.com/svn/tortoisesvn-intro.html svn使用教程
			// https://ip138.com/ 查询外网ip
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
