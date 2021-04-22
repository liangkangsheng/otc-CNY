<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text13 }}</view>
			</view>
			<view class="box-header" style="text-align: right;font-size: 26rpx;">
				<text @click="navBackButton">{{ i18n.text25 }}</text>
			</view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<text class="pull-left">USDT</text>
				
			</view>
			<view class="header">
				<view class="text-name pull-left">{{ i18n.text1 }}</view>
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay pull-right"
					:id="tab.id"
					:data-current="tab.id"
					:class="tabIndexPay == tab.id ? 'uni-tab-item-title-active-pay' : ''"
					@click="ontabtapPay"
				>
					<text class="text-b uni-padding-wrap">{{ tab.name }}</text>
				</view>
			</view>
			<view class="address">{{ i18n.text2 }}</view>
			<view class="address address-text padding-t">
				<view class="border-bottom height">
					<view class="input pull-left"><input type="text" v-model="addressRess" :placeholder="i18n.text3" placeholder-class="fomr-pla" name="addressRess" /></view>
					<view class="pull-right"><image src="../../static/icon/code.png" mode="" class="scan_icon" @click="scanCodeFn"></image></view>
				</view>
			</view>
			<view class="address">{{ i18n.text4 }}</view>
			<view class="address address-text padding-t">
				<view class="border-bottom height">
					<view class="inputs pull-left">
						<input type="text" v-model="drawal" :placeholder="i18n.text5" placeholder-class="fomr-pla" name="drawal" @input="drawalInput(drawal)" />
					</view>
					<view class="pull-right">
						<text class="drawal">USDT</text>
						<text class="drawals" @click="payAll">{{ i18n.text6 }}</text>
					</view>
				</view>
			</view>
			<view class="address marginTop">{{ i18n.text7 }}：{{ walletData.balanceMoney || 0}} USDT</view>
			<view class="address">{{ i18n.text9 }}</view>
			<view class="address address-text padding-t">
				<view class="height">
					<view class="inputs pull-left"><input type="text" maxlength="18" v-model="pay" disabled="disabled" placeholder-class="fomr-pla" name="pay"/></view>
				</view>
			</view>
			<view class="address">{{ i18n.text10 }}</view>
			<view class="address address-text padding-t">
				<view class="border-bottom height">
					<view class="inputs pull-left"><input type="text" maxlength="18" v-model="pays" disabled="disabled" placeholder-class="fomr-pla" name="pays" /></view>
				</view>
			</view>
			<view class="address">{{ i18n.text11 }}</view>
			<view class="address address-text padding-t">*{{ i18n.text12 }}{{ walletDataNum.configValmin }}USDT-ERC20,{{ i18n.text012 }}{{ walletDataNum.configValmax }}USDT-ERC20</view>
			<view class="footer-button">
				<view class="order-pay pull-right" @click="handleShowShare" style="width: 100%;">{{ i18n.text13 }}</view>
			</view>
			<!-- 底部弹框 -->
			<view class="share">
				<view :class="{ 'share-box': shareState }" @click="handleHiddenShare"></view>
				<view class="share-item" :class="{ 'share-show': shareState }">
					<form @submit="formSubmit" @reset="formReset">
						<view class="list-box-share borderBottom">
							<view class="pull-left">{{ i18n.text14 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text24 }}</view>
						</view>
						<view class="title-nav">{{ i18n.text28 }}</view>
						<view class="form-input borderBottom form-input-BOX">
							<view class="con-form con-forms">
								<input type="number" v-model="codeV" :placeholder="i18n.text29" placeholder-class="fomr-pla" name="paddWord" />
								<view class="code-button" @click="getCodeButton">
									<text class="uni-panel-text code-btn">{{ countdown.loginTime == 60 ? countdown.countTitle : countdown.loginTime + 's' }}</text>
								</view>
							</view>
						</view>
						<view class="title-nav">{{ i18n.text15 }}</view>
						<view class="form-input borderBottom">
							<view class="con-form"><input type="password" v-model="paddWord" :placeholder="i18n.text16" placeholder-class="fomr-pla" name="paddWord" /></view>
						</view>
						<view class="height">
							<view class="title-navs pull-left" @click="isPayPwdButton">{{ isPayPwd == '1' ? i18n.text17 : i18n.text26 }}</view>
						</view>
						<button class="uni-btn-v" form-type="submit">{{ i18n.text18 }}</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import md5 from '../../common/md5.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			id: '',
			tabBarPay: [
				{
					name: 'ERC20',
					id: '1'
				}
			],
			isPayPwd: GET_STORAGE('isPayPwd'),
			tabIndexPay: 1,
			tabsOpenPay: false,
			imageUrl: '',
			address: '',
			addressRess: '',
			drawal: '',
			pay: 0,
			pays: 0,
			shareState: false,
			paddWord: '',
			walletBalance: '',
			walletData: {},
			// 验证码
			countdown: {
				loginTime: 60,
				loginTimer: null,
				countTitle: this.$t('Withdrawal.text30'),
				loginTimeNum: 0
			},
			walletDataNum:{
				configValmin:"",
				configValmax:""
			},
			codeV: ''
		};
	},
	components: { uniIcons },
	computed: {
		i18n() {
			return this.$t('Withdrawal');
		}
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('Withdrawal.text13')
		});
		this.id = option.id;
		this.walletDataFunftion();
		this.getUserInfoFunction();
		this.getSysConfigListFunftion()
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/TopupWithdrawal?id=2'
			});
		},
		navBackButton() {
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/withdrawalList'
			});
		},
		isPayPwdButton() {
			uni.navigateTo({
				url: '/pages/myUser/userMoeny?isPayPwd=' + this.isPayPwd
			});
		},
		async walletDataFunftion() {
			uni.showLoading({ title: this.$t('Withdrawal.text19'), mask: true });
			let res = await api.walletDataHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.walletData = res.data;
				this.pay = this.walletData.tax;
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getSysConfigListFunftion() {
			uni.showLoading({ title: this.$t('Withdrawal.text19'), mask: true });
			let res = await api.getSysConfigListHttp({
			
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.walletDataNum.configValmin = res.data[5].configVal;
				this.walletDataNum.configValmax = res.data[6].configVal;
			
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
			
		},
		async getUserInfoFunction() {
			uni.showLoading({ title: this.$t('Withdrawal.text19'), mask: true });
			let res = await api.getUserInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.isPayPwd = res.data.isPayPwd;
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		drawalInput(val) {
			if (val == '' || Number(val) < Number(this.walletDataNum.configValmin)) {
				this.pays = 0;
			}else{
			    this.pays = Number((Number(val)-Number(this.pay)).toFixed(4));
			}
		},
		// 全部  
		payAll() {
			this.drawal = this.walletData.balanceMoney;
			this.pays = Number((Number(this.drawal)-Number(this.pay)).toFixed(4));
		},
		scanCodeFn() {
			// 允许从相机和相册扫码
			var that = this;
			uni.scanCode({
				scanType: ['qrCode'],
				success: function(res) {
					that.addressRess = res.result;
				},
				fail: function(res) {
					this.$alert(JSON.stringify(res));
				}
			});
		},
		async verifyPayPwdFunftion() {
			let res = await api.verifyPayPwdHttp({
				payPassword: md5(this.paddWord)
			});
			if (res.code === '000') {
				this.walletCash();
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			} else {
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		formSubmit: function(e) {
			var formData = e.detail.value;
			if (this.codeV == '') {
				this.$alert(this.$t('Withdrawal.text29'));
			} else if (formData.paddWord == '') {
				this.$alert(this.$t('Withdrawal.text16'));
			} else {
				this.verifyPayPwdFunftion();
			}
		},
		// 显示
		handleShowShare(id) {
			if (this.addressRess == '') {
				this.$alert(this.$t('Withdrawal.text21'));
			} else if (this.drawal == '') {
				this.$alert(this.$t('Withdrawal.text5'));
			} else if (this.drawal < Number(this.walletDataNum.configValmin)) {
				this.$alert(this.$t('Withdrawal.text22')+Number(this.walletDataNum.configValmin)+"USDT");
			} else {
				this.shareState = true;
			}
		},
		// 隐藏
		handleHiddenShare() {
			this.shareState = false;
		},
		async walletCash() {
			uni.showLoading({ title: this.$t('Withdrawal.text19'), mask: true });
		
			const system_info = GET_STORAGE('system_info');
			let res = await api.walletCash({
				agreeType: 'ERC20', //OMNI ERC20
				coinSymbol: 'USDT',
				lang: system_info.language,
				money: Number(this.drawal),
				payPassWord: md5(this.paddWord),
				walletReceivedAddr: this.addressRess,
				smsCode: this.codeV,
				phone: GET_STORAGE('phoneAccount')
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text23'));
				setTimeout(() => {
					uni.navigateTo({
						url: '../TopupWithdrawal/withdrawalList'
					});
				}, 1000);
				clearInterval(this.countdown.loginTimer);
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		ontabtapPay(e) {
			let index = e.currentTarget.id;
			if (this.tabIndexPay === index) {
				return;
			}
			this.tabIndexPay = index;
			this.tabsOpenPay = !this.tabsOpenPay;
		},
		addressButton() {
			uni.getClipboardData({
				success: function(res) {}
			});
		},
		codeButton() {
			uni.downloadFile({
				url: this.imageUrl,
				success: res => {
					if (res.statusCode === 200) {
						uni.chooseImage({
							count: 1,
							sourceType: ['camera'],
							success: function(res) {
								uni.saveImageToPhotosAlbum({
									filePath: res.tempFilePaths[0],
									success: function() {}
								});
							}
						});
					}
				}
			});
		},
		// 验证码新加
		getCodeButton() {
			if (this.countdown.loginTimeNum > 1) {
				this.$alert(this.$t('Withdrawal.text31'));
			} else {
				this.getCode();
			}
		},
		async countdownTime() {
			this.countdown.loginTimer = setInterval(() => {
				if (this.countdown.loginTime > 1) {
					--this.countdown.loginTime;
					this.countdown.loginTimeNum = this.countdown.loginTime;
				} else {
					this.countdown.loginTime = 60;
					this.countdown.countTitle = this.$t('Withdrawal.text32');
					clearInterval(this.countdown.loginTimer);
				}
			}, 1000);
		},
		async getCode() {
			// 发送验证码
			uni.showLoading({ title: this.$t('Withdrawal.text33'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.Login({
				phone: GET_STORAGE('phoneAccount'),
				smsType: 4,
				lang: system_info.language
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text34'));
				this.countdownTime();
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Withdrawal.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.form-input-BOX {
	height: auto;
	overflow: hidden;
}
/deep/ .con-forms uni-input {
	width: 50%;
	float: left;
}
.code-button {
	float: right;
}
.code-button .code-btn {
	width: 100%;
	height: 100%;
	color: #de6334;
	font-size: 14px;
}
.content {
	padding: 0 30rpx 30rpx !important;
	.header {
		padding: 30rpx 0;
	}
	.account-boxs {
		background-color: #eeeeee;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
	}
	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
	}
	.uni-tab-item-pay {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
		margin-right: 30rpx;
		color: #999;
		border: 1px solid #999;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		&:last-child {
			margin-right: 0;
		}
	}
	.uni-tab-item-title-active-pay {
		background-color: $uni-base-color-de6334;
		border: 1px solid $uni-base-color-de6334;
		color: #fff;
	}
	.uni-tab-item-pay {
		vertical-align: middle;
	}
	.text-name {
		line-height: 60rpx;
	}
	.address-text {
		color: #999;
	}
	.address {
		font-size: 26rpx;
	}
	.padding-t {
		padding: 15rpx 0;
	}
	.scan_icon {
		width: 60rpx;
		height: 60rpx;
		display: block;
	}
	.input {
		width: 90%;
		margin-top: 15rpx;
	}
	.drawal {
		border-right: 1px solid #ddd;
		padding-right: 10rpx;
	}
	.drawals {
		padding-left: 10rpx;
	}
	.border-bottom {
		padding-bottom: 15rpx;
	}
	.marginTop {
		margin-bottom: 30rpx;
	}
	.footer-button {
		border-top: 1px solid #eee;
		padding: 30rpx;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.order-pay {
		border-radius: 8px;
		width: 60%;
		height: 37px;
		text-align: center;
		line-height: 35px;
		background: $uni-base-color-de6334;
		color: #fff;
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

	.list-box-share {
		padding: 30rpx 0;
		height: auto;
		overflow: hidden;
	}
	.title-nav {
		padding: 30rpx 0;
	}
	.cancel {
		font-size: 28rpx;
		color: #8ea0ae;
	}
	.title-navs {
		color: #007aff;
		font-size: 28rpx;
		padding: 15rpx 0;
	}
	.uni-btn-v {
		height: 72rpx;
		background-color: $uni-base-color-de6334;
		line-height: 72rpx;
		color: #fff;
		margin: 20rpx 0;
		border-radius: 10rpx;
	}
	.borderBottom {
		padding-bottom: 20rpx;
		border-bottom: 1px solid #eee;
	}
}
</style>
