<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>

		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text2 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<view class="account-list height border-bottom">
					<text class="pull-left">{{ i18n.text1 }}</text>
					<text class="pull-right trit">{{ phone }}</text>
				</view>
			</view>
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
			phone: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('userPhone');
		}
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('userPhone.text2')
		});
		var getphone = GET_STORAGE('phone');
		this.phone = getphone.substr(0, 3) + '****' + getphone.substr(7);
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
	margin-top: 8rpx;
	color: #ccc;
}
.account-size {
	font-size: 28rpx;
	color: #86909a;
}
.trit {
	margin-left: 45rpx;
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
