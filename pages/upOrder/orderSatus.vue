<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('orderSatus.text31') }}</view>
			</view>
			<view class="box-header" style="color:#06b572" @click="phoneButton">
				<view class="right-title" style="color:#06b572" @click="phoneButton">{{ $t('orderSatus.text032') }}</view>
			</view>
		</view>

		<view class="content">
			<view class="header-pay" v-if="urlLink == 2">
				<view class="dropdown-item-header height" v-show="isPay">
					<view class="pull-left">
						<view class="pay-title">{{ $t('orderSatus.text1') }}</view>
						<view class="pay-time">{{ $t('orderSatus.text2') }}</view>
					</view>
					<view class="pull-right user-header back-F3F7FF" style="position: relative;">
						<text x="100" y="110" text-anchor="middle" :font-size="fontSize + 5" style="color: #06b572;">{{ countDown || '00:00' }}</text>
						<svg viewBox="0 0 200 200" :width="width" :height="width" style="position: absolute;top: 0;left: 0;">
							<circle cx="100" cy="100" :r="100 - border / 2" fill="none" opacity="0.4" :stroke="color" :stroke-width="border" />
							<circle
								cx="100"
								cy="100"
								:r="100 - border / 2"
								fill="none"
								transform="rotate(270,100,100)"
								:stroke="color"
								:stroke-width="border"
								stroke-linecap="round"
								:stroke-dasharray="dashLen"
								:stroke-dashoffset="dashOffset"
								style="transition: stroke-dashoffset 0.4s"
							/>
						</svg>
					</view>
				</view>
				<view class="dropdown-item-header height" v-show="!isPay">
					<view class="pull-left">
						<view class="pay-title">{{ $t('orderSatus.text3') }}</view>
						<view class="pay-time">
							{{ $t('orderSatus.text4') }}？
							<text @click="telButton">{{ $t('orderSatus.text5') }}</text>
						</view>
					</view>
					<view class="pull-right user-header back-F3F7FF">
						<view class="payName pay-success-icon">{{ payName }}</view>
					</view>
				</view>
			</view>
			<view class="header-pay" v-if="urlLink == 0">
				<view class="pull-left" v-if="type != 2">
					<view class="pay-title">{{ $t('orderSatus.text6') }}</view>
					<view class="pay-time">{{ $t('orderSatus.text7') }}</view>
				</view>
				<view class="pull-left" v-if="type == 2">
					<view class="pay-title">{{ $t('orderSatus.text8') }}</view>
					<view class="pay-time">
						{{ $t('orderSatus.text9') }}
						<text>{{ orderPaydata.saleCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-right user-header back-F3F7FF">
					<view class="payName pay-success-icon">{{ payName }}</view>
				</view>
			</view>
			<view class="header-pay" v-if="urlLink == 1">
				<view class="pull-left">
					<view class="pay-title">{{ $t('orderSatus.text10') }}</view>
					<view class="pay-time">
						{{ $t('orderSatus.text11') }}
						<text>{{ orderPaydata.saleCount }}</text>
						USDT
					</view>
				</view>
				<view class="pull-right user-header"><uni-icons type="checkmarkempty" size="16" class="pay-success-icon"></uni-icons></view>
			</view>
			<view class="connet-pay">
				<view class="height">
					<image src="../../static/icon/assest_icon3.png" mode="" class="assest_icon3 pull-left"></image>
					<view class="pull-left pay-tit">{{ $t('orderSatus.text12') }}USDT</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text13') }}</text>
					<text class="pull-right pay-price">￥ {{ orderPaydata.saleAmount }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text14') }}</text>
					<text class="pull-right">￥ {{ orderPaydata.price }}</text>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text15') }}</text>
					<text class="pull-right">{{ orderPaydata.saleCount }} USDT</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text16') }}</text>
					<image src="../../static/icon/order_icon.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.tradeCode }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text17') }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<image src="../../static/icon/level_icon2.png" mode="" class="tabbar3 pull-right"></image>
					<text class="pull-right">{{ orderPaydata.buyUserNickName }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text18') }}</text>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<text class="pull-right">{{ orderPaydata.buyUserRealName }}</text>
				</view>
				<view class="pay-list height borderBottom">
					<text class="pull-left">{{ $t('orderSatus.text19') }}</text>
					<view class="pull-right" v-if="orderPaydata.receiveType == '2'">
						<text class="pull-right">{{ $t('orderSatus.text20') }}</text>
						<image src="../../static/icon/pay_icon2.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
					<view class="pull-right" v-if="orderPaydata.receiveType == '1'">
						<text class="pull-right">{{ $t('orderSatus.text21') }}</text>
						<image src="../../static/icon/alipay_icon.png" mode="" class="pay_icon2 pull-right"></image>
					</view>
				</view>
				<view class="pay-list height">
					<text class="pull-left">{{ $t('orderSatus.text020') }}{{ $t('orderSatus.text019') }}</text>
				</view>
			</view>
			<view class="footer-button" v-if="urlLink == 0 && type != 2">
				<button class="button popup__success order-del pull-left">
					<text class="button-text">{{ $t('orderSatus.text22') }}</text>
				</button>
				<button class="order-pay pull-right" @click="toggleMessage('success')">{{ $t('orderSatus.text23') }}</button>
			</view>
			<view class="footer-button" v-if="urlLink == 2">
				<view class="order-pay pull-right" @click="toggleMessage('success')" style="width: 100%;">{{ $t('orderSatus.text23') }}</view>
			</view>
			
			<!-- 中部弹框 -->
			<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
				<uni-popup-dialog
					:type="msgType"
					:title="$t('orderSatus.text24')"
					:content="$t('orderSatus.text25')"
					:before-close="true"
					@confirm="dialogConfirm"
					@close="dialogClose"
				></uni-popup-dialog>
				<view class="radioRroup">
					<checkbox-group name="gender" @change="checkboxGroup">
						<label>
							<checkbox :value="$t('orderSatus.text26')" checked="true" />
							<text>{{ $t('orderSatus.text26') }}</text>
						</label>
					</checkbox-group>
				</view>
			</uni-popup>
			<!-- 底部弹框 -->
			<view class="share">
				<view :class="{ 'share-box': shareState }" @click="handleHiddenShare"></view>
				<view class="share-item" :class="{ 'share-show': shareState }">
					<form @submit="formSubmit" @reset="formReset">
						<view class="list-box-share borderBottom">
							<view class="pull-left">{{ $t('orderSatus.text27') }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ $t('orderSatus.text35') }}</view>
						</view>
						<view class="title-nav">{{ $t('orderSatus.text28') }}</view>
						<view class="form-input borderBottom">
							<view class="con-form">
								<input type="password" v-model="paddWord" :placeholder="$t('orderSatus.text36')" placeholder-class="fomr-pla" name="paddWord" />
							</view>
						</view>
						<view class="height">
							<view class="title-navs pull-left"  @click="isPayPwdButton">{{ isPayPwd == '1' ?  $t('orderSatus.text29'):$t('orderSatus.text37')  }}</view>
						</view>
						<button class="uni-btn-v" form-type="submit">{{ $t('orderSatus.text30') }}</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import api from '@/api/index.js';
import md5 from '../../common/md5.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	props: {
		width: {
			type: Number,
			default: 68
		},
		border: {
			type: Number,
			default: 12
		},
		color: {
			type: String,
			default: '#06b572'
		},
		fontSize: {
			type: Number,
			default: 30
		}
	},
	data() {
		return {
			isPay: true,
			src: '',
			payName: 'L',
			urlLink: 0,
			type: 0,
			shareState: false,
			paddWord: '',
			msgType: 'success',
			// 圆环计时
			timeLeft: '',
			time: 300 * 1000,
			dashLen: (100 - this.border / 2) * Math.PI * 2,
			orderPaydata: {},
			orderId: '',
			phoneTel: '',
			isPayPwd:""
		};
	},
	components: {
		uniIcons,
		uniPopup
	},
	computed: {
		i18n() {
			return this.$t('orderSatus');
		}
	},
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('orderSatus.text31')
		});

		this.urlLink = option.urlLink;
		this.orderId = option.orderId;
		this.type = option.type;
		this.getOrderInfoFunftion();
		this.getUserInfoFunction()
	},
	computed: {
		countDown() {
			let time = this.timeLeft;
			if (time <= 0) {
				return '00:00';
			} else {
				let result = [];
				result.push(Math.floor((time % 3.6e6) / 60000));
				result.push(Math.floor((time % 60000) / 1000));
				return result.map(x => (x < 10 ? '0' + x : x)).join(':');
			}
		},
		dashOffset() {
			return this.dashLen - (this.timeLeft / this.time) * this.dashLen;
		}
	},
	mounted() {
		this.lastDate = Date.now();
		this.interval = setInterval(() => {
			let curDate = Date.now();
			let diff = Math.round((curDate - this.lastDate) / 1000) * 1000;
			this.timeLeft -= diff;
			if (this.timeLeft <= 0) {
				clearInterval(this.interval);
				this.isPay = !this.isPay;
			}
			if (diff >= 1000) {
				this.lastDate = curDate;
			}
		}, 1000);
	},
	methods: {
		isPayPwdButton(){
			uni.navigateTo({
				url: '/pages/myUser/userMoeny?isPayPwd=' + this.isPayPwd
			});
		},
		phoneButton() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: this.orderPaydata.buyUserPhone,
				// 成功回调
				success: res => {},
				// 失败回调
				fail: res => {}
			});
		},
		navBack() {
			uni.navigateBack();
		},
		async getUserInfoFunction() {
			uni.showLoading({ title: this.$t('orderSatus.text32'), mask: true });
			let res = await api.getUserInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.isPayPwd = res.data.isPayPwd;
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderSatus.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getOrderInfoFunftion() {
			uni.showLoading({ title: this.$t('orderSatus.text32'), mask: true });
			let res = await api.getOrderInfoHttp({
				orderId: this.orderId, // 订单号id
				type: '2' //订单类型，1：购买订单；2：出售订单
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.orderPaydata = res.data;
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				var str = this.orderPaydata.createTime.replace(/-/g, '/');
				var endDate = new Date(str);
				var b = 5; //倒计时分钟数
				endDate.setMinutes(endDate.getMinutes() + b, endDate.getSeconds(), 0);
				var end = endDate.getTime();
				//时间差
				var leftTime = end - now;
				this.timeLeft = leftTime;
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderSatus.text600'))
			}  else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		async verifyPayPwdFunftion() {
			let res = await api.verifyPayPwdHttp({
				payPassword: md5(this.paddWord)
			});
			if (res.code === '000') {
				this.shareState = true;
				uni.showLoading({ title: this.$t('orderSatus.text32'), mask: true });

				const system_info = GET_STORAGE('system_info');
				let res = await api.confirmSaleHttp({
					tradeCode: this.orderPaydata.tradeCode, // 交易订单号
					langue: system_info.language
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('orderSatus.text33'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/theOrder/order'
						});
					}, 1000);
				}else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('orderSatus.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('orderSatus.text600'))
			}  else {
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		toggleMessage(type) {
			this.msgType = type;
			switch (type) {
				case 'success':
					this.message = '这是一条成功消息提示';
					break;
			}
			this.shareState = false;
			this.$refs.popupDialog.open();
		},
		change(e) {},
		checkboxGroup(e) {},
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
		async dialogConfirm(done) {
			this.$refs.popupDialog.open();
			this.handleShowShare(0);
			// 需要执行 done 才能关闭对话框
			done();
		},
		telButton() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: this.orderPaydata.buyUserPhone,
				// 成功回调
				success: res => {},
				// 失败回调
				fail: res => {}
			});
		},
		// 显示
		handleShowShare(id) {
			if (id == 0) {
				this.shareState = true;
				
			}
		},
		// 隐藏
		handleHiddenShare() {
			this.shareState = false;
		},
		formSubmit: function(e) {
			//进行表单检查
			var formData = e.detail.value;
			if (formData.paddWord == '') {
				this.$alert(this.$t('orderSatus.text34'));
			} else {
				this.verifyPayPwdFunftion();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
#svgContainer {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 200px;
}
#svgContainer > svg {
	position: absolute;
}
circle {
	-webkit-transition: stroke-dasharray 0.25s;
	transition: stroke-dasharray 0.25s;
}
.radioRroup {
	position: absolute;
	bottom: 55px;
	left: 15px;
	right: 15px;
	font-size: 14px;
	color: #6e6e6e;
}
/deep/ .uni-checkbox-input {
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 1px solid rgb(0, 122, 255);
}
/deep/ uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
	font-size: 14px;
}
.pay-time {
	margin-top: 10rpx;
	color: #828587;
	text {
		color: rgb(6, 181, 114);
		margin-left: 10rpx;
	}
}
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
}
/deep/ .back-F3F7FF {
	background-color: #f3f7ff !important;
}
/deep/ #dialogInput .uni-dialog-content {
	padding: 5px 15px 15px 15px !important;
}
/deep/ .uni-dialog-content {
	padding: 5px 15px 55px 15px !important;
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
.title-nav {
	padding: 30rpx 0;
}
.list-box-share {
	padding: 30rpx 0;
	height: auto;
	overflow: hidden;
}
.cancel {
	font-size: 28rpx;
	color: #8ea0ae;
}
.title-navs {
	color: #007aff;
	font-size: 28rpx;
	padding: 15rpx 0;
}
.uni-btn-v {
	height: 72rpx;
	background-color: #06b572;
	line-height: 72rpx;
	color: #fff;
	margin: 20rpx 0;
	border-radius: 10rpx;
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
	padding: 0 30rpx 30rpx;
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
</style>
