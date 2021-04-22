<template>
	<view class="">
		<view class="content">
			<view class="status_bar"><view class="top_view"></view></view>

			<view class="page-top-head flex-row">
				<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
				<view class="box-header">
					<view class="head-title">{{ i18n.text12 }}</view>
				</view>
				<view class="box-header option"></view>
			</view>
			<view class="padding-30">
				<view class="text">{{ i18n.text1 }}</view>
				<view class="up-box" @tap="ChooseImage(1)">
					<div class="up-chooseImage" v-show="ChooseImageShow1"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
					<view class="bg-img height" v-show="ChooseImageShows2"><image :src="positiveCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text2 }}</view>
				<view class="up-box" @tap="ChooseImage(2)">
					<div class="up-chooseImage" v-show="ChooseImageShow3"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
					<view class="bg-img height" v-show="ChooseImageShows4"><image :src="negativeCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text3 }}</view>
				<view class="up-box" @tap="ChooseImage(3)">
					<div class="up-chooseImage" v-show="ChooseImageShow5"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
					<view class="bg-img height" v-show="ChooseImageShows6"><image :src="holdingCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text4 }}</view>
				<view class="upload-btn">*{{ i18n.text5 }}</view>
				<view class="footer-button">
					<button class="button" @click="buttonF">{{ i18n.text6 }}</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import http from '@/request/request.js';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
