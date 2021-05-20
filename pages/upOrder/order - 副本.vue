<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text30 }}</view>
			</view>
			<view class="box-header">
				<view class="right-title">￥{{ unitPriced }}</view>
			</view>
		</view>

		<view class="content">
			<view class="header">
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay"
					:class="tabIndexPay == index ? 'uni-tab-item-border-active-pay' : ''"
					:id="tab.id"
					:data-current="index"
					@click="ontabtapPay"
				>
					<text class="text-b" :class="tabIndexPay == index ? 'uni-tab-item-title-active-pay' : ''">{{ tab.name }}</text>
				</view>
			</view>
			<!-- 购买设置 -->
			<form @submit="formSubmitPayment" v-show="!tabsOpenPay">
				<view class="back-wither height">
					<view class="view-p">
						<text class="user-pay">{{ i18n.text1 }}</text>
						<text class="uedt">USDT</text>
						<view class="switch"><switch name="switch" :checked="checked" @change="switch1Change" /></view>
					</view>
					<view class="pay-box">
						<view
							class="pay-list"
							:class="{ 'pay-active': tabBarsPayPriceArr.includes(tab.id) }"
							@click="tabBarPayPrice(tab.id)"
							v-for="(tab, index) in tabBarsPayPrice"
							:key="tab.id"
							
						>
							{{ tab.name }}
							<view class="checkmarkempty"><uni-icons type="checkmarkempty" size="22" class="form-clear-icons" color="#fff"></uni-icons></view>
						</view>
					</view>
					<view class="form-input height view-top">
						<view class="lable-name">{{ i18n.text2 }}</view>
						<view class="form-inputs"><input type="number" :placeholder="minBuyOrderCountSTR" v-model="payment.buyCount" name="buyCount" /></view>
					</view>
				</view>
				<view class="back-wither height" v-show="buyShow.yinhangka">
					<view class="size">{{ i18n.text52 }}</view>
					<view class="yinhangka">
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text4 }}</view>
							<view class="form-inputs"><input type="number" :placeholder="i18n.text5" v-model="payment.bankPayPrice" name="bankPayPrice" /></view>
						</view>
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text6 }}</view>
							<view class="form-inputs"><input type="number" :placeholder="i18n.text7" v-model="payment.bankPayLimit" name="bankPayLimit" /></view>
						</view>

						<view class="list">
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text8 }}：</text>
								<text class="pay-price">{{ payment.bankPayPrice || 0 }} CNY/USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text2 }}：</text>
								<text class="pay-prices">{{ payment.buyCount || 0 }} USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text6 }}：</text>
								<text class="pay-prices">{{ payment.bankPayLimit || 0 }} CNY</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="back-wither height" v-show="buyShow.zhifubao">
					<view class="zhifubao">
						<view class="size">{{ i18n.text51 }}</view>
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text11 }}</view>
							<view class="form-inputs">
								<input type="number" :placeholder="i18n.text12" v-model="payment.aliPayPrice" name="aliPayPrice" />
							</view>
						</view>
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text9 }}</view>
							<view class="form-inputs"><input type="number" :placeholder="i18n.text10" v-model="payment.aliPayLimit" name="aliPayLimit" /></view>
						</view>
						<view class="list">
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text11 }}：</text>
								<text class="pay-price">{{ payment.aliPayPrice || 0 }} CNY/USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text2 }}：</text>
								<text class="pay-prices">{{ payment.buyCount || 0 }} USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text13 }}：</text>
								<text class="pay-prices">{{ payment.aliPayLimit || 0 }} CNY</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 微信设置 -->
				<view class="back-wither height" v-show="buyShow.weixin">
					<view class="zhifubao">
						<view class="size">{{ i18n.text61 }}</view>
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text59 }}</view>
							<view class="form-inputs">
								<input type="number" :placeholder="i18n.text60" v-model="payment.weixinPayPrice" name="weixinPayPrice" />
							</view>
						</view>
						<view class="form-input height view-top">
							<view class="lable-name">{{ i18n.text57 }}</view>
							<view class="form-inputs"><input type="number" :placeholder="i18n.text58" v-model="payment.weixinPayLimit" name="weixinPayLimit" /></view>
						</view>
						<view class="list">
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text59 }}：</text>
								<text class="pay-price">{{ payment.weixinPayPrice || 0 }} CNY/USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text2 }}：</text>
								<text class="pay-prices">{{ payment.buyCount || 0 }} USDT</text>
							</view>
							<view class="pays-list">
								<text class="uni-font-size">{{ i18n.text57 }}：</text>
								<text class="pay-prices">{{ payment.weixinPayLimit || 0 }} CNY</text>
							</view>
						</view>
					</view>
				</view>
				<button class="button" form-type="submit">{{ i18n.text14 }}</button>
			</form>
			<!-- 出售设置 -->
			<view class="pay-false" v-show="tabsOpenPay">
				<form @submit="formSubmit">
					<view class="back-wither height">
						<view class="view-p">
							<text class="user-pays">{{ i18n.text15 }}</text>
							<text class="uedt">USDT</text>
							<view class="switch"><switch name="switchs" :checked="checkeds" @change="switch2Change" /></view>
						</view>
						<view class="pay-box">
							<!-- v-if="index == '0'" -->
							<view
								class="pay-list pay-lists"
								:class="{ 'pay-activeS': tabBarsPayPriceArrS.includes(tab.id) }"
								@click="tabBarPayPriceS(tab.id)"
								v-for="(tab, index) in tabBarsPayPrice"
								:key="tab.id"
								:data-current="index"
								
							>
								{{ tab.name }}
								<view class="checkmarkempty"><uni-icons type="checkmarkempty" size="22" class="form-clear-icons" color="#fff"></uni-icons></view>
							</view>
						</view>
						<view class="form-input height">
							<view class="lable-name">{{ i18n.text18 }}</view>
							<view class="form-inputs"><input type="number" :placeholder="minSaleOrderCountSTR" v-model="sell.saleCount" name="saleCount" /></view>
						</view>
					</view>
					<!-- 银行卡设置 -->
					<view class="back-wither height" v-show="sellShow.yinhangka">
						<view class="size">{{ i18n.text52 }}</view>
						<view class="yinhangka">
							<view class="form-input height">
								<view class="lable-name">{{ i18n.text16 }}</view>
								<view class="form-inputs">
									<input type="number" :placeholder="i18n.text17" v-model="sell.bankPayPrice" name="bankPayPrice" />
								</view>
							</view>
							<view class="form-inputs pickerPlugin">
								<picker @change="pickerChangeYH" :range="dataYH" range-key="text" >
									<label>{{ i18n.text54 }}</label>
									<input disabled="disabled" class="pickerInput" type="text" v-model="receiveAccount" name="receiveAccountId" />
								</picker>
							</view>
							<view class="list">
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text16 }}：</text>
									<text class="pay-price" style="color: #de6334;">{{ sell.bankPayPrice || 0 }} CNY/USDT</text>
								</view>
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text18 }}：</text>
									<text class="pay-prices">{{ sell.saleCount || 0 }} USDT</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 支付宝设置 -->
					<view class="back-wither height" v-show="sellShow.zhifubao">
						<view class="size">{{ i18n.text51 }}</view>
						<view class="zhifubao">
							<view class="form-input height">
								<view class="lable-name">{{ i18n.text20 }}</view>
								<view class="form-inputs"><input type="number" :placeholder="i18n.text21" v-model="sell.aliPayPrice" name="aliPayPrice" /></view>
							</view>
							<view class="form-inputs pickerPlugin">
								<picker @change="pickerChangeZFB" :range="dataZFB" range-key="text" >
									<label>{{ i18n.text54 }}</label>
									<input disabled="disabled" class="pickerInput" type="text" v-model="receiveAccount" name="receiveAccountId" />
								</picker>
							</view>
							<view class="list">
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text20 }}：</text>
									<text class="pay-price" style="color: #de6334;">{{ sell.aliPayPrice || 0 }} CNY/USDT</text>
								</view>
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text18 }}：</text>
									<text class="pay-prices">{{ sell.saleCount || 0 }} USDT</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 微信设置 -->
					<view class="back-wither height" v-show="sellShow.weixin">
						<view class="size">{{ i18n.text61 }}</view>
						<view class="zhifubao">
							<view class="form-input height">
								<view class="lable-name">{{ i18n.text62 }}</view>
								<view class="form-inputs"><input type="number" :placeholder="i18n.text63" v-model="sell.weixinPrice" name="weixinPrice" /></view>
							</view>
							<view class="form-inputs pickerPlugin">
								<picker @change="pickerChangeWX" :range="dataWX" range-key="text" >
									<label>{{ i18n.text54 }}</label>
									<input disabled="disabled" class="pickerInput" type="text" v-model="receiveAccount" name="receiveAccountId" />
								</picker>
							</view>
							<view class="list">
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text62 }}：</text>
									<text class="pay-price" style="color: #de6334;">{{ sell.weixinPrice || 0 }} CNY/USDT</text>
								</view>
								<view class="pays-list">
									<text class="uni-font-size">{{ i18n.text18 }}：</text>
									<text class="pay-prices">{{ sell.saleCount || 0 }} USDT</text>
								</view>
							</view>
						</view>
					</view>
					<button class="button buttonF" form-type="submit">{{ i18n.text24 }}</button>
				</form>
			</view>
			<!-- 中部弹框 -->
			<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
				<uni-popup-dialog
					:type="msgType"
					:title="i18n.text25"
					:content="dialogContent"
					:before-close="true"
					@confirm="dialogConfirm"
					@close="dialogClose"
				></uni-popup-dialog>
			</uni-popup>
		</view>
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
			unitPriced:"0",
			tabBars: [
				{
					name: this.$t('cancelledList.text12'),
					id: '1'
				},
				{
					name: this.$t('cancelledList.text13'),
					id: '2'
				}
			],
			tabIndex:0,
			
			
			
			
			
			// 挂单start
			buyShow: {
				yinhangka: true,
				zhifubao: false,
				weixin: false
			},
			sellShow: {
				yinhangka: true,
				zhifubao: false,
				weixin: false
			},
			payment: {
				aliPayLimit: '', //Momo付款限额
				aliPayPrice: '', //Momo付款单价
				bankPayLimit: '', //银行卡付款限额
				bankPayPrice: '', //银行卡付款单价
				weixinPayLimit: '', //微信付款限额
				weixinPayPrice : '', //微信付款单价
				buyCount: '' //购买数量
			},
			sell: {
				aliPayPrice: '', //支付宝收款单价
				weixinPrice: '', //微信收款单价
				bankPayPrice: '', //银行卡收款单价
				saleCount: '' //出售数量
			},
			receiveAccountId: "", // 设置收款账户
			receiveAccount: "",
			checkeds: false,
			checked: false,
			show: false,
			shows: false,
			// 挂单end

			loadMore: true,
			noMsg: true,
			Price: -1,
			PriceS: -1,
			tabIndexPay: 0,
			tabBarsPayPrice: [
				{
					name: this.$t('orderUp.text27'),
					id: '2'
				},
				{
					name: this.$t('orderUp.text26'),
					id: '1'
				},
				{
					name: this.$t('orderUp.text56'),
					id: '3'
				}
			],
			tabBarPay: [
				{
					name: this.$t('orderUp.text28'),
					id: '0'
				},
				{
					name: this.$t('orderUp.text29'),
					id: '1'
				}
			],
			tabBarsPayPriceArr: ['2'],
			tabBarsPayPriceArrS: ['2'],
			dialogContent: '',
			tabsOpenPay: false,
			tabsOpen: false,
			tabIndexM: 0,
			tabsOpenM: false,
			dialogContent: '',
			BarPayPriceNum: '',
			msgType: 'success',
			unitPrice: '',
			dataZFB: [],
			dataYH: [],
			dataWX: [],
			tid: 0,
			convertMoney: '',
			walletBalance: '',
			minBuyOrderCount: '',
			minSaleOrderCount: '',
			minBuyOrderCountSTR: '',
			minSaleOrderCountSTR: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('orderUp');
		}
	},
	components: { uniIcons, uniPopup },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('orderUp.text30')
		});
		this.getAutoSettingBuyFunftion(1);
		this.getReceiveAccountListFunction();
		this.getMyAssetsItemFunction();
		this.getUSDTPrice();
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			if(this.tabIndexPay == "0"){
				this.getAutoSettingBuyFunftion();
			}
			if(this.tabIndexPay == "1"){
				this.getAutoSettingSaleftion();
			}
			this.getMyAssetsItemFunction();
			this.getUSDTPrice();
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {},
	methods: {
		// goHome(){
		// 	uni.reLaunch({
		// 		url: '/pages/home/home'
		// 	});
		// },
		async getMyAssetsItemFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getMyAssetsItemHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.convertMoney = +res.data.convertMoney;
				this.walletBalance = +res.data.walletBalance;
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getUSDTPrice() {
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.getUSDTPrice({});
			if (res.code === '000') {
				uni.hideLoading();
				this.minBuyOrderCount = +res.data.minBuyOrderCount;
				this.minBuyOrderCountSTR = this.$t('orderUp.text3') + "，" + res.data.minBuyOrderCount + "个起";
				this.minSaleOrderCount = +res.data.minSaleOrderCount;
				this.minSaleOrderCountSTR = this.$t('orderUp.text19') + "，" + res.data.minSaleOrderCount + "个起";
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		pickerChangeYH(e) {
			this.receiveAccountId = this.dataYH[e.target.value].tid
			this.receiveAccount = this.dataYH[e.target.value].text
		},
		pickerChangeZFB(e) {
			this.receiveAccountId = this.dataZFB[e.target.value].tid
			this.receiveAccount = this.dataZFB[e.target.value].text
		},
		pickerChangeWX(e) {
			this.receiveAccountId = this.dataWX[e.target.value].tid
			this.receiveAccount = this.dataWX[e.target.value].text
		},
		cancelledButton(){
			uni.navigateTo({
				url: '/pages/upOrder/cancelledRecorded'
			});
		},
		// 1 2 购买 1 3 售卖 input框
		navBack() {
			uni.navigateBack();
		},
		tabBarPayButton(type) {},
		switch1Change: function(e) {
			if (e.target.value == false) {
				this.autoBuyCloseFunftion();
				return;
			}
			if (e.target.value == true) {
	
				return;
			}
		},
		switch2Change: function(e) {
			if (e.target.value == false) {
				this.autoSaleCloseFunftion();
				return;
			}
			if (e.target.value == true) {

				return;
			}
		},
		async autoBuyCloseFunftion() {
			
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.autoBuyCloseHttp({lang:system_info.language});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text32'));
		
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			
			} 
		},
		async autoSaleCloseFunftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.autoSaleCloseHttp({lang:system_info.language});
			if (res.code === '000') {
				this.$alert(this.$t('orderUp.text33'));
				uni.hideLoading();
			
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			
			} 
		},
		//自动挂单购买
		async autoBuyFunftion(status) {
			if(this.payment.buyCount < this.minBuyOrderCount){
				this.$alert(this.$t('orderUp.text67'));
				return;
			}
			// if(this.walletBalance < this.minBuyOrderCount){
			// 	this.$alert(this.$t('orderUp.text69'));
			// 	return;
			// }
			const system_info = GET_STORAGE('system_info');
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			var obj = {}
			if(this.tabBarsPayPriceArr.toString() == "1"){
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: this.payment.aliPayLimit,
					aliPayPrice: this.payment.aliPayPrice,
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit:"",
					bankPayPrice:"",
					weixinPayLimit: "",
					weixinPayPrice: "",
					status: status
				};
			}else if(this.tabBarsPayPriceArr.toString() == "2"){
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: "",
					aliPayPrice: "",
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit: this.payment.bankPayLimit,
					bankPayPrice: this.payment.bankPayPrice,
					weixinPayLimit: "",
					weixinPayPrice: "",
					status: status
				};
			}else if(this.tabBarsPayPriceArr.toString() == "3"){
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: "",
					aliPayPrice: "",
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit: "",
					bankPayPrice: "",
					weixinPayLimit: this.payment.weixinPayLimit,
					weixinPayPrice: this.payment.weixinPayPrice,
					status: status
				};
			}
			let res = await api.autoBuyHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text46'));
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			} 
		},
		// 自动出售挂单
		async autoSaleFunftion(status) {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			// system_info.language
			const system_info = GET_STORAGE('system_info');
			var obj = {}
			let res = await api.autoSaleHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text47'));
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			
			} 
		},
		//挂单购买设置回显
		async getAutoSettingBuyFunftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			let res = await api.getAutoSettingBuyHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.payment.buyCount = res.data.buyCount;
				this.payment.aliPayLimit = res.data.aliPayLimit;
				this.payment.aliPayPrice = res.data.aliPayPrice;
				this.payment.buyCount = res.data.buyCount;
				this.payment.bankPayLimit = res.data.bankPayLimit;
				this.payment.bankPayPrice = res.data.bankPayPrice;
				if (res.data.status == '1') {
					this.checked = true;
				} else {
					this.checked = false;
				}
			}
			if (res.code !== '000') {
				uni.hideLoading();
		
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
			}
		},
		//挂单出售设置回显
		async getAutoSettingSaleftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			let res = await api.getAutoSettingSaleHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.sell.saleCount = res.data.saleCount;
				this.sell.aliPayPrice = res.data.aliPayPrice;
				this.sell.bankPayPrice = res.data.bankPayPrice;
				if (res.data.status == '1') {
					this.checkeds = true;
				} else {
					this.checkeds = false;
				}
				this.shows = true;
		
			}
			if (res.code !== '000') {
				uni.hideLoading();
		
			}
			if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'))
		
			} 
		},
		// 获取用户收款账户列表
		async getReceiveAccountListFunction() {
			uni.showLoading({ title: this.$t('collection.text13'), mask: true });
			let res = await api.getReceiveAccountListHttp({});
			if (res.code === '000') {
				uni.hideLoading();
		
				if (res.data != '') {
					for (var i = 0; i < res.data.length; i++) {
						let d = {// bankNum alipayNum
							// text: res.data[i].alipayNum,
							tid: res.data[i].id
						}
						if (res.data[i].receiveAccountType == '1') {
							d.text = res.data[i].alipayNum;
							this.dataZFB.push(d);
						} else if (res.data[i].receiveAccountType == '2') {
							d.text = res.data[i].bankNum;
							this.dataYH.push(d);
						} else {
							d.text = res.data[i].wechatNum;
							this.dataWX.push(d);
						}
					}
					return;
				}
				if (res.data == '') {
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
		// 出售
		tabBarPayPriceS(index) {
			this.tabBarsPayPriceArrS = [];
			this.receiveAccountId = "";
			this.tabBarsPayPriceArrS.push(index);
			if (this.tabBarsPayPriceArrS.length == 0) {
				this.$alert(this.$t('orderUp.text50'));
				this.tabBarsPayPriceArrS = [];
				this.tabBarsPayPriceArrS.push(index);
				return;
			}
			if (this.tabBarsPayPriceArrS.includes('1')) {
				this.sellShow.zhifubao = true;
			} else {
				this.sellShow.zhifubao = false;
			}
			if (this.tabBarsPayPriceArrS.includes('2')) {
				this.sellShow.yinhangka = true;
			} else {
				this.sellShow.yinhangka = false;
			}
			if (this.tabBarsPayPriceArrS.includes('3')) {
				this.sellShow.weixin = true;
			} else {
				this.sellShow.weixin = false;
			}
		},
		//购买 Momo与银行卡
		tabBarPayPrice(index) {
			this.tabBarsPayPriceArr = [];
			this.tabBarsPayPriceArr.push(index);
			if (this.tabBarsPayPriceArr.length == 0) {
				this.$alert(this.$t('orderUp.text49'));
				this.tabBarsPayPriceArr = [];
				this.tabBarsPayPriceArr.push(index);
				return;
			}
			if (this.tabBarsPayPriceArr.includes('1')) {
				this.buyShow.zhifubao = true;
			} else {
				this.buyShow.zhifubao = false;
			}
			if (this.tabBarsPayPriceArr.includes('2')) {
				this.buyShow.yinhangka = true;
			} else {
				this.buyShow.yinhangka = false;
			}
			if (this.tabBarsPayPriceArr.includes('3')) {
				this.buyShow.weixin = true;
			} else {
				this.buyShow.weixin = false;
			}
		},
		formSubmitPayment: function(e) {
			var formData = e.detail.value;
			if (this.tabBarsPayPriceArr.toString() == '1') {
				if (this.payment.aliPayLimit == null || this.payment.aliPayLimit == '') {
					this.$alert(this.$t('orderUp.text34'));
				} else if (this.payment.aliPayPrice == null || this.payment.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text35'));
				} else if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else if (this.tabBarsPayPriceArr.toString() == '2') {
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.bankPayPrice == null || this.payment.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text41'));
				} else if (this.payment.bankPayLimit == null || this.payment.bankPayLimit == '') {
					this.$alert(this.$t('orderUp.text40'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else if (this.tabBarsPayPriceArr.toString() == '3') {// 微信 weixinPayPrice weixinPayLimit
				console.log("wechat")
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.weixinPayPrice == null || this.payment.weixinPayPrice == '') {
					this.$alert(this.$t('orderUp.text65'));
				} else if (this.payment.weixinPayLimit == null || this.payment.weixinPayLimit == '') {
					this.$alert(this.$t('orderUp.text64'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else {
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.bankPayLimit == null || this.payment.bankPayLimit == '') {
					this.$alert(this.$t('orderUp.text40'));
				} else if (this.payment.bankPayPrice == null || this.payment.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text41'));
				} else if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.aliPayLimit == null || this.payment.aliPayLimit == '') {
					this.$alert(this.$t('orderUp.text34'));
				} else if (this.payment.aliPayPrice == null || this.payment.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text35'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			}
		},
		formSubmit: function(e) {
			var formData = e.detail.value;

			if (this.tabBarsPayPriceArrS.toString() == '1') {
				if (this.sell.saleCount == null || this.sell.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.aliPayPrice == null || this.sell.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text42'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else if (this.tabBarsPayPriceArrS.toString() == '2') {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.bankPayPrice == null || this.sell.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text45'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else if (this.tabBarsPayPriceArrS.toString() == '3') {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.weixinPrice == null || this.sell.weixinPrice == '') {
					this.$alert(this.$t('orderUp.text66'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.bankPayPrice == null || this.sell.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text45'));
				} else if (this.sell.aliPayPrice == null || this.sell.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text42'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			}
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.msgType = 'info';
			this.message = '点击了对话框的取消按钮';
			this.$refs.popupDialog.open();
			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框点击确认按钮
		 */
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			if (this.tabIndexPay == 0) {
				this.autoBuyFunftion('1');
			} else {
				this.autoSaleFunftion('1');
				this.tabBarsPayPriceArrS.toString();
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
			if (this.tabIndexPay === index) {
				return;
			}
			this.tabIndexPay = index;
			if (this.tabIndexPay == 0) {
				this.getAutoSettingBuyFunftion();
			} else {
				this.getAutoSettingSaleftion();
			}
			this.tabsOpenPay = !this.tabsOpenPay;
		},
		async submitLoginFn() {
			this.$alert('提示信息');
		}
	}
};
</script>

<style lang="scss" scoped>
	
// 挂单start
.lable-name {
	margin: 20rpx 0 10rpx;
}
.canelButton {
	margin-right: 20rpx;
}
.inputs-CNY {
	font-size: $uni-font-size;
	float: left;
	margin-left: 20rpx;
}
.form-inputs {
	width: 100%;
	border-bottom: 1px solid #ddd;
	border-radius: 10rpx;
	padding: 10rpx 0;
	float: left;
	// margin: 20rpx 0;
}
.uni-base-color-06b572 {
	background-color: $uni-base-color-06b572;
}
.uni-base-color-de6334 {
	background-color: $uni-base-color-de6334;
}
.uni-btn-v {
	border-radius: 10rpx;
	color: #fff;
	font-size: $uni-font-size;
	float: right;
	padding: 10rpx 20rpx;
	text-align: center;
	margin-top: 15rpx;
}
.content {
	.back-wither {
		box-shadow: 0 0 4rpx #999;
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 40rpx;
		.size {
			font-weight: bold;
		}
		.user-pay {
			font-size: 26rpx;
			color: #06b572;
		}
		.user-pays {
			font-size: 26rpx;
			color: #de6334;
		}
		.uedt {
			margin-left: 10rpx;
			font-size: 26rpx;
		}
		.switch {
			float: right;
		}
		.pay-cny {
			font-size: $uni-font-size;
			float: left;
		}
		.view-top {
			width: 100%;
			.uni-font-size {
				float: right;
			}
		}
		.text-users {
			display: block;
			float: left;
			line-height: 30rpx;
		}
		.border-bottom {
			padding: 20rpx 0;
		}
		.up-pay {
			padding: 20rpx 0 0;
			font-size: $uni-font-size;
		}
		.icon-img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
			display: block;
			float: left;
		}
		.arrowright {
			float: right;
		}
		.pay-list {
			padding-top: 0 !important;
			padding-bottom: 20rpx;
		}
	}
}
/deep/ uni-switch .uni-switch-input:after,
uni-switch .uni-switch-input:before {
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input:after {
	width: 26rpx;
}
/deep/ uni-switch .uni-switch-input {
	width: 65rpx;
	height: 30rpx;
}
/deep/ uni-switch .uni-switch-input:after,
uni-switch .uni-switch-input:before {
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input:before {
	width: 62rpx;
	height: 26rpx;
}
/deep/ uni-switch .uni-switch-input.uni-switch-input-checked {
	background-color: #06b572 !important;
	border-color: #06b572 !important;
}
// 挂单 end

.header {
	padding: 20rpx 0;
	height: 80rpx;
	margin-bottom: 20rpx;
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
	// border: none;
	// border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	// border-radius: 10rpx;
	// height: 90rpx;
	// padding-top: 24rpx;
	// padding-left: 60rpx;
	// padding-right: 120rpx;
	// position: relative;
	// margin-bottom: 30rpx;
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
	background: #fff;
	.text-b {
		color: $uni-textJ-color;
		float: left;
		line-height: 32rpx;
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
		line-height: 1;
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
}
.switch-pay .uni-icons {
	vertical-align: text-bottom;
}
.switch-pay2 {
	color: #de6334;
}

.pickerPlugin {
	margin: 20rpx 0;
	.pickerInput {
		margin-top: 20rpx;
	}
}


</style>
