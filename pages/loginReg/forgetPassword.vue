<template>
	<view class="main login_reg tabs">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('registration.text07') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
		</view>
		<view class="radio-group-list">
			<radio-group @change="radioChange">
				<label class="radio" v-for="(item, index) in items" :key="item.value">
					<radio :value="item.value" :checked="index === current" />
					{{item.name}}
				</label>
			</radio-group>
		</view>
		<!-- 测试 -->
		<view class="forms-box padding-30">
			<view class="uni-padding-wrap uni-common-mt form-section">
				<form @submit="formSubmit" @reset="formReset">
					<view v-if="current == 0" class="form-input form-tel">
						<view class="tel-setect" :class="open ? 'uni-panel-h-on' : ''">
							<text class="uni-panel-text">+86</text>
							<uni-icons type="arrowdown" size="16" class="form-clear-icon"></uni-icons>
						</view>
						<view class="con-form">
							<input
								type="number"
								maxlength="11"
								v-model="userRegistration.phoneAccount"
								:placeholder="$t('registration.text1')"
								placeholder-class="fomr-pla"
								name="phoneAccount"
							/>
						</view>
					</view>
					<view v-if="current == 1" class="form-input">
						<view class="con-form">
							<input
								type="text"
								v-model="userRegistration.emailAccount"
								:placeholder="$t('registration.text21')"
								placeholder-class="fomr-pla"
								name="emailAccount"
							/>
						</view>
					</view>
					<view class="form-input">
						<view class="con-form">
							<input
								type="password"
								maxlength="18"
								v-model="userRegistration.password"
								:placeholder="$t('registration.text23')"
								placeholder-class="fomr-pla"
								name="password"
							/>
						</view>
					</view>
				<!-- 	<view class="form-input">
						<view class="con-form">
							<input
								type="password"
								maxlength="18"
								v-model="userRegistration.confirmPwd"
								:placeholder="$t('registration.text3')"
								placeholder-class="fomr-pla"
								name="confirmPwd"
							/>
						</view>
					</view> -->
					<view class="form-input form-code">
						<view class="con-form">
							<input
								type="number"
								maxlength="6"
								v-model="userRegistration.verificationCode"
								:placeholder="$t('registration.text4')"
								placeholder-class="fomr-pla"
								name="verificationCode"
							/>
						</view>
						<view class="code-button" @click="getCodeButton">
							<text class="uni-panel-text code-btn">{{ countdown.loginTime == 60 ? countdown.countTitle : countdown.loginTime + 's' }}</text>
						</view>
					</view>
				<!-- 	<view class="form-input">
						<view class="con-form">
							<input
								type="text"
								v-model="userRegistration.invitationCode"
								:placeholder="$t('registration.text003')"
								placeholder-class="fomr-pla"
								name="invitationCode"
							/>
						</view>
					</view> -->
					<!-- <view class="uni-form-item uni-column">
						<checkbox-group name="checkbox">
							<label>
								<checkbox :value="$t('registration.text6')" class="checkbox" />
								<text class="title">{{ $t('registration.text6') }}</text><text class="title" @click="agreementButton(1)">{{ $t('registration.text06') }}</text>
							</label>
						</checkbox-group>
					</view> -->
					<button class="uni-btn-v" form-type="submit">{{ $t('registration.text007') }}</button>
				</form>
				<!-- <navigator url="/pages/loginReg/login" class="form-news">{{ $t('registration.text8') }}</navigator> -->
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
			togglePwd: false,
			tabIndex: 0,
			open: false,
			countdown: {
				loginTime: 60,
				loginTimer: null,
				countTitle: this.$t('registration.text5'),
				loginTimeNum: 0
			},
			userRegistration: {
				phoneAccount: '', //手机号
				nationCode: '86',
				emailAccount: '', // 邮箱
				password: '', //密码
				confirmPwd: '', //确认密码
				verificationCode: '' ,//短信验证码
				invitationCode:""
			},
			items: [{
				value: '0',
				name: this.$t('loginReg.text9')
			},{
				value: '1',
				name: this.$t('loginReg.text10')
			}],
			current: 0
		};
	},
	computed: {
		i18n() {
			return this.$t('registration');
		}
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('registration.text7')
		});
		if(option.invitationCode){
			this.userRegistration.invitationCode = option.invitationCode;
		}
	},
	components: { uniIcons },
	computed: {
		ligthBtn() {
			return this.phoneAccount && this.password ? true : false;
		}
	},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		agreementButton(id){
			// 1.注册协议html
			// uni.navigateTo({
			// 	url: '/pages/agreement/agreement?id='+id
			// });
		},
		triggerCollapse(e) {
			for (var i = 0; i < this.list.length; ++i) {
				if (e === i) {
					this.list[i].open = !this.list[e].open;
				} else {
					this.list[i].open = false;
				}
			}
		},
		getCodeButton() {
			if (this.countdown.loginTimeNum > 1) {
				this.$alert(this.$t('registration.text08'));
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
					this.countdown.countTitle = this.$t('registration.text05');
					clearInterval(this.countdown.loginTimer);
				}
			}, 1000);
		},
		async getCode() {
			let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			let tel = /^1[34578]\d{9}$/;
			let phoneTel = RegExp(tel).test(this.userRegistration.phoneAccount);
			let email = RegExp(emailReg).test(this.userRegistration.emailAccount);
			let flag = true;
			if(this.current == 0) { // 手机注册
				if (this.userRegistration.phoneAccount == '') {
					uni.showToast({ title: this.$t('registration.text9'), icon: 'none' });
					flag = false;
				} else if (!phoneTel) {
					uni.showToast({ title: this.$t('registration.text10'), icon: 'none' });
					flag = false;
				}
			} else if(this.current == 1) { // 邮箱注册
				if (this.userRegistration.emailAccount == '') {
					uni.showToast({ title: this.$t('registration.text21'), icon: 'none' });
					flag = false;
				} else if (!email) {
					uni.showToast({ title: this.$t('registration.text22'), icon: 'none' });
					flag = false;
				}
			} 
			if(flag) {
				if (this.userRegistration.password == '') {
					uni.showToast({ title: this.$t('registration.text11'), icon: 'none' });
				} else {
					// 发送验证码
					uni.showLoading({ title: this.$t('registration.text013'), mask: true });
					const system_info = GET_STORAGE('system_info');
					let res = null;
					if(this.current == 0) {// 手机注册
						await api.sendSmsCode({
							phone: this.userRegistration.phoneAccount,
							smsType: 2,
							nationCode: this.userRegistration.nationCode,
							lang:system_info.language
						});
					} else if(this.current == 1) {// 邮箱注册
						res = await api.sendEmailCode({
							email: this.userRegistration.emailAccount,
							smsType: 2,
							lang:system_info.language
						});
					}
					if (res.code === '000') {
						uni.hideLoading();
						this.$alert(this.$t('registration.text014'));
						this.countdownTime();
					} else if(res.code === "500"){
						uni.hideLoading();
						this.$alert(this.$t('registration.text600'))
					}  else {
						uni.hideLoading();
						uni.showToast({ title: res.errorMessage, icon: 'none' });
					}
				}
			}
		},
		async formSubmit(e) {
			//进行表单检查
			var formData = e.detail.value;
			let phoneOrEmail = "phone";
			let tel = /^1[34578]\d{9}$/;
			let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			let email = RegExp(emailReg).test(formData.emailAccount);
			let phone = RegExp(tel).test(formData.phoneAccount);
			let flag = true;
			if(this.current == 0) {
				if (formData.phoneAccount == '') {
					uni.showToast({ title: this.$t('registration.text9'), icon: 'none' });
					flag = false;
				} else if (!phone) {
					uni.showToast({ title: this.$t('registration.text10'), icon: 'none' });
					flag = false;
				}
			} else if (this.current == 1) {
				phoneOrEmail = "email";
				if (formData.emailAccount == '') {
					uni.showToast({ title: this.$t('registration.text21'), icon: 'none' });
					flag = false;
				} else if (!email) {
					uni.showToast({ title: this.$t('registration.text22'), icon: 'none' });
					flag = false;
				}
			} 
			if(flag) {
				if (formData.password == '') {
					uni.showToast({ title: this.$t('registration.text11'), icon: 'none' });
				}else if (formData.verificationCode == '') {
					uni.showToast({ title: this.$t('registration.text14'), icon: 'none' });
				}else {
					uni.showLoading({ title: this.$t('registration.text16'), mask: true });
					const system_info = GET_STORAGE('system_info');
					let res = await api.forgetPasswordHttp({
						phoneAccount: formData.phoneAccount, //手机号
						emailAccount: formData.emailAccount, //邮箱
						phoneOrEmail: phoneOrEmail, //手机号
						newPassword: md5(formData.password), //密码
						// confirmPwd: md5(formData.confirmPwd), //确认密码
						verificationCode: formData.verificationCode ,//短信验证码
						lang:system_info.language,
						// invitationCode:formData.invitationCode
					});
					if (res.code === '000') {
						let res = null;
						if(this.current == 0) {// 手机注册
							res = await api.verifySmsCodeHttp({
								smsType: "2",
								phone:formData.phoneAccount,
								nationCode: this.userRegistration.nationCode,
								verificationCode: formData.verificationCode,
								lang:system_info.language,
							});
						} else if(this.current == 1) {// 邮箱注册
							res = await api.verifyEmailCodeHttp({
								email: this.userRegistration.emailAccount,
								verificationCode: formData.verificationCode,
								smsType: "2",
								lang:system_info.language
							});
						}
						if (res.code === '000') {
							uni.hideLoading();
							uni.showToast({ title: this.$t('registration.text18'), icon: 'none' });
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/loginReg/login'
								});
							}, 1000);
							this.countdown.countTitle = this.$t('registration.text06');
							clearInterval(this.countdown.loginTimer);
						} else if(res.code === "500"){
							uni.hideLoading();
							this.$alert(this.$t('registration.text600'))
						}  else {
							uni.hideLoading();
							uni.showToast({ title: res.errorMessage, icon: 'none' });
						}
					} else if(res.code === "500"){
						uni.hideLoading();
						this.$alert(this.$t('registration.text600'))
					}  else {
						uni.hideLoading();
						uni.showToast({ title: res.errorMessage, icon: 'none' });
					}
				}
			}
		},
		clearValue(key) {
			this[key] = '';
		},
		togglePrssWordType() {
			this.togglePwd = !this.togglePwd;
		},
		async submitLoginFn() {
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/home/index'
				});
			}, 1000);
		},
		radioChange(evt) {
			this.current = evt.target.value;
			console.log(this.current)
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/style/loginReg.scss';
.main {

	box-sizing: border-box;
}
/* #ifndef APP-PLUS */
page {
	width: 100%;
	min-height: 100%;
	display: flex;
}
.forms-box {
	padding: 0 30rpx;
}
/* #endif */
.tabs {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	background-color: #ffffff;
	/* #ifdef MP-ALIPAY || MP-BAIDU */
	height: 100vh;
	/* #endif */
}
.scroll-h {
	width: 100%;
	height: 80rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.code-button {
	line-height: 62rpx;
}
.code-button{
	width: auto !important;
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	width: 100%;
	text-align: center;
	padding-left: 34rpx;
	padding-right: 34rpx;
	border-bottom: 2px solid #dddddd;
}
/deep/ uni-input {
	width: 90%;
}
.uni-tab-item-title {
	color: #555;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-border-active {
	border-bottom: 2px solid #06b572;
}
.uni-tab-item-title-active {
	color: #06b572;
}
/deep/ .uni-checkbox-input {
	width: 22rpx !important;
	height: 22rpx !important;
}
.checkbox .uni-checkbox-input {
	width: 22rpx !important;
	height: 22rpx !important;
}
/deep/ uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
	border-color: #06b572;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	color: #06b572 !important;
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
	font-size: 28rpx !important;
}
.title {
	font-size: 20rpx;
}
.uni-btn-v {
	margin-top: 40rpx;
}
.form-code {
	margin-bottom: 25rpx;
}
.form-input {
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.radio-group-list {
	text-align: center;
	margin-top: 60rpx;
	.uni-label-pointer:first-child {
		margin-right: 50rpx;
	}
	.uni-label-pointer:last-child {
		margin-left: 50rpx;
	}
}
</style>
