<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title" v-show="open">{{ i18n.text14 }}</view>
				<view class="head-title" v-show="opens">{{ i18n.text15 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="height padding-30" v-show="open">
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text1 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formZFB.realName }}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text3 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formZFB.alipayNum }}</view>
			</view>
			<view class="title-nav color-999">{{ i18n.text5 }}</view>
			<view class="up-box" @tap="ChooseImage()">
				<div class="up-chooseImage" v-show="ChooseImageShow"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
				<view class="bg-img height" v-show="!ChooseImageShow"><image :src="positiveCardPath" mode="aspectFill" class="image" name="positiveCardPath"></image></view>
			</view>
		</view>
		<view class="height padding-30" v-show="opens">
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text1 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formYH.realName }}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text7 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formYH.bankNum }}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text9 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formYH.bankName }}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text12 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formYH.bankAddress }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import http from '@/request/request.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
var _this = this;
export default {
	data() {
		return {
			title: '',
			userName: '',
			open: false,
			opens: false,
			receiveAccountType: '',
			formZFB: {
				realName: '',
				alipayNum: '',
				alipayQrcode: ''
			},
			formYH: {
				realName: '',
				bankNum: '',
				bankName: '',
				bankAddress: ''
			},
			ChooseImageShow: true,
			positiveCardPath: '',
			positiveCardPaths: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('collectionForm');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: option.name
		});
		this.receiveAccountType = option.id;
		if (option.name == this.$t('collectionForm.text14')) {
			this.open = true;
		}
		if (option.name == this.$t('collectionForm.text15')) {
			this.opens = true;
		}
		if (this.receiveAccountType == '2' && option.list == '0') {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.formYH.realName = item.realName;
			this.formYH.bankNum = item.bankNum;
			this.formYH.bankName = item.bankName;
			this.formYH.bankAddress = item.bankAddress;
		}
		if (this.receiveAccountType == '1' && option.list == '0') {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.formZFB.realName = item.realName;
			this.formZFB.alipayNum = item.alipayNum;
			this.positiveCardPath = http.config.baseUrl + item.alipayQrcode;
			this.ChooseImageShow = !this.ChooseImageShow;
		}
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
.border-bottom {
	padding: 10rpx 0 !important;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.form-inputs {
	padding: 10rpx 0 !important;
	border-bottom: none !important;
}
.title-size,
.right-titles {
	font-size: 26rpx;
}
.header-icon {
	margin-right: 20rpx;
}
.color-999 {
	color: #999;
	font-size: 26rpx;
}
.content {
	padding: 0 !important;
}
.uni-btn-v {
	height: 70rpx;
	border-radius: 10rpx;
	background: linear-gradient(to right, #54cba1, #06b572);
	line-height: 70rpx;
	color: #fff;
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
	right: 20rpx;
}
.input-box {
	background: #ddd;
	padding: 20rpx;
	margin-bottom: 10rpx;
}
.input-boxs {
	width: 120rpx;
	height: 120rpx;
	border: 1rpx solid #ddd;
	text-align: center;
	line-height: 118rpx;
	font-size: 60rpx;
	color: #999;
}
.title-nav {
	padding: 20rpx 0;
	font-size: 26rpx;
}
.form-input {
	border-radius: 5rpx;
	padding: 0 0;
	height: 65rpx;
	position: relative;
	color: #333;
	font-size: 30rpx;
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.up-box {
	border: 1px dashed #ddd;
	border-radius: 30rpx;
	height: 420rpx;
}
.up-chooseImage {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 100rpx;
	margin: 160rpx auto;
	background-color: rgba(0, 0, 0, 0.1);
}
.bg-img {
	width: 100%;
	height: 420rpx;
	border-radius: 30rpx;
}
.bg-img .image {
	width: 100%;
	height: 420rpx;
	display: block;
	margin: 0 auto;
	border-radius: 30rpx;
}
</style>
