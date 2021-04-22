<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text11 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="top overflow">
			<view class="depTit">{{ i18n.text1 }}（USDT）</view>
			<view class="pricedep overflow">
				<view class="fl pay">{{ marginCount }}</view>
				<view class="fr buttondep" @click="toggleMessage('success')" v-show="show">{{ i18n.text0013 }}</view>
			</view>
		</view>
		<!-- 中部弹框 -->
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog :type="msgType" :title="i18n.text15" :content="i18n.text16" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<view class="border"></view>
		<view class="depBottom">
			<view class="titBottom">{{ i18n.text2 }}</view>
			<view class="cont overflow " :class="type" @click="toggle">
				<view class="titIcon" v-show="!titIcon"><uni-icons type="checkmarkempty" size="18" class="form-clear-icon checkmarkempty" color="#fff"></uni-icons></view>
				<view class="overflow">
					<view class="fl" style="color:#06b572;">{{ i18n.text3 }}</view>
					<view class="fl praise"><uni-icons type="hand-thumbsup-filled" size="16" class="form-clear-icon" color="#fff"></uni-icons></view>
				</view>
				<view class="grop"></view>
				<view class="fl pays">
					<strong>{{ moeny || '0' }}</strong>
					USDT
				</view>
			</view>
		</view>
		<view class="btn-area" @click="button">{{ i18n.text4 }}</view>

		<view class="depSize overflow">
			<view class="ul">{{ i18n.text01 }}</view>
			<view class="li">
				{{ i18n.text02 }}
				<br />
				{{ i18n.text03 }}
				<br />
				{{ i18n.text04 }}
				<br />
				{{ i18n.text05 }}
				<br />
				{{ i18n.text06 }}
				<br />
				{{ i18n.text07 }}
				<br />
				{{ i18n.text08 }}
				<br />
				{{ i18n.text09 }}
				<br />
				{{ i18n.text010 }}
				<br />
				{{ i18n.text011 }}
				<br />
				{{ i18n.text012 }}
				<br />
				{{ i18n.text013 }}
				<br />
				{{ i18n.text014 }}
				<br />

				{{ i18n.text015 }}
				<br />
				{{ i18n.text016 }}
				<br />
				{{ i18n.text017 }}
				<br />
				{{ i18n.text018 }}
				<br />
				{{ i18n.text019 }}
				<br />
				{{ i18n.text020 }}
				<br />

				{{ i18n.text021 }}
				<br />
				{{ i18n.text022 }}
				<br />
				{{ i18n.text023 }}
				<br />
				{{ i18n.text024 }}
				<br />
				{{ i18n.text025 }}
				<br />
				{{ i18n.text026 }}
				<br />
				{{ i18n.text027 }}
				<br />
				{{ i18n.text028 }}
				<br />
				{{ i18n.text029 }}
				<br />
				{{ i18n.text030 }}
				<br />
				{{ i18n.text031 }}
				<br />

				{{ i18n.text032 }}
				<br />
				{{ i18n.text033 }}
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			moeny: '',
			type: '',
			titIcon: true,
			marginCount:"",
			show:false,
			msgType:"success"
		};
	},
	computed: {
		i18n() {
			return this.$t('Deposit');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('Deposit.text11')
		});
		if(option.marginCount == ""){
			this.marginCount = "0"
			this.show=false
		}else{
			this.show=true
			this.marginCount = option.marginCount
		}
		this.getSysConfigListFunction()
	},
	mounted() {},
	methods: {
		async getSysConfigListFunction(){
			uni.showLoading({ title: this.$t('Deposit.text13'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.getSysConfigListHttp({
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.moeny = res.data[1].configVal
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Deposit.text600'))
			}  else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		async depositButton(){
			uni.showLoading({ title: this.$t('Deposit.text13'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.returnMarginInfoHttp({
				lang:system_info.language,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('Deposit.text0012'));
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/myUser/myUser',
					});
				}, 1000);
			}   else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Deposit.text600'))
			}  else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		navBack() {
			uni.navigateBack();
		},
		toggle() {
			var that = this;
			var type = that.type === 'DepActive' ? '' : 'DepActive';
			that.type = type;
			if (type == 'DepActive') {
				this.titIcon = false;
			} else {
				this.titIcon = true;
			}
		},
		async handleMarginInfoFunction() {},
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
			this.depositButton()
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
		async button() {
			if (this.titIcon == false) {
				uni.showLoading({ title: this.$t('Deposit.text13'), mask: true });
				const system_info = GET_STORAGE('system_info');
				let res = await api.handleMarginInfoHttp({
					lang:system_info.language,
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('Deposit.text12'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/myUser/myUser',
						});
					}, 1000);
				}  else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('Deposit.text600'))
				}  else {
					uni.hideLoading();
					this.$alert(res.errorMessage);
				}
			} else {
				this.$alert(this.$t('Deposit.text14'));
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.checkmarkempty {
	top: 12rpx;
	position: absolute;
	left: 6rpx;
}
.border {
	width: 100%;
	height: 20rpx;
	background: #f5f5f5;
}
strong {
	color: $uni-base-color-06b572;
}
.top,
.depBottom {
	padding: 20px 15px;
	background: #fff;
}
.depBottom {
	margin-bottom: 20px;
}
.top {
	margin-bottom: 15px;
}
.btn-area {
	width: 240rpx;
	font-size: 28rpx;
	color: #fff;
	line-height: 90rpx;
	background: $uni-base-color-06b572;
	text-align: center;
	border-radius: 100rpx;
	margin: 18rpx auto;
}
.depTit {
	font-size: 28rpx;
	margin-bottom: 10rpx;
}
.pay {
	font-size: 48rpx;
	font-weight: bold;
}
.overflow {
	overflow: hidden;
}
.pays {
	font-size: 28rpx;
	font-weight: bold;
}
.buttondep {
	border: 1px solid $uni-base-color-06b572;
	font-size: 24rpx;
	padding: 5px 15px;
	border-radius: 100rpx;
	color: $uni-base-color-06b572;
}
.titBottom {
	font-size: 28rpx;
	margin-bottom: 10rpx;
	font-weight: bold;
}
.cont {
	width: 240rpx;
	border: 1px solid #f5f5f5;
	border-radius: 5px;
	font-size: 28rpx;
	position: relative;
	padding: 10px 8px;
}
.titIcon {
	width: 60rpx;
	height: 45rpx;
	position: absolute;
	top: -18rpx;
	right: -25rpx;
	background: $uni-base-color-06b572;
	border-radius: 50%;
}
.titIcons {
	position: absolute;
	top: 6rpx;
	right: 28rpx;
}
.praise {
	text-align: center;
	width: 56rpx;
	margin-top: 5rpx;
	line-height: 28rpx;
	margin-left: 10rpx;
	height: 32rpx;
	background: linear-gradient(to right, #f8cf1c, #f8aa1c); /* 标准的语法 */
	border-radius: 100rpx;
}
.grop {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 100rpx;
}
.depSize .ul,
.depSize .li {
	padding: 0 30rpx;
	font-size: 28rpx;
}
.depSize .li {
	padding-bottom: 30rpx;
}
.depSize .ul {
	margin: 20rpx 0;
}
.depSize .li {
	color: #999;
	line-height: 42rpx;
}
.DepActive {
	border: 1px solid $uni-base-color-06b572;
	background: #f4feff;
}
</style>
