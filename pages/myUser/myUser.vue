<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left option"></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text21 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="content">
			<view class="user-header">
				<image src="../../static/icon/help_icon1.png" mode="" class="user-img"></image>
				<view class="userName-box" @click="linkButtons">
					<view class="name-box" @click="linkButtons">
						<text class="name-text" @click="linkButtons">{{ getUserInfoData.phoneAccount }}</text>
						<text class="name-dj" @click="linkButtons">Lv.{{ getUserInfoData.userLevel || 0}}( {{i18n.text100}}:{{ getUserInfoData.distributionLevel || 0}} )</text>
					</view>
					<view class="title-user" @click="linkButtons">{{ getUserInfoData.nickName }}</view>
				</view>
				<uni-icons type="arrowright" size="16" class="form-clear-icon" @click="linkButtons"></uni-icons>
			</view>
			<view class="wallet-box">
				<view class="wallet-list">
					<text class="tit-size" style="width: 50%;">{{ i18n.text1 }}〔USDT〕</text>
					<uni-icons :type="eye == true ? 'eye-filled' : 'eye-slash-filled'" size="18" class="form-clear-icon" color="#fff" @click="eyeButton"></uni-icons>
					<view class="wallet-back" @click="linkButton">
						<uni-icons type="info-filled" size="18" class="form-clear-icon" color="#D8A24B"></uni-icons>
						{{ i18n.text2 }}
					</view>
				</view>
				<view class="wallet-list" v-show="eye">
					<text class="wallet-color">{{ coinSymboldata.walletBalance + coinSymboldata.walletFrozenBalance || '0.000000' }}</text>
				</view>
				<view class="wallet-list" v-show="!eye"><text class="wallet-color">*.******</text></view>
				<view class="wallet-list">
					<text class="tit-size tit-width">{{ i18n.text3 }}〔USDT〕</text>
					<text class="tit-size tit-width">{{ i18n.text4 }}〔USDT〕</text>
				</view>
				<view class="wallet-list" v-show="eye">
					<text class="tit-sizes">{{ coinSymboldata.walletBalance || '0.000000' }}</text>
					<text class="tit-sizes">{{ coinSymboldata.walletFrozenBalance || '0.000000' }}</text>
				</view>
				<view class="wallet-list" v-show="!eye">
					<text class="tit-sizes">*.******</text>
					<text class="tit-sizes">*.******</text>
				</view>
				<view class="wallet-list">
					<view class="button-chongzhi" @click="walletCash(1)">{{ i18n.text6 }}</view>
					<view class="button-chongzhi" @click="walletCash(2)">{{ i18n.text7 }}</view>
				</view>
			</view>
			<view class="wallet-boxs height">
				<view class="wallet-box-list" @click="linkButtonz">
					<uni-icons type="paperplane-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text8 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
				</view>
				<view class="wallet-box-list" @click="linkButtonSM">
					<uni-icons type="contact-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text9 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
					<text class="text-sizeS" v-if="getRealNameInfo.status == 1">{{ i18n.text10 }}</text>
					<text class="text-sizeS" v-else-if="getRealNameInfo.status == 2">{{ i18n.text11 }}</text>
					<text class="text-sizeS" v-else-if="getRealNameInfo.status == 3">{{ i18n.text12 }}</text>
					<text class="text-sizeS" v-else>{{ i18n.text14 }}</text>
				</view>
				<view class="wallet-box-list" @click="linkButtonJG">
					<uni-icons type="images" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text15 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
					<text class="text-sizeS" v-if="getOrganVerifyInfo.status == 1">{{ i18n.text10 }}</text>
					<text class="text-sizeS" v-else-if="getOrganVerifyInfo.status == 2">{{ i18n.text11 }}</text>
					<text class="text-sizeS" v-else-if="getOrganVerifyInfo.status == 3">{{ i18n.text12 }}</text>
					<text class="text-sizeS" v-else>{{ i18n.text14 }}</text>
				</view>

				<view class="wallet-box-list" @click="linkButtonb">
					<uni-icons type="personadd-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text16 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
					<text class="text-sizeS" v-if="getMargin.status == 1">{{ getMargin.marginCount }} USDT {{ i18n.text17 }}</text>
					<text class="text-sizeS" v-else-if="getMargin.status == 2">{{ i18n.text101 }}</text>
					<text class="text-sizeS" v-else-if="getMargin.status == 4">{{ i18n.text120 }}</text>
					<text class="text-sizeS" v-else-if="getMargin.status == 3">{{ i18n.text18 }}</text>
					<text class="text-sizeS" v-else>{{ i18n.text18 }}</text>
				</view>
				<view class="wallet-box-list height" @click="linkButtonGgs">
					<uni-icons type="circle-filled" size="18" class="form-clear-icon"style="float: left;"></uni-icons>
					<view class="text-size" style="width: 58%;float: left;">{{ i18n.text160 }}</view>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
					<view class="text-sizeS" style="float: right;">{{ getUserInfoData.isBindGoogleVerify ==1?i18n.text0018:i18n.text0019 }}</view>
					<!-- <switch name="switchs" :checked="getUserInfoData.googleVerify ==1?true:false" @change="switch1Change" v-show="googleShow" class="text-sizeS"/> -->
				</view>
				<view class="wallet-box-list height" v-if="getUserInfoData.isBindGoogleVerify ==1">
					<uni-icons type="smallcircle" size="18" class="form-clear-icon" style="float: left;"></uni-icons>
					<view class="text-size"  style="float: left;">{{ i18n.text101 }}</view>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
					<view class="text-sizeS" style="float: right;"><text style="margin-right: 10rpx;"> {{ getUserInfoData.googleVerify ==1?i18n.text023:i18n.text022 }}</text><switch name="switchs" :checked="getUserInfoData.googleVerify ==1?true:false" @change="switch1Change" v-show="googleShow" class="text-sizeS"/></view>
					
				</view>
				<view class="wallet-box-list" @click="linkButtonGg" v-if="getUserInfoData.distributionLevel!='4'">
					<uni-icons type="info-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{i18n.text0020}}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
				</view>
				
				<view class="wallet-box-list" @click="linkButtonSZ">
					<uni-icons type="gear-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text19 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
				</view>
				<view class="wallet-box-list" @click="linkButtonL">
					<uni-icons type="info-filled" size="18" class="form-clear-icon"></uni-icons>
					<text class="text-size">{{ i18n.text26 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
				</view>
				
			</view>

			<view class="uni-btn-v" @click="toggleMessage('success')">{{ i18n.text20 }}</view>
			
			<!-- 中部弹框 -->
			<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
				<uni-popup-dialog :type="msgType" :title="i18n.text24" :content="i18n.text25" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
			<!-- 提交信息 -->
			<uni-popup id="dialogInput" ref="dialogInput" type="dialog" @change="change">
				<uni-popup-dialog mode="input" title="输入内容" placeholder="请输入内容" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
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
			getMargin: {
				status: '',
				marginCount: ''
			},
			shareState: false,
			checkedInput: false,
			eye: true,
			getUserInfoData: {},
			getRealNameInfo: {},
			coinSymboldata: {},
			getOrganVerifyInfo: {},
			windowTopHeight: '',
			msgType: 'success',
			checked: false,
			imageUrl: '',
			code: '',
			codeg: '',
			
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
			qrcodeSize: uni.upx2px(260),
			qrcodeSrc: '',
			guge:"",
			openGoogle:"",
			googleShow:true
		};
	},
	computed: {
		i18n() {
			return this.$t('myUser');
		}
	},
	components: { uniIcons, },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('myUser.text21')
		});
		this.allFunction();
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			this.allFunction();
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {
	
	},
	methods: {
		/**
		 * 输入对话框的确定事件
		 */
		dialogInputConfirm(done, val) {
			console.log(val);
			this.value = val
			done()
		},
		/**
		 * 打开提交信息
		 */
		confirmDialog() {
			this.$refs.dialogInput.open()
		},
		clickImg() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			wx.previewImage({
				urls: [this.getUserInfoData.qrCodeInfo], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
				current: '', // 当前显示图片的http链接，默认是第一个
				success: function(res) {
					uni.hideLoading()
				},
				fail: function(res) {
					uni.hideLoading()
				},
				complete: function(res) {
					uni.hideLoading()
				},
			})
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
		codeButton() {
			uni.downloadFile({
				url: this.qrcodeSrc,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$alert(this.$t('myUser.text009'));
							}
						});
					} else {
						this.$alert(res.errorMessage);
					}
				}
			});
		},
		async switch1Change(e) {
		    this.checkedInput = e.detail.value
			if( e.detail.value ==  false){
				let res = await api.closeVerifyHttp({});
				if (res.code === '000') {
					this.getUserInfoFunction();
					this.$alert(this.$t('myUser.text0021'));
				} else {
				  	uni.showToast({ title: res.errorMessage, icon: 'none' });
				} 
			}else{
				let res = await api.openGoogleVerifyHttp({});
				if (res.code === '000') {
					this.getUserInfoFunction();
					this.$alert(this.$t('myUser.text023'));
				} else {
					uni.hideLoading();
					this.$alert(res.errorMessage);
				}
				
			}
		},
		inputEvent(code) {
			if (code.detail.value.length == 6) {
				this.codeg = code.detail.value;
			}
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			if (formData.switchs == false) {
				this.$alert(this.$t('myUser.text0022'));
			}else{
				let res = await api.openVerifyHttp({
					verifyCode:this.code
				});
				if (res.code === '000') {
					this.$alert(this.$t('myUser.text0024'));
					this.handleHiddenShare()
					// REMOVE_STORAGE('token');
					// setTimeout(() => {
					// 	uni.reLaunch({
					// 		url: '/pages/loginReg/login'
					// 	});
					// }, 1000);
				} else {
			      	uni.showToast({ title: res.errorMessage, icon: 'none' });
				
				}
				
			}
			// if (this.codeV == '') {
			// 	this.$alert(this.$t('Withdrawal.text29'));
			// } else if (formData.paddWord == '') {
			// 	this.$alert(this.$t('Withdrawal.text16'));
			// } else {
			// 	this.verifyPayPwdFunftion();
			// }
		},
		navBack() {
			uni.navigateBack();
		},
		linkButtonGg() {
			uni.navigateTo({
				url: '/pages/myUser/codeGg'
			});
		},
		linkButtonGgs() {
			if(this.getUserInfoData.isBindGoogleVerify == 1){
				// this.$alert('myUser.text102')
			}else{
				uni.navigateTo({
					url: '/pages/myUser/codeGgs'
				});
			}
		},
		allFunction() {
			this.getUserInfoFunction();
			this.getRealNameInfoFunction();
			this.getMyAssetsItemFunction();
			this.getOrganVerifyInfoFunction();
			this.getMarginFunction();
		},
		eyeButton() {
			this.eye = !this.eye;
		},
		async getMarginFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getMarginInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getMargin.status = res.data.status;
					this.getMargin.marginCount = res.data.marginCount;
				} else {
					this.getMargin.status = '0';
				}
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		async getOrganVerifyInfoFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getOrganVerifyInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getOrganVerifyInfo = res.data;
				}
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getMyAssetsItemFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getMyAssetsItemHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.coinSymboldata = res.data;
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getRealNameInfoFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getRealNameInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getRealNameInfo = res.data;
				}
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getUserInfoFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getUserInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.getUserInfoData = res.data;
				SET_STORAGE('phone', res.data.phoneAccount);
				SET_STORAGE('email', res.data.emailAddress);
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		walletCash(id) {
			if (id == '1') {
				uni.navigateTo({
					url: '/pages/TopupWithdrawal/TopupWithdrawal?id=' + id
				});
			}
			if (id == '2') {
				if (this.getRealNameInfo.status != 2) {
					this.$alert(this.$t('myUser.text22'));
					return;
				}
				uni.navigateTo({
					url: '/pages/TopupWithdrawal/TopupWithdrawal?id=' + id
				});
			}
		},
		exit() {
			REMOVE_STORAGE('token');
			this.$alert(this.$t('myUser.text23'));
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/loginReg/login'
				});
			}, 1000);
		},
		linkButtonSM() {
			uni.navigateTo({
				url: '/pages/myUser/RealName?stauts=' + this.getRealNameInfo.status
			});
		},
		linkButtonz() {
			uni.navigateTo({
				url: '/pages/myUser/userAccount?isPayPwd=' + this.getUserInfoData.isPayPwd
			});
		},
		linkButtonJG() {
			uni.navigateTo({
				url: '/pages/myUser/Accredited?stauts=' + this.getOrganVerifyInfo.status
			});
		},
		linkButton() {
			uni.navigateTo({
				url: '/pages/myUser/assets'
			});
		},
		linkButtons() {
			uni.navigateTo({
				url:
					'/pages/myUser/levelThe?userLevel=' +
					this.getUserInfoData.userLevel +
					'&realName=' +
					this.getRealNameInfo.realName +
					'&phone=' +
					this.getUserInfoData.phoneAccount
			});
		},
		linkButtonb() {
			if (this.getMargin.status == '3' || this.getMargin.status == '0') {
				uni.navigateTo({
					url: '/pages/myUser/Deposit?marginCount='
				});
			} else {
				uni.navigateTo({
					url: '/pages/myUser/Deposit?marginCount=' + this.getMargin.marginCount
				});
			}
		},
		linkButtonL() {
			uni.navigateTo({
				url: '/pages/myUser/about'
			});
		},
		linkButtonSZ() {
			uni.navigateTo({
				url: '/pages/myUser/setUp'
			});
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
			this.exit();
			// 需要执行 done 才能关闭对话框
			done();
		},
		toggleMessage(type) {
			this.msgType = type;
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {}
	}
};
</script>

