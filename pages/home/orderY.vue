<template>
	<view class="content">
		<view class="pages-mid-notes flex-row bdb-1px borderBottom" style="">
			<uni-icons type="sound-filled" size="18" class="notes-icon" color="#999"></uni-icons>
			<swiper vertical circular autoplay class="notes-scroll"  v-if="noticeList.length>0"  @click.stop="toSecondPage()">
				<swiper-item v-for="(item, index) in noticeList" :key="index">
					<view class="nowrap2">{{ item.title }}</view>
				</swiper-item>
			</swiper>
			<swiper vertical circular autoplay class="notes-scroll"  v-else>
				<swiper-item>
					<view class="nowrap2">{{$t('index.text40')}}</view>
				</swiper-item>
			</swiper>
			<view class="arrow-right"></view>
		</view>
		<!-- 新增 样式start -->
		<view class="height">
			<view class="height borderBottom" style="padding-bottom: 0;">
				<view class="pull-right header SIZE"@click="handleShowShare">{{i18n.text106}}{{boolStatus}}<uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin" style="margin-top: 6rpx;margin-left: 6rpx;"></uni-icons></view>
				
			</view>
			<view class="header padding-30 pull-left">
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay"
					:class="tabIndex == index ? 'uni-tab-item-border-active-pay' : ''"
					:id="tab.id"
					:data-current="index"
					@click="ontabtapPay">
					<text class="text-b" :class="tabIndex == index ? 'uni-tab-item-title-active-pay' : ''">{{ tab.name }}</text>
				</view>
			</view>
			<view class="pull-right header SIZE" @click="navTo('/pages/theOrder/orderList')">
				<image src="../../static/icon/order_icon.png" mode="" class="pull-left" style="width:30rpx;height: 26rpx;margin-top: 8rpx;margin-right: 8rpx;"></image>
				{{i18n.text104}}
			</view>
			<view class="pull-right header SIZE" @click="navTo('/pages/upOrder/cancelledRecorded')">
				<image src="../../static/icon/order_icon.png" mode="" class="pull-left" style="width:30rpx;height: 26rpx;margin-top: 8rpx;margin-right: 8rpx;"></image>
				{{i18n.text105}}
			</view>
		</view>
		
		<view class="contents">
			<no-msg v-if="listConfig.noMsg"></no-msg>
			<view class="order-box height" v-if="autoSettingList.length > 0">
				<view class="asseats-lists" v-for="(item, index) in autoSettingList" :key="index">
					<view class="list-header">
						<text class="uedt">{{ item.nickName }}</text>
						<text class="title-pay" :class="item.payType == 1 ? 'user-pay' : item.payType == 2 ? 'user-pays' : 'user-payswx'">{{ item.payType == 1 ? "支付宝" : item.payType == 2 ? "银行卡" : "微信" }}</text>
					</view>
					<view class="list-bottom height">
						<view class="list-left">
							<view class="size-top">{{$t('home.text15')}}</view>
							<view class="size-bottom" v-if="tabIndex == 0">{{ item.buyCount }}({{$t('home.text16')}}:{{item.buyAlready}})</view>
							<view class="size-bottom" v-if="tabIndex == 1">{{ item.saleCount }}</view>
						</view>
						<view class="list-left left-middle">
							<view class="size-top" v-if="tabIndex == 0">{{ item.payType == 1 ? $t('home.text18') : $t('home.text19') }}{{$t('home.text17')}}</view>
							<view class="size-top" v-if="tabIndex == 1">{{$t('home.text20')}}</view>
							<view class="size-bottom">{{ item.bankPayLimit }}</view>
							<view class="size-bottom">{{ item.saleAlready }}</view>
						</view>
						<view class="list-left list-right">
							<view class="size-top">{{$t('home.text21')}}</view>
							<view class="size-bottom" v-if="item.payType == 1">{{ item.aliPayPrice }}</view>
							<view class="size-bottom" v-if="item.payType == 2">{{ item.bankPayPrice }}</view>
							<view class="size-bottom" v-if="item.payType == 3">{{ item.wechatPayPrice }}</view>
						</view>
					</view>
				    <view class="height">
				    	<view class="buyButton pull-right" v-if="tabIndex == 0" @click="navToPay('/pages/theOrder/payDetails',item.id)">去购买</view>
				    	<view class="saleButton pull-right" v-if="tabIndex == 1"  @click="navToSale('/pages/theOrder/saleDetails',item.id)">去出售</view>
				    </view>
					
				</view>
				<uni-load-more v-if="listConfig.loading" status="loading"></uni-load-more>
			</view>
			<uni-load-more v-if="listConfig.loadMore" status="noMore"></uni-load-more>
		</view>
		
		<view class="homeIndex">
			<!-- 底部弹框 -->
			<view class="share">
				<view :class="{ 'share-box': shareState }" @click="handleHiddenShare"></view>
				<view class="share-item" :class="{ 'share-show': shareState }">
					<view class="list-box-share borderBottom height">
						<view class="pull-left">{{ i18n.text114 }}</view>
						<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text024 }}</view>
					</view>
					<view class="boolSearch">
						<input type="text" placeholder="请搜索货币">
					</view>
					<scroll-view 
					  :scroll-top="scrollTop"
					  scroll-y="true"
					  class="scroll-Y"
					  @scrolltoupper="upper"
					  @scrolltolower="lower"
					  @scroll="scroll" >
					    <view class="booly">默认货币</view>
						<view class="height" @click.stop="select('CNY','-1')">
							<image src="../../static/icon/add_icon.png" mode="" class="imgbool pull-left "></image>
							<view class="pull-left boolname">CNY</view>
							<view class="pull-right" v-if="sellTid == '-1'">
								<uni-icons type="checkmarkempty" size="20" color="#de6334" class="pull-right" ></uni-icons>
							</view>
							<!-- <uni-icons type="checkmarkempty" size="28" color="#de6334" class="pull-right"></uni-icons> -->
						</view>
						<view class="booly">全部</view>
						<view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @click.stop="select(item.name,index)">
							<view class="height">
								<image src="../../static/icon/add_icon.png" mode="" class="imgbool pull-left "></image>
								<view class="pull-left boolname">{{item.name}}</view>
								<view class="pull-right" v-if="sellTid == item.id">
									<uni-icons type="checkmarkempty" size="20" color="#de6334" class="pull-right" ></uni-icons>
								</view>
								<!-- <uni-icons type="checkmarkempty" size="28" color="#06b572" class="pull-right"></uni-icons> -->
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<view class="pro-fixed" @click="navTo('/pages/upOrder/order')">+</view>
	
		<!-- 新增 样式end -->
		<!-- 中部弹框 -->
