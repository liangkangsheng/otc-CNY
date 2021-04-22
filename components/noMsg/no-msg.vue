<template>
	<view class="no_msg">
		<view class="msg" :style="{ color: color }">
			<text>{{ msg || i18n.text1 }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		msg: {
			type: String,
			default: ''
		},
		color: {
			type: String,
			default: '#ccc'
		}
	},
	computed: {
		i18n() {
			return this.$t('noMsg');
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.no_msg {
	width: 100%;
	height: auto;
	min-height: 50vh;
	display: flex;
	.msg {
		color: #ccc;
		text-align: center;
		font-size: 26rpx;
		margin: auto;
	}
}
</style>
