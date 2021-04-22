<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text1 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="content">
			<image src="../../common/logo/logo.png" mode="" class="logo-img"></image>
			<p class="app-Name">GOLDOTC{{i18n.text2}}</p>
			<view class="QrCode"><image :src="imageUrl" mode=""></image></view>
			<view class="userCode">
				{{ i18n.text1 }}
			</view>
			<view class="ownerInvitationCode">
				{{ownerInvitationCode}}<image src="../../static/images/code.png" mode="" class="copy_icon" @click="addressButton"></image>
			</view>
			<view class="code-button uni-base-color-06b572" @click="codeButton">{{ i18n.text03 }}</view>
			<view class="address">{{ i18n.text4 }}</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			msgType:'success',
			versionName:"",
			updateContent:"",
			downloadLink:"",
			versionNames:"",
			TypeOfNow:"",
			ownerInvitationCode:"",
			imageUrl:""
		};
	},
	computed: {
		i18n() {
			return this.$t('codeGg');
		}
	},
	components: { uniIcons },
	onLoad() {
		this.getOrderListFuntion()
		this.getUserInfoFunction()
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			this.getOrderListFuntion();
			this.getUserInfoFunction()
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {},

	methods: {
		navBack() {
			uni.navigateBack();
		},
		agreementButton(id){
			// 4 关于我们协议html
			// 5 隐私协议html
			// uni.navigateTo({
			// 	url: '/pages/agreement/agreement?id='+id
			// });
		},
		async getUserInfoFunction() {
			uni.showLoading({ title: this.$t('codeGg.text13'), mask: true });
			let res = await api.getUserInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.imageUrl = res.data.qrCodeInfo;
				this.ownerInvitationCode = res.data.ownerInvitationCode;
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		codeButton() {
			uni.downloadFile({
				url: this.imageUrl,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$alert(this.$t('codeGg.text09'));
							}
						});
					} else {
						this.$alert(res.errorMessage);
					}
				}
			});
		},
		addressButton() {
			uni.setClipboardData({
				data: this.ownerInvitationCode,
				success: (res) => {
					this.$alert($t('codeGg.text012'));
				}
			});
			uni.getClipboardData({
				success: function(res) {}
			});
		},
		async getOrderListFuntion() {
			const _this = this ; //改变this指向
			// 获取设备信息
			var sysType = ""
			uni.getSystemInfo({
				success: function (res) {
					if(res.platform == 'android'){
						sysType = 0
					}
					if(res.platform == 'ios'){
						sysType = 1
					}
					if(res.platform == '小程序'){
						sysType = 2
					}
				}
			})
		    // #ifdef APP-PLUS
		    uni.showLoading({ title: this.$t('about.text5'), mask: true });
			let res = await api.getLatestVersionHttp({
				sysType:sysType,
				versionNo:plus.runtime.versionCode
			});
			if (res.code === '000') {
				uni.hideLoading();
				var data = res.data
				this.versionName = data.versionName
				this.versionNames = plus.runtime.version
				this.updateContent = data.updateContent
				this.downloadLink = data.downloadLink
				this.versionNo = data.versionNo
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('about.text600'))
			}  else {
				uni.hideLoading();
			}
			
			// #endif
		},
		
		linkButtonSZ() {
			uni.navigateTo({
				url: '/pages/myUser/setUp'
			});
		},
		updateContentButton(){
			if(this.versionNo > plus.runtime.versionCode){
				this.toggleMessage('success')
			}else{
				this.$alert(this.$t('about.text11'))
			}
			// #ifdef APP-PLUS
			// #endif
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.msgType = 'info';
			// this.message = '点击了对话框的取消按钮';
			this.$refs.popupDialog.open();
			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框点击确认按钮
		 */
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			plus.runtime.openURL(this.downloadLink);
			// 需要执行 done 才能关闭对话框
			done();
		},
		toggleMessage(type) {
			this.msgType = 'success';
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {},
	}
};
</script>

