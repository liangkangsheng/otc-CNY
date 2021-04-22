<template>
	<view>
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text14 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="content">
			<no-msg v-if="listConfig.noMsg"></no-msg>
			<view class="order-box height" v-if="orderList.length > 0">
				<view class="asseats-lists" v-for="(item, index) in orderList" @click="orderListButton(item.id)" :key="index">
					<view class="height">
						<view class="list pull-left">{{ item.title }}</view>
						<view class="list pull-right"><uni-icons type="arrowright" size="16" class="form-clear-icon arrowright"></uni-icons></view>
					</view>
					<view class="pay-name"></view>
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
					name: this.$t('order.text12'),
					id: '1'
				},
				{
					name: this.$t('order.text13'),
					id: '2'
				}
			],
			tabIndexs: 0,
			tabsOpen: false
		};
	},
	computed: {
		i18n() {
			return this.$t('navctive');
		}
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('order.text14')
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
			uni.showLoading({ title: this.$t('navctive.text15'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.queryNoticeHttp({
				lang: system_info.language,
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
				this.$alert(this.$t('navctive.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
				return Promise.resolve(0);
			}
			
		},
		orderListButton(id) {
			uni.navigateTo({
				url: '/pages/banner/bannerDetails?id=' + id
			});
		},
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
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
	.asseats-lists .height {
		padding: 20rpx 0;
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
		padding-bottom: 10rpx;
		border-bottom: 1px solid #ddd;
		font-size: 26rpx;
	}
	.list-left:first-child {
		width: 50%;
	}
	.left-middle {
		width: 20%;
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
