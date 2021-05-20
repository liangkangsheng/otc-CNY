<template>
	<view class="container">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('item.text34') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
		</view>
		<view class="pro_box">
			<view class="tier" v-for="(item, index) in itemList" :key="index"  @click="goItemDetail(item.id)" >
				<div class="img-box">
					<img :src="item.img" style="width:100%;height: 150px;">
				</div>
				<div class="info-box">
					<div class="ib-head" style="font-size: 4.2vw;">
						<span>{{item.title}}</span>&nbsp;&nbsp;
						<span class="i_span bxb-color-icon bxb-color-red">{{$t('item.text1')}}</span>
					</div>
					<div class="ib-body">
						<div class="cl-3">
							<br>
							<span class="red" style="color: #f20;font-weight:bold;">{{item.itemDay}}</span>{{$t('item.text10')}}
						</div>
						<div class="cl-3">
							<p>
								<span class="red"><b>{{getEveryDay(item.rate, item.min)}}</b></span>
							</p>
							<p>{{$t('item.text2')}}</p>
							<p></p>
						</div>
						<div class="cl-3">
							<p>
								<span class="red">{{item.min}}</span>
							</p>
							<p style="color: #000000;">{{$t('item.text3')}}</p>
							<p></p>
						</div>
						<div class="cl-3">
							<p>
								<span class="red">{{item.invest1}}.00%</span>
							</p>
							<p>{{$t('item.text4')}}</p>
							<p></p>
						</div>
					</div>
					<div class="ib-foot">
						<div class="text">
							<p>{{$t('item.text5')}}：<span style="color: #f20;">{{item.rate}}%</span></p>
							<p>{{$t('item.text6')}}：<span style="color: #000000;">{{item.total}}{{$t('item.text7')}}</span></p>
							<p>{{item.typeName}}</p>
						</div>
						<div class="other">
							<button class="now-btn" @click="goItemDetail(item.id)" >{{$t('item.text8')}}</button>
						</div>
					</div>
					<!-- <div class="plan">
						<span>{{$t('item.text9')}}：</span>
						<div class="plan-wrap">
							<div class="plan-con" :style="getPercent(item.percent)"></div>
						</div>
						<span class="plan-text">{{item.percent}}%</span>
					</div> -->
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/index.js';
	export default {
		data() {
			return {
				itemList: [],
				listConfig: {
					noMsg: false, //暂无更多数据
					loadMore: false, //没有更多数据
					loading: false, //正在加载中动画
					pageNo: 1,
					pageSize: 10,
					total: 0
				},
			}
		},
		onShow() {

		},
		onLoad() {
			this.getItemListFuntion();
		},
		onPullDownRefresh() {
			let _this = this;
			setTimeout(() => {
				_this.itemList = [];
				_this.listConfig.pageNo = 1;
				_this.listConfig.loadMore = false;
				_this.getItemListFuntion();
				uni.stopPullDownRefresh();
			}, 300);
		},
		methods: {
			navBack() {
				uni.reLaunch({
					url: '/pages/home/home'
				});
			},
			getPercent(per) {
				return "width:" + per + "%";
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
			goItemDetail(id) {
				uni.navigateTo({
					url: "/pages/item/detail?id=" + id
				})
			},
			async getItemListFuntion() {
				let res = await api.getItemListHttp({
					lang: "cn",
					pageSize: 100,
					pageNo: 1
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.listConfig.total = res.data.total;
					this.itemList.push(...res.data.records);
					if (this.itemList.length == 0) {
						this.listConfig.noMsg = true;
					} else {
						this.listConfig.noMsg = false;
					}
					return Promise.resolve(res.data.total);
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
.page-top-head{
	margin: 1px -10px 0;
	.uni-icons{
		margin-left: 20rpx;
	}
}
.pro_box {
	margin: 20upx;
	.tier {
		text-decoration: none;
	    color: black;
	    margin-bottom: 20rpx;
	    display: inline-block;
	    width: 100%;
	    background-color: #fff;
		.img-box{
		    text-align: center;
			img {
			    max-width: 100%;
			    border-radius: 8px;
			}
		}
		.info-box {
		    padding: 5px;
		    box-sizing: border-box;
		    border: 1px solid #e7e7e7;
		    border-radius: 3px;
		    font-size: 3vw;
			.ib-head {
			    padding: 3px 0px;
			    font-size: 3.8vw;
			    border-bottom: 1px solid #e7e7e7;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
				.i_span {
				    display: inline-block;
				    border-radius: 8px;
				}
				.bxb-color-icon {
				    margin-left: 1px;
				    border: 1px solid;
				    padding: 5px 5px;
				    font-size: 3.1vw;
				    line-height: 1;
				    vertical-align: middle;
				    margin: 10px 5px;
				}
				.bxb-color-red {
				    border-color: #f20;
				    color: #fff;
				    background: #f20;
				}
			}
			.ib-body {
			    display: flex;
			    justify-content: space-between;
			    text-align: center;
			    padding: 0px 4vw;
			    border-bottom: 1px solid #fff;
				.cl-3 {
				    padding: 2.5vw 0px;
					.red {
					    color: #f20;
					    font-size: 5vw;
					}
					p {
					    margin: 1vw 0px;
					}
				}
			}
			.ib-foot {
			    padding: 0px 4vw;
			    display: flex;
			    justify-content: space-between;
				p {
				    color: #ccc6c6;
				    margin: 1vw 0px;
				    font-size: 3.5vw;
				}
				.now-btn {
				    margin-top: 1vw;
				    background: #076cd2;
				    border: none;
				    color: white;
				    font-size: 3.5vw;
				    width: 25vw;
				    height: 8vw;
					line-height: 8vw;
				    border-radius: 1vw;
				}
			}
			.plan {
			    display: flex;
			    font-size: 3vw;
			    padding: 0px 4vw;
			    align-items: center;
			    color: #666666;
			    justify-content: space-between;
				.plan-wrap {
				    width: 50vw;
				    height: 1.3vw;
				    border-radius: 0.45vw;
				    background: #e7e7e7;
					.plan-con {
					    height: 100%;
					    border-radius: 0.45vw;
					    background: #f50404;
					}
				}
				.plan-text {
				    margin-left: 1.5vw;
				    font-size: 3.5vw;
				}
			}
		}
	}
}
</style>
