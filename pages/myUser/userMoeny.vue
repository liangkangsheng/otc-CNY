<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
	
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ isPayPwd==1?i18n.text18:i18n.text17 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<form @submit="formSubmit" @reset="formReset" v-if="isPayPwd == 2">
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text1 }}</label>
						<view class="con-form"><input type="password" v-model="passwords" :placeholder="i18n.text2" placeholder-class="fomr-pla" name="passwords" /></view>
					</view>
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text3 }}</label>
						<view class="con-form"><input type="password" v-model="passwordy" :placeholder="i18n.text4" placeholder-class="fomr-pla" name="passwordy" /></view>
					</view>
					<button class="button" form-type="submit">{{ i18n.text7 }}</button>
				</form>
				<form @submit="formSubmits" @reset="formReset" v-if="isPayPwd == 1">
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text5 }}</label>
						<view class="con-form"><input type="password" v-model="password" :placeholder="i18n.text6" placeholder-class="fomr-pla" name="password" /></view>
					</view>
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text1 }}</label>
						<view class="con-form"><input type="password" v-model="passwords" :placeholder="i18n.text2" placeholder-class="fomr-pla" name="passwords" /></view>
					</view>
					<view class="form-input border-bottom account-list">
						<label for="">{{ i18n.text3 }}</label>
						<view class="con-form"><input type="password" v-model="passwordy" :placeholder="i18n.text4" placeholder-class="fomr-pla" name="passwordy" /></view>
					</view>
					<button class="button" form-type="submit">{{ i18n.text7 }}</button>
				</form>
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
			password: '',
			passwords: '',
			passwordy: '',
			type: '1',
			isPayPwd: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('userMoeny');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('userMoeny.text17')
		});
		this.isPayPwd = option.isPayPwd;
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			if (formData.passwords == '') {
				this.$alert(this.$t('userMoeny.text8'));
			} else if (formData.passwordy == '') {
				this.$alert(this.$t('userMoeny.text9'));
			} else if (formData.passwords != formData.passwordy) {
				this.$alert(this.$t('userMoeny.text10'));
			} else {
				uni.showLoading({ title: this.$t('userMoeny.text11'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.resetPayPwdHttp({
					confirmPwd: md5(formData.passwords),
					newPwd: md5(formData.passwordy),
				    lang:system_info.language,
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('userMoeny.text16'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/myUser/myUser'
						});
					}, 1000);
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('userMoeny.text600'))
				}  else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}
		},
		async formSubmits(e) {
			var formData = e.detail.value;
			if (formData.password == '') {
				this.$alert(this.$t('userMoeny.text13'));
			} else if (formData.passwords == '') {
				this.$alert(this.$t('userMoeny.text14'));
			} else if (formData.passwordy == '') {
				this.$alert(this.$t('userMoeny.text15'));
			} else if (formData.passwords != formData.passwordy) {
				this.$alert(this.$t('userMoeny.text10'));
			} else {
				uni.showLoading({ title: this.$t('userMoeny.text11'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.resetPayPwdHttp({
					confirmPwd: md5(formData.passwords),
					newPwd: md5(formData.passwordy),
					oldPwd: md5(formData.password),
					lang:system_info.language,
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('userMoeny.text16'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/myUser/myUser'
						});
					}, 1000);
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('userMoeny.text600'))
				} else {
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
</style>
