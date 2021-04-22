<template>
	<view class="">
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text14 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="bannerDetails">{{bannerDetails.title}}</view>
		<view class="bannerDetailscontent" v-html="bannerDetails.content"></view>
		<view class="bannerDetailscreateTime pull-right" v-if="bannerDetails.createTime">{{ i18n.text16}}{{bannerDetails.createTime}}</view>
	</view>
	
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import api from '@/api/index.js';
	import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
	export default {
		data() {
			return {
				id:"",
				bannerDetails:{}
			}
		},
		components: {uniIcons},
		onLoad(option) {
            uni.setNavigationBarTitle({
				title: '首页'
			})
			this.id = option.id
			this.queryNoticeFunction()
		},
		computed: {
		    i18n () {  
		        return this.$t('bannerDetails')
		    }  
		},
		onPullDownRefresh() {
			let _this = this;
			setTimeout(() => {
				this.queryNoticeFunction()
				uni.stopPullDownRefresh();
			}, 300);
		},
		mounted() {},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			async queryNoticeFunction(){
				uni.showLoading({ title: this.$t('bannerDetails.text15'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.getNoticeDetailHttp({
					id:this.id
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.bannerDetails =  res.data
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('bannerDetails.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
	}
	.bannerDetails{
		margin-top: 100rpx;
		height: 48rpx;
		font-weight: bold;
		text-align: center;
		padding-bottom: 30rpx;
	}
	.bannerDetailscontent{
		margin-top: 30rpx;
		padding: 0 30rpx;
	}
	.bannerDetailscreateTime{
		font-size: 24rpx;
		color: #999;
		padding-top: 45rpx;
		padding-right: 30rpx;
	}
</style>
