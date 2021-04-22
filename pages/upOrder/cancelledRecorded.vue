<template>
	<view>
		<view class="status_bar"><view class="top_view"></view></view>

		<view class="page-top-head flex-row ">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text14 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="scroll-h tabBars-header">
				<view
					v-for="(tab, index) in tabBars"
					:key="tab.id"
					class="uni-tab-item"
					:class="tabIndex == index ? 'uni-tab-item-border-active' : ''"
					:id="tab.id"
					:data-current="index"
					@click="ontabtap"
				>
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
				</view>
			</view>
			<no-msg v-if="listConfig.noMsg"></no-msg>
			<view class="order-box height" v-if="orderList.length > 0">
				<view class="asseats-lists" v-for="(item, index) in orderList" @click="orderListButton(item)">
					<view class="list-header">
						<text class="user-pay">{{ item.type == 1 ? i18n.text1 : i18n.text2 }}</text>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons>
						<text class="title-pay user-pay" v-if='tabIndex == 0'>
							<text v-if='item.buyStatus == 1'>{{i18n.text1}} </text>
							<text v-else-if='item.buyStatus == 2'>{{i18n.text02}}</text>
							<text v-else='item.buyStatus == 3'>{{i18n.text3}}</text>
							<text :class="item.status == 1 ? 'user-pay' : 'user-pays'">（{{item.status == 1?i18n.text5:i18n.text6}})</text>
						</text>
						<text class="title-pay user-pay" v-if='tabIndex == 1'>
							<text v-if='item.saleStatus == 1'>{{i18n.text1}} </text>
							<text v-else-if='item.saleStatus == 2'>{{i18n.text02}}</text>
							<text v-else='item.saleStatus == 3'>{{i18n.text3}}</text>
							<text :class="item.status == 1 ? 'user-pay' : 'user-pays'">（{{item.status == 1?i18n.text5:i18n.text6}})</text>
						</text>
					</view>
					<view class="list-bottom height" v-if='tabIndex == 0'>
						<view class="list-left">
							<view class="size-top">{{ i18n.text9 }}</view>
							<view class="size-bottom">{{ item.createTime.replace(/-/g, '/') }}</view>
						</view>
						<view class="list-left left-middle">
							<view class="size-top">{{ i18n.text10 }}</view>
							<view class="size-bottom">{{ item.buyCount || 0}}</view>
						</view>
						<view class="list-left list-right">
							<view class="size-top">{{ i18n.text11 }}</view>
							{{Number(Number(item.buyAlready).toFixed(2)) || 0 }}/{{Number(Number(item.lastBuyCount).toFixed(2)) || 0}}
						</view>
					</view>
					<view class="list-bottom height" v-if='tabIndex == 1'>
						<view class="list-left">
							<view class="size-top">{{ i18n.text9 }}</view>
							<view class="size-bottom">{{ item.createTime.replace(/-/g, '/') }}</view>
						</view>
						<view class="list-left left-middle">
							<view class="size-top">{{ i18n.text10 }}</view>
							<view class="size-bottom">{{ item.saleCount || 0}}</view>
						</view>
						<view class="list-left list-right">
							<view class="size-top">{{ i18n.text11 }}</view>
							<view class="size-bottom">{{Number(Number(item.saleAlready).toFixed(2)) || 0 }}/{{Number(Number(item.lastSaleCount).toFixed(2)) || 0}}</view>
						</view>
					</view>
					<view class="pay-name">{{ item.name }}</view>
				</view>
				<uni-load-more v-if="listConfig.loading" status="loading"></uni-load-more>
			</view>
			<uni-load-more v-if="listConfig.loadMore" status="noMore"></uni-load-more>
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
			listConfig: {
				noMsg: false, //暂无更多数据
				loadMore: false, //没有更多数据
				loading: false, //正在加载中动画
				pageNo: 1,
				pageSize: 10,
				total: 0
			},
			orderList: [],
			tabIndex: 0,
			tabBars: [
				{
					name: this.$t('cancelledRecorded.text12'),
					id: '1'
				},
				{
					name: this.$t('cancelledRecorded.text13'),
					id: '2'
				}
			],
			tabIndexs: 0,
			tabsOpen: false
		};
	},
	computed: {
		i18n() {
			return this.$t('cancelledRecorded');
		}
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('cancelledRecorded.text14')
		});
		this.getOrderListFuntion().then(data => {
			this.listConfig.total = data;
			if (data == 0) {
				this.listConfig.noMsg = true;
			}
		});
	},
	mounted() {},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			_this.orderList = [];
			_this.listConfig.pageNo = 1;
			_this.listConfig.loadMore = false;
			_this.getOrderListFuntion();
			uni.stopPullDownRefresh();
		}, 300);
	},
	onReachBottom() {
		if (this.orderList.length < this.listConfig.total) {
			this.listConfig.loading = true;
			let _this = this;
			let time = setTimeout(function() {
				_this.listConfig.pageNo += 1;
				_this.getOrderListFuntion();
			}, 300);
		} else {
			this.listConfig.loading = false;
			this.listConfig.loadMore = true;
		}
	},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		async getOrderListFuntion() {
			uni.showLoading({ title: this.$t('cancelledList.text15'), mask: true });
			let res = await api.getAutoSettingPageHttp({
				type: (Number(this.tabIndex) + 1).toString(), //订单类型：1：进行中；2：已完成
				pageSize: this.listConfig.pageSize,
				pageNo: this.listConfig.pageNo
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.listConfig.total = res.data.total;
				this.orderList.push(...res.data.records);
				if (this.orderList.length == 0) {
					this.listConfig.noMsg = true;
				} else {
					this.listConfig.noMsg = false;
				}
				return Promise.resolve(res.data.total);
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('cancelledList.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
				return Promise.resolve(0);
			}
		},
		orderListButton(item) {
			if(this.tabIndex == 0){
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/upOrder/cancelledList?orderId=' + Number(item.buyId) + '&type=' + Number(this.tabIndex)
					});
				}, 1000);
			}else{
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/upOrder/cancelledList?orderId=' + Number(item.saleId) + '&type=' + Number(this.tabIndex)
					});
				}, 1000);
			}
			
			// if (status == 1 && type == 1) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderPayment?orderId=' + orderId + '&urlLink=0' + '&status=' + status + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 2 && type == 1) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderPayment?orderId=' + orderId + '&status=' + status + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 3 && type == 1) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderPayment?orderId=' + orderId + '&urlLink=1' + '&status=' + status + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 4 && type == 1) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderPayment?orderId=' + orderId + '&urlLink=0' + '&status=' + status + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 1 && type == 2) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderSatus?orderId=' + orderId + '&urlLink=2' + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 2 && type == 2) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderSatus?orderId=' + orderId + '&urlLink=0' + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 3 && type == 2) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderSatus?orderId=' + orderId + '&urlLink=1' + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// } else if (status == 4 && type == 2) {
			// 	setTimeout(() => {
			// 		uni.navigateTo({
			// 			url: '/pages/upOrder/orderSatus?orderId=' + orderId + '&urlLink=0' + '&type=' + (Number(this.tabIndex) + 1).toString()
			// 		});
			// 	}, 1000);
			// }
		},
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.listConfig = {
				noMsg: false, //暂无更多数据
				loadMore: false, //没有更多数据
				loading: false, //正在加载中动画
				pageNo: 1,
				pageSize: 10,
				total: 0
			},
			this.orderList = [];
			this.getOrderListFuntion();
		}
	}
};
</script>

