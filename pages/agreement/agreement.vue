<template>
	<view class="main login_reg tabs">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="goHome"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ $t('loginReg.text3') }}</view>
			</view>
			<view class="box-header option"><view class="head-title"></view></view>
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
		return {};
	},
	computed: {
		i18n() {
			return this.$t('loginReg');
		}
	},
	components: { uniIcons },
	onLoad() {},
	computed: {},
	onNavigationBarButtonTap(e) {},
	methods: {
	}
};
</script>

<style lang="scss" scoped>

</style>
