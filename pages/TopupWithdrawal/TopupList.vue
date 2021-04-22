<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<!-- 自定义顶部栏 -->
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text12 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="content">
			<!-- <view class="asseats-header">
			<view class="asseats-list" @click="openPopup(index)" :class="{ activeOpen: activeOpen == index }" v-for="(item, index) in tab" :key="index">
				<text class="name">{{ item.name }}</text>
				<image class="iconfontImg" :class="showClass === 'show' ? 'up' : 'down'" src="../../static/icon/cont.png" mode=""></image>
			</view>
		</view> -->
			<!-- <view :class="['dropdown-mask', showClass]" @click="closePopup" :style="{ top: contentTop + 'px' }" v-show="isShow">
			<view :class="{ activeOpen: activeOpen == 0 }">
				<view class="list_option_box" :style="{ transform: 'translateY(' + heightTrans + 'px)' }" :class="['option_box']">
					<view class="contents">
						<ren-calendar ref="ren" :markDays="markDays" :headerBar="false" @onDayClick="onDayClick"></ren-calendar>
						<view class="change">选中日期：{{ curDate }}</view>
					</view>
				</view>
			</view>
			<view :class="{ activeOpen: activeOpen == 1 }">
				<view class="list_option_box" :style="{ transform: 'translateY(' + heightTrans + 'px)' }" :class="['option_box']">
					<view class="list_option" v-for="(item, index) in list2" :key="index" @click="choose(item, 1)">
						<view>{{ item.text }}</view>
						<uni-icons type="checkmarkempty" v-if="item.value === value2" size="28" class="form-clear-icon arrowright"></uni-icons>
					</view>
				</view>
			</view>
			<view :class="{ activeOpen: activeOpen == 2 }">
				<view class="list_option_box" :style="{ transform: 'translateY(' + heightTrans + 'px)' }" :class="['option_box']">
					<view class="list_option" v-for="(item, index) in list3" :key="index" @click="choose(item, 2)">
						<view>{{ item.text }}</view>
						<uni-icons type="checkmarkempty" v-if="item.value === value3" size="28" class="form-clear-icon arrowright"></uni-icons>
					</view>
				</view>
			</view>
		</view> -->

			<no-msg v-if="listConfig.noMsg"></no-msg>
			<view class="asseats-box height order-box" v-if="WalletLogsData.length > 0">
				<view class="asseats-lists" v-for="(item, index) in WalletLogsData" :key="index">
					<view class="list-bottom height">
						<view class="list-left left-middle">
							<view class="size-top">{{ i18n.text1 }}</view>
							<view class="size-bottom">
								<span>{{ item.coinSymbol }}</span>
							</view>
						</view>
						<view class="list-left">
							<view class="size-top">{{ i18n.text10 }}</view>
							<view class="size-bottom">{{ item.createTime.replace(/-/g, '/') }}</view>
						</view>
						<view class="list-left list-right" @click="AssetsButton(item.id)">
							<view class="size-top" >{{ i18n.text11 }}</view>
							<view class="size-bottom">
								{{ item.coinNum }}
								<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
							</view>
						</view>
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
import RenCalendar from '@/components/ren-calendar/ren-calendar.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			WalletLogsData: [],
			listConfig: {
				noMsg: false, //暂无更多数据
				loadMore: false, //没有更多数据
				loading: false, //正在加载中动画
				pageNo: 1,
				pageSize: 10,
				total: 0
			},
			// 下拉
			contentTop: 0,
			isShow: false,
			showClass: '',
			activeOpen: 0,
			falg1: false,
			falg2: false,
			falg3: false,
			heightTrans: 0,
			value1: 0,
			value2: 0,
			value3: 0,

			curDate: '',
			markDays: []
		};
	},
	computed: {
		i18n() {
			return this.$t('TopupList');
		}
	},
	components: {
		uniIcons,
		RenCalendar
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('TopupList.text12')
		});
		this.queryWalletLogsFunction().then(data => {
			this.listConfig.total = data;
			if (data == 0) {
				this.listConfig.noMsg = true;
			}
		});
	},
	onPullDownRefresh() {
		var _this = this;
		setTimeout(() => {
			_this.WalletLogsData = [];
			_this.listConfig.pageNo = 1;
			_this.listConfig.loadMore = false;
			_this.queryWalletLogsFunction();
			uni.stopPullDownRefresh();
		}, 300);
	},
	onReachBottom() {
		if (this.WalletLogsData.length < this.listConfig.total) {
			this.listConfig.loading = true;
			let _this = this;
			let time = setTimeout(function() {
				_this.listConfig.pageNo += 1;
				_this.queryWalletLogsFunction();
			}, 300);
		} else {
			this.listConfig.loading = false;
			this.listConfig.loadMore = true;
		}
	},
	methods: {
		navBack() {
		
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/Topup'
			});
		},
		AssetsButton(id) {
			uni.navigateTo({
				url: '/pages/TopupWithdrawal/TopupDateils?id=' + id
			});
		},
		onDayClick(data) {
			this.curDate = data.date;
		},
		async getMyAssetsItemFunction() {
			uni.showLoading({ title: this.$t('TopupList.text13'), mask: true });
			let res = await api.getMyAssetsItemHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.coinSymboldata = res.data;
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('TopupList.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async queryWalletLogsFunction() {
			uni.showLoading({ title: this.$t('TopupList.text13'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.queryWalletRechargeHttp({
				lang: system_info.language,
				pageSize: this.listConfig.pageSize,
				pageNo: this.listConfig.pageNo
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.WalletLogsData.push(...res.data.records);
				return Promise.resolve(res.data.total);
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('TopupList.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
				return Promise.resolve(0);
			}
		},
		openPopup(index) {
			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					let info = uni.createSelectorQuery().select('.asseats-header');
					info.boundingClientRect(function(data) {
						that.contentTop = data.height;
					}).exec();
				}
			});
			that.isShow = true;
			that.activeOpen = index;
			if (index == '0') {
				that.falg1 = !that.falg1;
				that.falg2 = false;
				that.falg3 = false;
				if (that.falg1 == true) {
					that.showClass = 'show';
				} else {
					that.showClass = '';
				}
				return;
			}
			if (index == '1') {
				that.falg1 = false;
				that.falg2 = !that.falg2;
				that.falg3 = false;
				if (that.falg2 == true) {
					that.showClass = 'show';
				} else {
					that.showClass = '';
				}
				return;
			}
			if (index == '2') {
				that.falg1 = false;
				that.falg2 = false;
				that.falg3 = !that.falg3;
				if (that.falg3 == true) {
					that.showClass = 'show';
				} else {
					that.showClass = '';
				}
				return;
			}
		},
		closePopup() {
			this.showClass = '';
			setTimeout(() => {
				this.falg1 = false;
				this.falg2 = false;
				this.falg3 = false;
			}, 300);
		},
		choose(item, index) {
			if (index == '0') {
				this.value1 = item.value;
				this.tab[0].name = item.text;
				return;
			}
			if (index == '1') {
				this.value2 = item.value;
				this.tab[1].name = item.text;
				return;
			}
			if (index == '2') {
				this.value3 = item.value;
				this.tab[2].name = item.text;
				this.queryWalletLogsFunction();
				return;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.list_option_box {
	max-height: 400px;
	overflow-y: auto;
	position: absolute;
	left: 0;
	right: 0;
	z-index: 1000;
	background: #fff;
	transition: all 0.3s;
	display: none;
	.list_option {
		font-size: 24rpx;
		padding: 0 28rpx;
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		justify-content: space-between;
		&:not(:last-child) {
			border-bottom: 1rpx solid #dddddd;
		}
	}
}

.order-box .asseats-lists {
	padding: 0 !important;
}
.activeOpen {
	.down {
		transition: transform 0.3s;
		transform: rotateZ(0);
	}
	.up {
		transition: transform 0.3s;
		transform: rotateZ(-180deg);
	}
}
.dropdown-mask {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	transition: all 0.3s;
	z-index: 999;
	&.show {
		background: rgba(0, 0, 0, 0.5);
		.activeOpen {
			.option_box {
				display: block !important;
			}
		}
	}
}
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
		border-bottom: 1px solid #ddd;
		font-size: 26rpx;
		margin-top: 10rpx;

	}
	.left-middle {
		width: 30% !important;
	}
	.list-left {
		width: 40%;
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
		width: 30% !important;
	}
}
.content {

	.left-middle {

	}
	.asseats-box {
		background: #fff;
		overflow: auto;

		.list-header {
			font-size: 28rpx;
		}
	
		.asseats-lists:last-child .list-left {
			border-bottom: none !important;
		}
	}
	.asseats-header {
		border-top: 1px solid #ddd;
		width: 100%;
		height: 75rpx;
		border-bottom: 1px solid #eee;
		box-shadow: 0 0 5rpx #333;
		background: #fff;
		position: fixed;
		top: 44px;
		left: 0;
		right: 0;
		z-index: 10;
		.asseats-list {
			width: 33.3%;
			line-height: 75rpx;
			font-size: 26rpx;
			text-align: center;
			float: left;
			position: relative;
		}
		.iconfontImg {
			width: 14rpx;
			height: 12rpx;
			display: block;
			position: absolute;
			top: 32rpx;
			right: 75rpx;
		}
	}
}
.name {
	padding-right: 50rpx;
}
</style>
