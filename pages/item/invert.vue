<template>
	<view class="container">
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left">
				<uni-icons type="arrowleft" size="24" style="color: #000;" @click="goItemDetail(itemId)"></uni-icons>
			</view>
			<view class="box-header">
				<view class="head-title">{{ $t('item.text36') }}</view>
			</view>
			<view class="box-header option">
				<view class="head-title"></view>
			</view>
		</view>
		<view class="form_outer">
			<form method="post" id="ifr">
				<view class="form_top">
					<p>
						<span class="span_tit" id="acctName">{{ $t('item.text37') }}</span>
						<span class="span_num" id="acctAmt">{{walletBalance}}</span>
					</p>
					<p>
						<span class="span_tit">{{ $t('item.text38') }}</span>
						<span class="span_num">￥ <strong id="maxNum">{{itemObj.total * (100 - itemObj.percent) / 100 * 10000}}</strong>{{ $t('item.text20') }}</span>
					</p>
				</view>
				<ul>
					<li>
						<label>{{ $t('item.text48') }}</label><span><em class="start">{{unitPrice}}</em>{{ $t('item.text49') }}</span>
					</li>
					<li>
						<label>{{ $t('item.text19') }}</label><span>￥<em class="start">{{itemObj.min}}</em>{{ $t('item.text20') }}</span>
					</li>
					<li>
						<label>{{ $t('item.text53') }}</label><span>￥<em class="start">{{itemObj.max}}</em>{{ $t('item.text20') }}</span>
					</li>
					<li>
						<label>{{ $t('item.text39') }}</label><span>{{ $t('item.text41') }}<em class="time">{{fankuanway}}</em>{{ $t('item.text40') }}</span>
					</li>
					<li>
						<label>{{ $t('item.text25') }}</label>
						<view class="caculate">
							<i class="btn_reduce" @click="subsBtn()">−</i>
							<input type="number" v-model="min"  @input="inputChange($event)">
							<i class="btn_add" @click="plusBtn()">+</i>
						</view>
					</li>
					<li>
						<span class="add">{{ $t('item.text42') }}
							<em class="time" id="minNum">{{itemObj.min}}</em>{{ $t('item.text20') }}，{{ $t('item.text43') }}
							<em class="time" id="addNum">100</em>{{ $t('item.text20') }}
						</span>
					</li>
					<!-- <li>
						<label>{{ $t('item.text44') }}：</label><br>
						<select name="ratecoupon" id="ratecoupon" onchange="checkRateCoupon();">
							<option value="0" title="0">{{ $t('item.text46') }}</option>
						</select>
					</li>
					<li>
						<label>{{ $t('item.text45') }}：</label><br>
						<select name="cashcoupon" id="cashcoupon" onchange="checkCashCoupon();">
							<option value="0" title="0">{{ $t('item.text47') }}</option>
						</select>
					</li> -->
				</ul>
				<a class="input_btn" @click="invert()">{{ $t('item.text36') }}</a>
			</form>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js';
	export default {
		data() {
			return {
				itemId: '',
				convertMoney: 0,
				walletBalance: 0,
				itemObj: {},
				fankuanway: '',
				min: 0,
				max: 0,
				unitPrice: 0
			}
		},
		onLoad(option) {
			this.itemId = option.id
			this.getMyAssetsItemFunction();
			this.getItemDetailFuntion(option.id);
			this.getUSDTPrice();
		},
		onPullDownRefresh() {
			let _this = this;
			setTimeout(() => {
				_this.getMyAssetsItemFunction();
				_this.getItemDetailFuntion(this.itemId);
				_this.getUSDTPrice();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			goItemDetail(id) {
				uni.navigateTo({
					url: "/pages/item/detail?id=" + id
				})
			},
			plusBtn(){
				if(this.min >= this.itemObj.max) {
					this.min = this.itemObj.max;
				} else {
					this.min = this.min + 100;
				}
			},
			subsBtn(){
				if(this.min <= this.itemObj.min) {
					this.min = this.itemObj.min;
				} else {
					this.min = this.min - 100;
				}
			},
			inputChange(e) {
				let value = +e.target.value
				if(value <= this.itemObj.min) {
					this.min = this.itemObj.min;
				} else if(value >= this.itemObj.max) {
					this.min = this.itemObj.max;
				} else {
					this.min = value;
				}
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
			async getItemDetailFuntion(id) {
				let res = await api.getItemDetailHttp({
					itemId: id
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.itemObj = res.data;
					this.min = +this.itemObj.min;
					this.max = +this.itemObj.max;
					let type = +this.itemObj.type;
					if(type == 1){
						this.fankuanway = "24小时";
					} else if(type == 2){
						this.fankuanway = "7天";
					} else if(type == 3){
						this.fankuanway = "1个月";
					} else if(type == 4){
						this.fankuanway = "24小时";
					} else if(type == 5){
						this.fankuanway = "期";
					} else if(type == 6){
						this.fankuanway = "60分钟";
					}
					return Promise.resolve(res.data);
				} else if (res.code === "500") {
					uni.hideLoading();
					this.$alert(this.$t('order.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({
						title: res.errorMessage,
						icon: 'none'
					});
					return Promise.resolve(0);
				}
			},
			async getUSDTPrice() {
				uni.showLoading({ title: this.$t('index.text27'), mask: true });
				let res = await api.getUSDTPrice({});
				if (res.code === '000') {
					uni.hideLoading();
					this.unitPrice = res.data.usdtPrice;
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('index.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			},
			async invert() {
				let money = this.min / this.unitPrice;
				if(money > this.walletBalance) {
					this.$alert(this.$t('item.text50'));
					return;
				}
				if(this.min > this.itemObj.max){
					this.$alert(this.$t('item.text50'));
					return;
				}
				if(this.min < this.itemObj.min){
					this.$alert(this.$t('item.text50'));
					return;
				}
				uni.showLoading({ title: this.$t('index.text27'), mask: true });
				let res = await api.investHttp({
				  "coinSymbol": "USDT",
				  "itemtype": this.itemObj.itemtype,
				  "lang": "cn",
				  "money": money,
				  "pid": this.itemId
				});
				if (res.code === '000') {
					uni.hideLoading();
					return Promise.resolve(res.data);
				} else if (res.code === "500") {
					uni.hideLoading();
					this.$alert(this.$t('order.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({
						title: res.errorMessage,
						icon: 'none'
					});
					return Promise.resolve(0);
				}
			}
		}
	}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	-webkit-tap-highlight-color: transparent;
}
ul, li {
	list-style: none;
}
i, em {
    font-style: normal;
}
.container {
	margin: 0 20rpx;
}
.form_outer {
    width: 100%;
    background: #fafafa;
    height: 100%;
    box-sizing: border-box;
	.form_top {
	    width: 100%;
	    font-size: 0;
	    margin: 0 auto;
	    border-radius: 10rpx;
	    padding: 14rpx 0 24rpx 0;
	    background: #385fec;
		p {
		    width: 50%;
		    text-align: center;
		    display: inline-block;
			.span_tit {
			    color: #fff;
			    font-size: 24rpx;
			    display: block;
			    line-height: 60rpx;
			}
			.span_num {
			    color: #fff;
			    font-size: 32rpx;
			    display: block;
			    line-height: 60rpx;
			}
		}
	}
	ul li {
	    border-bottom: 2rpx solid #e5e5e5;
	    padding: 14rpx 30rpx;
	    line-height: 50rpx;
	    display: -webkit-flex;
	    display: flex;
	    justify-content: space-between;
		label {
		    font-size: 30rpx;
		    color: #000;
		}
		span {
		    font-size: 30rpx;
		    color: #000;
		    margin-right: 0;
		}
		.time {
		    color: blue;
		    font-weight: bold;
		}
		.add {
		    font-size: 24rpx;
		    color: #666;
		}
		select {
		    background: #fff;
		    width: 80%;
		    border: 0;
		    min-height: 40rpx;
		    font-size: 28rpx;
		}
	}
	.caculate {
		margin-top: 50rpx;
	    display: flex;
		i {
		    font-size: 32rpx;
		    font-weight: bold;
		    display: inline-block;
		    width: 40rpx;
		    height: 40rpx;
		    color: #333;
		    text-align: center;
		    line-height: 40rpx;
		    border: 2rpx solid #333;
		    border-radius: 50%;
		}
		input {
		    font-size: 32rpx;
		    color: #000;
		    line-height: 50rpx;
		    width: 200rpx;
		    text-align: center;
		    background: #fafafa;
		    border: 0;
		}
	}
	.input_btn {
	    display: block;
	    background-color: #385fec;
	    text-align: center;
	    height: 70rpx;
	    line-height: 70rpx;
	    font-size: 30rpx;
	    border-radius: 10rpx;
	    width: 80%;
	    color: #fff;
	    border: 2rpx solid #385fec;
	    margin: 30rpx auto;
		outline: none;
	}
}
</style>
