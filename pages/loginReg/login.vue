<template>
	<view class="main login_reg tabs">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="goHome"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('loginReg.text3') }}</view>
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
		<view class="forms-box padding-30">
			<view class="uni-padding-wrap uni-common-mt form-section" :current="tabIndex" v-show="!tabsOpen">
				<form @submit="formSubmit">
					<view v-if="current == 0" class="form-input form-tel">
						<view class="tel-setect" :class="open ? 'uni-panel-h-on' : ''">
							<text class="uni-panel-text">+86</text>
							<uni-icons type="arrowdown" size="16" class="form-clear-icon"></uni-icons>
						</view>
						<view class="con-form">
							<input type="number" maxlength="11" v-model="phoneAccount" :placeholder="$t('loginReg.text1')" placeholder-class="fomr-pla" name="tel" />
						</view>
					</view>
					<view v-if="current == 1" class="form-input">
						<view class="con-form">
							<input type="text" v-model="emailAccount" :placeholder="$t('loginReg.text11')" placeholder-class="fomr-pla" name="email" />
						</view>
					</view>
					<view class="form-input">
						<view class="con-form">
							<input type="password" maxlength="18" v-model="password" :placeholder="$t('loginReg.text2')" placeholder-class="fomr-pla" name="password" />
						</view>
					</view>
					<button class="uni-btn-v" form-type="submit">{{ $t('loginReg.text3') }}</button>
				</form>
				<navigator url="/pages/loginReg/registration" class="form-new" >{{ $t('loginReg.text4') }}</navigator>
				<navigator url="/pages/loginReg/forgetPassword" class="form-new-l" >{{ $t('loginReg.text04') }}</navigator>
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
			phoneAccount: '',
			emailAccount: '',
			code: '',
			password: '',
			togglePwd: false,
			tabIndex: 0,
			tabsOpen: false,
			open: false,
			togglePwdIndex: 0,
			countdown: {
				loginTime: 60,
				loginTimer: null
			},
			codeLogin: {
				phone: ''
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
			return this.$t('loginReg');
		}
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('loginReg.text3')
		});
	},
	computed: {},
	onNavigationBarButtonTap(e) {},
	methods: {
		goHome(){
			uni.reLaunch({
				url: '/pages/home/home'
			});
		},
		navBack() {
			uni.navigateBack();
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
		async countdownTime() {
			this.countdown.loginTimer = setInterval(() => {
				if (this.countdown.loginTime > 1) {
					--this.countdown.loginTime;
				} else {
					this.countdown.loginTime = 60;
					clearInterval(this.countdown.loginTimer);
				}
			}, 1000);
		},
		async getCode() {
			let tel = /^1[345789]\d{9}$/;
			let phoneTel = RegExp(tel).test(this.codeLogin.phone);
			if (this.codeLogin.phone == '') {
				uni.showToast({ title: this.$t('loginReg.text5'), icon: 'none' });
			} else if (!phoneTel) {
				uni.showToast({ title: this.$t('loginReg.text6'), icon: 'none' });
			} else {
				const system_info = GET_STORAGE('system_info');
				let res = await api.sendSmsCode({
					phone: this.codeLogin.phone,
					nationCode: '86',
					smsType: 0,
					lang:system_info.language,
				});
				if (res.code === '000') {
					this.countdownTime();
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('loginReg.text600'))
				}  else {
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			let tel = /^1[345789]\d{9}$/;
			let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			let phone = RegExp(tel).test(formData.tel);
			let email = RegExp(emailReg).test(formData.email);
			let flag = true;
			if(this.current == 0) {
				if (formData.tel == '') {
					uni.showToast({ title: this.$t('loginReg.text5'), icon: 'none' });
					flag = false;
				} else if (!phone) {
					uni.showToast({ title: this.$t('loginReg.text6'), icon: 'none' });
					flag = false;
				}
			} else if (this.current == 1) {
				if (formData.email == '') {
					uni.showToast({ title: this.$t('loginReg.text12'), icon: 'none' });
					flag = false;
				} else if (!email) {
					uni.showToast({ title: this.$t('loginReg.text13'), icon: 'none' });
					flag = false;
				}
			} 
			if(flag) {
				if (formData.password == '') {
					uni.showToast({ title: this.$t('loginReg.text7'), icon: 'none' });
				} else {
					uni.showLoading({ title: this.$t('loginReg.text8'), mask: true });
					const system_info = GET_STORAGE('system_info');
					console.log(system_info)
					let res = null;
					if(this.current == 0) {
						res = await api.cheakUserHttp({
							loginType: '2',
							lang:system_info.language,
							phoneAccount: formData.tel,
							passWord: md5(formData.password)
						});
					} else if (this.current == 1) {
						res = await api.cheakUserByEmail({
							loginType: '2',
							lang:system_info.language,
							emailAccount: formData.email,
							passWord: md5(formData.password)
						});
					}
					if (res.code === '000') {
						uni.hideLoading();
						SET_STORAGE('phoneAccount',formData.tel);
						SET_STORAGE('emailAccount',formData.email);
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/verificationCode/verificationCode?tel=' + formData.tel + "&email=" + formData.email + "&type=" + this.current
							});
						}, 1000);
						if(res.data.isGoogleVerify == "0"){
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/verificationCode/verificationCode?tel=' + formData.tel + "&email=" + formData.email + "&type=" + this.current
								});
							}, 1000);
						}else{
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/verificationCode/verificationCodeg?tel=' + formData.tel + "&email=" + formData.email + "&type=" + this.current
								});
							}, 1000);
						}
					} else if(res.code === "500"){
						uni.hideLoading();
						this.$alert(this.$t('loginReg.text600'))
					} else {
						uni.hideLoading();
						uni.showToast({ title: res.errorMessage, icon: 'none' });
					}
				}
			}
		},
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.togglePwdIndex = index;
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.tabsOpen = !this.tabsOpen;
		},
		clearValue(key) {
			this[key] = '';
		},
		togglePrssWordType() {
			this.togglePwd = !this.togglePwd;
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
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	width: 50%;
	text-align: center;
	padding-left: 34rpx;
	padding-right: 34rpx;
	border-bottom: 2px solid #dddddd;
}
/deep/ uni-input {
	width: 100%;
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
