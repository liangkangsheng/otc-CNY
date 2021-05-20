<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left "><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header"></view>
			<view class="box-header option"></view>
		</view>
		<view class="code-box">
			<view class="code-title">{{ i18n.text1 }}</view>
			<view v-if="regType == 0" class="phone">{{ i18n.text2 }}{{ phone }}</view>
			<view v-if="regType == 1" class="phone">{{ i18n.text11 }}{{ email }}</view>
		</view>
		<view class="code-input-main">
			<view class="inputLine">
				<codeInput ref="codeInput" @verificationCode="verificationCode" codeType="block" :errorType="errorType" :blockNum="blockNum"></codeInput>
			</view>
	<!-- 		
				<input class="input-item" maxlength="1" :value="code[0]" type="number" />
				<input class="input-item" maxlength="1" :value="code[1]" type="number" />
				<input class="input-item" maxlength="1" :value="code[2]" type="number" />
				<input class="input-item" maxlength="1" :value="code[3]" type="number" />
				<input class="input-item" maxlength="1" :value="code[4]" type="number" />
				<input class="input-item" maxlength="1" :value="code[5]" type="number" />
			
			<input @input="inputEvent" class="code-input-input" v-model="code" maxlength="6" type="number" /> -->
		</view>
		<view class="code-button" @click="getCodeButton">
			<text class="uni-panel-text code-btn">{{ countdown.loginTime == 60 ? countdown.countTitle : countdown.loginTime + 's' + this.$t('verificationCode.text3') }}</text>
		</view>
		<view class="home-button" @click="gohome" v-show="homeShow">{{ i18n.text9 }}</view>
	</view>
</template>

<script>
import md5 from '../../common/md5.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import codeInput from '@/components/verification-codeInput/verification-codeInput.vue'
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			code: '',
			phone: '',
			phones: '',
			email: '',
			emails: '',
			regType: 0,
			countdown: {
				loginTime: 60,
				loginTimer: null,
				countTitle: this.$t('verificationCode.text4'),
				loginTimeNum: 0
			},
			homeShow: false,
			//
			errorType:false,
			blockNum:6,
		};
	},
	computed: {
		i18n() {
			return this.$t('verificationCode');
		}
	},
	components: { uniIcons,codeInput },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: ''
		});
		this.phone = option.tel;
		this.phones = option.tel;
		this.emails = option.email;
		this.regType = option.type;
		this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
		this.email = this.emails.substr(0, 6) + '****' + this.emails.substr(this.emails.length - 4, this.emails.length);
		this.getCode();
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		countdownTime() {
			var _this = this;
			this.countdown.loginTimer = setInterval(() => {
				if (this.countdown.loginTime > 1) {
					--this.countdown.loginTime;
					this.countdown.loginTimeNum = this.countdown.loginTime;
				} else {
					this.countdown.loginTime = 60;
					clearInterval(this.countdown.loginTimer);
					this.countdown.countTitle = _this.$t('verificationCode.text5');
				}
			}, 1000);
		},
		
		getCodeButton() {
			if (this.countdown.loginTimeNum > 1) {
				this.$alert(this.$t('verificationCode.text8'));
			} else {
				this.getCode();
			}
		},
		async getCode() {
			uni.showLoading({ title: this.$t('verificationCode.text6'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = null;
			if(this.regType == 0) {
				res = await api.sendSmsCode({
					phone: this.phones,
					nationCode: '86',
					smsType: 0,
					lang: system_info.language
				});
			} else if (this.regType == 1) {
				res = await api.sendEmailCode({
					email: this.emails,
					smsType: 0,
					lang: system_info.language
				});
			}
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('verificationCode.text06'));
				this.countdownTime();
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('verificationCode.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async verificationCode(code) {
			// if (code.detail.value.length == 6) {
				// var smsVerifyCode = code.detail.value;
				const system_info = GET_STORAGE('system_info');
				let res = null;
				let phoneOrEmail = "phone";
				if(this.regType == 0) {
					res = await api.verifySmsCodeHttp({
						smsType: '0',
						phone: this.phones,
						verificationCode: code,
						lang: system_info.language
					});
				} else if (this.regType == 1) {
					res = await api.verifyEmailCodeHttp({
						smsType: '0',
						email: this.emails,
						verificationCode: code,
						lang: system_info.language,
					});
					phoneOrEmail = "email";
				}
				if (res.code === '000') {
					uni.showLoading({ title: this.$t('verificationCode.text10'), mask: true });
					let res = await api.getUserToken({
						loginType: '1',
						phoneAccount: this.phones,
						emailAccount: this.emails,
						smsVerifyCode: code,
						phoneOrEmail: phoneOrEmail
					});
					if (res.code === '000') {
						uni.hideLoading();
						this.homeShow = true;
						SET_STORAGE('token', res.data);
						// setTimeout(() => {
						// 	uni.switchTab({
						// 		url: '/pages/home/index'
						// 	});
						// }, 1000);
					} else if (res.code === '500') {
						uni.hideLoading();
						this.$alert(this.$t('verificationCode.text600'));
					} else {
						uni.hideLoading();
						this.homeShow = false;
						this.$alert(res.errorMessage);
					}
				} else if (res.code === '500') {
					uni.hideLoading();
					this.$refs.codeInput.errorType = true
					this.$alert(this.$t('verificationCode.text600'));
				} else {
					uni.hideLoading();
					this.$refs.codeInput.errorType = true
					this.$alert(res.errorMessage);
				}
			// }
		},
		gohome() {
			uni.showLoading({ title: this.$t('verificationCode.text7'), mask: true });
			setTimeout(() => {
				uni.hideLoading();
				uni.switchTab({
					url: '/pages/home/home'
				});
			}, 1000);
			clearInterval(this.countdown.loginTimer);
			this.countdown.countTitle = this.$t('verificationCode.text3');
		}
	}
};
</script>

<style lang="scss" scoped>
.home-button {
	background-color: $uni-base-color-06b572;
	padding: 10rpx 30rpx;
	color: $uni-base-color;
	margin: 20rpx auto;
	font-size: 26rpx;
	border-radius: 25rpx;
}
.content {
	padding: 0 !important;
	.code-box {
		margin-top: 280rpx;
		text-align: center;
		.code-title {
			font-size: 50rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.phone {
			font-size: 28rpx;
			color: #999;
		}
	}
}
.code-button {
	text-align: center;
	margin: 0 auto;
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
	margin-top: 30rpx;
}
</style>
