<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import api from '@/api/index.js';
	import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
    //import api from '@/api/index.js';
	//import { mapGetters } from 'vuex' 3333333333
	export default {
		computed:{
			//...mapGetters(['token'])
		},
		computed: {
			
		},
		onLoad() {
			const system_info=GET_STORAGE("system_info")
			system_info.language = this._i18n.locale  || "cn"
		},
		onLaunch: function() {
			if(typeof(plus) != "undefined"){
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					//console.error(widgetInfo.version);
					uni.request({
						// 这里填写的是当前电脑所在局域网的ip地址加端口号加接口地址
						url: 'http://api01.rojmfqq.cn/uweb/app/update',  
						data: {
							version: widgetInfo.version,  
							name: widgetInfo.name  
						},
						
						success: (result) => {
							//console.error(result.data);
							var data = result.data;  
							if (data.update && data.wgtUrl) {
								uni.downloadFile({
									url: data.wgtUrl,
									success: (downloadResult) => {
										if (downloadResult.statusCode === 200) {
											plus.runtime.install(downloadResult.tempFilePath, {}, function() {
												plus.nativeUI.closeWaiting()
												plus.nativeUI.alert('版本已更新，请重启应用！', () => {
													console.error('install success...');
													console.log("版本号：" + widgetInfo.version);
													plus.runtime.restart()
												})
											}, function(e) {
												console.error('install fail...');
											});
										}
									}
								});
							}
						}
					});
				});
			}
			this.$store.dispatch('WEBSOCKET_INIT', 'wss://api.hadax.com/ws');
		},
		onShow: function() {
		},
		onHide: function() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
/*每个页面公共css */
@import './style/common.scss';

.uni-base-color-06b572 {
	color: $uni-base-color-06b572;
}
.uni-base-color-de6334 {
	color: $uni-base-color-de6334;
}
page {
	background: $uni-base-color;
}
view {
	box-sizing: border-box;
	font-family: PingFang SC;
}
.color_primary {
	color: $uni-color-primary;
}
.uni-text-color {
	color: $uni-text-color;
}
.uni-text-color-grey {
	color: $uni-text-color-grey;
}
.uni-font-size {
	font-size: $uni-font-size;
	color: $uni-textJ-color;
}
.back-color {
	width: 100%;
	height: 20rpx;
	background-color: #ddd;
}
.border-bottom {
	border-bottom: 1px solid #ddd;
}
.height {
	height: auto;
	overflow: hidden;
}
.pull-left {
	float: left;
}
.pull-right {
	float: right;
}
.account-list {
	padding: 18rpx 0;
}
.border-bottom {
	border-bottom: 1px solid #ddd;
}
.break-word{
	word-wrap: break-word;
	word-break: break-all;
}
.copy_icon{
	width: 30rpx;
	height: 30rpx;
	float: right;
}
/deep/
.uni-btn-icon{
	margin-right: 30rpx;
}
/deep/
.content .uni-radio-input-checked{
	background-color:$uni-base-color-06b572 !important;
	border-color:$uni-base-color-06b572 !important;
}
.wallet-box-list{
	line-height: 40rpx;
}
.content{
	display: flex;
	flex-direction: column;
	padding: 0 30rpx 30rpx;
	background: #fff;
}
.CheckDetails{
	text-align: right;
	color: #007AFF;
	float: right;
	font-size: 24rpx;
	margin:20rpx 0;
}
.page-top-head{
		padding: 0 20rpx;
		height: 98rpx;font-size: 30rpx;color: #000;position: sticky;top:var(--status-bar-height);z-index: 3;background-color: #fff;
	}
	.box-header{
		width: 33.3%;
		float: left;
	}
	.head-title{text-align: center;}
	.head-icon{width: 34rpx;height: 34rpx;}
	.head-back{width: 22rpx;height: 36rpx;text-align: right;}
	.right-title{
		font-size: 28rpx;
		color: #999;
		text-align: right;
	}
	.option{
		opacity: 0;
	}
	.margin-left{
		// margin-left: -20rpx;
	}
	.padding-30{
		padding: 0 30rpx;
	}
	
	
	
	
	
	// 底部弹框
	.share {
		width: 100%;
		height: 100%;
	}
	.share-box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		background-color: rgba(0, 0, 0, 0.4);
		transition: 0.3s;
		z-index: 999;
	}
	// 进入分享动画
	.share-show {
		transition: all 0.3s ease;
		transform: translateY(0%) !important;
	}
	// 离开分享动画
	.share-item {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		background-color: #ffffff;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 1999;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		padding:30rpx;
		.pay-list{
			padding:30rpx  0;
		}
		.content {
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			.block {
				width: 33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 180rpx;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					margin-top: 16rpx;
					font-size: 28rpx;
					color: #606266;
				}
			}
		}
	}
	.icon-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		display: block;
		float: left;
	}
	.priceStatus{
		margin: 25rpx 0;
	}
	.text-users {
		display: block;
		float: left;
		line-height: 30rpx !important;
	}
	.paySatus{
		margin-right: 30rpx;
	}
	.border-bottom-none:last-child{
		border-bottom: none;
		padding-bottom: 0 !important;
	}
</style>
