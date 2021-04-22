<template>
	<view class="uni-popup-share">
		<!-- <view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view> -->
		<view class="uni-share-content">
			<view class="uni-share-content-box">
				<view class="uni-share-content-item" v-for="(item, index) in bottomData" :key="index" @click.stop="select(item, index)">
					<text class="uni-share-text">{{ item.text }}</text>
				</view>
				<view class="back-color"></view>
			</view>
		</view>
		<view class="uni-share-button-box"><button class="uni-share-button" @click="close">取消</button></view>
	</view>
</template>

<script>
export default {
	name: 'UniPopupShare',
	props: {
		title: {
			type: String,
			default: '分享到'
		}
	},
	inject: ['popup'],
	data() {
		return {
			bottomData: [
				{
					text: this.$t('Accredited.text23'),
					// text:"公司",
					id: '1'
				},
				// {
				// 	// text: this.$t('Accredited.text22'),
				// 	text:"工公室",
				// 	id: '2'
				// }
			]
		};
	},
	computed: {
	    i18n () {  
	        return this.$t('Accredited')
	    }  
	},
	created() {},
	methods: {
		/**
		 * 选择内容
		 */
		select(item, index) {
			this.$emit(
				'select',
				{
					item,
					index
				},
				() => {
					this.popup.close();
				}
			);
		},
		/**
		 * 关闭窗口
		 */
		close() {
			this.popup.close();
		}
	}
};
</script>
<style scoped>
.uni-popup-share {
	background-color: #fff;
}

.uni-share-title {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 40px;
}

.uni-share-title-text {
	font-size: 14px;
	color: #666;
}

.uni-share-content {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	justify-content: center;
}

.uni-share-content-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
}
.uni-share-content-item:first-child {
	border-bottom: 1px solid #ddd;
}
.uni-share-content-item:last-child {
	margin-bottom: 30rpx;
}
.uni-share-content-item {
	width: 100%;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	padding: 10px 0;
	align-items: center;
	line-height: 25px;
}

.uni-share-content-item:active {
	background-color: #f5f5f5;
}

.uni-share-image {
	width: 30px;
	height: 30px;
}

.uni-share-text {
	font-size: 14px;
	color: #3b4144;
}

.uni-share-button-box {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	padding: 10px 15px;
}

.uni-share-button {
	flex: 1;
	border-radius: 50px;
	color: #666;
	font-size: 16px;
}

.uni-share-button::after {
	border-radius: 50px;
}
</style>
