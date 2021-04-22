<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title" v-show="open">{{ i18n.text14 }}</view>
				<view class="head-title" v-show="opens">{{ i18n.text15 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="height padding-30" v-show="open">
			<form @submit="formSubmit" @reset="formReset">
				<view class="title-nav">{{ i18n.text1 }}</view>
				<view class="form-input">
					<view class="con-form"><input type="text" v-model="formZFB.realName" :placeholder="i18n.text2" placeholder-class="fomr-pla" name="formZFBrealName" /></view>
				</view>
				<view class="title-nav">{{ i18n.text3 }}</view>
				<view class="form-input">
					<view class="con-form"><input type="text" v-model="formZFB.alipayNum" :placeholder="i18n.text4" placeholder-class="fomr-pla" name="formZFBalipayNum" /></view>
				</view>
				<view class="title-nav">{{ i18n.text5 }}</view>
				<view class="up-box" @tap="ChooseImage()">
					<div class="up-chooseImage" v-show="ChooseImageShow"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
					<view class="bg-img height" v-show="!ChooseImageShow"><image :src="positiveCardPath" mode="aspectFill" class="image" name="positiveCardPath"></image></view>
				</view>
				<button class="uni-btn-v" form-type="submit">{{ i18n.text6 }}</button>
			</form>
		</view>
		<view class="height padding-30" v-show="opens">
			<form @submit="formSubmits" @reset="formReset">
				<view class="title-nav">{{ i18n.text1 }}</view>
				<view class="form-input">
					<view class="con-form"><input type="text" v-model="formYH.realName" :placeholder="i18n.text2" placeholder-class="fomr-pla" name="formYHrealName" /></view>
				</view>
				<view class="title-nav">{{ i18n.text7 }}</view>
				<view class="form-input">
					<view class="con-form">
						<input type="number" v-model="formYH.bankNum" :placeholder="i18n.text8" placeholder-class="fomr-pla" name="formYHbankNum" maxlength="19" />
					</view>
				</view>
				<view class="title-nav">{{ i18n.text9 }}</view>
				<view class="form-input">
					<view class="con-form"><input type="text" v-model="formYH.bankName" :placeholder="i18n.text10" placeholder-class="fomr-pla" name="formYHbankName" /></view>
				</view>
				<view class="title-nav">{{ i18n.text12 }}</view>
				<view class="form-input">
					<view class="con-form">
						<input type="text" v-model="formYH.bankAddress" :placeholder="i18n.text13" placeholder-class="fomr-pla" name="formYHbankAddress" />
					</view>
				</view>
				<button class="uni-btn-v" form-type="submit">{{ i18n.text6 }}</button>
			</form>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import api from '@/api/index.js';
import http from '@/request/request.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
import vPinyin from '@/lang/py.js'
var _this = this;
export default {
	data() {
		return {
			title: '',
			userName: '',
			open: false,
			opens: false,
			receiveAccountType: '',
			formZFB: {
				realName: '',
				alipayNum: '',
				alipayQrcode: ''
			},
			formYH: {
				realName: '',
				bankNum: '',
				bankName: '',
				bankAddress: ''
			},
			ChooseImageShow: true,
			positiveCardPath: '',
			positiveCardPaths: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('collectionForm');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: option.name
		});
		this.receiveAccountType = option.id;
		if (option.name == this.$t('collectionForm.text14')) {
			this.open = true;
		}
		if (option.name == this.$t('collectionForm.text15')) {
			this.opens = true;
		}
		if (this.receiveAccountType == '2' && option.list == '0') {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.formYH.realName = item.realName;
			this.formYH.bankNum = item.bankNum;
			this.formYH.bankName = item.bankName;
			this.formYH.bankAddress = item.bankAddress;
			const system_info = GET_STORAGE('system_info');
			// #调用汉字转拼音方法
			// if(system_info.language == "en"){
			// 	this.formYH.realName = vPinyin.chineseToPinYin(item.realName);
			// 	// this.formData.name = vPinyin.chineseToPinYin(res.data.realName)
			// }
		}
		if (this.receiveAccountType == '1' && option.list == '0') {
			const item = JSON.parse(decodeURIComponent(option.item));
			this.formZFB.realName = item.realName;
			this.formZFB.alipayNum = item.alipayNum;
			this.positiveCardPath = http.config.baseUrl + item.alipayQrcode;
			this.ChooseImageShow = !this.ChooseImageShow;
			const system_info = GET_STORAGE('system_info');
			// #调用汉字转拼音方法
			// if(system_info.language == "en"){
			// 	this.formZFB.realName = vPinyin.chineseToPinYin(item.realName);
			// 	// this.formData.name = vPinyin.chineseToPinYin(res.data.realName)
			// }
		}
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		ChooseImage(val) {
			_this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择、摄像头
				success: res => {
					var tempFilePaths = res.tempFilePaths;
					const maxSize = 8485760 / 1024 / 1024;
					const imgSize = res.tempFiles[0].size / 1024 / 1024;
					if (imgSize > maxSize) {
						uni.hideLoading();
						_this.$alert(_this.$t('Accredited.text30'));
						return;
					}
					uni.showLoading({ title: _this.$t('collectionForm.text21'), mask: true });
					const system_info = GET_STORAGE('system_info');
					uni.uploadFile({
						url: http.config.baseUrl + '/base/uploadPic',
						filePath: res.tempFilePaths[0],
						name: 'files',
						method: 'post',
						header: {
							'user-token': GET_STORAGE('token')
						},
						formData: {
							//需要的参数
							type: '1',
							lang:system_info.language
						}, // HTTP 请求中其他额外的 form data
						success(res) {
							var json = JSON.parse(res.data);
							if (json.code === '000') {
								uni.hideLoading();
								_this.$alert(_this.$t('collectionForm.text22'));
								_this.positiveCardPath = http.config.baseUrl + json.data[0];
								_this.positiveCardPaths = json.data[0];
								_this.ChooseImageShow = !_this.ChooseImageShow;
							} else if(res.code === "500"){
								uni.hideLoading();
								this.$alert(this.$t('collectionForm.text600'))
							} else {
								uni.hideLoading();
								_this.$alert(json.errorMessage);
							}
						},
						fail: function(res) {
							uni.hideLoading();
							_this.$alert(_this.$t('collectionForm.text20'));
						}
					});
				}
			});
		},
		async formSubmits(e) {
			var that = this;
			//进行表单检查
			var formData = e.detail.value;
			var obj = {};
			if (formData.formYHrealName == '') {
				this.$alert(this.$t('collectionForm.text2'));
			} else if (formData.formYHbankNum == '') {
				this.$alert(this.$t('collectionForm.text8'));
			} else if (formData.formYHbankName == '') {
				this.$alert(this.$t('collectionForm.text10'));
			} else if (formData.formYHbankAddress == '') {
				this.$alert(this.$t('collectionForm.text13'));
			} else {
				const system_info = GET_STORAGE('system_info');
				obj = {
					receiveAccountType: this.receiveAccountType,
					realName: formData.formYHrealName,
					bankNum: formData.formYHbankNum,
					bankName: formData.formYHbankName,
					lang: system_info.language,
					bankAddress: formData.formYHbankAddress
				};
				uni.showLoading({ title: this.$t('collectionForm.text19'), mask: true });
				let res = await api.saveReceiveAccountHttp(obj);

				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('collectionForm.text17'));
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/collection/collection'
						});
					}, 1000);
				}  else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('collectionForm.text600'))
				} else {
					uni.hideLoading();
					this.$alert(res.errorMessage);
				}
			}
		},
		async formSubmit(e) {
			//进行表单检查
			var formData = e.detail.value;
			var obj = {};
			if (formData.formZFBrealName == '') {
				this.$alert(this.$t('collectionForm.text2'));
			} else if (formData.formZFBalipayNum == '') {
				this.$alert(this.$t('collectionForm.text16'));
			} else if (this.positiveCardPath == '') {
				this.$alert(this.$t('collectionForm.text18'));
			} else {
				const system_info = GET_STORAGE('system_info');
				obj = {
					receiveAccountType: this.receiveAccountType,
					realName: formData.formZFBrealName,
					alipayNum: formData.formZFBalipayNum,
					lang:system_info.language,
					alipayQrcode: this.positiveCardPaths
				};
				uni.showLoading({ title: this.$t('collectionForm.text19'), mask: true });
				let res = await api.saveReceiveAccountHttp(obj);
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('collectionForm.text17'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/collection/collection'
						});
					}, 1000);
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('collectionForm.text600'))
				}  else {
					uni.hideLoading();
					this.$alert(res.errorMessage);
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 !important;
}
.uni-btn-v {
	height: 70rpx;
	border-radius: 10rpx;
	background: linear-gradient(to right, #54cba1, #06b572);
	line-height: 70rpx;
	color: #fff;
	position: fixed;
	bottom: 20rpx;
	left: 20rpx;
	right: 20rpx;
}
.input-box {
	background: #ddd;
	padding: 20rpx;
	margin-bottom: 10rpx;
}
.input-boxs {
	width: 120rpx;
	height: 120rpx;
	border: 1rpx solid #ddd;
	text-align: center;
	line-height: 118rpx;
	font-size: 60rpx;
	color: #999;
}
.title-nav {
	padding: 20rpx 0;
	font-size: 26rpx;
}
.form-input {
	border-radius: 5rpx;
	padding: 0 0;
	height: 48rpx;
	position: relative;
	color: #333;
	font-size: 30rpx;
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.up-box {
	border: 1px dashed #ddd;
	border-radius: 30rpx;
	height: 420rpx;
}
.up-chooseImage {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 100rpx;
	margin: 160rpx auto;
	background-color: rgba(0, 0, 0, 0.1);
}
.bg-img {
	width: 100%;
	height: 420rpx;
	border-radius: 30rpx;
}
.bg-img .image {
	width: 100%;
	height: 420rpx;
	display: block;
	margin: 0 auto;
	border-radius: 30rpx;
}
</style>
