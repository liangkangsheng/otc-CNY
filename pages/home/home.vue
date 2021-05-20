<template>
	<view class="container">	
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" circular @change="swiperChange" autoplay="true">
				<swiper-item v-for="(item, index) in carousels" :key="index" class="carousel-item">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<view class="cate-section">
			<noticeSwiper :list="notices"></noticeSwiper>
		</view>
		<scroll-view class="scroll-view-market" scroll-x="true" show-scrollbar="true">
			<view class="market-item" v-for="(item, i) in topSymbols" :key="item.symbol" @click="navTo(`/pages/public/kline?symbol=${item.symbol}`)">
				<view class="item">
					<view class="t">{{item.title}}<text :class="topMakretMap[`market.${item.symbol}.detail`].change | formatChangeCls">{{topMakretMap[`market.${item.symbol}.detail`].change | formatChange}}</text></view>
					<text class="c" :class="topMakretMap[`market.${item.symbol}.detail`].change | formatChangeCls">{{topMakretMap[`market.${item.symbol}.detail`].tick ? topMakretMap[`market.${item.symbol}.detail`].tick.close : '0.00'}}</text>
					<text class="b">≈ {{topMakretMap[`market.${item.symbol}.detail`].cny}} CNY</text>
				</view>
			</view>
		</scroll-view>
		<view class="menu">
			<view class="fiat" @click="navToTab('/pages/theOrder/order')">
				<view class="label">
					<text>{{$t('home.text6')}}</text>
					<text class="sub">{{$t('home.text5')}} <text class="go">Go<uni-icons type="arrowright" size="14" color="#fff"></uni-icons></text></text>
				</view>
				<image src="../../static/icon-fiat.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="ex">
			<view class="item exchange" @click="navTo('', true)">
				<p class="img"><image class="miner" src="../../static/images/yaoqing.png"></image></p>
				<p class="text"><text>{{$t('home.text7')}}</text></p>
			</view>
			<view class="item shop" @click="navTo('/pages/TopupWithdrawal/TopupWithdrawal?id=1')">
				<p class="img"><image class="miner" src="../../static/images/chongbi.png"></image></p>
				<p class="text"><text>{{$t('home.text8')}}</text></p>
			</view>
			<view class="item shop" @click="navTo('/hybrid/html/download-app')">
				<p class="img"><image class="miner" src="../../static/images/xiazai.png"></image></p>
				<p class="text"><text>{{$t('home.text9')}}</text></p>
			</view>
			<view class="item exchange" @click="navTo('/hybrid/html/service', true)">
				<p class="img"><image class="miner" src="../../static/images/kefu.png"></image></p>
				<p class="text"><text>{{$t('home.text10')}}</text></p>
			</view>
			</view>
		<view class="ex" style="padding-bottom: 20upx;padding-top: 0;">
			<view class="item shop" @click="navTo('')">
				<p class="img"><image class="miner" src="../../static/images/daka.png"></image></p>
				<p class="text"><text>{{$t('home.text11')}}</text></p>
			</view>
			<view class="item shop" @click="navTo('/pages/item/list')">
				<p class="img"><image class="miner" src="../../static/images/touzi.png"></image></p>
				<p class="text"><text>{{$t('home.text12')}}</text></p>
			</view>
			<view class="item shop" @click="navTo('/pages/upOrder/order')">
				<p class="img"><image class="miner" src="../../static/images/guadan.png"></image></p>
				<p class="text"><text>{{$t('home.text13')}}</text></p>
			</view>
			<view class="item shop" @click="navTo('')">
				<p class="img"><image class="miner" src="../../static/images/wakuang.png"></image></p>
				<p class="text"><text>{{$t('home.text14')}}</text></p>
			</view>
		</view>
		<!-- <view class="advert">
			<uni-swiper-dot :info="ads" :current="current" :mode="mode">
			    <swiper class="swiper-box" autoplay="true">
			        <swiper-item v-for="(item, index) in ads" :key="index" class="swiper-item">
			        	<image :src="item.url" mode="widthFix"/>
			        </swiper-item>
			    </swiper>
			</uni-swiper-dot>
		</view> -->
		
		<!-- -->
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
				</view>
				<uni-load-more v-if="listConfig.loading" status="loading"></uni-load-more>
			</view>
			<uni-load-more v-if="listConfig.loadMore" status="noMore"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	import {formatUnit} from '../../utils/number';
	import {UniNoticeBar} from '../../components/uni-notice-bar/uni-notice-bar.vue';
	import {UniTag} from '../../components/uni-tag/uni-tag.vue';
	import {UniSwiperDot} from '../../components/uni-swiper-dot/uni-swiper-dot.vue';
	import noticeSwiper from '../../components/noticeSwiper.vue';
	import {commonMixin} from '@/common/mixin/mixin.js';
	import api from '@/api/index.js';
	export default {
		components: {UniNoticeBar, UniTag, noticeSwiper, UniSwiperDot},
		mixins: [commonMixin],
		data() {
			return {
				notices: [],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carousels: [],
				current: 0,
				mode: 'round' ,
				topSymbols: [
					{symbol: 'btcusdt', title: 'BTC/USDT'},
					{symbol: 'ethusdt', title: 'ETH/USDT'},
					{symbol: 'eosusdt', title: 'EOS/USDT'},
					{symbol: 'htusdt', title: 'HT/USDT'}
				],
				topMakretMap: {
					'market.btcusdt.detail': {},
					'market.ethusdt.detail': {},
					'market.eosusdt.detail': {},
					'market.htusdt.detail': {}
				},
				tabIndex: 0,
				tabBars: [
					{
						name: this.$t('home.text1'),
						id: '1'
					},
					{
						name: this.$t('home.text2'),
						id: '2'
					}
				],
				autoSettingList: [],
				listConfig: {
					noMsg: false, //暂无更多数据
					loadMore: false, //没有更多数据
					loading: false, //正在加载中动画
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
			};
		},
		filters:{
			formatChange(v){
				return (v > 0 ? '+' : '') + parseFloat(v).toFixed(2) + '%'
			},
			formatChangeCls(v){
				if(v == 0){
					return ''
				} else if(v > 0){
					return 'upper-text'
				} else {
					return 'lower-text'
				}
			},
			formatMarketcap(v){
				return formatUnit(v);
			}
		},
		onShow() {
			
		},
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
			this.getSysCarouselsListFunction();
		},
		onUnload() {
			for(let i = 0; i < 4; i++){
				let ch = `market.${this.topSymbols[i].symbol}.detail`
				let data = {
				  "unsub": ch,
				  "id": Date.now() + ""
				}
				this.$store.dispatch('WEBSOCKET_SEND', JSON.stringify(data))
				uni.$off(ch, (res) => {})
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
				_this.getSysCarouselsListFunction();
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
		methods: {
			// ...mapActions('common', ['marketList', 'adList', 'noticeList']),
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
			// async loadData() {
			// 	this.adList().then(res =>{
			// 		let casrousels = res.data.casrousels
			// 		this.swiperLength = casrousels.length
			// 		this.carousels = casrousels
			// 		this.ads = res.data.ads
			// 	})
			// 	this.noticeList().then(res =>{
			// 		this.notices = res.rows
			// 	})
			// },
			// getMaketList(){
			// 	this.marketList().then(res =>{
			// 		this.markets = res.data
			// 	})
			// },
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			navToTab(url){
				if(!url) {
					this.$alert("开发中，敬请期待！");
				}
				uni.switchTab({
					url: url
				})
			},
			navTo(url) {
				if(!url) {
					this.$alert("开发中，敬请期待！");
				}
				uni.navigateTo({
					url: url
				})
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.autoSettingList = [];
				this.listConfig.pageNo = 1;
				this.getAutoSettingListFuntion(index);
			},
			async getAutoSettingListFuntion(index) {
				uni.showLoading({ title: this.$t('order.text15'), mask: true });
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
					this.$alert(this.$t('order.text600'))
				}  else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
					return Promise.resolve(0);
				}
			},
			async getNoticeListFuntion() {
				let res = await api.queryNoticeHttp({
					lang: "cn",
					pageSize: 100,
					pageNo: 1
				});
				if (res.code === '000') {
					this.notices.push(...res.data.records);
					return Promise.resolve(res.data.total);
				} else if(res.code === "500"){
					this.$alert(this.$t('navctive.text600'))
				}  else {
					return Promise.resolve(0);
				}
			},
			async getSysCarouselsListFunction() {
				this.carousels = [];
				let res = await api.getSysCarouselsList({
					type: '1' // 轮播图
				});
				if (res.code === '000') {
					this.carousels.push(...res.data);
					this.swiperLength = +this.carousels.length;
					return Promise.resolve(res.data.total);
				} else if(res.code === "500"){
					this.$alert(this.$t('navctive.text600'))
				}  else {
					return Promise.resolve(0);
				}
			}
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
		padding-top: 50upx;
	}
	.m-t{
		margin-top: 16upx;
	}
	.advert{
		padding-bottom: 10px;
		background-color: #EEF2F5;
		.swiper-box{
			width: 100%;
			height: 230upx;
		}
		.swiper-item{
			padding: 0;
			image{
				width: 100%;
			}
		}
	}
	.scroll-view-market {
		width: 100%;
		white-space: nowrap;
	}
	.market-item {
		display: inline-block;
		width: 33%;
		.item{
			padding: 30upx 0 30upx 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			.t{
				// font-weight: bold;
				font-size: $font-sm;
			}
			.c{
				padding: 10upx 0 10upx 0;
				font-size: $font-xl;
				// font-weight: bold;
			}
			.b{
				font-size: $font-sm;
				color: $font-color-disabled;
			}
			.upper-text{
			     color: $uni-color-upper
			   }
			.lower-text{
			    color: $uni-color-lower
			}
		}
	}
	.menu{
		padding: 20upx 0upx 0upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: $font-base;
		font-weight: bold;
		background: $uni-color-gap;
		.fiat{
			display: flex;
			flex-direction: row;
			flex: 1;
			align-items: center;
			background: #ffffff;
			padding: 30upx;
			
			// margin: 0 20upx;
			.label{
				width:85%;
				display: flex;
				flex-direction: column;
				padding-left: 20upx;
			}
			.sub{
				font-size: $font-sm;
				font-weight: normal;
				.go{
					border-radius: 100upx;
					background-color: #3385ff;
					font-size: 24upx;
					color: #fff;
					padding:0 10upx;
					margin: 0 20upx;
				}
			}
			image{
				width: 100upx;
				float: right;
			}
			text{
				font-size: $font-md;
			}
		}
	}
	.ex{
		background: $uni-color-gap;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap-reverse;
		justify-content: center;
		// padding: 0 20upx;
		padding-top: 20upx;
		.item{
			width: 25%;
			height: 140upx;
			line-height: 140upx;
			background: #ffffff;
			align-items: center;
			text-align: center;
			vertical-align: middle;
			.img {
				line-height: 70upx;
			}
			.text{
				line-height: 70upx;
				font-size: 24upx;
			}
		}
		image{
			vertical-align: middle;
			width: 50upx;
			height: 55upx;
		}
		.miner{
			width: 45upx;
			height: 45upx;
		}
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding: 10px 14px;
		background: #ffffff;
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44px;
			box-sizing: content-box;
		}

		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 426upx;
			transition: .4s;
		}
	}
	.carousel {
		width: 100%;
		height: 350upx;

		.carousel-item {
			width: 100%;
			height: 100%;
			// padding: 0 28upx;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 24upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 公告 */
	.cate-section {
		padding: 20upx 0upx;
		background: #EEF2F5;
		.uni-swiper-msg {
			padding: 10rpx 28rpx;
			background-color: #FFFFFF;
		}
	}
	/* 市值排行 */
	.coin-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 30upx;
			line-height: 30upx;
			padding-top: 30upx;
			padding-bottom: 30upx;
			border-bottom: 2rpx solid #EEEEEE;
			.col{
				font-size: $font-base + 4;
				font-weight: 600;
				color: $font-color-light;
				flex:1;
				padding: 20upx 0;
				// background-color: #007AFF;
				margin: 0 10%;
			}
			.r{
				text-align: right;
			}
			.active{
				border-bottom: 6upx solid #007AFF;
			}
		}
		.s-row{
			display:flex;
			align-items:center;
			height: 120upx;
			.subtitle{
				font-size: $font-sm;
				font-weight: normal;
				color: $font-color-light;
				padding: 4upx 0 10upx 0;
			}
			.uni-tag--success {
			    color: #fff;
			    background-color: $uni-color-upper;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-upper;
				width: 160upx;
				float: right;
			}
			.uni-tag--error {
			    color: #fff;
			    background-color: $uni-color-lower;
			    border-width: 0.5px;
			    border-style: solid;
			    border-color: $uni-color-lower;
				width: 160upx;
				float: right;
			}
			.col{
				font-size: $font-base;
				color: $font-color-dark;
				flex:1;
			}
			.coinLogo {
			    width: 36upx;
				height: 36upx;
			    margin-right: 8px;
			    display: inline-block;
			    vertical-align: middle;
			    float: left;
			}
			.light{
				font-weight: bold;
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.r{
				text-align: right;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
		}
	}
	
	.lottery-icon{
		position: fixed;
		bottom: 300upx;
		right: 20upx;
		z-index: 99999999;
		width: 100upx;
		height: 100upx;
		image{
			width: 100upx;
			height: 100upx;
		}
	}
	
	.text-center{
		text-align: center;
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
		color: #007AFF;
		margin-right: 10rpx;
	}
	.user-pays {
		font-size: 26rpx;
		color: #de6334;
		margin-right: 10rpx;
	}
	.user-payswx {
		font-size: 26rpx;
		color: #007F0E;
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
</style>
