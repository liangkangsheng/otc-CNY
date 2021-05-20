<template>
	<view class="container">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('item.text35') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
		</view>
		<view class="details_top">
			<view class="imgcon">
				<img :src="itemObj.img" class="img">
			</view>
			<p class="title">{{itemObj.title}}</p>
			<ul>
				<li class="li-first">
					<view class="inner">
						<p>
							<span class="span2">{{$t('item.text6')}}</span>
							<span class="span1">￥<i>{{itemObj.total}}</i>{{$t('item.text7')}}</span>
						</p>
						<p>
							<span class="span2">{{$t('item.text13')}}</span>
							<span class="span1"><i>{{getEveryDay(itemObj.rate, itemObj.min)}}</i>{{$t('item.text14')}}</span>
						</p>
						<p>
							<span class="span2">{{$t('item.text15')}}</span>
							<span class="span1"><i>{{itemObj.itemDay}}</i>{{$t('item.text10')}}</span>
						</p>
					</view>
				</li>
				<li>{{$t('item.text16')}}：{{itemObj.typeName}}</li>
				<li>{{$t('item.text19')}}：<span style="color:red;">{{itemObj.min}}</span>{{$t('item.text20')}}</li>
				<li>{{$t('item.text17')}}：{{itemObj.guarantee}}</li>
				<li class="progress">{{$t('item.text18')}}
					<div class="progressBox1">
						<div class="progress1" :style="pperStr"></div>
						<span class="progressNum1" :style="setPosition(pper)">{{pper}}%</span>
					</div>
				</li>
			</ul>
		</view>
		<view class="details_foot">
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
			<div class="explain_outer">
				<table class="table" v-if="tabIndex == 0">
					<tbody>
						<tr>
							<td><span>{{$t('item.text21')}}</span></td>
							<td>{{itemObj.title}}</td>
						</tr>
						<tr>
							<td>{{$t('item.text23')}}：</td>
							<td><i>{{itemObj.total}}万</i>元人民币；</td>
						</tr>
						<tr>
							<td>{{$t('item.text24')}}：</td>
							<td><i>按每日{{itemObj.rate}}%的收益（保本保息）</i></td>
						</tr>
						<tr>
							<td>{{$t('item.text25')}}：</td>
							<td><i>最低起投{{itemObj.min}}元</i>（限买1份）</td>
						</tr>
						<tr>
							<td>{{$t('item.text26')}}：</td>
							<td><i>{{itemObj.itemDay}}个</i>自然日；</td>
						</tr>
						<tr>
							<td>{{$t('item.text27')}}：</td>
							<td>
								<i>每天分红{{getEveryDay(itemObj.rate, itemObj.min)}}元</i>*<i>{{itemObj.itemDay}}天</i>=总收益<i>
									{{getEveryDay(itemObj.rate, itemObj.min) * itemObj.itemDay }}</i>元；
							</td>
						</tr>
						<tr>
							<td>{{$t('item.text28')}}：</td>
							<td>每日返息,到期还本 节假日照常收益；</td>
						</tr>
						<tr>
							<td>{{$t('item.text29')}}：</td>
							<td>当天15点前投资，当天15点系统自动计息结算收益（例如在15:00成功投资，则在下个自然日15:00收到分红），到期系统将当日分红和产品本金一起返还到您的会员账号中；</td>
						</tr>
						<tr>
							<td>{{$t('item.text30')}}：</td>
							<td>投资期间只要产品未投满，投资者均可自由投资；</td>
						</tr>
						<!--<tr>
		                    <td>资金用途：</td>
		                    <td>新手版票体验项目</td>
		                </tr>-->
						<tr>
							<td>{{$t('item.text31')}}：</td>
							<td>{{itemObj.guarantee}}对平台上的每一笔投资提供<i>100%本息保障</i>，平台设立风险备用金，对本金承诺全额垫付；</td>
						</tr>
						<tr>
							<td>{{$t('item.text32')}}：</td>
							<td>本项目筹集资金<i>{{itemObj.total}}万</i>元人民币，投资本项目（按每日分红<i>{{getEveryDay(itemObj.rate, itemObj.min)}}元/天</i>）项目周期为<i>{{itemObj.itemDay}}</i>个自然日，所筹集资金用于该项目直投运作，作为投资者分红固定且无任何风险，所操作一切风险都由公司与担保公司一律承担，投资者不需要承担任何风险。
							</td>
						</tr>
						<tr>
							<td>{{$t('item.text33')}}：</td>
							<td>在会员中心最下面(邀请好友)转发到您朋友圈里,只要您朋友通过邀请二维码注册的为一级,充值并成功投资您就可以得到按投资金额<i>{{itemObj.invest1}}</i>的奖励,，这个会员又推荐的会员为二级你就有<i>{{itemObj.invest2}}</i>，注册成功，系统自动绑定
								！</td>
						</tr>
					</tbody>
				</table>
				<div class="data"  v-if="tabIndex == 1">
					<p class="data-title"><span>{{itemObj.title}}</span></p>
					<p class="data-desc">
						<span style="font-size: 14px;">本项目为XXX会员新注册专用项目，项目仅限投{{itemObj.num}}次，起投金额{{itemObj.min}}元，加上新注册赠送的现金券58元，本金共59元，日利率{{itemObj.rate}}%，每日返息{{getEveryDay(itemObj.rate, itemObj.min)}}元，到期可取本金！</span>
					</p>
					<p class="data-desc">
						<span style="font-size: 14px;">注：特别提醒！系统显示的项目合同本金只显示1元的本金（
						<span style="font-size: 14px; text-indent: 32px;">现金券的58元不会显示</span>），但您收到的每日利息仍然是按59元*1.7%=1.03元结息的哦，而且项目到期后您可取的本金仍为1+58=59元哦！
						</span>
					</p>
					<p class="data-desc">
						<span style="font-family: 黑体, SimHei; font-size: 14px;">※注：本项目为活动项目，不可与其他任何活动叠加!</span>
					</p>
				</div>
			</div>
		</view>
		<view class="header-nbsp"></view>
		<view class="invest_btn">
			<a href="javascript:;" @click="goInvest(itemObj.id)">{{$t('item.text8')}}</a>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js';
	export default {
		data() {
			return {
				itemId: '',
				itemObj: {},
				tabIndex: 0,
				tabBars: [
					{
						name: this.$t('item.text11'),
						id: '1'
					},
					{
						name: this.$t('item.text12'),
						id: '2'
					}
				],
				pper: '',
				pperStr: ''
			}
		},
		onLoad(option) {
			this.itemId = option.id
			this.getItemDetailFuntion(option.id);
		},
		onPullDownRefresh() {
			let _this = this;
			setTimeout(() => {
				_this.getItemDetailFuntion(_this.itemId);
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			navBack() {
				uni.navigateTo({
					url: "/pages/item/list"
				});
			},
			getPercent(per) {
				let pper = per;
				let _this = this;
				let count = Math.random() * 1000;
				_this.pper = pper.toFixed(2); // 首次加载
				_this.pperStr = "width:" + pper + "%"; // 首次加载
				let time = setInterval(function(){
					pper = pper + 0.01;
					if(isNaN(pper)){
						return;
					}
					if(+pper == 100) {
						clearInterval(time);
					}
					_this.pper = pper.toFixed(2); // 定时加载
					_this.pperStr = "width:" + pper + "%"; // 定时加载
				}, count);
			},
			setPosition(per) {
				let p = per/3;
				return "left: " + p + "%"
			},
			getEveryDay(rate, min) { // 每日分红
				let res = 0;
				let raten = +rate;
				let minn = +min;
				if(minn == 1){
					res = ((59 * raten) / 100).toFixed(2);
				}else{
					res = ((minn * raten) / 100).toFixed(2);
				}
				return res;
			},
			async getItemDetailFuntion(id) {
				let res = await api.getItemDetailHttp({
					itemId: id
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.itemObj = res.data;
					this.getPercent(this.itemObj.percent);
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
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
			},
			goInvest(id){
				uni.navigateTo({
					url: "/pages/item/invert?id=" + id
				});
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
	.page-top-head{
		margin: 1px -10px 0;
		.uni-icons{
			margin-left: 20rpx;
		}
	}
	.container{
		font-size: 32rpx;
		margin: 0 20rpx;
	}
	.details_top {
		li {
		    border-top: 2rpx solid #ddd;
		    padding: 10rpx 0;
		    font-size: 30rpx;
		    color: #333;
		    line-height: 60rpx;
		}
		.img {
			width: 100%;
		}
		.title {
			font-size: 32rpx;
			padding: 20rpx 0;
			border-bottom: 2rpx solid #ddd;
		}
		.li-first {
			border-bottom: 2rpx solid #DDDDDD;
		}
		.inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 10rpx 0;
			padding: 20rpx 40rpx;
			text-align: center;
			background-color: #f5f5f5;
			.span2 {
				display: block;
				line-height: 60rpx;
				font-size: 30rpx;
				color: #999;
				text-align: center;
			}
			.span1 {
			    display: block;
			    line-height: 60rpx;
			    color: #000;
			    font-size: 28rpx;
			    text-align: center;
			}
			i {
			    font-style: normal;
			    color: #f54f4f;
			    font-size: 36rpx;
			}
		}
		.progress {
		}
		.progressBox1 {
			background: #ccc;
			width: 100%;
			height: 40rpx;
			border-radius: 4rpx;
			margin: 20rpx 0;
			position: relative;
			.progress1 {
			    height: 100%;
			    background: #f54f4f;
			    border-radius: 10rpx;
			}
			.progressNum1 {
			    position: absolute;
			    color: #fff;
			    font-size: 24rpx;
			    top: -10rpx;
			}
		}
	}
	.details_foot {
		padding-top: 40rpx;
		border-top: 2rpx solid #ddd;
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
	}
	.explain_outer {
		padding: 20rpx 0rpx;
		.table {
			display: table;
		    border-collapse: collapse;
		    width: 100%;
		    border-top: 1px solid #000;
		    border-left: 1px solid #000;
			tr td:first-child {
			    width: 30%;
			    text-align: center;
			}
			td {
			    padding: 16rpx 20rpx;
			    line-height: 40rpx;
			    color: #666;
			    font-size: 30rpx;
			    border-right: 1px solid #000;
			    border-bottom: 1px solid #000;
			    vertical-align: middle;
				span {
				    color: #000;
				    font-size: 28rpx;
				}
				i {
				    font-style: normal;
				    font-size: 28rpx;
				    color: red;
				}
			}
		}
		.data {
			.data-title {
				font-size: 48rpx;
				padding: 40rpx;
				border-bottom: 2rpx solid #DDDDDD;
			}
			.data-desc {
				margin-top: 10rpx;
				text-align: left; 
				text-indent: 40rpx;
			}
		}
	}
	.header-nbsp {
		width: 100%;
		height: 100rpx;
	}
	.invest_btn {
	    position: fixed;
	    z-index: 2000;
	    bottom: 0;
	    width: 100%;
	    height: 100rpx;
	    background: #fff;
	    border-top: 2rpx solid #ddd;
		margin: 0 -10px;
		a {
		    display: block;
		    width: 90%;
		    height: 70rpx;
		    margin: 16rpx auto;
		    background: #385fec;
		    color: #fff;
		    font-size: 30rpx;
		    text-align: center;
		    line-height: 70rpx;
		    border-radius: 10rpx;
			text-decoration: none;
			cursor: pointer;
			outline: none;
		}
	}
</style>
