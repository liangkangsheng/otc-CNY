<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text25 }}</view>
			</view>
			<view class="box-header">
				<view class="right-title" style="color:#06b572" @click="phoneButton">{{ i18n.text025 }}</view>
			</view>
		</view>

		<view class="content">
			<view class="header-pay">
				<view class="pull-left" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1">
					<view class="pay-title" v-show="!orderConfirm.orderConfirmShow">{{ i18n.text1 }}</view>
					<view class="pay-title" v-show="orderConfirm.orderConfirmShow">{{ i18n.text2 }}</view>
					<view class="pay-time" v-show="!orderConfirm.orderConfirmShow">
						{{ i18n.text5 }}
						<text>{{ countdown }}</text>
					</view>
					<view class="pay-time" v-show="orderConfirm.orderConfirmShow">
						{{ i18n.text6 }}
						<text>{{ orderPaydata.buyCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-left" v-if="orderConfirm.payStauts == 3 && orderConfirm.type == 2">
					<view class="pay-title">{{ i18n.text7 }}</view>
					<view class="pay-time">
						{{ i18n.text6 }}
						<text>{{ orderPaydata.buyCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-left" v-if="orderConfirm.payStauts == 2 && orderConfirm.type == 1">
					<view class="pay-title">{{ i18n.text07 }}</view>
					<view class="pay-time">
						{{ i18n.text6 }}
						<text>{{ orderPaydata.buyCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-left" v-if="orderConfirm.payStauts == 4 && orderConfirm.type == 2">
					<view class="pay-title">{{ i18n.text8 }}</view>
					<view class="pay-time">
						{{ i18n.text9 }}
						<text>{{ orderPaydata.buyCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-right user-header" v-if="urlLink == 0"><image src="../../static/images/head.png" mode=""></image></view>
				<view class="pull-right user-header" v-if="urlLink == 1"><uni-icons type="checkmarkempty" size="16" class="pay-success-icon"></uni-icons></view>
			</view>
			<view class="connet-pay">
				<view class="height">
					<image src="../../static/icon/assest_icon3.png" mode="" class="assest_icon3 pull-left"></image>
					<view class="pull-left pay-tit">{{ i18n.text10 }}</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text11 }}</text>
					<text class="pull-right pay-price">￥ {{ orderPaydata.buyAmount }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text12 }}</text>
					<text class="pull-right">￥ {{ orderPaydata.price }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ i18n.text13 }}</text>
					<text class="pull-right">{{ orderPaydata.buyCount }} USDT</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text14 }}</text>
					<image src="../../static/icon/order_icon.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.tradeCode }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text15 }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<image src="../../static/icon/level_icon2.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.saleUserNickName }}</text>
				</view>
				<!-- 收款方式 -->
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ i18n.text16 }}</text>
					<view class="pull-right" v-if="orderPaydata.payType == '2'">
						<text class="pull-right">{{ i18n.text17 }}</text>
						<image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
					<view class="pull-right" v-if="orderPaydata.payType == '1'">
						<text class="pull-right">{{ i18n.text18 }}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
				</view>
				<!-- 银行名称 -->
				<view class="pay-list height borderBottom" v-show="orderConfirm.orderConfirmShow" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1 && orderPaydata.payType == '2'">
					<text class="pull-left">{{ i18n.text0016 }}</text>
					<view class="pull-right" v-if="orderPaydata.payType == '2'">
						<text class="pull-right">{{ orderConfirm.bankName }}</text>
						<!-- <image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image> -->
					</view>
					<!-- <view class="pull-right" v-if="orderPaydata.payType == '1'">
						<text class="pull-right">{{ i18n.text18 }}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view> -->
				</view>
				<!-- 银行卡号 -->
				<view class="pay-list height borderBottom" v-show="orderConfirm.orderConfirmShow" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1 && orderPaydata.payType == '2'">
					<text class="pull-left">{{ i18n.text016 }}</text>
					<view class="pull-right" @click="copyTextFun(orderConfirm.bankNum)">
						<text class="pull-right copy-text">复制</text>
					</view>
					<view class="pull-right" v-if="orderPaydata.payType == '2'">
						<text class="pull-right">{{ orderConfirm.bankNum }}</text>
						<!-- <image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image> -->
					</view>
					<!-- <view class="pull-right" v-if="orderPaydata.payType == '1'">
						<text class="pull-right">{{ i18n.text18 }}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view> -->
				</view>
				<!-- 卖家姓名 -->
				<view class="pay-list height borderBottom" v-show="orderConfirm.orderConfirmShow" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1">
					<text class="pull-left">{{ i18n.text19 }}</text>
					<view class="pull-right" @click="copyTextFun(orderConfirm.realName)">
						<text class="pull-right copy-text">复制</text>
					</view>
					<text class="pull-right">{{ orderConfirm.realName }}</text>
				</view>
				<!-- 银行地址 -->
				<view class="pay-list height borderBottom" v-show="orderConfirm.orderConfirmShow" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1">
					<text class="pull-left" v-if="orderPaydata.payType == '1'">{{ i18n.text18 }}</text>
					<text class="pull-left" v-if="orderPaydata.payType == '2'">{{ i18n.text017 }}</text>
					<text class="pull-left" v-if="orderPaydata.payType == '3'">{{ i18n.text018 }}</text>
					<view class="pull-right" @click="copyTextFun(orderPaydata.payType == '1' ? orderConfirm.aliPayNum : orderPaydata.payType == '2' ? orderConfirm.bankAddr : orderConfirm.wechatNum)">
						<text class="pull-right copy-text">复制</text>
					</view>
					<text class="pull-right" v-if="orderPaydata.payType == '1'">{{ orderConfirm.aliPayNum }}</text>
					<text class="pull-right" v-if="orderPaydata.payType == '2'">{{ orderConfirm.bankAddr }}</text>
					<text class="pull-right" v-if="orderPaydata.payType == '3'">{{ orderConfirm.wechatNum }}</text>
				</view>
				<view class="bg-img height" v-if="orderPaydata.payType == '1'" v-show="codeshow"> 
					<image :src="orderConfirm.alipayQrCode" mode="aspectFill" class="image" name=""></image>
				</view>
				<view class="bg-img height" v-if="orderPaydata.payType == '3'" v-show="codeshow">
					<image :src="orderConfirm.wechatQrcode" mode="aspectFill" class="image" name=""></image>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderPayment.text020') }}{{ $t('orderPayment.text019') }}</text>
				</view>
			</view>
			<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
				<uni-popup-dialog :type="msgType" :title="i18n.text20" :content="content" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
			<view class="footer-button" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1">
				<view class="order-del pull-left" @click="toggleMessage('success', '1')">{{ i18n.text21 }}</view>
				<view class="order-pay pull-right" @click="toggleMessage('success', '2')">{{ i18n.text22 }}</view>
			</view>
			<view class="footer-button" v-show="orderConfirm.orderConfirmShow" v-if="orderConfirm.payStauts == 1 && orderConfirm.type == 1">
				<view class="order-pay pull-right" style="width: 100%;" @click="toggleMessage('success', '3')">{{ i18n.text23 }}</view>
			</view>
			<view class="footer-button" v-if="orderConfirm.payStauts == 2 && orderConfirm.type == 1">
				<button class="order-pay pull-right" style="background: #999;width:100%">{{ i18n.text24 }}</button>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import http from '@/request/request.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			msgType: 'success',
			countdown: '',
			content: '',
			dialogContent: '',
			time: '', //30分钟换算成1800秒
			timer: null, //重复执行
			src: '',
			orderId: '',
			salePay: '',
			orderPaydata: {},
			toggleId: '',
			orderConfirm: {
				realName: '',
				aliPayNum: '',
				alipayQrCode: '',
				tradeCode: '', //
				title: this.$t('orderPayment.text22'),
				orderConfirmShow: false,
				payStauts: '1',
				type: '0',
				bankAddr: '',
				bankName:"",
				bankNum:"",
				wechatNum: "",
				wechatQrcode: ''
			},
			urlLink: 0,
			codeshow: false,
		};
	},
	computed: {
		i18n() {
			return this.$t('orderPayment');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('orderPayment.text25')
		});
		if (option.status == '1' && option.type == '1') {
			this.timer = setInterval(() => {
				this.showtime();
			}, 1000);
		}
		this.orderConfirm.payStauts = option.status;
		this.orderConfirm.type = option.type;
		this.orderId = option.orderId;
		this.salePay = option.salePay;
		this.urlLink = option.urlLink;
		this.getOrderInfoFunftion();
		if (option.status == 2) {
			this.orderConfirm.orderConfirmShow = true;
		} else if (option.status == 3) {
			this.orderConfirm.orderConfirmShow = true;
		} else if (option.status == 4) {
			this.orderConfirm.orderConfirmShow = false;
		}
	},
	mounted() {},
	methods: {
		phoneButton() {
			// uni.makePhoneCall({
			// 	// 手机号
			// 	phoneNumber: this.orderPaydata.saleUserPhone,
			// 	// 成功回调
			// 	success: res => {},
			// 	// 失败回调
			// 	fail: res => {}
			// });
			uni.navigateTo({
				url: '/hybrid/html/service'
			});
		},
		navBack() {
			uni.navigateBack();
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

			if (this.toggleId == '1') {
				this.cancelOrderFunftion();
			} else if (this.toggleId == '2') {
				this.goPayFunftion();
			} else if (this.toggleId == '3') {
				this.paySuccessFunftion();
			}
			// 需要执行 done 才能关闭对话框
			done();
		},
		toggleMessage(type, id) {
			this.msgType = type;
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			if (id == '1') {
				this.toggleId = '1';
				this.content = this.$t('orderPayment.text26') + '?';
			} else if (id == '2') {
				this.toggleId = '2';
				this.content = this.$t('orderPayment.text27') + '?';
			} else {
				this.toggleId = '3';
				this.content = this.$t('orderPayment.text28') + '?';
			}
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {},
		async cancelOrderFunftion() {
			uni.showLoading({ title: this.$t('orderPayment.text29'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.cancelOrderHttp({
				tradeCode: this.orderPaydata.tradeCode,// 交易订单号
				lang:system_info.language,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text30'));
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/theOrder/order'
					});
				}, 1000);
				clearInterval(this.timer);
				this.countdown = '00:00';
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text600'))
			}   else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async goPayFunftion() {
			uni.showLoading({ title: this.$t('orderPayment.text29'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.goPayHttp({
				tradeCode: this.orderPaydata.tradeCode ,// 交易订单号
				lang:system_info.language,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.orderConfirm.realName = res.data.realName;
				if (res.data.aliPayNum) {
					this.orderConfirm.aliPayNum = res.data.aliPayNum;
				}
				// console.log(res.data.aliPayNum + ":" + res.data.alipayQrCode + ":" + this.orderPaydata.payType)
				if (res.data.alipayQrCode) {
					this.orderConfirm.alipayQrCode = http.config.baseUrl + res.data.alipayQrCode;
					// console.log(this.orderConfirm.alipayQrCode)
					this.codeshow = true;
				}
				if (res.data.wechatNum) {
					this.orderConfirm.wechatNum = res.data.wechatNum;
				}
				if (res.data.wechatQrcode) {
					this.orderConfirm.wechatQrcode = res.data.wechatQrcode;
					this.codeshow = true;
				}
				this.orderConfirm.tradeCode = res.data.tradeCode;
				this.orderConfirm.orderConfirmShow = true;
				if (res.data.bankAddr) {
					this.orderConfirm.bankAddr = res.data.bankAddr;
				}
				if (res.data.bankName) {
					this.orderConfirm.bankName = res.data.bankName;
				}
				if (res.data.bankNum) {
					this.orderConfirm.bankNum = res.data.bankNum;
				}
				clearInterval(this.timer);
				this.countdown = '00:00';
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text600'))
			}   else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getOrderInfoFunftion() {
			uni.showLoading({ title: this.$t('orderPayment.text29'), mask: true });
			let res = await api.getOrderInfoHttp({
				orderId: this.orderId, // 订单号id
				type: '1' //订单类型，1：购买订单；2：出售订单
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.orderPaydata = res.data;
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//设置截止时间
				var str = this.orderPaydata.createTime.replace(/-/g, '/');
				var endDate = new Date(str);
				var b = 15; //倒计时分钟数
				endDate.setMinutes(endDate.getMinutes() + b, endDate.getSeconds(), 0);
				var end = endDate.getTime();
				//时间差
				var leftTime = end - now;
				this.time = Math.floor(leftTime / 1000);
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text600'))
			}   else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		showtime() {
			this.time = this.time - 1;
			var minute = parseInt(this.time / 60);
			var second = parseInt(this.time % 60);
			this.countdown = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
			if (this.time < 2) {
				clearInterval(this.timer);
				this.countdown = '00:00';
				this.cancelOrderFunftion();
			}
		},
		async paySuccessFunftion() {
			uni.showLoading({ title: this.$t('orderPayment.text29'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.paySuccessHttp({
				tradeCode: this.orderPaydata.tradeCode,// 交易订单号
				lang:system_info.language,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text31'));
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/theOrder/order'
					});
				}, 1000);
				clearInterval(this.timer);
				this.countdown = '00:00';
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderPayment.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		copyTextFun(copy) {
			let tips = "已成功复制到剪贴板";
			//判断是安卓还是ios
			if(typeof(plus) === "undefined")
				return;
			if (uni.getSystemInfoSync().platform === 'android') {
				//安卓
				var context = plus.android.importClass("android.content.Context");
				var main = plus.android.runtimeMainActivity();
				var clip = main.getSystemService(context.CLIPBOARD_SERVICE);
				plus.android.invoke(clip, "setText", copy);
			} else {
				//ios
				var UIPasteboard = plus.ios.importClass("UIPasteboard");
				var generalPasteboard = UIPasteboard.generalPasteboard();
				//设置/获取文本内容:
				generalPasteboard.plusCallMethod({
					setValue: copy,
					forPasteboardType: "public.utf8-plain-text"
				});
				generalPasteboard.plusCallMethod({
					valueForPasteboardType: "public.utf8-plain-text"
				});
			}
			uni.showToast({ title: tips, icon: 'none' });
		}
	}
};
</script>

<style lang="scss" scoped>
.arrowright {
	margin-left: 10rpx;
}
.pay-title {
	font-size: 40rpx;
	font-weight: bold;
}
.pay-time {
	margin-top: 10rpx;
	color: #828587;
	text {
		color: rgb(6, 181, 114);
		margin-left: 10rpx;
	}
}
/deep/ .user-header uni-image {
	width: 120rpx !important;
	height: 120rpx !important;
	border-radius: 50%;
	background-color: #eeeeee;
}
.header-pay {
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
	margin-top: 35rpx;
}
.assest_icon3 {
	width: 45rpx;
	height: 45rpx;
	margin-right: 10rpx;
}
.pay-tit {
	font-size: 34rpx;
	font-weight: bold;
}
.connet-pay {
	padding: 30rpx 0;
}
.pay-list {
	margin: 30rpx 0;
}
.pay-list text {
	font-size: 26rpx;
	line-height: 32rpx;
}
.pay-list text:last-child.pay-price {
	color: rgb(6, 181, 114);
	font-weight: bold;
}
.tabbar3 {
	width: 32rpx;
	height: 32rpx;
	margin-left: 10rpx;
}
.pay_icon2 {
	width: 32rpx;
	height: 32rpx;
	margin-right: 10rpx;
}
.borderBottom {
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
}
.footer-button {
	border-top: 1px solid #eee;
	padding: 30rpx;
	background: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10;
}
.order-del {
	width: 37%;
	height: 64rpx;
	border: 1px solid #999;
	text-align: center;
	line-height: 62rpx;
	border-radius: 15rpx;
}
.order-pay {
	border-radius: 15rpx;
	width: 60%;
	height: 64rpx;
	text-align: center;
	line-height: 62rpx;
	background: rgb(6, 181, 114);
	color: #fff;
}
.user-header {
	width: 120rpx !important;
	height: 120rpx !important;
	border-radius: 50%;
	background-color: #f0faf9;
	text-align: center;
	line-height: 120rpx;
	.pay-success-icon {
		font-size: 60rpx !important;
		color: #06b572 !important;
	}
}
.copy-text {
	margin-left: 10rpx;
	color: blue;
}
.bg-img {
	text-align: center;
}
</style>
