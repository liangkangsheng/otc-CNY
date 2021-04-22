<!-- <template>
	<view>
		<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
			<uni-popup-dialog type="success" :title="i18n.text1" :content="i18n.text2" :before-close="true" @confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template> -->
<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import api from '@/api/index.js';
	import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
    //import api from '@/api/index.js';
	//import { mapGetters } from 'vuex' 3333333333
	export default {
		computed:{
			//...mapGetters(['token'])
		},
		computed: {
			
		},
		onLoad() {
			const system_info=GET_STORAGE("system_info")
			system_info.language = this._i18n.locale  || "cn"
		},
		onLaunch: function() {
		},
		onShow: function() {
		},
		onHide: function() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
/*每个页面公共css */
@import './style/common.scss';

.uni-base-color-06b572 {
	color: $uni-base-color-06b572;
}
.uni-base-color-de6334 {
	color: $uni-base-color-de6334;
}
page {
	background: $uni-base-color;
}
view {
	box-sizing: border-box;
	font-family: PingFang SC;
}
.color_primary {
	color: $uni-color-primary;
}
.uni-text-color {
	color: $uni-text-color;
}
.uni-text-color-grey {
	color: $uni-text-color-grey;
}
.uni-font-size {
	font-size: $uni-font-size;
	color: $uni-textJ-color;
}
.back-color {
	width: 100%;
	height: 20rpx;
	background-color: #ddd;
}
.border-bottom {
	border-bottom: 1px solid #ddd;
}
.height {
	height: auto;
	overflow: hidden;
}
.pull-left {
	float: left;
}
.pull-right {
	float: right;
}
.account-list {
	padding: 18rpx 0;
}
.border-bottom {
	border-bottom: 1px solid #ddd;
}
.break-word{
	word-wrap: break-word;
	word-break: break-all;
}
.copy_icon{
	width: 30rpx;
	height: 30rpx;
	float: right;
}
/deep/
.uni-btn-icon{
	margin-right: 30rpx;
}
/deep/
.content .uni-radio-input-checked{
	background-color:$uni-base-color-06b572 !important;
	border-color:$uni-base-color-06b572 !important;
}
.wallet-box-list{
	line-height: 40rpx;
}
.content{
	display: flex;
	flex-direction: column;
	padding: 0 30rpx 30rpx;
	background: #fff;
}
.CheckDetails{
	text-align: right;
	color: #007AFF;
	float: right;
	font-size: 24rpx;
	margin:20rpx 0;
}
.page-top-head{
		padding: 0 20rpx;
		height: 98rpx;font-size: 30rpx;color: #000;position: sticky;top:var(--status-bar-height);z-index: 3;background-color: #fff;
	}
	.box-header{
		width: 33.3%;
		float: left;
	}
	.head-title{text-align: center;}
	.head-icon{width: 34rpx;height: 34rpx;}
	.head-back{width: 22rpx;height: 36rpx;text-align: right;}
	.right-title{
		font-size: 28rpx;
		color: #999;
		text-align: right;
	}
	.option{
		opacity: 0;
	}
	.margin-left{
		// margin-left: -20rpx;
	}
	.padding-30{
		padding: 0 30rpx;
	}
</style>