var _this = this;
export default {
	data() {
		return {
			formData: {},
			imgList: [],
			ChooseImageShow1: true,
			ChooseImageShows2: false,
			ChooseImageShow3: true,
			ChooseImageShows4: false,
			ChooseImageShow5: true,
			ChooseImageShows6: false,
			// 页面展示
			positiveCardPath: '', //身份证正面路径 ,
			negativeCardPath: '', //身份证反面路径 ,
			holdingCardPath: '', // /手持身份证照片路径,
			// 接口传参
			positiveCardPaths: '', //身份证正面路径 ,
			negativeCardPaths: '', //身份证反面路径 ,
			holdingCardPaths: '' // /手持身份证照片路径,
		};
	},
	computed: {
		i18n() {
			return this.$t('userIdcard');
		}
	},
	components: { uniIcons },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('userIdcard.text12')
		});
		const formData = JSON.parse(GET_STORAGE('formData'));
		this.formData = formData;
		console.log(this.formData)
		this.getRealNameInfoFunction();
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		async getRealNameInfoFunction() {
			uni.showLoading({ title: this.$t('userIdcard.text7'), mask: true });
			let res = await api.getRealNameInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.ChooseImageShow1 = false;
					this.ChooseImageShows2 = true;
					this.ChooseImageShow3 = false;
					this.ChooseImageShows4 = true;
					this.ChooseImageShow5 = false;
					this.ChooseImageShows6 = true;

					this.positiveCardPath = http.config.baseUrl + res.data.positiveCardPath;
					this.holdingCardPath = http.config.baseUrl + res.data.holdingCardPath;
					this.negativeCardPath = http.config.baseUrl + res.data.negativeCardPath;

					var positiveCardPaths = res.data.positiveCardPath.split('/api')[1];
					var negativeCardPaths = res.data.holdingCardPath.split('/api')[1];
					var holdingCardPaths = res.data.negativeCardPath.split('/api')[1];

					this.positiveCardPaths = '/api' + positiveCardPaths;
					this.negativeCardPaths = '/api' + negativeCardPaths;
					this.holdingCardPaths = '/api' + holdingCardPaths;
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('userIdcard.text600'))
			}   else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async saveRealNameApplyFuntion() {
			uni.showLoading({ title: this.$t('userIdcard.text7'), mask: true });

			const system_info = GET_STORAGE('system_info');
			if (this.formData.DocumentType == this.$t('userIdcard.text12')) {
				this.formData.typeId = '1';
			} else {
				this.formData.typeId = '2';
			}
			let res = await api.saveRealNameApplyHttp({
				cardNo: this.formData.DocumentTypeNum, //身份证号 ,
				holdingCardPath: this.holdingCardPaths, //手持身份证照片路径 ,
				lang: system_info.language, //"" (string, optional): 语言，cn， en ,
				negativeCardPath: this.negativeCardPaths, // (string, optional): 身份证反面路径 ,
				positiveCardPath: this.positiveCardPaths, //"" (string, optional): 身份证正面路径 ,
				realName: this.formData.formDataName, // (string, optional): 真实姓名
				type: this.formData.typeId,
				country:this.formData.CityType,
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('userIdcard.text8'));
				// if(this.formData.CityType !=''){
				// 	SET_STORAGE('CityType',this.formData.CityType);
				// }
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/myUser/myUser'
					});
				}, 1000);
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('userIdcard.text600'))
			}   else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		buttonF() {
			if (this.positiveCardPaths == '') {
				this.$alert(this.$t('userIdcard.text9'));
			} else if (this.negativeCardPaths == '') {
				this.$alert(this.$t('userIdcard.text10'));
			} else if (this.holdingCardPaths == '') {
				this.$alert(this.$t('userIdcard.text11'));
			} else {
				this.saveRealNameApplyFuntion();
			}
		},
		ChooseImage(val) {
			_this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有original 原图，compressed 压缩图，默认二者都有
				sourceType: ['album', 'camera'], //从相册选择、摄像头
				success: function(res) {
					var tempFilePaths = res.tempFilePaths;
					const maxSize = 8485760 / 1024 / 1024;
					const imgSize = res.tempFiles[0].size / 1024 / 1024;
					if (imgSize > maxSize) {
						uni.hideLoading();
						_this.$alert(_this.$t('userIdcard.text13'));
						return;
					}
					uni.showLoading({ title: _this.$t('userIdcard.text14'), mask: true });
					// lang:system_info.language,
					const system_info = GET_STORAGE('system_info');
					uni.uploadFile({
						url: http.config.baseUrl + '/base/uploadPic',
						filePath: tempFilePaths[0],
						name: 'files',
						method: 'post',
						header: {
							'user-token': GET_STORAGE('token')
						},
						formData: {
							//需要的参数
							type: '3',
							lang:system_info.language
						}, // HTTP 请求中其他额外的 form data
						success(res) {
							var json = JSON.parse(res.data);
							if (json.code === '000') {
								uni.hideLoading();
								_this.$alert(_this.$t('userIdcard.text15'));
								if (val == '1') {
									_this.positiveCardPath = http.config.baseUrl + json.data[0];
									_this.positiveCardPaths = json.data[0];
									_this.ChooseImageShow1 = false;
									_this.ChooseImageShows2 = true;
									return;
								}
								if (val == '2') {
									_this.negativeCardPath = http.config.baseUrl + json.data[0];
									_this.negativeCardPaths = json.data[0];
									_this.ChooseImageShow3 = false;
									_this.ChooseImageShows4 = true;
									return;
								}
								if (val == '3') {
									_this.holdingCardPath = http.config.baseUrl + json.data[0];
									_this.holdingCardPaths = json.data[0];
									_this.ChooseImageShow5 = false;
									_this.ChooseImageShows6 = true;
									return;
								}
							} else if(res.code === "500"){
								uni.hideLoading();
								this.$alert(this.$t('userIdcard.text600'))
							}  else {
								uni.hideLoading();
								uni.showToast({ title: res.errorMessage, icon: 'none' });
							}
						},
						fail: function(res) {
							uni.hideLoading();
							_this.$alert(_this.$t('userIdcard.text16'));
						}
					});
				}
			});
		},
		// 预览
		ViewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		// 删除
		DelImg(e) {
			this.ChooseImageShow = !this.ChooseImageShow;
			this.imgList.splice(e.currentTarget.dataset.index, 1);
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	height: 1600rpx;
	max-height: 1600rpx;
	padding: 0 !important;
}
.up-box {
	width: 100%;
	border: 1px dashed #ddd;
	border-radius: 30rpx;
	height: 280rpx;
	margin: 0 auto;
}
.bg-img {
	width: 100%;
	height: 280rpx;
	border-radius: 30rpx;
}
.bg-img .image {
	width: 100%;
	height: 280rpx;
	display: block;
	margin: 0 auto;
	border-radius: 30rpx;
}
.up-chooseImage {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 100rpx;
	margin: 85rpx auto;
	background-color: rgba(0, 0, 0, 0.1);
}
.cu-form-group {
	text-align: center;
	margin: 20rpx 0;
	color: #999;
	font-size: 26rpx;
}
.footer-button {
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	padding: 0 30rpx;
	background-color: #fff;
}
.button {
	border-radius: 5px;
	height: 46px;
	background: #06b572;
	text-align: center;
	color: #fff;
	font-size: 15px;
	line-height: 46px;
	margin: 11px 0;
}
.text {
	font-size: 26rpx;
	padding: 18rpx 0rpx 10rpx;
}
</style>
