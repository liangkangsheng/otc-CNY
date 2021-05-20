<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>

		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{$t('userPhone.text1')}}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="account-boxs height" v-if="GETphone==''">
				<form @submit="formSubmit" @reset="formReset">
					<view class="form-input border-bottom account-list">
						<label for="">{{ $t('userPhone.text2') }}</label>
						<view class="con-form"><input type="text" v-model="phone" :placeholder="$t('userPhone.text3')" placeholder-class="fomr-pla" name="phone" /></view>
					</view>
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text015 }}</label>
						<view class="con-form"><input type="text" v-model="code" :placeholder="i18n.text016" placeholder-class="fomr-pla" name="code" /></view>
						<view class="code-button" @click="getCodeButton">
							<text class="uni-panel-text code-btn">{{ countdown.loginTime == 60 ? countdown.countTitle : countdown.loginTime + 's' }}</text>
						</view>
					</view>
					<button class="button" form-type="submit">{{ i18n.text7 }}</button>
				</form>
			</view>
			<view class="account-boxs height" v-if="GETphone">
				<view class="account-list height border-bottom">
					<text class="pull-left">{{ $t('userPhone.text2') }}</text>
					<text class="pull-right trit">{{ GETphone }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import md5 from '../../common/md5.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';

export default {
	data() {
		return {
			phone: '',
			code:"",
			countdown: {
				loginTime: 60,
				loginTimer: null,
				countTitle: this.$t('userLogin.text005'),
				loginTimeNum: 0
			},
			GETphone:GET_STORAGE('phone')
		};
	},
	computed: {
		i18n() {
			return this.$t('userLogin');
		}
	},
	components: { uniIcons },
	onLoad() {
	
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		getCodeButton() {
			if (this.countdown.loginTimeNum > 1) {
				this.$alert(this.$t('userLogin.text08'));
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
					this.countdown.countTitle = this.$t('userLogin.text006');
					clearInterval(this.countdown.loginTimer);
				}
			}, 1000);
		},
		async getCode() {
			let tel = /^1[345789]\d{9}$/;
			let telreg = RegExp(tel).test(this.phone);
			if (this.phone== '') {
				uni.showToast({ title: this.$t('userLogin.text014'), icon: 'none' });
			} else if (!telreg) {
				uni.showToast({ title: this.$t('userLogin.text06'), icon: 'none' });
			} else {
				// 发送验证码
				uni.showLoading({ title: this.$t('userLogin.text017'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.sendSmsCode({
					phone: this.phone,
					nationCode: '86',
					smsType: 1,
					lang:system_info.language,
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('userLogin.text018'));
					this.countdownTime();
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('userLogin.text600'))
				}  else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			let tel = /^1[345789]\d{9}$/;
			let telreg = RegExp(tel).test(formData.phone);
			if (formData.phone== '') {
				uni.showToast({ title: this.$t('userLogin.text014'), icon: 'none' });
			} else if (!telreg) {
				uni.showToast({ title: this.$t('userLogin.text06'), icon: 'none' });
			} else if (formData.code== '') {
				uni.showToast({ title: this.$t('userLogin.text016'), icon: 'none' });
			}  else {
				uni.showLoading({ title: this.$t('userLogin.text12'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.verifyPhoneHttp({
					phone:formData.phone,
					verifyCode: formData.code,
					lang:system_info.language,
				});
				if (res.code === '000') {
					uni.hideLoading();
					uni.showToast({ title: this.$t('userLogin.text011'), icon: 'none' });
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/myUser/myUser'
						});
					}, 1000);
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('userLogin.text600'))
				}  else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.account-box {
		margin-top: 35rpx;
	}
}
.button {
	border-radius: 10rpx;
	height: 72rpx;
	background: #06b572;
	text-align: center;
	color: #fff;
	font-size: 30rpx;
	line-height: 72rpx;
	margin: 22rpx 0;
}
.account-list {
	padding-bottom: 10rpx;
	height: auto;
	overflow: hidden;
}
.form-input label {
	width: 100%;
	text-align: left;
	float: left;
	font-size: 32rpx;
	padding: 18rpx 0;
}
.con-form {
	width: 70%;
	float: left;
}
.code-button{
	float: right;
	text-align: center;
	color: #06b572;
}
</style>
