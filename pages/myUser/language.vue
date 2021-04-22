<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text1 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>

		<view class="content">
			<view class="account-boxs height">
				<radio-group @change="radioChange">
					<view class="account-list height border-bottom" v-for="(item, index) in items" :key="item.value" :id="index">
						<text class="pull-left">{{ item.name }}</text>
						<view class="pull-right"><radio :value="item.value" :checked="index === current" /></view>
					</view>
				</radio-group>
			</view>
		</view>
	</view>
</template>
<script>
import md5 from '../../common/md5.js';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			items: [
				{
					value: 'SimplifiedChinese',
					name: '简体中文'
				},
				{
					value: 'English',
					name: 'English'
				}
			],
			current: 0
		};
	},
	computed: {
		i18n() {
			return this.$t('language');
		}
	},
	components: { uniIcons },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('language.text1')
		});
		const languageNum = GET_STORAGE('language');
		if (languageNum == 0) {
			this.current = 0;
		} else if (languageNum == 1) {
			this.current = 1;
		} else {
			this.current = 2;
		}
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		radioChange(evt) {
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].value === evt.target.value) {
					this.current = i;
					break;
				}
			}
			const system_info = GET_STORAGE('system_info');
			if (this.current == 0) {
				system_info.language = this._i18n.locale = 'cn';
				SET_STORAGE('language', 0);
			}
			else {
				system_info.language = this._i18n.locale = 'en';
				SET_STORAGE('language', 1);
			}
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/home/index'
				});
			}, 1000);
			SET_STORAGE('system_info', system_info);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.account-box {
		margin-top: 35rpx;
	}
}
.arrowright {
	margin-top: 8rpx;
	color: #ccc;
}
.account-size {
	font-size: 28rpx;
	color: #86909a;
}
.trit {
	margin-left: 45rpx;
}
.list-size {
	margin: 75rpx 0 0;
	color: #86909a;
}
.account-sizes {
	font-size: 28rpx;
	color: #06b572;
	margin-left: 10rpx;
}
.press {
	width: 20rpx;
	height: 10rpx;
	width: 100%;
	background: #ddd;
	border-radius: 100rpx;
	margin-top: 20rpx;
	position: relative;
}
.press-box {
	width: 20rpx;
	height: 10rpx;
	background: #06b572;
	border-radius: 100rpx;
	position: absolute;
	top: 0;
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
</style>
