<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header"></view>
			<view class="box-header">
				<view class="head-title">{{ $t('index.text26') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
		</view>
		<view class="pages-mid-notes flex-row bdb-1px">
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
		<view class="header padding-30">
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
		<view class="pay-true padding-30" v-show="!tabsOpenPay">
			<view :current="tabIndex" v-show="!tabsOpen">
				<view class="form-input">
					<text class="pay-actives">￥</text>
					<input type="number" :placeholder="i18n.text1" v-model="BarPayPrice" @input="changeInput(BarPayPrice, '1')" />
				</view>
			</view>
			<view :current="tabIndex" v-show="tabsOpen">
				<view class="form-input" style="padding-left:10rpx;">
					<input type="number" :placeholder="i18n.text2" v-model="BarPayPriceNum" @input="changeInput(BarPayPriceNum, '2')" />
					<text class="input-Eos">USDT</text>
				</view>
			</view>
			<view class="help">
				<text class="text-eos">
					{{ i18n.text3 }}：
					<text class="text-number">{{ unitPrice || 0 }} CNY/USDT</text>
				</text>
			</view>
			<view class="switch-pay">
				<uni-icons type="refresh" size="14" style="color: #06B572;"></uni-icons>
				<text @click="tabsOpenButton" v-show="!tabsOpen">{{ i18n.text5 }}</text>
				<text @click="tabsOpenButton" v-show="tabsOpen">{{ i18n.text4 }}</text>
			</view>
			<br />
			<view class="uni-font-size">{{ i18n.text6 }}</view>
			<view class="pay-box">
				<view
					class="pay-list"
					:class="Price == index ? 'pay-active' : ''"
					@click="tabBarPayPrice"
					v-for="(tab, index) in tabBarsPayPrice"
					:key="tab.id"
					:data-current="index">
					{{ tab.name }}
					<view class="checkmarkempty"><uni-icons type="checkmarkempty" size="22" class="form-clear-icons" color="#fff"></uni-icons></view>
				</view>
			</view>
			<view class="list">
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text7 }}：</text>
					<text class="pay-price">{{ matchBuyInfo.price || 0 }} CNY/USDT</text>
				</view>
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text8 }}：</text>
					<text class="pay-prices">{{ matchBuyInfo.count || 0 }} USDT</text>
				</view>
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text9 }}：</text>
					<text class="pay-prices">{{ matchBuyInfo.buyAmount || 0 }} CNY</text>
				</view>
			</view>
			<view class="button" @click="tabBarPayButton(1)">{{ i18n.text10 }} USDT</view>
			<view class="help">
				<text class="text-eos">{{ i18n.text21 }}</text><text class="text-eos" @click="agreementButton(2)">{{i18n.text021}}</text>
			</view>
		</view>
		<view class="pay-false padding-30" v-show="tabsOpenPay">
			<view class="" :current="tabIndex" v-show="!tabsOpenM">
				<view class="form-input">
					<text class="pay-actives">￥</text>
					<input type="number" :placeholder="i18n.text1" v-model="BarPayPrices" @input="changeInput(BarPayPrices, '3')" />
				</view>
			</view>
			<view class="" :current="tabIndex" v-show="tabsOpenM">
				<view class="form-input" style="padding-left:10rpx;">
					<input type="number" :placeholder="i18n.text12" v-model="BarPayPriceNums" @input="changeInput(BarPayPriceNums, '4')" />
					<text class="input-Eos" style="color: #de6334;">USDT</text>
				</view>
			</view>
			<view class="help">
				<text class="text-eos">
					USDT参考单价：
					<text class="text-number">{{ unitPrice || 0 }} CNY/USDT</text>
				</text>
			</view>
			<view class="switch-pay switch-pay2">
				<uni-icons type="refresh" size="14" style="color: #de6334;"></uni-icons>
				<text @click="tabsOpenMButton" v-show="!tabsOpenM">{{ i18n.text15 }}</text>
				<text @click="tabsOpenMButton" v-show="tabsOpenM">{{ i18n.text14 }}</text>
			</view>
			<br />
			<view class="uni-font-size">{{ i18n.text6 }}</view>
			<view class="pay-box">
				<view
					class="pay-list pay-lists"
					:class="PriceS == index ? 'pay-activeS' : ''"
					@click="tabBarPayPriceS"
					v-for="(tab, index) in tabBarsPayPrice"
					:key="tab.id"
					:data-current="index">
					{{ tab.name }}
					<view class="checkmarkempty"><uni-icons type="checkmarkempty" size="22" class="form-clear-icons" color="#fff"></uni-icons></view>
				</view>
			</view>
			<view class="list">
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text17 }}：</text>
					<text class="pay-price" style="color: #de6334;">{{ matchSaleInfo.price || 0 }} CNY/USDT</text>
				</view>
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text18 }}：</text>
					<text class="pay-prices">{{ matchSaleInfo.buyCount || 0 }} USDT</text>
				</view>
				<view class="pays-list">
					<text class="uni-font-size">{{ i18n.text19 }}：</text>
					<text class="pay-prices">{{ matchSaleInfo.buyAmount || 0 }} CNY</text>
				</view>
			</view>
			<view class="button buttonF" @click="tabBarPayButton(2)">{{ i18n.text20 }} USDT</view>
			<view class="help">
				<text class="text-eos">{{ i18n.text39 }}</text><text class="text-eos" @click="agreementButton(3)">{{i18n.text039}}</text>
			</view>
		</view>
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
			loadMore: true,
			noMsg: true,
			Price: -1,
			PriceS: -1,
			tabIndexPay: 0,
			tabBarsPayPrice: [
				{
					name: this.$t('index.text22'),
					id: '1'
				},
				{
					name: this.$t('index.text23'),
					id: '2'
				}
			],
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
			// 一键购买USDT
			BarPayPrice: '',
			saleId: '', //匹配到的售卖订单id
			buyInfoIn: {},
			matchBuyInfo: {
				price: '',
				count: '',
				buyAmount: '',
				saleId: ''
			},
			// 一键卖出USDT
			BarPayPrices: '',
			matchSaleInfo: {
				price: '',
				buyCount: '',
				buyAmount: '',
				saleId: ''
			},
			PricesOpen: '0',
			BarPayPriceNums: '',
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
		this.queryNoticeFunction()
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
			this.queryNoticeFunction()
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {
	},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		agreementButton(id){
			// 2 购买协议html
			// 3 出售协议html
			// uni.navigateTo({
			// 	url: '/pages/agreement/agreement?id='+id
			// });
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
			if (status == '1' || status == '2') {
				if (val == '' && this.Price != '-1') {
					this.matchBuyInfo.price = '0';
					this.matchBuyInfo.count = '0';
					this.matchBuyInfo.buyAmount = '0';
				}
			}
			if (status == '3' || status == '4') {
				if (val == '' && this.PriceS != '-1') {
					this.matchSaleInfo.price = '0';
					this.matchSaleInfo.buyCount = '0';
					this.matchSaleInfo.buyAmount = '0';
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
				this.unitPrice = res.data;
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		// 匹配售卖USDT订单
		async matchSaleInfoFunftion() {
			var obj = {};
			const system_info = GET_STORAGE('system_info');
			if (this.tabsOpen == false) {
				obj = {
					lang:system_info.language,
					payType: (Number(this.Price) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					buyAmount: this.BarPayPrice, //售卖总额 ,
					buyType: '1' //售卖类型；1：按金额出售；2：按数量出售
				};
			} else {
				obj = {
					lang:system_info.language,
					payType: (Number(this.Price) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					buyCount: this.BarPayPriceNum, //售卖个数,
					buyType: '2' //售卖类型；1：按金额出售；2：按数量出售
				};
			}
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.matchSaleInfoHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				if(!this.tabsOpen){
					if(this.BarPayPrice>res.data.buyAmount){
						this.$alert("成交总额不足，请重新购买");
						return;
					}
				}else{
					if(this.BarPayPriceNum>res.data.buyAmount){
						this.$alert("成交数量不足，请重新购买");
						return;
					}
				}
				this.matchBuyInfo.saleId = res.data.saleId;
				this.matchBuyInfo.price = res.data.price;
				this.matchBuyInfo.count = res.data.count;
				this.matchBuyInfo.buyAmount = res.data.buyAmount;
			
				return;
			}
			if (res.code != '000') {
				uni.hideLoading();
				this.matchBuyInfo.price = '0';
				this.matchBuyInfo.count = '0';
				this.matchBuyInfo.buyAmount = '0';
				this.$alert(res.errorMessage);
				return;
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('index.text600'))
				return;
			} 
		},
		// 匹配购买USDT订单
		async matchBuyInfoFunftion() {
			var obj = {};
			const system_info = GET_STORAGE('system_info');
			if (this.tabsOpenM == false) {
				obj = {
					lang:system_info.language,
					payType: (Number(this.PriceS) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					saleAmount: this.BarPayPrices, //售卖总额 ,
					saleType: '1' //售卖类型；1：按金额出售；2：按数量出售
				};
			} else {
				obj = {
					lang:system_info.language,
					payType: (Number(this.PriceS) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					saleCount: this.BarPayPriceNums, //售卖个数,
					saleType: '2' //售卖类型；1：按金额出售；2：按数量出售
				};
			}

			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.matchBuyInfoHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.matchSaleInfo.saleId = res.data.buyId;
				this.matchSaleInfo.price = res.data.price;
				this.matchSaleInfo.buyCount = res.data.buyCount;
				this.matchSaleInfo.buyAmount = res.data.buyAmount;
				return;
			}
			if (res.code != '000') {
				uni.hideLoading();
				this.matchSaleInfo.price = '0';
				this.matchSaleInfo.buyCount = '0';
				this.matchSaleInfo.buyAmount = '0';

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
			var obj = {};
			const system_info = GET_STORAGE('system_info');
			
			if (this.tabsOpen == false) {
				obj = {
					buyAmount: this.matchBuyInfo.buyAmount, //售卖总额 ,
					buyType: '1', //售卖类型；1：按金额出售；2：按数量出售
					lang:system_info.language,
					payType: (Number(this.Price) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					saleId: this.matchBuyInfo.saleId
				};
			} else {
				obj = {
					buyType: '2', //售卖类型；1：按金额出售；2：按数量出售
					lang:system_info.language,
					payType: (Number(this.Price) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					buyCount: this.matchBuyInfo.count, //售卖个数,
					saleId: this.matchBuyInfo.saleId
				};
			}
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
			// 
			const system_info = GET_STORAGE('system_info');
			if (this.tabsOpenM == false) {
				obj = {
					lang:system_info.language,
					payType: (Number(this.PriceS) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					price: this.matchSaleInfo.price, //售卖单价 ,
					saleAmount: this.BarPayPrices, //售卖总额 ,
					saleType: '1', //售卖类型；1：按金额出售；2：按数量出售
					buyId: this.matchSaleInfo.saleId
				};
			} else {
				obj = {
					lang:system_info.language,
					payType: (Number(this.PriceS) + 1).toString(), //收款类型；1：支付宝；2：银行卡 ,
					price: this.matchSaleInfo.price, //售卖单价 ,
					saleCount: this.BarPayPriceNums, //售卖数量 ,
					saleType: '2', //售卖类型；1：按金额出售；2：按数量出售
					buyId: this.matchSaleInfo.saleId
				};
			}
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
		// 一键卖币 支付宝与银行卡
		tabBarPayPriceS(e) {
			if (Number(this.tabIndexPay) + 1 == 2) {
				if (this.tabsOpenM == false) {
					if (this.BarPayPrices == '') {
						this.$alert(this.$t('index.text35'));
						return;
					}
					if (this.BarPayPrices != '') {
						let index = e.target.dataset.current || e.currentTarget.dataset.current;
						if (this.PriceS === index) {
							return;
						}
						this.PriceS = index;
						this.matchBuyInfoFunftion();
						return;
					}
				} else {
					if (this.BarPayPriceNums == '') {
						this.$alert(this.$t('index.text37'));
						return;
					}
					if (this.BarPayPriceNums != '') {
						let index = e.target.dataset.current || e.currentTarget.dataset.current;
						if (this.PriceS === index) {
							return;
						}
						this.PriceS = index;
						this.matchBuyInfoFunftion();
						return;
					}
				}
				return;
			}
		},
		// 一键买币 支付宝与银行卡
		tabBarPayPrice(e) {
			var that = this;
			if (Number(this.tabIndexPay) + 1 == 1) {
				if (this.tabsOpen == false) {
					if (this.BarPayPrice == '') {
						this.$alert(this.$t('index.text31'));
						return;
					}
					if (this.BarPayPrice != '' || this.Price != '-1') {
						let index = e.target.dataset.current || e.currentTarget.dataset.current;
						if (this.Price === index) {
							return;
						}
						this.Price = index;
						this.matchSaleInfoFunftion();
						return;
					}
				} else {
					if (this.BarPayPriceNum == '') {
						this.$alert(this.$t('index.text33'));
						return;
					}
					if (this.BarPayPriceNum != '' || this.Price != '-1') {
						let index = e.target.dataset.current || e.currentTarget.dataset.current;
						if (this.Price === index) {
							return;
						}
						this.Price = index;
						this.matchSaleInfoFunftion();
						return;
					}
				}
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
.header {
	padding: 20rpx;
	height: 80rpx;
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
.button {
	border-radius: 10rpx;
	height: 80rpx;
	background: #06b572;
	text-align: center;
	color: #fff;
	font-size: 26rpx;
	line-height: 80rpx;
	margin: 20rpx 0;
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
	.help {
		margin: 20rpx 0;
	}
	.form-clear-icon {
		display: block;
		float: left;
	}
	.text-eos {
		color: $uni-textJ-color;
		font-size: 22rpx;
		display: block;
		float: left;
		line-height: 32rpx;
		margin-left: 10rpx;
		.text-number {
			color: #333;
		}
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
