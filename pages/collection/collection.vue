<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header"></view>
			<view class="box-header">
				<view class="head-title">{{ $t('collection.text15') }}</view>
			</view>
			<view class="box-header" @click="makeButton">
				<view class="right-title">{{ i18n.text16 }}</view>
			</view>
		</view>
		<view class="pay-header height">
			<view class="height pay-header-box">
				<view class="pay-box pull-left">
					<text>{{ i18n.text1 }}(CNY)</text>
					<text>{{ getReceiveStatisData.payAmount }}</text>
					<text>{{ i18n.text2 }}： {{ getReceiveStatisData.payCount }}</text>
				</view>
				<view class="pay-box pull-right">
					<text>{{ i18n.text3 }}(CNY)</text>
					<text>{{ getReceiveStatisData.receiveAmount }}</text>
					<text>{{ i18n.text2 }}： {{ getReceiveStatisData.receiveCount }}</text>
				</view>
			</view>
			<view class="scroll-h">
				<view class="scroll-tabs">
					<view
						v-for="(tab, index) in tabBars"
						:key="tab.id"
						class="uni-tab-item"
						:class="tabIndex == index ? 'uni-tab-item-border-active' : ''"
						:id="tab.id"
						:data-current="index"
						@click="ontabtap">
						<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="tabsOpenzfb">
			<no-msg v-if="listConfig.noMsg"></no-msg>
			<view v-if="dataZFB.length > 0">
				<uni-swipe-action>
					<uni-swipe-action-item
						class="yinheng-list height"
						v-for="(item, index) in dataZFB"
						:right-options="options"
						:key="item.id"
						@click="toggleMessage('success',item.id)">
						<view class="slider-box content-box height">
							<view class="yinheng-img height pull-left"><image src="../../static/icon/alipay_icon.png" mode="" class="pull-left"></image></view>
							<view class="height">
								<view class="yinheng-box">
									<text class="yinh">{{ i18n.text4 }}</text>
									<uni-icons
										type="compose"
										size="16"
										class="form-clear-icon"
										color="#999"
										@click="swipeChange(item.id, item.realName, item.alipayNum, item.alipayQrcode)"
									></uni-icons>
								</view>
								<view class="yinheng-box">
									<text class="form-clear">{{ item.realName }}</text>
									<text class="form-clear-icon pay-color">{{ item.alipayNum }}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
					<uni-load-more v-if="listConfig.loading" status="loading"></uni-load-more>
				</uni-swipe-action>
			</view>
			<uni-load-more v-if="listConfig.loadMore" status="noMore"></uni-load-more>
		</view>
		<!-- 银行卡 -->
		<view class="pay-yinheng" v-if="tabsOpenyh">
			<no-msg v-if="listConfigS.noMsgS"></no-msg>
			<view v-if="dataYH.length > 0">
				<uni-swipe-action>
					<uni-swipe-action-item class="yinheng-list height" v-for="(item, index) in dataYH" :right-options="options" :key="item.id" @click="toggleMessage('success',item.id)">
						<view class="yinheng-img height pull-left"><image src="../../static/icon/pay_icon2.png" mode="" class="pull-left"></image></view>
						<view class="slider-box content-box height">
							<view class="yinheng-box">
								<text class="yinh">{{ item.bankName }}</text>
								<uni-icons
									type="compose"
									size="16"
									class="form-clear-icon"
									color="#999"
									@click="swipeChange2(item.id, item.realName, item.bankNum, item.bankName, item.bankAddress)"
								></uni-icons>
							</view>
							<view class="yinheng-box">
								<text class="form-clear">{{ item.realName }}</text>
								<text class="form-clear-icon pay-color">{{ item.bankNum }}</text>
							</view>
						</view>
					</uni-swipe-action-item>
					<uni-load-more v-if="listConfigS.loadingS" status="loading"></uni-load-more>
				</uni-swipe-action>
			</view>
			<uni-load-more v-if="listConfigS.loadMoreS" status="noMore"></uni-load-more>
		</view>
		<!-- 微信 -->
		<view class="" v-if="tabsOpenwx">
			<no-msg v-if="listConfigSS.noMsgSS"></no-msg>
			<view v-if="dataWX.length > 0">
				<uni-swipe-action>
					<uni-swipe-action-item
						class="yinheng-list height"
						v-for="(item, index) in dataWX"
						:right-options="options"
						:key="item.id"
						@click="toggleMessage('success',item.id)">
						<view class="slider-box content-box height">
							<view class="yinheng-img height pull-left"><image src="../../static/icon/wechat_icon.png" mode="" class="pull-left"></image></view>
							<view class="height">
								<view class="yinheng-box">
									<text class="yinh">{{ i18n.text17 }}</text>
									<uni-icons
										type="compose"
										size="16"
										class="form-clear-icon"
										color="#999"
										@click="swipeChange3(item.id, item.realName, item.wechatNum, item.wechatQrcode)"
									></uni-icons>
								</view>
								<view class="yinheng-box">
									<text class="form-clear">{{ item.realName }}</text>
									<text class="form-clear-icon pay-color">{{ item.wechatNum }}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
					<uni-load-more v-if="listConfigSS.loadingSS" status="loading"></uni-load-more>
				</uni-swipe-action>
			</view>
			<uni-load-more v-if="listConfigSS.loadMoreSS" status="noMore"></uni-load-more>
		</view>
		<view class="make-view" v-show="makeShow" @click="makeButton"  style="display: none;">
			<view class="pay-box pull-left pay-boxs">
				<view class="pay-list border-bottom height" @click="payButton(1, i18n.text4)">
					<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img"></image>
					<text class="uni-font-size text-users">{{ i18n.text6 }}</text>
				</view>
				<view style="margin-top: 30rpx;" class="pay-list border-bottom height" @click="payButton(2, i18n.text5)">
					<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
					<text class="uni-font-size text-users">{{ i18n.text7 }}</text>
				</view>
				<view class="pay-list height" @click="payButton(3, i18n.text17)">
					<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
					<text class="uni-font-size text-users">{{ i18n.text18 }}</text>
				</view>
			</view>
		</view>
		<!-- 中部弹框 -->
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" :title="i18n.text24" :content="$t('collection.text12')" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import http from '@/request/request.js';
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			options: [
				{
					text: this.$t('collection.text8'),
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: this.$t('collection.text9'),
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			tabIndex: 0,
			tabBars: [
				{
					name: this.$t('collection.text5'),
					id: '0'
				},
				{
					name: this.$t('collection.text4'),
					id: '1'
				},
				{
					name: this.$t('collection.text17'),
					id: '2'
				}
				
			],
			tabsOpenyh: false,
			tabsOpenzfb: false,
			tabsOpenwx: false,
			makeShow: false,
			dataZFB: [],
			dataYH: [],
			dataWX: [],
			// 控制支付宝列表
			listConfig: {
				noMsg: false, //暂无更多数据
				loadMore: false, //没有更多数据
				loading: false, //正在加载中动画
				pageNo: 1,
				pageSize: 10,
				total: 0
			},
			// 控制银行卡列表
			listConfigS: {
				noMsgS: false, //暂无更多数据
				loadMoreS: false, //没有更多数据
				loadingS: false, //正在加载中动画
				pageNoS: 1,
				pageSizeS: 10,
				totalS: 0
			},
			// 控制微信列表
			listConfigSS: {
				noMsgSS: false, //暂无更多数据
				loadMoreSS: false, //没有更多数据
				loadingSS: false, //正在加载中动画
				pageNoSS: 1,
				pageSizeSS: 10,
				totalSS: 0
			},
			msgType: 'success',
			getReceiveStatisData: '',
			id:"",
		};
	},
	computed: {
		i18n() {
			return this.$t('collection');
		}
	},
	components: { uniIcons, uniSwipeActionItem, uniSwipeAction },
	onPullDownRefresh() {
		this.dataZFB = [];
		this.dataYH = [];
		this.dataWX = [];
		setTimeout(() => {
			this.getReceiveAccountListFunction();
			uni.stopPullDownRefresh();
		}, 300);
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('collection.text15')
		});
		this.tabIndex = 0;
		this.tabsOpenyh = true;
	},
	onLaunch: function() {
	},
	onShow: function() {
		this.dataZFB = [];
		this.dataYH = [];
		this.dataWX = [];
		this.getReceiveStatisFunction();
		
		this.makeShow = false;
	},
	onHide: function() {
	},
	onNavigationBarButtonTap(e) {},
	mounted() {},
	methods: {
		makeButton() {
			this.makeShow = !this.makeShow;
		},
		navBack() {
			uni.navigateBack();
		},
		swipeChange(id, realName, alipayNum, alipayQrcode) {
			var obj = {
				id: id,
				realName: realName,
				alipayNum: alipayNum,
				alipayQrcode: alipayQrcode
			};
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/collection/collectionForm?id=1&name=' + this.$t('collection.text4') + '&list=0&item=' + encodeURIComponent(JSON.stringify(obj))
				});
			}, 1000);
		},
		swipeChange2(id, realName, bankNum, bankName, bankAddress) {
			var obj = {
				id: id,
				realName: realName,
				bankNum: bankNum,
				bankName: bankName,
				bankAddress: bankAddress
			};
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/collection/collectionForm?id=2&name=' + this.$t('collection.text5') + '&list=0&item=' + encodeURIComponent(JSON.stringify(obj))
				});
			}, 1000);
		},
		swipeChange3(id, realName, wechatNum, wechatQrcode) {
			var obj = {
				id: id,
				realName: realName,
				wechatNum: wechatNum,
				wechatQrcode: wechatQrcode
			};
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/collection/collectionForm?id=3&name=' + this.$t('collection.text17') + '&list=0&item=' + encodeURIComponent(JSON.stringify(obj))
				});
			}, 1000);
		},
		// 刪除
		swipeClick(e, id) {
			let { content } = e;
			if (content.text === this.$t('collection.text9')) {
				uni.showModal({
					title: this.$t('collection.text10'),
					content: this.$t('collection.text12'),
					success: res => {
						if (res.confirm) {
							this.delReceiveAccountFunction(id);
						} else if (res.cancel) {
						}
					}
				});
			}
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.msgType = 'info';
			// this.message = '点击了对话框的取消按钮';
			this.$refs.popupDialog.open();
			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框点击确认按钮
		 */
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			this.delReceiveAccountFunction(this.id);
			// 需要执行 done 才能关闭对话框
			done();
		},
		toggleMessage(type,id) {
			this.msgType = type;
			this.id = id;
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {},
		//删除收款账户
		async delReceiveAccountFunction(id) {
			uni.showLoading({ title: this.$t('collection.text13'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.delReceiveAccountHttp({
				id: id,
				lang:system_info.language,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('collection.text14'));
				this.dataZFB = [];
				this.dataYH = [];
				this.dataWX = [];
				this.getReceiveAccountListFunction();
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('collection.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		//收款账户统计
		async getReceiveStatisFunction() {
			let res = await api.getReceiveStatisHttp({});

			if (res.code === '000') {
				this.getReceiveStatisData = res.data;
				this.getReceiveAccountListFunction();
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('collection.text600'))
			} else {
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getReceiveAccountListFunction() {
			this.dataZFB = [];
			this.dataYH = [];
			this.dataWX = [];
			uni.showLoading({ title: this.$t('collection.text13'), mask: true });
			let res = await api.getReceiveAccountListHttp({});
			if (res.code === '000') {
				uni.hideLoading();

				if (res.data != '') {
					for (var i = 0; i < res.data.length; i++) {
						if (res.data[i].receiveAccountType == '1') {
							this.dataZFB.push(res.data[i]);
						} else if (res.data[i].receiveAccountType == '2') {
							this.dataYH.push(res.data[i]);
						} else {
							this.dataWX.push(res.data[i]);
						}
					}
					if (this.dataZFB.length == 0) {
						this.listConfig.noMsg = true;
					} else {
						this.listConfig.noMsg = false;
					}
					if (this.dataYH.length == 0) {
						this.listConfigS.noMsgS = true;
					} else {
						this.listConfigS.noMsgS = false;
					}
					if (this.dataWX.length == 0) {
						this.listConfigSS.noMsgSS = true;
					} else {
						this.listConfigSS.noMsgSS = false;
					}
					return;
				}
				if (res.data == '') {
					this.listConfig.noMsg = true;
					this.listConfigS.noMsgS = true;
					this.listConfigSS.noMsgSS = true;
					return;
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('collection.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		payButton(id, name) {
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/collection/collectionForm?id=' + id + '&name=' + name
				});
			}, 1000);
			this.makeShow = false;
		},
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndex === index) {
				return;
			}
			console.log('ffff')
			this.tabIndex = index;
			if(index == 0){
				this.tabsOpenyh = true;
				this.tabsOpenzfb = false;
				this.tabsOpenwx = false;
			}else if(index == 1){
				this.tabsOpenyh = false;
				this.tabsOpenzfb = true;
				this.tabsOpenwx = false;
			}else if(index == 2){
				this.tabsOpenyh = false;
				this.tabsOpenzfb = false;
				this.tabsOpenwx = true;
			}
			this.getReceiveAccountListFunction();
		}
	}
};
</script>

<style lang="scss" scoped>
.slider-box {
	width: 100%;
}
/deep/ .button-group--right {
	right: -40rpx;
}
.pay-list {
	padding-top: 0 !important;
	padding-bottom: 30rpx;
}
.pay-list:last-child {
	padding-top: 30rpx !important;
	padding-bottom: 0;
}
.text-users {
	display: block;
	float: left;
	line-height: 30rpx !important;
}
.icon-img {
	width: 30rpx;
	height: 30rpx;
	margin-right: 10rpx;
	display: block;
	float: left;
}
.make-view {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	z-index: 998;
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
.pay-color {
	color: #333;
}
.form-clear {
	color: #999;
	font-size: 28rpx;
}
.yinheng-img {
	height: 100%;
}
.yinheng-list:last-child {
	border-bottom: 15rpx solid #f2f2f2;
}
.yinheng-list {
	background: #fff;
	padding: 30rpx;
	border-top: 15rpx solid #f2f2f2;
	image {
		display: block;
		width: 30rpx;
		height: 30rpx;
		margin-right: 15rpx;
	}
	.yinh {
		color: #333;
	}
	.form-clear-icon {
		float: right;
	}
	.yinheng-box {
		width: 100%;
		font-size: 30rpx;
		line-height: 1;
		float: left;
		&:last-child {
			margin-top: 20rpx;
			font-size: 28rpx;
		}
	}
}
.pull-right {
	float: right;
}
/deep/
.uni-popup{
    position: fixed;
    z-index: 1000;
}
.scroll-h {
	width: 100%;
	height: 65rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
/deep/ .uni-page-head-ft {
	margin-right: 30rpx;
}
.uni-tab-item {
	margin-right: 30rpx;
	/* #ifndef APP-PLUS */
	display: inline-block;
	float: left;
	/* #endif */
	flex-wrap: nowrap;
	float: left;
}
/deep/ .uni-btn-icon {
	margin-right: 30rpx;
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
	line-height: 80rpx;
	transition: all 0.1s linear;
}
.uni-tab-item-title-active {
	font-size: 32rpx;
	color: #06b572;
}
.border-active {
	width: 50rpx;
	height: 5rpx;
	background: #333;
	margin: 0 auto;
	transform: translateY(10rpx);
}
.pay-header-box {
	padding-bottom: 30rpx;
}
.content {
	padding: 0 !important;
	.pay-header {
		background: #fff;
		padding: 30rpx 30rpx 0;
	}
	.pay-box {
		width: 48%;
		height: auto;
		border-radius: 20rpx;
		font-size: 26rpx;
		color: #fff;
		padding: 30rpx;
		text {
			display: block;
			line-height: 52rpx;
		}
	}
	.pay-box:first-child {
		background: #62cfaf;
	}
	.pay-box:last-child {
		background: #1c6cbf;
	}
}
</style>
