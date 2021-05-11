<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text1 }}</view>
			</view>
			<view class="box-header" style="text-align: right;font-size: 20rpx;font-size: 26rpx;">
				<text @click="navBackButton">{{ i18n.text11 }}</text>
			</view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<text class="pull-left">USDT</text>
				<text class="text-size text-sizeS pull-right uni-base-color-06b572">{{ i18n.text2 }}</text>
			</view>
			<view class="header">
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay pull-left"
					:id="tab.id"
					:data-current="tab.id"
					:class="tabIndexPay == tab.id ? 'uni-tab-item-title-active-pay' : ''"
					@click="ontabtapPay"
				>
					<text class="text-b uni-padding-wrap">{{ tab.name }}</text>
				</view>
			</view>
			<view class="QrCode"><image :src="imageUrl" mode=""></image></view>
			<view class="code-button uni-base-color-06b572" @click="codeButton">{{ i18n.text3 }}</view>
			<view class="address">{{ i18n.text4 }}</view>
			<view class="address address-text padding-t">{{ address || i18n.text5 }}</view>
			<view class="code-buttons uni-base-color-06b572" @click="addressButton()">{{ i18n.text10 }}</view>
			<view class="address">{{ i18n.text6 }}</view>
			<view class="address address-text padding-t">*{{ i18n.text7 }}{{getMinRech || 0 }}USDT</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			id: '',
			tabBarPay: [
				{
					name: 'ERC20',
					id: '1'
				},
				{
					name: 'TRC20',
					id: '2'
				}
			],
			
			tabIndexPay: 1,
			tabsOpenPay: false,
			imageUrl: '',
			address: '',
			getMinRech:""
		};
	},
	computed: {
		i18n() {
			return this.$t('Topup');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('Topup.text1')
		});
		this.id = option.id;
		this.walletRechargeFunctuion();
		this.getMinRechargeFunction()
	},
	mounted() {},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			_this.walletRechargeFunctuion();
			_this.getMinRechargeFunction()
			uni.stopPullDownRefresh();
		}, 300);
	},
	methods: {
		async getMinRechargeFunction(){
			let res = await api.getMinRechargeHttp({

			});
			if (res.code === '000') {
				uni.hideLoading();
				this.getMinRech = res.data
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Topup.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		navBack() {
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/TopupWithdrawal?id=1'
			});
		},
		navBackButton(){
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/TopupList'
			});
		},
		ontabtapPay(e) {
			let index = e.currentTarget.id;
			if (this.tabIndexPay === index) {
				return;
			}
			this.tabIndexPay = index;
			this.tabsOpenPay = !this.tabsOpenPay;
			this.walletRechargeFunctuion()
		},
		async walletRechargeFunctuion() {
			uni.showLoading({ title: this.$t('Topup.text8'), mask: true });

			const system_info = GET_STORAGE('system_info');
			let res = await api.walletRechargeHttp({
				lang: system_info.language,
				trocotol:this.tabIndexPay == 1?"ERC20":"TRC20"
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.imageUrl = res.data.walletAddrQrUrl;
				this.address = res.data.walletAddr;
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Topup.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		addressButton() {
			uni.setClipboardData({
				data: this.address,
				success: (res) => {
					this.$alert($t('Topup.text12'));
				}
			});
			uni.getClipboardData({
				success: function(res) {}
			});
		},
		codeButton() {
			uni.downloadFile({
				url: this.imageUrl,
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								this.$alert(this.$t('Topup.text9'));
							}
						});
					} else {
						this.$alert(res.errorMessage);
					}
				}
			});
		},

		linkButtonSZ(id) {
			if (id == 1) {
				uni.navigateTo({
					url: '/pages/TopupWithdrawal/Topup'
				});
				return;
			}
			if (id == 1) {
				uni.navigateTo({
					url: '/pages/TopupWithdrawal/Withdrawal'
				});
				return;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 30rpx 30rpx !important;
	.header {
		padding: 30rpx 0;
	}
	.account-boxs {
		background-color: #eeeeee;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;
	}
	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
	}
	.uni-tab-item-pay {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
		margin-right: 30rpx;
		color: #999;
		border: 1px solid #999;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		&:last-child {
			margin-right: 0;
		}
	}
	.uni-tab-item-title-active-pay {
		background-color: $uni-base-color-06b572;
		border: 1px solid $uni-base-color-06b572;
		color: #fff;
	}
	.uni-tab-item-pay {
		vertical-align: middle;
	}
	.QrCode {
		width: 300rpx;
		height: 300rpx;
		margin: 0 auto;
		background-color: #eeeeee;
		border: 1px solid #ddd;
		uni-image {
			width: 296rpx;
			height: 296rpx;
		}
	}
	.address-text {
		color: #999;
	}
	.address {
		font-size: 26rpx;
	}
	.padding-t {
		padding: 15rpx 0;
	}
	.code-button {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		background-color: $uni-base-color-06b572;
		color: #fff !important;
		vertical-align: middle;

		margin: 30rpx auto;
	}
	.code-buttons {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		text-align: center;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		background-color: $uni-base-color-06b572;
		color: #fff !important;
		vertical-align: middle;
		width: 240rpx;
		margin-bottom: 30rpx;

	}
}
</style>