<!-- 		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" :title="i18n.text38" :content="dialogContent" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup> -->
	</view>
</template>

<script>
import {commonMixin} from '@/common/mixin/mixin.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	mixins: [commonMixin],
	data() {
		return {
			sellTid:"-1",
			boolStatus:"CNY",
			notices: [],
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carousels: [],
			current: 0,
			mode: 'round',
			topSymbols: [
				{ symbol: 'btcusdt', title: 'BTC/USDT' },
				{ symbol: 'ethusdt', title: 'ETH/USDT' },
				{ symbol: 'eosusdt', title: 'EOS/USDT' },
				{ symbol: 'htusdt', title: 'HT/USDT' }
			],
			topMakretMap: {
				'market.btcusdt.detail': {},
				'market.ethusdt.detail': {},
				'market.eosusdt.detail': {},
				'market.htusdt.detail': {}
			},
			// 新增参数
			shareState: false,
			// 新增end
			loadMore: true,
			tabBarsPayPrice: [
				{
					name: this.$t('index.text22'),
					id: '1'
				},
				{
					name: this.$t('index.text23'),
					id: '2'
				},
				{
					name: this.$t('index.text44'),
					id: '3'
				}
			],
			tabIndex: 0,
			tabBarPay: [
				{
					name: this.$t('index.text24'),
					id: '0'
				},
				{
					name: this.$t('index.text25'),
					id: '1'
				}
			],
			noticeList:[],
			autoSettingList: [],
			listConfig: {
				noMsg: false, //暂无更多数据
				loadMore: false, //没有更多数据
				loading: false, //正在加载中动画
				pageNo: 1,
				pageSize: 10,
				total: 0
			},
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			bottomData:[
				{
					id:'0',
					name:'USD',
					
				},
				{
					id:'1',
					name:'EUR'
				},
				{
					id:'2',
					name:'AUD'
				},
				{
					id:'3',
					name:'BGN'
				},
				{
					id:'4',
					name:'BRL'
				},
				{
					id:'5',
					name:'CAD'
				},
			]
		};
	},
	filters: {
		formatChange(v) {
			return (v > 0 ? '+' : '') + parseFloat(v).toFixed(2) + '%';
		},
		formatChangeCls(v) {
			if (v == 0) {
				return '';
			} else if (v > 0) {
				return 'upper-text';
			} else {
				return 'lower-text';
			}
		},
		formatMarketcap(v) {
			return formatUnit(v);
		}
	},
	onShow(){
		
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	components: { uniIcons, uniPopup },
	
	onLoad() {
		// this.getMaketList()
		// setInterval(() =>{
		// 	this.getMaketList()
		// }, 3000)
		setTimeout(() =>{
			this.loadTopMarket()
		}, 3000)
		this.getAutoSettingListFuntion(0);
		this.getNoticeListFuntion();
	},
	onUnload() {
		for (let i = 0; i < 4; i++) {
			let ch = `market.${this.topSymbols[i].symbol}.detail`;
			let data = {
				unsub: ch,
				id: Date.now() + ''
			};
			this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(data));
			uni.$off(ch, res => {});
		}
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			_this.autoSettingList = [];
			_this.listConfig.pageNo = 1;
			_this.listConfig.loadMore = false;
			_this.loadTopMarket();
			_this.getAutoSettingListFuntion(_this.tabIndex);
			_this.getNoticeListFuntion();
			uni.stopPullDownRefresh();
		}, 300);
	},
	onReachBottom() {
		if (this.autoSettingList.length < this.listConfig.total) {
			this.listConfig.loading = true;
			let _this = this;
			let time = setTimeout(function() {
				_this.listConfig.pageNo += 1;
				_this.getAutoSettingListFuntion(_this.tabIndex);
			}, 300);
		} else {
			this.listConfig.loading = false;
			this.listConfig.loadMore = true;
		}
	},
	mounted() {
	},
	methods: {
		select(name,index){
			this.handleHiddenShare()
			this.boolStatus = name
		},
		loadTopMarket(){
			let $this = this
			for(let i = 0; i < 4; i++){
				let ch = `market.${this.topSymbols[i].symbol}.detail`
				let data = {
				  "sub": ch,
				  "id": Date.now() + ""
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(data))
				uni.$on(ch, (res) => {
					let d = res.data
					let close = +d.tick.close;
					d.tick.close = close.toFixed(2)
					d.change = parseFloat((d.tick.close - d.tick.open) / d.tick.open * 100).toFixed(2);
					d.cny = parseFloat(d.tick.close * 7.04).toFixed(2)
					$this.topMakretMap[res.data.ch] = d
				})
			}
		},
		// 新增start
		// 底部弹框start
		// 显示
		handleShowShare(id) {
			this.shareState = true;
		},
		// 隐藏
		handleHiddenShare() {
			this.shareState = false;
		},
		// 底部弹框end
		navTo(url) {
			if(!url) {
				this.$alert("开发中，敬请期待！");
			}
			uni.navigateTo({
				url: url
			})
		},
		navToPay(url,id){
			if(!url) {
				this.$alert("开发中，敬请期待！");
			}
			uni.navigateTo({
				url: url+"?id="+id
			})
		},
		navToSale(url,id){
			if(!url) {
				this.$alert("开发中，敬请期待！");
			}
			uni.navigateTo({
				url: url+"?id="+id
			})
		},
		// 新增底部弹框end
		async queryNoticeFunction(){
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.queryNoticeHttp({
				lang:system_info.language,
				pageNo:1,
				pageSize:5,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.noticeList =  res.data.records
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
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
			if (this.PricesOpen == '2') {
				this.saleInfoFunftion(); //一键出售USDT
			} else {
				this.buyInfoFunftion(); //一键购买USDT
			}
			// 需要执行 done 才能关闭对话框
			done();
		},
		toggleMessage(type) {
			this.msgType = type;
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {},
		ontabtapPay(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.tabsOpenPay = !this.tabsOpenPay;
			this.autoSettingList = [];
			this.listConfig.pageNo = 1;
			console.log("ontabtapPay",this.tabIndex)
			this.getAutoSettingListFuntion(this.tabIndex);
		},
		async getAutoSettingListFuntion(index) {
			console.log("getAutoSettingListFuntion",index)
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = null;
			if(index === 0){
				res = await api.getAutoSettingBuyList({
					userCode: "",
					pageSize: this.listConfig.pageSize,
					pageNo: this.listConfig.pageNo
				});
			} else if(index === 1) {
				res = await api.getAutoSettingSaleList({
					userCode: "",
					pageSize: this.listConfig.pageSize,
					pageNo: this.listConfig.pageNo
				});
			}
			if (res.code === '000') {
				uni.hideLoading();
				this.listConfig.total = res.data.total;
				this.autoSettingList.push(...res.data.records);
				if (this.autoSettingList.length == 0) {
					this.listConfig.noMsg = true;
				} else {
					this.listConfig.noMsg = false;
				}
				return Promise.resolve(res.data.total);
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
				return Promise.resolve(0);
			}
		},
	}
};
</script>

<style lang="scss" scoped>
	
	// 新增改版样式start
	.pro-fixed{
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 30rpx;
		bottom: 150rpx;
		border-radius: 50%;
		background:#eee;
		box-shadow: 1px 1px 1px #f5f5f5;
		text-align: center;
		font-size: 64rpx;
		line-height: 92rpx;
		color: #06b572;
	}
	.icon-plusempty{
		
		
	}
	.uni-share-content-item{
		margin-bottom: 24rpx;
		&:last-child{
			margin-bottom: 0 !important;
		}
	}
	.homeIndex{
		max-height: 650rpx;
		// overflow: auto;
		.scroll-Y {
		  max-height: 650rpx;
		}
	}
	.imgbool{
		width:48rpx;
		height:48rpx;
		border-radius:50%;
		background:#999;
	}
	.boolname{
		font-size:30rpx;
		line-height:48rpx;
		margin-left: 30rpx;
	}
	.booly{
		color: #333;
		font-size: 24rpx;
		margin:30rpx 0;
	}
	.boolSearch{
		background: #f5f5f5;
		padding: 5rpx 30rpx;
		margin-bottom: 30rpx;
		input{
			font-size: 26rpx;
		}
	}
	.SIZE{
		font-size: 26rpx;
	}
	.buyButton{
		background:#06b572;
		padding:10rpx 20rpx;
		font-size:28rpx;
		border-radius:10rpx;
		margin-top: 30rpx;
		color: #fff;
	}
	.saleButton{
		margin-top: 30rpx;
		font-size:28rpx;
		background:#de6334;
		padding:10rpx 20rpx;
		border-radius:10rpx;
		color: #fff;
	}
	.contents{
		padding: 0 30rpx;
	}
	.order-box {
		background: #fff;
		overflow: auto;
		margin-top: 20rpx;
		.list-header {
			font-size: 28rpx;
		}
		.asseats-lists {
			padding: 30rpx 0;
			border-bottom: 4rpx solid #eee;
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
			color: #007aff;
			margin-right: 10rpx;
		}
		.user-pays {
			font-size: 26rpx;
			color: #de6334;
			margin-right: 10rpx;
		}
		.user-payswx {
			font-size: 26rpx;
			color: #007f0e;
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
	.button {
		border-radius: 10rpx;
		height: 80rpx;
		background: #06b572;
		text-align: center;
		color: #fff;
		font-size: 26rpx;
		line-height: 80rpx;
		margin:60rpx 30rpx;
	}
	.borderBottom{
		border-bottom: 1px solid #f5f5f5;
		padding-bottom: 30rpx;
	}
	.header {
		padding: 20rpx;
		height: 80rpx;
	}
	.homeIndex{
		margin-top:50rpx;
	}
	.title-p{
		font-size: 28rpx;
		color: #333;
		padding: 0 30rpx;
		font-weight: bold;
	}
	.form-inputs{
		border: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 10rpx;
		height: 90rpx;
		padding-top: 24rpx;
		padding-left: 30rpx;
		padding-right: 120rpx;
		position: relative;
		margin-bottom: 30rpx;	
		.input-Eos {
			width: 120rpx;
			font-size: 26rpx;
			color: #06b572;
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			text-align: center;
			line-height: 85rpx;
		}
	}
	.form-clear-icon {
		display: block;
		float: left;
	}
	.text-eos {
		color: $uni-textJ-color;
		font-size: 22rpx;
		display: block;
		float: right;
		line-height: 32rpx;
		margin-right: 30rpx;
		.text-number {
			color: #333;
		}
	}
	.icon-img {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
		display: block;
		float: left;
	}
	.priceStatus{
		margin: 25rpx 0;
	}
	// 底部弹框
	.share {
		width: 100%;
		height: 100%;
	}
	.share-box {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		bottom: 0rpx;
		right: 0rpx;
		background-color: rgba(0, 0, 0, 0.4);
		transition: 0.3s;
		z-index: 999;
	}
	// 进入分享动画
	.share-show {
		transition: all 0.3s ease;
		transform: translateY(0%) !important;
	}
	// 离开分享动画
	.share-item {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		background-color: #ffffff;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 1999;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;
		padding:30rpx;
		.pay-list{
			padding:30rpx  0;
		}
		.content {
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			.block {
				width: 33%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 180rpx;
				image {
					width: 80rpx;
					height: 80rpx;
				}
				text {
					margin-top: 16rpx;
					font-size: 28rpx;
					color: #606266;
				}
			}
		}
	}
	.text-users {
		display: block;
		float: left;
		line-height: 30rpx !important;
	}
	.paySatus{
		margin-right: 30rpx;
	}
	.input-Eos-1 {
		width: 120rpx;
		font-size: 26rpx;
		color: #06b572;
		position: absolute;
		right: 120rpx;
		top: 0;
		bottom: 0;
		text-align: center;
		line-height: 85rpx;
	}
	.input-Eos-2 {
		width: 120rpx;
		font-size: 28rpx;
		color: #de6334;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		text-align: center;
		line-height: 85rpx;
		border-left: 1px solid rgba(0, 0, 0, 0.1);
	}
	// 新增改版样式end
	.nowrap2{
		height: 32rpx !important;
		line-height: 32rpx !important;
		font-size: 26rpx;
	}
.pages-mid-notes {
		height: 70rpx;
		padding: 0 30rpx;
		position: relative;
		.notes-title {
			font-size: 24rpx;
			width: 50rpx;
			flex-shrink: 0;
		}
		.notes-icon {
			width: 39rpx;
			height: 41rpx;
		}
		.notes-scroll {
			flex: 1;
			margin: 0 30rpx;
			font-size: 22rpx;
			height: 28rpx;
		}
		.arrow-right {
			right: 30rpx;
		}
	}
.content {
	padding: 0 !important;
}

.pay-lists {
	color: #ccc !important;
}
.pay-actives {
	position: absolute;
	left: 20rpx;
	top: 24rpx;
}
.remonk-box {
	max-height: 480rpx;
	overflow: auto;
	margin-top: 20rpx;
	.remonk-list {
		margin: 10rpx 0;
	}
}
.pays-list {
	margin: 18rpx 0;
}
.pay-price {
	float: right;
	color: #06b572;
	font-size: 30rpx;
}
.pay-prices {
	font-size: 30rpx;
	float: right;
}
.pay-box {
	height: 155rpx;
	margin-top: 10rpx;
	.pay-list:nth-child(2) {
		margin: 0 5% 0;
	}
	.pay-active {
		overflow: hidden;
		color: #06b572 !important;
		border: 1px solid #06b572 !important;
		position: relative;
		.checkmarkempty {
			width: 120rpx;
			height: 80rpx;
			position: absolute;
			bottom: -50rpx;
			right: -50rpx;
			background: #06b572;
			transform: rotate(140deg);
		}
		.form-clear-icons {
			display: block;
			margin-left: -20rpx;
			margin-top: -10rpx;
			transform: rotate(-140deg) !important;
		}
	}
	.pay-activeS {
		overflow: hidden;
		color: #de6334 !important;
		border: 1px solid #de6334 !important;
		position: relative;
		.checkmarkempty {
			width: 120rpx;
			height: 80rpx;
			position: absolute;
			bottom: -50rpx;
			right: -50rpx;
			background: #de6334;
			transform: rotate(140deg);
		}
		.form-clear-icons {
			display: block;
			margin-left: -20rpx;
			margin-top: -10rpx;
			transform: rotate(-140deg) !important;
		}
	}
	.pay-list {
		border: 1px solid #eef0f7;
		width: 30%;
		height: 150rpx;
		float: left;
		font-size: $uni-font-size;
		color: #ccc;
		line-height: 150rpx;
		border-radius: 10rpx;
		background: #eef0f7;
		text-align: center;
		position: relative;
	}
}
.uni-font-size {
	font-size: $uni-font-size;
	color: $uni-textJ-color;
}
.form-input {
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 10rpx;
	height: 90rpx;
	padding-top: 24rpx;
	padding-left: 60rpx;
	padding-right: 120rpx;
	position: relative;
	margin-bottom: 30rpx;
	.input-Eos {
		width: 120rpx;
		font-size: 26rpx;
		color: #06b572;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		text-align: center;
		line-height: 85rpx;
	}
	
}
.content {
	.text-b {
		color: $uni-textJ-color;
		float: left;
		line-height: 30rpx;
	}
	.text-s {
		float: left;
		color: $uni-textJ-color;
		font-size: 24rpx;
		line-height: 58rpx;
		margin-left: 20rpx;
	}
	
}
.scroll-h {
	width: 100%;
	height: 80rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item:first-child .uni-tab-item-title {
	border-right: 2px solid #dddddd;
	padding-right: 12rpx;
}
.uni-tab-item:last-child .uni-tab-item-title {
	padding-left: 12rpx;
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	text-align: center;
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
.uni-tab-item-title-active,
.uni-tab-item-title-activeM,
.uni-tab-item-title-active-pay {
	color: #333 !important;
}
.uni-tab-item-pay {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	text-align: center;
}
.uni-tab-item-pay:first-child .text-b {
	border-right: 2px solid #dddddd;
	padding-right: 12rpx;
}
.uni-tab-item-pay .text-b {
	border-right: none !important;
	font-size: 24rpx;
	transition: all 0.1s linear;
}
.uni-tab-item-title-active-pay {
	font-size: 40rpx !important;
}
.uni-tab-item-pay {
	padding-left: 12rpx;
	vertical-align: middle;
}
.buttonF {
	background: #de6334 !important;
}
.switch-pay {
	width: 100%;
	color: #06b572;
	text-align: right;
	font-size: 24rpx;
	line-height: 32rpx;
}
.switch-pay .uni-icons {
	vertical-align: text-bottom;
}
.switch-pay2 {
	color: #de6334;
}
</style>