<style lang="scss" scoped>
.cancel {
	font-size: 28rpx;
	color: #8ea0ae;
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
	padding: 0 30rpx 30rpx;
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
.qrcode {
	padding: 50upx 0 20upx 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
.title {
	text-align: center;
}
.QrCode {
	width: 300rpx;
	height: 300rpx;
	margin: 0 auto;
	background-color: #eeeeee;
	border: 1px solid #ddd;
	uni-image {
		width: 296rpx;
		height: 296rpx;
	}
}
/deep/ uni-switch .uni-switch-input:after,
uni-switch .uni-switch-input:before {
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input:after {
	width: 26rpx;
}
/deep/ uni-switch .uni-switch-input {
	width: 65rpx;
	height: 30rpx;
}
/deep/ uni-switch .uni-switch-input:after,
uni-switch .uni-switch-input:before {
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input:before {
	width: 62rpx;
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input.uni-switch-input-checked {
	background-color: #06b572 !important;
	border-color: #06b572 !important;
}
.list-box-share {
	padding: 30rpx 0 10rpx;
	height: auto;
	overflow: hidden;
}
.qrcode-body {
	width: 100%;
}

.qrcode-body .qrcode {
	display: flex;
	justify-content: center;
}
.content {
	.wallet-boxs {
		margin-top: 60rpx;
		.wallet-box-list {
			width: 100%;
			font-size: 28rpx;
			padding: 20rpx 0;
			border-bottom: 1px solid #ddd;
			.arrowright {
				float: right;
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
.uni-btn-vs {
	width: 100%;
	height: 72rpx;
	background: linear-gradient(to right, #54cba1, #06b572);
	line-height: 72rpx;
	color: #fff;
	border-radius: 10rpx;
}
</style>
