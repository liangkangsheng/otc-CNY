<template>
	<view>
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row ">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text1 }}</view>
			</view>
			<view class="box-header"></view>
		</view>
		<view class="content">
			<view class="back-wither height">
				<view class="height">
					<view class="pull-left pay">￥6.64</view>
					<view class="pull-left payCool">/ USDT</view>
				</view>
				<view class="height">
					<view class="pull-left font-size">
						{{ i18n.text2 }}  
						<text class="time">{{ "00:"+((countdown.loginTime < 10) ? "0" + countdown.loginTime : countdown.loginTime)}}</text>
						{{ i18n.text3 }}
					</view>
					<view class="pull-right font-size">
						<view class="paySatus height pull-right" style="margin-right: 0;">
							<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
						</view>
						<view class="paySatus height pull-right" style="margin-right: 10rpx;"><image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image></view>
						<view class="paySatus height pull-right" style="margin-right: 10rpx;">
							<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="back-wither height">
				<view class="payNum height">
					<input type="number" class="inputNum pull-left" :placeholder="$t('payDetails.text5')" />
					<view class="usdt pull-left">USDT</view>
					<view class="all pull-right" @click="all(1)">{{ i18n.text4 }}</view>
				</view>
				<view class="payNum height">
					<input type="number" class="inputNum pull-left" :placeholder="$t('payDetails.text6')" />
					<view class="usdt pull-left">CNY</view>
					<view class="all pull-right" @click="all(2)">{{ i18n.text4 }}</view>
				</view>
				<view class="p height">
					<view class="pull-left">{{ i18n.text7 }}</view>
					<view class="pull-right">10,000-10,00000</view>
				</view>
				<view class="button" @click="tabBarPayButton()">{{ i18n.text8 }}</view>
			</view>
			<view class="back-wither height">
				<view class="p height back-m">
					<view class="pull-left color-font">{{ i18n.text9 }}</view>
				</view>
				<view class="p height back-m">
					<view class="pull-left color-font">{{ i18n.text10 }}</view>
					<view class="pull-right">测试</view>
				</view>
				<view class="p height back-m">
					<view class="pull-left color-font">{{ i18n.text11 }}</view>
					<view class="pull-right">33.3/89%</view>
				</view>
				<view class="p height back-m">
					<view class="pull-left color-font">{{ i18n.text12 }}</view>
					<view class="pull-right">机构认证</view>
				</view>
				<view class="p height back-m">
					<view class="pull-left color-font">{{ i18n.text13 }}</view>
					<view class="pull-right">{{ "00:"+((countdowns.loginTime < 10) ? "0" + countdowns.loginTime : countdowns.loginTime)}}</view>
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
			countdown: {
				loginTime: 60,
				loginTimer: null,
				loginTimeNum: 0,
			},
			countdowns: {
				loginTime: 60,
				loginTimer: null,
				loginTimeNum: 0,
			},
		};
	},
	computed: {
		i18n() {
			return this.$t('payDetails');
		}
	},
	components: { uniIcons },
	onLoad() {
		this.countdownTime()
		this.countdownTimes()
	},
	mounted() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onShow() {
		
	},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		countdownTime() {
			this.countdown.loginTimer = setInterval(() => {
				this.countdown.loginTime--;
				if (this.countdown.loginTime < 1) {
					this.timeUp()
					clearInterval(this.countdown.loginTimer);
					return
				}
			}, 1000)
			
		},
		countdownTimes() {
			this.countdowns.loginTimer = setInterval(() => {
				this.countdowns.loginTime--;
				if (this.countdowns.loginTime < 1) {
					clearInterval(this.countdowns.loginTimer);
					return
				}
			}, 1000)
			
		},
		timeUp(){
			uni.switchTab({
				url:"/pages/theOrder/order?id=2"
			})
		},
		tabBarPayButton(){
			uni.navigateTo({
				url:"/pages/theOrder/orderList"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 30rpx;
}
.pay {
	font-size: 36rpx;
	margin-right: 10rpx;
}
.font-size {
	font-size: 24rpx;
	padding: 30rpx 0 0;
}
.time,
.all,
.usdt {
	color: #06b572;
	// #de6334
}
.all,
.usdt {
	margin-left: 30rpx;
}
.payCool {
	margin-top: 10rpx;
	font-size: 26rpx;
}
.p {
	font-size: 25rpx;
	color: #333;
}
.color-font{
	color: #999;
	font-size: 28rpx;
}
.back-m{
	margin-bottom:30rpx;
	&:last-child {
		margin-bottom: 0;
	}
}
.button {
	border-radius: 10rpx;
	height: 80rpx;
	background: #06b572;
	text-align: center;
	color: #fff;
	font-size: 26rpx;
	line-height: 80rpx;
	margin: 60rpx 0 0;
}

.back-wither {
	box-shadow: 0 0 4rpx #999;
	background: #fff;
	padding: 20rpx;
	border-radius: 10rpx;
	margin-bottom: 28rpx;
}
.payNum {
	border-bottom: 1px solid #ddd;
	margin-bottom: 30rpx;
	padding: 30rpx 0 18rpx;
	.inputNum {
		width: 70%;
	}
	&:last-child {
		margin-bottom: 0;
	}
	// padding:0 20rpx;
}
</style>