<style lang="scss" scoped>
	.code-button {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		background-color: $uni-base-color-06b572;
		color: #fff !important;
		vertical-align: middle;
	
		margin: 30rpx auto;
	}
	.ownerInvitationCode{
		line-height: 48rpx;
		text-align: center;
		font-weight: bold;
		margin: 0 auto;
		font-size: 28rpx;
	}
	.copy_icon{
		margin-top: 10rpx;
		margin-left: 10rpx;
	}
	.userCode{
		text-align: center;
		font-size: 28rpx;
		line-height: 50rpx;
	}
	.QrCode {
		width: 300rpx;
		height: 300rpx;
		margin: 100rpx auto 20rpx;
		background-color: #eeeeee;
		border: 1px solid #ddd;
		uni-image {
			width: 296rpx;
			height: 296rpx;
		}
	}
.content {
	.app-title{
		color: #999;
		font-size: 26rpx;
	}
	.app-version{
		text-align: center;
		font-size: 24rpx;
		margin: 20rpx 0;
		color: #999;
	}
	.app-Name{
		text-align: center;
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}
	.logo-img{
		width: 100rpx;
		height: 100rpx;
		display: block;
		margin: 100rpx auto 30rpx;
		border-radius: 10rpx;
	}
	.wallet-boxs {
		margin-top: 60rpx;
		.wallet-box-list {
			width: 100%;
			font-size: 28rpx;
			padding: 20rpx 0;
			border-bottom: 1px solid #ddd;
			.arrowright {
				float: right;
				// margin-top: 5rpx;
			}
			.text-size {
				margin: 0 30rpx;
			}
			.text-sizeS {
				float: right;
				color: #06b572;
			}
		}
	}
	.button-chongzhi {
		width: 180rpx;
		height: 60rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 10rpx;
		background: #c4a577;
		float: left;
		font-size: 26rpx;
	}
	.tit-sizes {
		font-size: 28rpx;
		font-weight: 900;
		color: #f2f2f2;
		width: 50%;
		display: block;
		float: left;
	}
	.tit-width {
		width: 50%;
		display: block;
		float: left;
		font-size: 28rpx;
	}
	.wallet-box {
		background: linear-gradient(to right, #e2c490, #d8a24b);
		border-radius: 20rpx;
		margin: 30rpx 0;
		padding: 30rpx;
		overflow: hidden;
	}
	.tit-size {
		font-size: 28rpx;
		color: #fff;
		height: 50rpx;
		line-height: 50rpx;
	}
	.wallet-color {
		font-size: 30rpx;
		color: #f2f2f2;
		font-weight: bold;
	}
	.wallet-back {
		font-size: 28rpx;
		line-height: 50rpx;
		color: #d8a24b;
		background: #fff;
		width: 280rpx;
		height: 50rpx;
		padding-left: 20rpx;
		border-radius: 100rpx;
		float: right;
		margin-right: -100rpx;
		.form-clear-icon {
			margin-right: 20rpx;
		}
	}
}
.user-header {
	background: #fff;
	padding: 30rpx 0;
	.user-img {
		width: 120rpx;
		height: 120rpx;
		display: block;
		float: left;
	}
	.userName-box {
		float: left;
		font-size: 26rpx;
		margin-left: 20rpx;
		margin-top: 20rpx;
		.name-dj {
			background: #bb8856;
			color: #fff;
			margin-left: 20rpx;
			padding: 0 10rpx;
		}
		.title-user {
			margin-top: 20rpx;
			color: #999;
		}
	}
	.form-clear-icon {
		display: block;
		float: right;
		margin-top: 50rpx;
	}
}
.uni-btn-v {
	width: 80%;
	height: 70rpx;
	margin: 30rpx auto;
	text-align: center;
	border-radius: 10rpx;
	background: linear-gradient(to right, #54cba1, #06b572);
	border-radius: 100rpx;
	line-height: 70rpx;
	color: #fff;
	font-size: 28rpx;
}
</style>
