<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text21 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="content">
			<view class="height" v-if="statusUrl != 2">
				<form @submit="formSubmit" @reset="formReset">
					<view class="title-nav">{{ i18n.text1 }}</view>
					<view class="form-input">
						<view class="con-form">
							<input type="text" v-model="form.legalPersonName" :placeholder="i18n.text2" placeholder-class="fomr-pla" name="legalPersonName" />
						</view>
					</view>
					<view class="title-nav">{{ i18n.text3 }}</view>
					<view class="form-input">
						<view class="con-form">
							<input type="number" v-model="form.legalPersonPhone" maxlength="11" :placeholder="i18n.text4" placeholder-class="fomr-pla" name="legalPersonPhone" />
						</view>
					</view>
					<view class="title-nav">{{ i18n.text5 }}</view>
					<view class="form-input">
						<view class="con-form"><input type="text" v-model="form.organCode" :placeholder="i18n.text6" placeholder-class="fomr-pla" name="organCode" /></view>
					</view>
					<view class="title-nav">{{ i18n.text7 }}</view>
					<view class="form-input">
						<view class="con-form"><input type="text" v-model="form.organName" :placeholder="i18n.text8" placeholder-class="fomr-pla" name="organName" /></view>
					</view>
					<view class="title-nav">{{ i18n.text9 }}</view>
					<view class="form-input">
						<view class="con-form">
							<input type="text" v-model="form.officeAddress" :placeholder="i18n.text10" placeholder-class="fomr-pla" name="officeAddress" />
						</view>
					</view>
					<view class="title-nav">{{ i18n.text11 }}</view>
					<view class="form-input">
						<view class="con-form"><input type="text" v-model="form.regAddress" :placeholder="i18n.text12" placeholder-class="fomr-pla" name="regAddress" /></view>
					</view>
					<view class="form-input border-bottom account-list" @click="confirmShare">
						<view class="label">{{ i18n.text13 }}</view>
						<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
						<view class="con-form">
							<input v-model="form.organType" :placeholder="i18n.text14" disabled="disabled" placeholder-class="fomr-pla" name="organType" />
							<input
								v-model="form.organTypeId"
								:placeholder="i18n.text14"
								disabled="disabled"
								placeholder-class="fomr-pla"
								name="organTypeId"
								style="display: none;"
							/>
						</view>
					</view>

					<view class="up-box" @tap="ChooseImage(1)">
						<div class="up-chooseImage" v-show="ChooseImageShow1"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
						<view class="bg-img height" v-show="ChooseImageShows2"><image :src="positiveCardPath" mode="aspectFill" class="image"></image></view>
					</view>
					<view class="cu-form-group upload-btn">{{ i18n.text15 }}</view>
					<view class="up-box" @tap="ChooseImage(2)">
						<div class="up-chooseImage" v-show="ChooseImageShow3"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
						<view class="bg-img height" v-show="ChooseImageShows4"><image :src="negativeCardPath" mode="aspectFill" class="image"></image></view>
					</view>
					<view class="cu-form-group upload-btn">{{ i18n.text16 }}</view>
					<view class="up-box" @tap="ChooseImage(3)">
						<div class="up-chooseImage" v-show="ChooseImageShow5"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
						<view class="bg-img height" v-show="ChooseImageShows6"><image :src="holdingCardPath" mode="aspectFill" class="image"></image></view>
					</view>
					<view class="cu-form-group upload-btn">{{ i18n.text17 }}</view>
					<view class="up-box" @tap="ChooseImage(4)">
						<div class="up-chooseImage" v-show="ChooseImageShow7"><uni-icons type="camera" size="30" class="form-clear-icon" color="#fff"></uni-icons></div>
						<view class="bg-img height" v-show="ChooseImageShows8"><image :src="holdingLicensePath" mode="aspectFill" class="image"></image></view>
					</view>
					<view class="cu-form-group upload-btn">{{ i18n.text18 }}</view>
					<uni-popup id="popupShare" ref="popupShare" type="share" @change="change"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
					<view class="upload-btn">*{{ i18n.text19 }}</view>
					<view class="footer-button">
						<button class="button" form-type="submit">{{ i18n.text20 }}</button>
					</view>
				</form>
			</view>
			<view class="height" v-if="statusUrl == 2">
				<view class="form-input account-list">
					<view class="label" style="margin-bottom: 0;">
						<uni-icons type="person-filled" size="16" class="form-clear-icon arrowright header-icon"></uni-icons>
						{{ i18n.text21 }}
						<view type="arrowright" size="16" class="pull-right" style="color: #06b572;">{{ i18n.text08 }}</view>
					</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text1 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.legalPersonName }}</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text3 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.legalPersonPhone.substr(0, 3) + '****' + form.legalPersonPhone.substr(7) }}</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text5 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.organCode }}</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text7 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.organName }}</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text9 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.officeAddress }}</view>
				</view>
				<view class="form-input account-list form-inputs">
					<text class="color-999">{{ i18n.text11 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.regAddress }}</view>
				</view>
				<view class="form-input account-list border-bottom">
					<text class="color-999">{{ i18n.text13 }}</text>
					<view type="arrowright" size="16" class="pull-right right-titles">{{ form.organType }}</view>
				</view>
				<view class="up-box">
					<view class="bg-img height" v-show="ChooseImageShows2"><image :src="positiveCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text015 }}</view>
				<view class="up-box">
					<view class="bg-img height" v-show="ChooseImageShows4"><image :src="negativeCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text016 }}</view>
				<view class="up-box">
					<view class="bg-img height" v-show="ChooseImageShows6"><image :src="holdingCardPath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text017 }}</view>
				<view class="up-box">
					<view class="bg-img height" v-show="ChooseImageShows8"><image :src="holdingLicensePath" mode="aspectFill" class="image"></image></view>
				</view>
				<view class="cu-form-group upload-btn">{{ i18n.text018 }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopupShare from '@/components/uni-popup/uni-popup-shares.vue';
import api from '@/api/index.js';
import http from '@/request/request.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
import vPinyin from '@/lang/py.js'
var _this = this;
export default {
	data() {
		return {
			form: {
				legalPersonName: '',
				legalPersonPhone: '',
				organCode: '',
				organName: '',
				officeAddress: '',
				regAddress: '',
				organType: '',
				organTypeId: ''
			},
			formData: {},
			imgList: [],
			ChooseImageShow1: true,
			ChooseImageShows2: false,
			ChooseImageShow3: true,
			ChooseImageShows4: false,
			ChooseImageShow5: true,
			ChooseImageShows6: false,
			ChooseImageShow7: true,
			ChooseImageShows8: false,
			// 页面展示
			positiveCardPath: '', //身份证正面路径 ,
			negativeCardPath: '', //身份证反面路径 ,
			holdingCardPath: '', // /手持身份证照片路径,
			holdingLicensePath: '', //营业执照
			// 接口传参
			positiveCardPaths: '', //身份证正面路径 ,
			negativeCardPaths: '', //身份证反面路径 ,
			holdingCardPaths: '', // /手持身份证照片路径,
			holdingLicensePaths: '', //营业执照
			statusUrl: 0
		};
	},
	computed: {
		i18n() {
			return this.$t('Accredited');
		}
	},
	components: { uniIcons, uniPopupShare },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('Accredited.text21')
		});
		this.statusUrl = option.stauts;
		this.getOrganVerifyInfoHttpFunction();
	},
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		change(e) {},
		confirmShare() {
			this.$refs.popupShare.open();
		},
		select(e, done) {
			this.form.organType = e.item.text;
			this.form.organTypeId = e.item.id;
			done();
		},
		async getOrganVerifyInfoHttpFunction() {
			let res = await api.getOrganVerifyInfoHttp({});
			if (res.code === '000') {
				if (res.data != null) {
					this.ChooseImageShow1 = false;
					this.ChooseImageShows2 = true;
					this.ChooseImageShow3 = false;
					this.ChooseImageShows4 = true;
					this.ChooseImageShow5 = false;
					this.ChooseImageShows6 = true;
					this.ChooseImageShow7 = false;
					this.ChooseImageShows8 = true;
					this.form.legalPersonName = res.data.legalPersonName;
					this.form.legalPersonPhone = res.data.legalPersonPhone;
					this.form.organCode = res.data.organCode;
					this.form.organName = res.data.organName;
					this.form.officeAddress = res.data.officeAddress;
					this.form.regAddress = res.data.regAddress;
					const system_info = GET_STORAGE('system_info');
					// #调用汉字转拼音方法
					if(system_info.language == "en"){
						this.form.legalPersonName = vPinyin.chineseToPinYin(res.data.legalPersonName);
						this.form.organName = vPinyin.chineseToPinYin(res.data.organName);
						this.form.officeAddress = vPinyin.chineseToPinYin(res.data.officeAddress);
						this.form.regAddress = vPinyin.chineseToPinYin(res.data.regAddress);
						// this.formData.name = vPinyin.chineseToPinYin(res.data.realName)
					}
					if (res.data.organType == '2') {
						this.form.organType = this.$t('Accredited.text22')
						// this.form.organType = '办公室';
						this.form.organTypeId = '2';
					}
					if (res.data.organType == '1') {
						this.form.organType = this.$t('Accredited.text23')
						// this.form.organType = '公式';
						this.form.organTypeId = '1';
					}
					this.positiveCardPath = http.config.baseUrl + res.data.positiveCardPath;
					this.holdingCardPath = http.config.baseUrl + res.data.holdingCardPath;
					this.negativeCardPath = http.config.baseUrl + res.data.negativeCardPath;
					this.holdingLicensePath = http.config.baseUrl + res.data.holdingLicensePath;

					var positiveCardPaths = res.data.positiveCardPath.split('/api')[1];
					var negativeCardPaths = res.data.holdingCardPath.split('/api')[1];
					var holdingCardPaths = res.data.negativeCardPath.split('/api')[1];
					var holdingLicensePaths = res.data.holdingLicensePath.split('/api')[1];

					this.positiveCardPaths = '/api' + positiveCardPaths;
					this.negativeCardPaths = '/api' + negativeCardPaths;
					this.holdingCardPaths = '/api' + holdingCardPaths;
					this.holdingLicensePaths = '/api' + holdingLicensePaths;
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('Accredited.text600'))
			} else {
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async formSubmit(e) {
			var formData = e.detail.value;
			let tel = /^1[34578]\d{9}$/;
			let phoneTel = RegExp(tel).test(formData.legalPersonPhone);
			if (formData.legalPersonName == '') {
				this.$alert(this.$t('Accredited.text2'));
			} else if (formData.legalPersonPhone == '') {
				this.$alert(this.$t('Accredited.text4'));
			} else if (!phoneTel) {
				this.$alert(this.$t('Accredited.text33'));
			} else if (formData.organCode == '') {
				this.$alert(this.$t('Accredited.text6'));
			} else if (formData.organName == '') {
				this.$alert(this.$t('Accredited.text8'));
			} else if (formData.officeAddress == '') {
				this.$alert(this.$t('Accredited.text10'));
			} else if (formData.regAddress == '') {
				this.$alert(this.$t('Accredited.text12'));
			} else if (formData.organType == '') {
				this.$alert(this.$t('Accredited.text14'));
			} else if (this.positiveCardPaths == '') {
				this.$alert(this.$t('Accredited.text24'));
			} else if (this.negativeCardPaths == '') {
				this.$alert(this.$t('Accredited.text25'));
			} else if (this.holdingCardPaths == '') {
				this.$alert(this.$t('Accredited.text26'));
			} else if (this.holdingLicensePaths == '') {
				this.$alert(this.$t('Accredited.text27'));
			} else {
				// system_info.language
				const system_info = GET_STORAGE('system_info');
				uni.showLoading({ title: this.$t('Accredited.text29'), mask: true });
				let res = await api.saveOrganVerifyApplyHttp({
					holdingCardPath: this.holdingCardPaths,
					holdingLicensePath: this.holdingLicensePaths,
					lang: system_info.language,
					legalPersonName: formData.legalPersonName,
					legalPersonPhone: formData.legalPersonPhone,
					negativeCardPath: this.negativeCardPaths,
					officeAddress: formData.officeAddress,
					organCode: formData.organCode,
					organName: formData.organName,
					organType: formData.organTypeId || this.form.organTypeId,
					positiveCardPath: this.positiveCardPaths,
					regAddress: formData.regAddress
				});
				if (res.code === '000') {
					uni.hideLoading();
					this.$alert(this.$t('Accredited.text28'));
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/myUser/myUser'
						});
					}, 1000);
				} else if(res.code === "500"){
					uni.hideLoading();
					this.$alert(this.$t('Accredited.text600'))
				} else {
					uni.hideLoading();
					uni.showToast({ title: res.errorMessage, icon: 'none' });
				}
			}
		},
		ChooseImage(val) {
			_this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera', 'album'], //从相机、相册选择
				success: function(res) {
					var tempFilePaths = res.tempFilePaths;
					const maxSize = 8485760 / 1024 / 1024;
					const imgSize = res.tempFiles[0].size / 1024 / 1024;
					if (imgSize > maxSize) {
						uni.hideLoading();
						_this.$alert(_this.$t('Accredited.text30'));
						return;
					}
					uni.showLoading({ title: _this.$t('Accredited.text31'), mask: true });
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
							type: '5',
							lang:system_info.language
						}, // HTTP 请求中其他额外的 form data
						success(res) {
							var json = JSON.parse(res.data);
							if (json.code === '000') {
								uni.hideLoading();
								_this.$alert(_this.$t('Accredited.text32'));
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
								if (val == '4') {
									_this.holdingLicensePath = http.config.baseUrl + json.data[0];
									_this.holdingLicensePaths = json.data[0];
									_this.ChooseImageShow7 = false;
									_this.ChooseImageShows8 = true;
									return;
								}
							} else if(res.code === "500"){
								uni.hideLoading();
								this.$alert(this.$t('Accredited.text600'))
							}  else {
								uni.hideLoading();
								uni.showToast({ title: res.errorMessage, icon: 'none' });
								return Promise.resolve(0);
							}
						},
						fail: function(res) {
							uni.hideLoading();
							_this.$alert(_this.$t('Accredited.text30'));
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.border-bottom {
	padding: 10rpx 0 !important;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.form-inputs {
	padding: 10rpx 0 !important;
	border-bottom: none !important;
}
.title-size,
.right-titles {
	font-size: 26rpx;
}
.header-icon {
	margin-right: 20rpx;
}
.color-999 {
	color: #999;
	font-size: 26rpx;
}
.form-input .label {
	padding: 20rpx 0 10rpx;
	font-size: 26rpx;
}
.form-clear-icon {
	margin-top: 12rpx;
}
.con-form {
	padding-bottom: 10rpx;
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
.content {
	padding-bottom: 150rpx !important;
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
	padding: 20rpx 0 10rpx;
	font-size: 26rpx;
}
.form-input {
	border-radius: 5rpx;
	padding: 0 0;
	// height: 65rpx;
	position: relative;
	color: #333;
	font-size: 30rpx;
	border: none;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.up-box {
	width: 100%;
	border: 1px dashed #ddd;
	border-radius: 30rpx;
	height: 280rpx;
	margin: 30rpx auto;
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
	right: 30rpx;
	left: 30rpx;
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
	padding: 30rpx 30rpx 0;
}
</style>
