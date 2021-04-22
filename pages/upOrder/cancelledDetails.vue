<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text25 }}</view>
			</view>
			<view class="box-header">
				<view class="right-title" style="color:#06b572" @click="phoneButton" >{{ orderConfirm.type == 1? i18n.text025 : i18n.text0256 }}</view>
			</view>
		</view>

		<view class="content">
			<view class="connet-pay" v-if="orderConfirm.type == 1">
				<view class="height">
					<image src="../../static/icon/assest_icon3.png" mode="" class="assest_icon3 pull-left"></image>
					<view class="pull-left pay-tit">{{ i18n.text10 }}</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text11 }}</text>
					<text class="pull-right pay-price">￥ {{ orderPaydata.buyAmount  || 0}}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text12 }}</text>
					<text class="pull-right">￥ {{ orderPaydata.price || 0 }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text13 }}</text>
					<text class="pull-right">{{ orderPaydata.buyCount  || 0}} USDT</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text014 }}</text>
					<text class="pull-right">{{ orderPaydata.createTime || '--' }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text14 }}</text>
					<image src="../../static/icon/order_icon.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.tradeCode || '--' }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text15 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<image src="../../static/icon/level_icon2.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.saleUserNickName || '--' }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text16 }}</text>
					<view class="pull-right" v-if="orderPaydata.payType == '2'">
						<text class="pull-right">{{ i18n.text17 || '--' }}</text>
						<image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
					<view class="pull-right" v-if="orderPaydata.payType == '1'">
						<text class="pull-right">{{ i18n.text18 || '--' }}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderPayment.text020') }}{{ $t('orderPayment.text019') }}</text>
				</view>
			</view>
			<view class="connet-pay" v-if="orderConfirm.type == 2">
				<view class="height">
					<image src="../../static/icon/assest_icon3.png" mode="" class="assest_icon3 pull-left"></image>
					<view class="pull-left pay-tit">{{ $t('cancelledDetails.text012') || 0 }}USDT</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('cancelledDetails.text11') }}</text>
					<text class="pull-right pay-price">￥ {{ orderPaydata.saleAmount || 0 }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text14') }}</text>
					<text class="pull-right">￥ {{ orderPaydata.price || 0 }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text15') }}</text>
					<text class="pull-right">{{ orderPaydata.saleCount  || 0 }} USDT</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text014 }}</text>
					<text class="pull-right">{{ orderPaydata.createTime || '--' }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text16') }}</text>
					<image src="../../static/icon/order_icon.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.tradeCode  || '--' }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text17') }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<image src="../../static/icon/level_icon2.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.buyUserNickName || '--'}}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text18') }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<text class="pull-right">{{ orderPaydata.buyUserRealName || '--'}}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text19') }}</text>
					<view class="pull-right" v-if="orderPaydata.receiveType == '2'">
						<text class="pull-right">{{ $t('orderSatus.text20') || '--'}}</text>
						<image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
					<view class="pull-right" v-if="orderPaydata.receiveType == '1'">
						<text class="pull-right">{{ $t('orderSatus.text21') || '--'}}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text020') }}{{ $t('orderSatus.text019') }}</text>
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
			msgType: 'success',
			countdown: '',
			content: '',
			dialogContent: '',
			time: '', //30分钟换算成1800秒
			timer: null, //重复执行
			src: '',
			orderId: '',
			salePay: '',
			orderPaydata: {},
			toggleId: '',
			orderConfirm: {
				realName: '',
				aliPayNum: '',
				tradeCode: '', //
				title: this.$t('cancelledDetails.text22'),
				orderConfirmShow: false,
				payStauts: '1',
				type: '0',
				bankAddr: ''
			},
			urlLink: 0
		};
	},
	computed: {
		i18n() {
			return this.$t('cancelledDetails');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('cancelledDetails.text25')
		});
		this.orderConfirm.payStauts = option.status;
		this.orderConfirm.type = option.type;
		this.orderId = option.orderId;
		this.salePay = option.salePay;
		this.urlLink = option.urlLink;
		this.getOrderInfoFunftion();
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			_this.getOrderInfoFunftion();
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {},
	methods: {
		phoneButton() {
			if(this.orderConfirm.type == 1){
				uni.makePhoneCall({
					// 手机号
					phoneNumber: this.orderPaydata.saleUserPhone,
					// 成功回调
					success: res => {},
					// 失败回调
					fail: res => {}
				});
			}else{
				uni.makePhoneCall({
					// 手机号
					phoneNumber: this.orderPaydata.buyUserPhone,
					// 成功回调
					success: res => {},
					// 失败回调
					fail: res => {}
				});
				
			}
			
		},
		navBack() {
			uni.navigateBack();
		},
		async getOrderInfoFunftion() {
			uni.showLoading({ title: this.$t('cancelledDetails.text29'), mask: true });
			let res = await api.getOrderInfoHttp({
				orderId: this.orderId, // 订单号id
				type:this.orderConfirm.type//订单类型，1：购买订单；2：出售订单
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.orderPaydata = res.data;
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//设置截止时间
				var str = this.orderPaydata.createTime.replace(/-/g, '/');
				var endDate = new Date(str);
				var b = 15; //倒计时分钟数
				endDate.setMinutes(endDate.getMinutes() + b, endDate.getSeconds(), 0);
				var end = endDate.getTime();
				//时间差
				var leftTime = end - now;
				this.time = Math.floor(leftTime / 1000);
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text600'))
			}   else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		
		
		
	}
};
</script>

<style lang="scss" scoped>
.arrowright {
	margin-left: 10rpx;
}
.pay-title {
	font-size: 40rpx;
	font-weight: bold;
}
.pay-time {
	margin-top: 10rpx;
	color: #828587;
	text {
		color: rgb(6, 181, 114);
		margin-left: 10rpx;
	}
}
/deep/ .user-header uni-image {
	width: 120rpx !important;
	height: 120rpx !important;
	border-radius: 50%;
	background-color: #eeeeee;
}
.header-pay {
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
	margin-top: 35rpx;
}
.assest_icon3 {
	width: 45rpx;
	height: 45rpx;
	margin-right: 10rpx;
}
.pay-tit {
	font-size: 34rpx;
	font-weight: bold;
}
.connet-pay {
	padding: 30rpx 0;
}
.pay-list {
	margin: 30rpx 0;
}
.pay-list text {
	font-size: 26rpx;
	line-height: 32rpx;
}
.pay-list text:last-child.pay-price {
	color: rgb(6, 181, 114);
	font-weight: bold;
}
.tabbar3 {
	width: 32rpx;
	height: 32rpx;
	margin-left: 10rpx;
}
.pay_icon2 {
	width: 32rpx;
	height: 32rpx;
	margin-right: 10rpx;
}
.borderBottom {
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
}
.footer-button {
	border-top: 1px solid #eee;
	padding: 30rpx;
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
.order-del {
	width: 37%;
	height: 64rpx;
	border: 1px solid #999;
	text-align: center;
	line-height: 62rpx;
	border-radius: 15rpx;
}
.order-pay {
	border-radius: 15rpx;
	width: 60%;
	height: 64rpx;
	text-align: center;
	line-height: 62rpx;
	background: rgb(6, 181, 114);
	color: #fff;
}
.user-header {
	width: 120rpx !important;
	height: 120rpx !important;
	border-radius: 50%;
	background-color: #f0faf9;
	text-align: center;
	line-height: 120rpx;
	.pay-success-icon {
		font-size: 60rpx !important;
		color: #06b572 !important;
	}
}
</style>
