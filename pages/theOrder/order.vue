<template>
	<view>
		<view class="status_bar"><view class="top_view"></view></view>

		<view class="page-top-head flex-row ">
			<view class="box-header margin-left"></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text016 }}</view>
			</view>
			<view class="box-header" @click="makeButton">
				<view class="right-title">{{ titleTab }}</view>
			</view>
		</view>
        <view class="make-view" v-show="makeShow" @click="makeButton"  style="display: none;">
        	<view class="pay-box pull-left pay-boxs">
        		<view class="border-bottom height" @click="tabButton(1)">
					<uni-icons type="circle-filled" size="14" :color="tabIndex == 1?'#06b572':'#999' " class="icon-img"></uni-icons>
        			<text class="uni-font-size text-users" :style="tabIndex == 1?'color:#06b572':'color:#999'">{{ i18n.text015 }}</text>
        		</view>
        		<view class="height" style="margin-top: 28rpx;" @click="tabButton(2)">
        			<uni-icons type="circle-filled" size="14" :color="tabIndex == 2?'#06b572':'#999'" class="icon-img"></uni-icons>
        			<text class="uni-font-size text-users" :style="tabIndex == 2?'color:#06b572':'color:#999'">{{ i18n.text014 }}</text>
        		</view>
        	</view>
        </view>
		<!-- 一键买卖区域 -->
		<view class="height" v-if="tabIndex == 1">
			<home-index></home-index>
		</view>
		<!-- 挂单买卖区域 -->
		<view class="height"  v-else>
			<home-order></home-order>
		</view>
		
		
		
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import homeIndex from '@/pages/home/index.vue';
import homeOrder from '@/pages/home/orderY.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			titleTab:this.$t('order.text015'),
			makeShow: false,
			tabIndex:1,
		};
	},
	computed: {
		i18n() {
			return this.$t('order');
		}
	},
	components: { uniIcons,homeIndex,homeOrder },
	onLoad(option) {
		if(option.id == 2){
			this.tabIndex = 2
		}
	},
	mounted() {},
	onPullDownRefresh() {
		
	},
	onReachBottom() {
		
	},
	methods: {
		makeButton() {
			this.makeShow = !this.makeShow;
		},
		tabButton(val){
			this.titleTab = val == 1?this.$t('order.text015'):this.$t('order.text014')
			this.tabIndex = val
		}
	}
};
</script>

<style lang="scss" scoped>
.make-view {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	z-index: 998;
	.pay-list {
		padding-top: 0 !important;
		padding-bottom: 30rpx;
	}
	.pay-list:last-child {
		padding-top: 30rpx !important;
		padding-bottom: 0;
	}
	.icon-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		display: block;
		float: left;
		margin-top: 2rpx;
	}
	.pay-boxs {
		position: fixed;
		top: 60px;
		right: 10px;
		background: #fff !important;
	}
	.pay-boxs:after {
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-bottom: 10px solid #fff;
		border-right: 10px solid transparent;
		border-left: 10px solid transparent;
		position: absolute;
		top: -10px;
		right: 20px;
	}
	.pay-box {
		width: 48%;
		height: auto;
		border-radius: 20rpx;
		font-size: 26rpx;
		color: #fff;
		padding: 30rpx 30rpx 0;
		text {
			display: block;
			line-height: 28rpx;
			padding-bottom: 20rpx;
		}
	}
}	

</style>
