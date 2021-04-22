<template>
	<view class="content">
		<view class="pull-right user-header"><uni-icons type="checkmarkempty" size="16" class="pay-success-icon"></uni-icons></view>
		<view class="pay-success">交易成功</view>
		<view class="payName">￥{{ payName }}</view>
		<view class="payNameS">您已成功出售{{ payNameUSDT }}USDT</view>
		<view class="button" @click="goBack">返回首页</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	data() {
		return {
			payName: '16,213325875',
			payNameUSDT: '1995.36225563'
		};
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: '支付成功'
		});
	},
	mounted() {},
	methods: {
		goBack() {
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/home/index'
				});
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	padding: 210rpx 30rpx 0;
	.user-header {
		width: 120rpx !important;
		height: 120rpx !important;
		border-radius: 50%;
		background-color: #f0faf9;
		text-align: center;
		line-height: 120rpx;
		margin: 0 auto 30rpx;
		border: 1px solid #06b572;
		.pay-success-icon {
			font-size: 60rpx !important;
			color: #06b572 !important;
		}
	}
	.pay-success {
		padding: 10rpx 0 150rpx;
	}
	.pay-success,
	.payName,
	.payNameS {
		text-align: center;
		font-size: 30rpx;
		padding: 10rpx 0;
	}
	.payName {
		color: #06b572;
	}
	.button,
	.buttons {
		width: 240rpx;
		border: 1px solid #ddd;
		border-radius: 10rpx;
		padding: 15rpx 10rpx;
		text-align: center;
		margin: 100rpx auto;
	}
	.buttons {
		border: none;
	}
}
</style>
