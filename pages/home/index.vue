<template>
	<view class="content">
		<!-- <view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('index.text26') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
		</view> -->
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
			<view class="header padding-30 pull-left">
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay"
					:class="tabIndexPay == index ? 'uni-tab-item-border-active-pay' : ''"
					:id="tab.id"
					:data-current="index"
					@click="ontabtapPay">
					<text class="text-b" :class="tabIndexPay == index ? 'uni-tab-item-title-active-pay' : ''">{{ tab.name }}</text>
				</view>
			</view>
			<view class="pull-right header SIZE" @click="navTo('/pages/theOrder/orderList')">
				<image src="../../static/icon/order_icon.png" mode="" class="pull-left" style="width:30rpx;height: 26rpx;margin-top: 8rpx;margin-right: 8rpx;"></image>
				{{i18n.text104}}
			</view>
		</view>
		
		
		
		<view class="homeIndex">
			<!-- 我要买 -->
			<view class="pay-true" v-show="!tabsOpenPay">
				<view class="title-p">{{ i18n.text03 }}</view>
				<view class="form-inputs">
					<input type="number" placeholder="0.00" v-model="BarPayPrice" @input="changeInput(BarPayPrice, '1')" />
					<text class="input-Eos">CNY</text>
				</view>
				<view class="title-p">{{ i18n.text04 }}</view>
				<view class="form-inputs">
					<input type="number" placeholder="0.00" v-model="BarPayPrice" @input="changeInput(BarPayPrice, '1')" />
					<text class="input-Eos">USDT</text>
				</view>
				<view class="help height">
					<text class="text-eos">
						{{ i18n.text3 }}：
						<text class="text-number">{{ unitPrice || 0 }} CNY/USDT</text>
					</text>
				</view>
				<view class="height priceStatus">
					<view class="title-p pull-left">{{i18n.text010}}</view>
					<view class="paySatus height pull-right" @click="handleShowShare"  style="margin-right: 30rpx;">
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right" style="margin-top: 4rpx;"></uni-icons>
					</view>

					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchBuyInfo.PayIndex == 1">
						<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
						<text class="uni-font-size text-users">{{ i18n.text06 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchBuyInfo.PayIndex == 2">
						<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text07 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchBuyInfo.PayIndex == 3">
						<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text08 }}</text>
					</view>
					
					
					
					<!-- <view class="paySatus height pull-right" @click="handleShowShare" style="margin-right: 10rpx;">
						<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
						<text class="uni-font-size text-users">{{ i18n.text06 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare">
						<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text07 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare">
						<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text08 }}</text>
					</view> -->
				</view>
				<view class="button" @click="tabBarPayButton(1)">{{ i18n.text10 }} USDT</view>
			</view>
			<!-- 我要卖 -->
			<view class="pay-true" v-show="tabsOpenPay">
				<view class="title-p">{{ i18n.text03 }}</view>
				<view class="form-inputs">
					<input type="number" placeholder="0.00" v-model="BarPayPrice" @input="changeInput(BarPayPrice, '1')" />
					<text class="input-Eos-2" @click="setMaxForSale">{{$t('index.text43')}}</text>
					<text class="input-Eos-1" style="color: #de6334;">USDT</text>
				</view>
				<view class="title-p">{{ i18n.text04 }}</view>
				<view class="form-inputs" style="padding-right: 0;">
					<input type="number" placeholder="0.00" v-model="BarPayPrice" @input="changeInput(BarPayPrice, '1')" />
					<text class="input-Eos-1" style="color: #de6334;right: 0">CNY</text>
				</view>
				<view class="help height">
					<text class="text-eos">
						{{ i18n.text3 }}：
						<text class="text-number">{{ unitPrice || 0 }} CNY/USDT</text>
					</text>
				</view>
				<view class="height priceStatus">
					<view class="title-p pull-left">{{i18n.text09}}</view>
					
					
					<view class="paySatus height pull-right" @click="handleShowShare"  style="margin-right: 30rpx;">
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right" style="margin-top: 4rpx;"></uni-icons>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchSaleInfo.PayIndex == 1">
						<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
						<text class="uni-font-size text-users">{{ i18n.text06 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchSaleInfo.PayIndex == 2">
						<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text07 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="matchSaleInfo.PayIndex == 3">
						<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text08 }}</text>
					</view>
					
					
					
					
					<!-- <view class="paySatus height pull-right" @click="handleShowShare">
						<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
						<text class="uni-font-size text-users">{{ i18n.text06 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare">
						<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text07 }}</text>
					</view>
					<view class="paySatus height pull-right" @click="handleShowShare">
						<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text08 }}</text>
					</view> -->
				</view>
				<view class="button buttonF" @click="tabBarPayButton(2)">{{ i18n.text20 }} USDT</view>
			</view>
			<!-- 底部弹框 -->
			<view class="share">
				<view :class="{ 'share-box': shareState }" @click="handleHiddenShare"></view>
				<view class="share-item" :class="{ 'share-show': shareState }">
					<view class="list-box-share borderBottom height">
						<view class="pull-left">{{ i18n.text014 }}</view>
						<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text024 }}</view>
					</view>
					<view
						class="pay-list border-bottom height border-bottom-none"
						:key="tab.id"
						:data-current="index"
						v-for="(tab, index) in tabBarsPayPrice"
						@click="HiddenShare(index, tab.id, tab.name)"
					>
						<image :src="tab.src" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ tab.name }}</text> 
						<view v-if="tabIndexPay == 0">
							<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="matchBuyInfo.PayIndex == tab.id"></uni-icons>
						</view>
						<view v-if="tabIndexPay == 1">
							<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="matchSaleInfo.PayIndex == tab.id"></uni-icons>
						</view>
					</view>
					<!-- <view class="pay-list border-bottom height" @click="HiddenShare(0)">
						<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text06 }}</text>
						<uni-icons type="checkmarkempty" size="14" color="#06b572" class="pull-right"></uni-icons>
					</view>
					<view class="pay-list border-bottom height" @click="HiddenShare(1)">
						<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text07 }}</text>
						<uni-icons type="checkmarkempty" size="14" color="#06b572" class="pull-right"></uni-icons>
					</view>
					<view class="pay-list height" @click="HiddenShare(2)" style="padding-bottom: 0;">
						<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
						<text class="uni-font-size text-users">{{ i18n.text08 }}</text>
						<uni-icons type="checkmarkempty" size="14" color="#06b572" class="pull-right"></uni-icons>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 新增 样式end -->
		<!-- 中部弹框 -->
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" :title="i18n.text38" :content="dialogContent" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			// 新增参数
			shareState: false,
			// 新增end
			loadMore: true,
			noMsg: true,
			Price: -1,
			PriceS: -1,
			tabIndexPay: 0,
			// 支付方式
			tabBarsPayPrice: [
				{
					name: this.$t('index.text23'),
					id: '2',
					src: '../../static/icon/pay_icon3.png'
				},
				{
					name: this.$t('index.text22'),
					id: '1',
					src: '../../static/icon/alipay_icon.png'
				},
				{
					name: this.$t('index.text44'),
					id: '3',
					src: '../../static/icon/wechat_icon.png'
				}
			],
			// tabBarsPayPrice: [
			// 	{
			// 		name: this.$t('index.text22'),
			// 		id: '1'
			// 	},
			// 	{
			// 		name: this.$t('index.text23'),
			// 		id: '2'
			// 	},
			// 	{
			// 		name: this.$t('index.text44'),
			// 		id: '3'
			// 	}
			// ],
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
			tabsOpenPay: false,
			tabIndex: 0,
			tabsOpen: false,
			tabIndexM: 0,
			tabsOpenM: false,
			dialogContent: '',
			BarPayPriceNum: '',
			msgType: 'success',
			unitPrice: '',
			minBuyAmt: '',
			minBuyCount: '',
			minBuyAmtStr: '',
			minBuyCountStr: '',
			minSaleAmt: '',
			minSaleCount: '',
			minSaleAmtStr: '',
			minSaleCountStr: '',
			// minBuyOrderAmt: '',
			// minBuyOrderCount: '',
			// minSaleOrderAmt: '',
			// minSaleOrderCount: '',
			// 一键购买USDT
			BarPayPrice: '',
			saleId: '', //匹配到的售卖订单id
			buyInfoIn: {},
			matchBuyInfo: {
				price: '',
				count: '',
				buyAmount: '',
				saleId: '',
				receiveAccountId: '',
				isMatch: false,
				PayIndex:2
			},
			// 一键卖出USDT
			BarPayPrices: '',
			matchSaleInfo: {
				price: '',
				buyCount: '',
				buyAmount: '',
				saleId: '',
				isMatch: false,
				PayIndex:2
			},
			PricesOpen: '0',
			BarPayPriceNums: '',
			convertMoney: '',
			walletBalance: '',
			noticeList:[]
			
		};
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	components: { uniIcons, uniPopup },
	onLoad() {
		
		uni.setTabBarItem({
			index: 0,
			text: this.$t('tabBar.index')
		});
		uni.setTabBarItem({
			index: 1,
			text: this.$t('tabBar.transaction')
		});
		uni.setTabBarItem({
			index: 2,
			text: this.$t('tabBar.currency')
		});
		uni.setTabBarItem({
			index: 3,
			text: this.$t('tabBar.assets')
		});
		uni.setTabBarItem({
			index: 4,
			text: this.$t('tabBar.me')
		});
		this.getUSDTPrice(); // 获取单价
		this.queryNoticeFunction();
		this.getMyAssetsItemFunction();
	},
	computed: {
		i18n() {
			return this.$t('index');
		}
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			this.getUSDTPrice(); // 获取单价
			this.queryNoticeFunction();
			this.getMyAssetsItemFunction();
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {
	},
	methods: {
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
		// 底部菜单选项
		HiddenShare(index,id,name){
			if(this.tabIndexPay == 0){
				console.log("买买")
				this.matchBuyInfo.PayIndex = id;
			}else{
				console.log("卖卖")
				this.matchSaleInfo.PayIndex = id;
			}
			
		    this.handleHiddenShare()
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
		// 新增底部弹框end
		goHome(){
			uni.reLaunch({
				url: '/pages/home/home'
			});
		},
		navBack() {
			uni.navigateBack();
		},
		agreementButton(id){
		},
		toSecondPage(){
			uni.navigateTo({
				url:'/pages/banner/bannerList'
			})
		},
		
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
		// 1 2 购买 1 3 售卖 input框
		changeInput(val, status) {
			console.log('changeInput')
			if (status == '1' || status == '2') {
				if (val == '' && this.Price != '-1') {
					this.resetMatchBuyInfo();
				}
			}
			if (status == '3' || status == '4') {
				if (val == '' && this.PriceS != '-1') {
					this.resetMatchSaleInfo();
				}
			}
			if (status == '1' || status == '2') {
				if (val != '' && this.Price != '-1') {
					this.matchSaleInfoFunftion();
				}
				return;
			}
			if (status == '3' || status == '4') {
				if (val != '' && this.PriceS != '-1') {
					this.matchBuyInfoFunftion();
				}
				return;
			}
		},
		// 购买控制器
		tabsOpenButton() {
			this.tabsOpen = !this.tabsOpen;
			console.log('tabsOpenButton')
			if (this.tabsOpen == true) {
				this.changeInput(this.BarPayPriceNum, '2');
				return;
			}
			if (this.tabsOpen == false) {
				this.changeInput(this.BarPayPrice, '1');
				return;
			}
		},
		// 售卖控制器
		tabsOpenMButton() {
			this.tabsOpenM = !this.tabsOpenM;
			if (this.tabsOpenM == true) {
				this.changeInput(this.BarPayPriceNums, '4');
				return;
			}
			if (this.tabsOpenM == false) {
				this.changeInput(this.BarPayPrices, '3');
				return;
			}
		},
		// 获取单价
		async getUSDTPrice() {
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.getUSDTPrice({});
			if (res.code === '000') {
				uni.hideLoading();
				this.unitPrice = res.data.usdtPrice;
				this.minBuyAmt = +res.data.minBuyAmt;
				this.minBuyCount = +res.data.minBuyCount;
				this.minBuyAmtStr = res.data.minBuyAmt + this.$t('index.text41');
				this.minBuyCountStr = res.data.minBuyCount + this.$t('index.text42');
				this.minSaleAmt = +res.data.minSaleAmt;
				this.minSaleCount = +res.data.minSaleCount;
				this.minSaleAmtStr = res.data.minSaleAmt + this.$t('index.text45');
				this.minSaleCountStr = res.data.minSaleCount + this.$t('index.text46');
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		setMaxForSale() {
			this.BarPayPrices = this.convertMoney;
			this.BarPayPriceNums = this.walletBalance;
		},
		async getMyAssetsItemFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getMyAssetsItemHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.convertMoney = res.data.convertMoney;
				this.walletBalance = res.data.walletBalance;
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('myUser.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		// 匹配售卖USDT订单
		async matchSaleInfoFunftion() {
			var obj = {};
			const system_info = GET_STORAGE('system_info');
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.matchSaleInfoHttp(obj);
			if (res.code === '000') {
				this.matchBuyInfo.isMatch = res.data.isMatch;
				uni.hideLoading();
				if(!this.tabsOpen){
					if(this.BarPayPrice>res.data.buyAmount){
						this.$alert("成交总额不足，请重新购买");
						this.resetMatchBuyInfo();
						return;
					}
				}else{
					if(this.BarPayPriceNum>res.data.count){
						this.$alert("成交数量不足，请重新购买");
						this.resetMatchBuyInfo();
						return;
					}
				}
				this.matchBuyInfo.saleId = res.data.saleId;
				this.matchBuyInfo.price = res.data.price;
				this.matchBuyInfo.count = res.data.count;
				this.matchBuyInfo.buyAmount = res.data.buyAmount;
				this.matchBuyInfo.receiveAccountId = res.data.receiveAccountId;
			
				return;
			}
			if (res.code != '000') {
				uni.hideLoading();
				this.resetMatchBuyInfo();
				this.matchBuyInfo.isMatch = false;
				this.$alert(res.errorMessage);
				return;
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
				return;
			} 
		},
		resetMatchBuyInfo() {
			this.matchBuyInfo.price = '0';
			this.matchBuyInfo.count = '0';
			this.matchBuyInfo.buyAmount = '0';
		},
		resetMatchSaleInfo(){
			this.matchSaleInfo.price = '0';
			this.matchSaleInfo.buyCount = '0';
			this.matchSaleInfo.buyAmount = '0';
		},
		// 匹配购买USDT订单
		async matchBuyInfoFunftion() {
			var obj = {};
			const system_info = GET_STORAGE('system_info');
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.matchBuyInfoHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.matchSaleInfo.isMatch = res.data.isMatch;
				this.matchSaleInfo.saleId = res.data.buyId;
				this.matchSaleInfo.price = res.data.price;
				this.matchSaleInfo.buyCount = res.data.buyCount;
				this.matchSaleInfo.buyAmount = res.data.buyAmount;
				return;
			}
			if (res.code != '000') {
				uni.hideLoading();
				this.resetMatchSaleInfo();
				this.matchSaleInfo.isMatch = false;
				this.$alert(res.errorMessage);
				return;
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
				return;
			} 
		},
		// 一键购买
		async buyInfoFunftion() {
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.buyInfoHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				if (this.tabsOpen == false) {
					this.$alert(this.$t('index.text28') + this.matchBuyInfo.buyAmount + 'CNY/USDT');
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/theOrder/order'
						});
					}, 1000);
				} else {
					this.$alert(this.$t('index.text28') + this.matchBuyInfo.count + this.$t('index.text29') + 'USDT');
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/theOrder/order'
						});
					}, 1000);
				}
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
			}  else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		// 一键售卖
		async saleInfoFunftion() {
			var obj = {};
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.saleInfoHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				if (this.tabsOpenM == false) {
					this.$alert(this.$t('index.text30') + this.BarPayPrices + 'CNY/USDT');
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/theOrder/order'
						});
					}, 1000);
				} else {
					this.$alert(this.$t('index.text30') + this.BarPayPriceNums + this.$t('index.text29') + 'USDT');
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/theOrder/order'
						});
					}, 1000);
				}
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
				return;
			} else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},

		tokenLogin(code) {
			if (code == 1) {
				if (this.tabsOpen == false) {
					if (this.BarPayPrice == '') {
						this.$alert(this.$t('index.text31'));
						return;
					}
					if (this.Price == -1) {
						this.$alert(this.$t('index.text32'));
						return;
					}
					this.dialogContent = this.$t('index.text34') + this.matchBuyInfo.buyAmount + 'CNY/USDT';
				} else {
					if (this.BarPayPriceNum == '') {
						this.$alert(this.$t('index.text33'));
						return;
					}
					if (this.Price == -1) {
						this.$alert(this.$t('index.text32'));
						return;
					}
					this.dialogContent = this.$t('index.text34') + this.matchBuyInfo.count + this.$t('index.text29') + 'USDT';
				}
				this.toggleMessage('success');
				this.PricesOpen = '1';
				return;
			}
			if (code == 2) {
				if (this.tabsOpenM == false) {
					if (this.BarPayPrices == '') {
						this.$alert(this.$t('index.text35'));
						return;
					}
					if (this.PriceS == -1) {
						this.$alert(this.$t('index.text32'));
						return;
					}
					this.dialogContent = this.$t('index.text36') + this.BarPayPrices + 'CNY/USDT';
				} else {
					if (this.BarPayPriceNums == '') {
						this.$alert(this.$t('index.text37'));
						return;
					}
					if (this.PriceS == -1) {
						this.$alert(this.$t('index.text32'));
						return;
					}
					this.dialogContent = this.$t('index.text36') + this.BarPayPriceNums + this.$t('index.text29') + 'USDT';
				}
				this.toggleMessage('success');
				this.PricesOpen = '2';
				return;
			}
		},
		tabBarPayButton(type) {
			this.tokenLogin(type);
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
		tabBarPayPriceS(e) {
			console.log("tabBarPayPriceS")
			if (Number(this.tabIndexPay) + 1 == 2) {
				this.matchBuyInfoFunftion();
				return;
			}
		},
		// 一键买币 支付宝与银行卡，微信（2021-5-1）
		tabBarPayPrice(e) {
			var that = this;
			if (Number(this.tabIndexPay) + 1 == 1) {
				this.matchSaleInfoFunftion();
				return;
			}
		},

		ontabtapM(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.switchTabM(index);
		},
		switchTabM(index) {
			if (this.tabIndexM === index) {
				return;
			}
			this.tabIndexM = index;
			this.tabsOpenM = !this.tabsOpenM;
		},
		ontabtapPay(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndexPay === index) {
				return;
			}
			this.tabIndexPay = index;
			this.tabsOpenPay = !this.tabsOpenPay;
		},
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index;
			this.tabsOpen = !this.tabsOpen;
		},
		async submitLoginFn() {
			this.$alert('提示信息');
		}
	}
};
</script>

<style lang="scss" scoped>
	// 新增改版样式start
	.SIZE{
		font-size: 26rpx;
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
		margin-top: 40rpx;
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