<style lang="scss" scoped>
.order-box {
	background: #fff;
	overflow: auto;
	margin-top: 20rpx;
	.list-header {
		font-size: 28rpx;
	}
	.asseats-lists {
		padding: 30rpx 0 0;
	}
	.asseats-lists:last-child .pay-name {
		border-bottom: none !important;
	}
	.title-pay {
		float: right;
		margin-left: 10rpx;
	}
	.user-pay {
		font-size: 26rpx;
		color: #06b572;
		margin-right: 10rpx;
	}
	.user-pays {
		font-size: 26rpx;
		color: #de6334;
		margin-right: 10rpx;
	}
	.form-clear-icon {
		float: right;
		margin-top: 5rpx;
	}
	.status-btns {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		display: block;
		float: right;
		margin-top: 14rpx;
	}
	.user-pay-back {
		background: #06b572;
	}
	.user-pays-back {
		background: #de6334;
	}
	.pay-name {
		padding-bottom: 25rpx;
		border-bottom: 1px solid #ddd;
		font-size: 26rpx;
		margin-top: 10rpx;
	}
	.list-left:first-child {
		width: 45%;
	}
	.left-middle {
		width: 25%;
	}
	.list-right {
		width: 30%;
	}
	.list-left {
		font-size: 26rpx;
		float: left;
		margin-top: 30rpx;
		.size-top {
			margin-bottom: 28rpx;
			color: #999;
			font-size: 24rpx;
		}
	}
	.list-right {
		text-align: right;
	}
}
.order-list {
	text-align: center;
	margin: 30rpx 0;
}
.content {
	.order-img {
		width: 200rpx;
		height: auto;
		display: block;
		margin: 300rpx auto 0;
	}
	.search {
		width: 60%;
		height: 80rpx;
		float: right;
		.search-ipnut {
			width: 300rpx;
			height: 68rpx;
			display: block;
			float: right;
			border: 1px solid #ddd;
			border-radius: 20rpx;
			margin-right: 30rpx;
			padding-left: 30rpx;
		}
		.form-clear-icon {
			display: block;
			float: right;
			margin-top: 15rpx;
		}
	}
	.scroll-h {
		width: 100%;
		height: 80rpx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		.scroll-tabs {
			width: 40%;
			float: left;
		}
	}
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	width: 50%;
	float: left;
	text-align: center;
	padding-left: 34rpx;
	padding-right: 34rpx;
	border-bottom: 2px solid #dddddd;
}

.uni-tab-item-title {
	color: #555;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-border-active {
	border-bottom: 2px solid #06b572;
}
.uni-tab-item-title-active {
	color: #06b572 !important;
}

.uni-tab-items {
	width: 33%;
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	text-align: center;
}
.uni-tab-item-titles {
	color: $uni-textJ-color;
	font-weight: bold;
	font-size: 26rpx;
	height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-title {
	color: $uni-textJ-color;
	font-weight: bold;
	font-size: 26rpx;
	height: 80rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-title-active {
	// font-size: 32rpx;
	color: #333;
}
.uni-tab-item-title-actives {
	color: #333;
	border-radius: 100rpx;
	background: #ddd;
	padding: 10rpx 30rpx;
}
.border-active {
	width: 50rpx;
	height: 5rpx;
	background: #333;
	margin-left: 26rpx;
	transform: translateY(10rpx);
}
.scroll-hs {
	margin-top: 30rpx;
}
</style>
