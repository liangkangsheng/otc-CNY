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
			<view class="reamk-title">{{ i18n.text2 }}</view>
			<view class="steps">{{ i18n.text3 }}</view>
			<view class="steps-title">{{ i18n.text4 }}</view>
			<view class="code-button uni-base-color-06b572" @click="getOrderListFuntion">{{ i18n.text03 }}</view>
			<view class="steps">{{ i18n.text5 }}</view>
			<view class="steps-title">{{ i18n.text6 }}</view>
			<!-- <canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`,margin: '30rpx auto'}" class="QrCode"/> -->
		    <view class="steps-titles steps-top">{{i18n.text7}}{{secret}} <view class="pull-right" @click="addressButton">复制</view></view>
			<view class="steps">{{ i18n.text8 }}</view>
			<view class="steps-title">{{ i18n.text9 }}</view>
			<form @submit="formSubmit" @reset="formReset">
				<!-- <view class="list-box-share">
					<view style="width:100%;text-align: center;position: relative;">
					    {{ i18n.text160 }}  
						<view class="switchs" style="position: absolute;right: 0;top: 0;">
							<switch name="switchs" :checked="getUserInfoData.googleVerify ==1?true:false" @change="switch1Change" />
						</view>
					</view>
				</view> -->
				<view class="code-input-main" v-if="">
					<view class="inputLine">
						<input class="input-item" maxlength="1" :value="code[0]" type="number" />
						<input class="input-item" maxlength="1" :value="code[1]" type="number" />
						<input class="input-item" maxlength="1" :value="code[2]" type="number" />
						<input class="input-item" maxlength="1" :value="code[3]" type="number" />
						<input class="input-item" maxlength="1" :value="code[4]" type="number" />
						<input class="input-item" maxlength="1" :value="code[5]" type="number" />
					</view>
					<input class="code-input-input" v-model="code" maxlength="6" type="number" name="code" @input="inputEvent" />
				</view>
				<button class="uni-btn-vs pull-left" form-type="submit" size="mini">{{ i18n.text180 }}</button>
			</form>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import uQRCode from '@/api/qcode.js'
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
			imageUrl:"",
			// 二维码
			ifShow: true,
			val: '二维码', // 要生成的二维码值
			size: 200, // 二维码大小
			unit: 'rpx', // 单位
			background: '#b4e9e2', // 背景色
			foreground: '#309286', // 前景色
			pdground: '#32dbc6', // 角标色
			icon: '', // 二维码图标
			iconsize: 40, // 二维码图标大小
			lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
			onval: false, // val值变化时自动重新生成二维码
			loadMake: true, // 组件加载完成后自动生成二维码
			src: '' ,// 二维码生成后的图片地址或base64
			qrcodeText: 'uQRCode 更新时间：2020-09-27',
			qrcodeSize: uni.upx2px(320),
			qrcodeSrc: '',
			guge:"",
			secret:"",
			getUserInfoData:{},
			code:""
		};
	},
	computed: {
		i18n() {
			return this.$t('codeGgs');
		}
	},
	components: { uniIcons },
	onLoad() {
		this.openGoogleVerify()
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			this.openGoogleVerify()
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {},

	methods: {
		inputEvent(code) {
			
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			uni.showLoading({ title: this.$t('about.text5'), mask: true });
			let res = await api.openVerifyHttp({
				verifyCode:this.code
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('about.text601'))
				uni.reLaunch({
					url: '/pages/myUser/myUser'
				});
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
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
		make(code) {
			uQRCode.make({
				canvasId: 'qrcode',
				text: code,
				size: this.qrcodeSize,
				margin: 10
			}).then(res => {
				this.qrcodeSrc = res
			}).finally(() => {
				uni.hideLoading()
			})
		},
		// 开启二维码
		async openGoogleVerify() {
			let res = await api.openGoogleVerifyHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.make(res.data.qrcode)
				this.secret = res.data.secret
			} else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
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
								this.$alert(this.$t('codeGgs.text09'));
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
				data: this.secret,
				success: (res) => {
					this.$alert($t('codeGgs.text012'));
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
						window.location.href = "http://m.2265.com/down/302457.html"
					}
					if(res.platform == 'ios'){
						window.location.href = "https://apps.apple.com/app/google-authenticator/id388497605"
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
	.code-input-input {
		height: 160rpx;
		position: absolute;
		outline: none;
		color: transparent;
		text-shadow: 0 0 0 transparent;
		width: 300%;
		margin-left: -100%;
	}
	.code-input-main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 150rpx;
		margin-top: 50rpx;
	}
	.input-item {
		width: 80rpx;
		height: 80rpx;
		font-size: 40rpx;
		border: 1px solid #ddd;
		text-align: center;
		border-radius: 5%;
		margin-left: 10rpx;
		margin-right: 10rpx;
		color: #333;
	}
	
	.inputLine {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 20rpx;
	}
	
	
	
	.code-button {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		width: 180rpx;
		flex-wrap: nowrap;
		text-align: center;
		margin: 30rpx 0 0;
		border: 1px solid $uni-base-color-06b572;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		// background-color: rgba(6,181,114,0.3);
		color: #06b572 !important;
		vertical-align: middle;
		float: left;
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
	.reamk-title{
		padding: 20rpx;
		background-color: #eee;
		border-radius: 20rpx;
		color: #999;
		font-size: 26rpx;
	}
	.steps{
		margin: 30rpx 0 10rpx;
		font-size: 26rpx;
		color: #06b572;
	}
	.steps-title{
		font-size: 28rpx;
		font-weight: bold;
	}
	.steps-top{
		margin: 20rpx 0;
	}
	.uni-btn-vs {
		height: 72rpx;
		background: linear-gradient(to right, #54cba1, #06b572);
		line-height: 72rpx;
		color: #fff;
		border-radius: 10rpx;
		position: fixed;
		bottom: 20rpx;
		left:30rpx;
		right: 30rpx;
	}
</style>
