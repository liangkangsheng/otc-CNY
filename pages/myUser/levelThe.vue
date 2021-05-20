<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text19 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="user-header">
			<view class="user-box height">
				<view class="user-top height">
					<image src="../../static/icon/help_icon1.png" mode="" class="user-img"></image>
					<view class="userName-box" @click="linkButtons">
						<view class="name-box" v-if="getRealNameInfo.status != 3 && getRealNameInfo.status != 2 && getRealNameInfo.status != 1">
							<text class="name-text">{{ i18n.text1 }}</text>
						</view>
						<view class="name-box" v-if="getRealNameInfo.status == 1">
							<text class="name-text">{{ i18n.text2 }}</text>
						</view>
						<view class="name-box" v-if="getRealNameInfo.status == 2">
							<text class="name-text">{{ realName }} {{ account }}</text>
						</view>
						<view class="title-user">
							<text class="name-dj">Lv.{{ active + 1 }}</text>
						</view>
					</view>
				</view>
				<uni-steps :options="list1" active-color="#BA8B59" :active="active" class="uni-steps" />
			</view>
			<view class="title-T">{{ i18n.text3 }}</view>
			<view class="wallet-boxs height">
				<view class="wallet-box-list" v-if="this.getLevelList.length>0">
					<text class="text-size">Lv.1 {{ i18n.text4 }}</text>
					<view class="wallet-box-lists">
						<view>{{ i18n.text5 }}</view>
					</view>
				</view>
				<view class="wallet-box-list" v-if="this.getLevelList.length>1">
					<text class="text-size">Lv.2 {{ i18n.text6 }}</text>
					<text class="text-size pull-right margin-none uni-base-color-06b572" v-if="getRealNameInfo.status == 1">{{ i18n.text2 }}</text>
					<text class="text-size pull-right margin-none uni-base-color-06b572" v-if="getRealNameInfo.status == 2">{{ i18n.text7 }}</text>
					<text class="text-size pull-right margin-none uni-base-color-de6334" v-if="getRealNameInfo.status == 3">{{ i18n.text8 }}</text>
					<text
						class="text-size pull-right margin-none uni-base-color-de6334"
						v-if="getRealNameInfo.status != 3 && getRealNameInfo.status != 2 && getRealNameInfo.status != 1"
					>
						{{ i18n.text1 }}
					</text>
					<view class="wallet-box-lists" >
						<view>{{ i18n.text9 }}{{this.getLevelList[1].cashAmountLimit}} U); </view>
						<view>{{ i18n.text10 }}{{this.getLevelList[1].tradeLimit}} CNY)</view>
					</view>
				</view>

				<view class="wallet-box-list" v-if="this.getLevelList.length>2">
					<text class="text-size">Lv.3 {{ i18n.text11 }}</text>
					<text class="text-sizeS" v-if="getMargin.status == 1">{{getMargin.marginCount}} USDT {{ i18n.text117 }}</text>
					<text class="text-sizeS" v-if="getMargin.status == 2">{{ i18n.text101 }}</text>
					<text class="text-sizeS" v-if="getMargin.status == 4">{{ i18n.text120 }}</text>
					<text class="text-sizeS" v-if="getMargin.status == 3">{{ i18n.text118 }}</text>
					<text class="text-sizeS" v-if="getMargin.status == 0">{{ i18n.text118 }}</text>
					<view class="wallet-box-lists">
						<view>{{ i18n.text14 }}{{this.getLevelList[2].cashAmountLimit}} U);</view>
						<view>{{ i18n.text15 }}{{this.getLevelList[2].tradeLimit}} CNY);</view>
					</view>
				</view>

				<view class="wallet-box-list" v-if="this.getLevelList.length>3">
					<text class="text-size">Lv.4 {{ i18n.text16 }}</text>
					<view class="wallet-box-lists">
						<view>{{ i18n.text17 }}</view>
						<view>{{ i18n.text18 }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	components: { uniSteps },
	data() {
		return {
			getMargin: {
				status: '',
				marginCount:""
			},
			getRealNameInfo: {},
			getOrganVerifyInfo: {},
			active: 0,
			realName: '',
			account: '',
			list1: [
				{
					title: this.$t('levelThe.text20')
				},
				{
					title: this.$t('levelThe.text21')
				},
				{
					title: this.$t('levelThe.text22')
				},
				{
					title: this.$t('levelThe.text23')
				}
			],
			getLevelList:[]
		};
	},
	computed: {
		i18n() {
			return this.$t('levelThe');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('levelThe.text19')
		});
		this.active = option.userLevel - 1;
		this.realName = option.realName;
		this.account = option.account;
		this.getRealNameInfoFunction();
		this.getOrganVerifyInfoFunction();
		this.getMarginFunction();
		this.getLevelListFunction();
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		
		async getMarginFunction() {
			uni.showLoading({ title: this.$t('levelThe.text13'), mask: true });
			let res = await api.getMarginInfoHttp({});
			if (res.code === '000') {
				if (res.data != null) {
					this.getMargin.status = res.data.status;
					this.getMargin.marginCount = res.data.marginCount;
				} else {
					this.getMargin.status = '0';
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('levelThe.text600'))
			}  else {
				this.$alert(res.errorMessage);
			}
		},
		async getLevelListFunction() {
			uni.showLoading({ title: this.$t('levelThe.text13'), mask: true });	
			let res = await api.getLevelListHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getLevelList = res.data
				} else {
					this.getMargin.status = '0';
				}
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('levelThe.text600'))
			} else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},

		async getOrganVerifyInfoFunction() {
			uni.showLoading({ title: this.$t('levelThe.text13'), mask: true });
			let res = await api.getOrganVerifyInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getOrganVerifyInfo = res.data;
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('levelThe.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},

		async getRealNameInfoFunction() {
			uni.showLoading({ title: this.$t('levelThe.text13'), mask: true });
			let res = await api.getRealNameInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getRealNameInfo = res.data;
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('levelThe.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wallet-box-lists {
	font-size: 28rpx;
	color: #999;
	padding: 10rpx 0;
}
.name-text {
	color: #fff;
}
.margin-none {
	margin: 0 !important;
}
.content {
	padding: 0 !important;
	.bottom-list {
		margin-top: 40rpx;
		background-color: #fff;
		padding: 30rpx;
	}
	.wallet-boxs {
		.form-clear-icon {
			float: left;
			margin-top: 8rpx;
		}
		.wallet-box-list:last-child {
			border-bottom: none;
			padding-bottom: 0;
		}
		.wallet-box-list {
			width: 100%;
			font-size: 26rpx;
			padding: 30rpx 0;
			border-bottom: 1px solid #ddd;
			.list-left {
				width: 30rpx;
				height: 100%;
				float: left;
				.form-clear-icon {
					margin-top: 24rpx;
				}
			}
			.list-middle {
				width: 300rpx;
				float: left;
			}
			.arrowright {
				float: right;
				margin-top: 5rpx;
			}
		
			.text-sizes {
				font-size: 24rpx;
			}
			.text-sizeS {
				float: right;
				color: #06b572;
			}
		}
	}
}

.title-T {
	font-size: 28rpx;
	color: #333;
	padding: 32rpx 0;
}
.uni-steps {
	padding-top: 30rpx;
}
/deep/ .uni-steps__row-line--before {
	background-color: #fff;
}
/deep/ .uni-steps__row-title {
	color: #fff !important;
	font-size: 24rpx !important;
}
.example-info {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 15px;
	color: #3b4144;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 20px;
}

.example-info-text {
	font-size: 14px;
	line-height: 20px;
	color: #3b4144;
}

.word-btn-white {
	font-size: 18px;
	color: #ffffff;
}

.word-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	height: 48px;
	margin: 15px;
	background-color: #007aff;
}

.word-btn--hover {
	background-color: #4ca2ff;
}

.status-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 92rpx;
	margin: 30rpx;
	background-color: #007aff;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 15px;
	flex-direction: row;
}

.user-header {
	.user-box {
		background: linear-gradient(to right, #e2c490, #d8a24b);
		border-radius: 10rpx;
		padding: 30rpx;
	}
	padding: 30rpx;
	background-color: #fff;
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
</style>
