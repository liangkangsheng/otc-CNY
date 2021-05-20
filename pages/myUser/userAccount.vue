<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>

		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text7 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<navigator url="/pages/myUser/userPhone">
					<view class="account-list height border-bottom">
						<text class="pull-left">{{ i18n.text1 }}</text>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
						<text class="pull-right trit">{{ (phone == null || phone == "")?i18n.text6:i18n.text2 }}</text>
					</view>
				</navigator>
				<navigator url="/pages/myUser/email">
					<view class="account-list height border-bottom">
						<text class="pull-left">{{ i18n.text03 }}</text>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
						<text class="pull-right trit">{{ (email == null || email == "")?i18n.text6:i18n.text2 }}</text>
					</view>
				</navigator>
				<navigator url="/pages/myUser/userLogin">
					<view class="account-list height border-bottom">
						<text class="pull-left">{{ i18n.text3 }}</text>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
						<text class="pull-right trit">{{ i18n.text4 }}</text>
					</view>
				</navigator>
				<navigator :url="'/pages/myUser/userMoeny?isPayPwd=' + isPayPwd">
					<view class="account-list height border-bottom">
						<text class="pull-left">{{ i18n.text5 }}</text>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
						<text class="pull-right trit">{{ isPayPwd == 1 ? i18n.text4 : i18n.text6 }}</text>
					</view>
				</navigator>
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
			isPayPwd: '',
			email: GET_STORAGE('email'),
			phone: GET_STORAGE('phone')
		};
	},
	computed: {
		i18n() {
			return this.$t('userAccount');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('userAccount.text7')
		});
		this.isPayPwd = option.isPayPwd;
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
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
.arrowright {
	margin-top: 4rpx;
	color: #ccc;
}
.account-size {
	font-size: 28rpx;
	color: #86909a;
}
.trit {
	color: #86909a;
}
.list-size {
	margin: 75rpx 0 0;
	color: #86909a;
}
.account-sizes {
	font-size: 28rpx;
	color: #06b572;
	margin-left: 10rpx;
}
.account-list {
	line-height: 40rpx;
}
.press {
	width: 20rpx;
	height: 10rpx;
	width: 100%;
	background: #ddd;
	border-radius: 100rpx;
	margin-top: 20rpx;
	position: relative;
}
.press-box {
	width: 20rpx;
	height: 10rpx;
	background: #06b572;
	border-radius: 100rpx;
	position: absolute;
	top: 0;
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
</style>
