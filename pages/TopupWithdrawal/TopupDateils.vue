<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
	
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text8 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="account-boxs height">
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text1 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ WalletLogsData.coinNum || i18n.text118}}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text7 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ WalletLogsData.coinSymbol || i18n.text118}}</view>
			</view>
			<view class="form-input account-list form-inputs height">
				<text class="color-999">{{ i18n.text10 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles break-word" style="width: 70%;" v-if="WalletLogsData.hashCode">{{ WalletLogsData.hashCode}}<image src="../../static/images/code.png" mode="" class="copy_icon" @click="addressButton"></image></view>
				<view type="arrowright" size="16" class="pull-right right-titles break-word" v-else>{{ i18n.text118 }}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text5 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">
					{{ WalletLogsData.createTime || i18n.text118}}
				</view>
			</view>
		
			<view class="form-input account-list form-inputs height">
				<text class="color-999">{{ i18n.text4 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles break-word" style="width: 70%;" v-if="WalletLogsData.walletReceivedAddr">{{ WalletLogsData.walletReceivedAddr}}<image src="../../static/images/code.png" mode="" class="copy_icon" @click="addressButton"></image></view>
				<view type="arrowright" size="16" class="pull-right right-titles break-word" v-else>{{ i18n.text118 }}</view>
			</view>
			<view class="form-input account-list form-inputs height">
				<text class="color-999">{{ i18n.text04 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles break-word" style="width: 70%;" v-if="WalletLogsData.walletSendAddr">{{ WalletLogsData.walletSendAddr}}<image src="../../static/images/code.png" mode="" class="copy_icon" @click="addressButtons"></image></view>
			    <view type="arrowright" size="16" class="pull-right right-titles break-word"v-else>{{ i18n.text118 }}</view>
			</view>
		</view> 
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
import md5 from '../../common/md5.js';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			WalletLogsData: {},
			formData: {
				DocumentType: '',
				name: '',
				DocumentTypeNum: '',
				type: '',
				typeId: ''
			},
			statusUrl: 0,
			id:0
		};
	},
	computed: {
		i18n() {
	
			return this.$t('TopupDateils');
		}
	},
	components: { uniIcons, uniPopupShare },
	onLoad(option) {
		this.id = option.id
		this.statusUrl = option.stauts;
		this.getWalletCashDetailFunction();
	},
	mounted() {},
	methods: {
		navBack() {
	
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/TopupList'
			});
		},
		addressButton() {
			uni.setClipboardData({
				data: this.WalletLogsData.walletReceivedAddr,
				success: (res) => {
					this.$alert($t('TopupDateils.text12'));
				}
			});
			uni.getClipboardData({
				success: function(res) {}
			});
		},
		addressButtons() {
			uni.setClipboardData({
				data: this.WalletLogsData.walletSendAddr,
				success: (res) => {
					this.$alert($t('TopupDateils.text12'));
				}
			});
			uni.getClipboardData({
				success: function(res) {}
			});
		},
		async getWalletCashDetailFunction() {
			uni.showLoading({ title: this.$t('TopupDateils.text9'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.getWalletRechargeDetailHttp({
				rechargeId:this.id
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.WalletLogsData = res.data
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('TopupDateils.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
				return Promise.resolve(0);
			}
		},
		change(e) {},
	}
};
</script>

<style lang="scss" scoped>
.form-inputs {
	padding-bottom: 0;
}
.title-size,
.right-titles {
	font-size: 26rpx;
}
.right-titles{
	margin-top:8rpx;
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
	.account-box {
		margin-top: 35rpx;
	}
}
.account-boxs {
	padding: 0 30rpx;
}
.arrowright {
	margin-top: 8rpx;
	color: #ccc;
}
.form-inputs{
	width: 100%;
}
.account-size {
	font-size: 28rpx;
	color: #86909a;
}
.form-input .label {
	margin-bottom: 20rpx;
	font-size: 26rpx;
}
.footer-button {
	position: fixed;
	bottom: 10rpx;
	right: 30rpx;
	left: 30rpx;
	background-color: #fff;
}
.button {
	border-radius: 5px;
	height: 46px;
	background: #06b572;
	text-align: center;
	color: #fff;
	font-size: 15px;
	line-height: 46px;
	margin: 11px 0;
}
</style>
