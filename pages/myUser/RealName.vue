<template>
	<view class="content">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text8 }}</view>
			</view>
			<view class="box-header option"></view>
		</view>
		<view class="account-boxs height" v-if="statusUrl != 2">
			<form @submit="formSubmit" @reset="formReset">
				<view class="form-input border-bottom account-list" @click="confirmShare">
					<view class="label">{{ i18n.text1 }}</view>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<view class="con-form">
						<input v-model="formData.DocumentType" :placeholder="i18n.text2" disabled="disabled" placeholder-class="fomr-pla" name="DocumentType" />
						<input v-model="formData.type" :placeholder="i18n.text2" disabled="disabled" placeholder-class="fomr-pla" name="typeId" style="display: none;" />
					</view>
				</view>
				<view class="form-input border-bottom account-list">
					<view class="label">{{ i18n.text3 }}</view>
					<view class="con-form"><input v-model="formData.name" :placeholder="i18n.text4" placeholder-class="fomr-pla" name="formDataName" /></view>
				</view>
				<view class="form-input border-bottom account-list">
					<view class="label">{{ i18n.text5 }}</view>
					<view class="con-form">
						<input v-model="formData.DocumentTypeNum" :placeholder="i18n.text6" placeholder-class="fomr-pla" name="DocumentTypeNum" maxlength="18" />
					</view>
				</view>
				<view class="form-input border-bottom account-list" @click="confirmShares">
					<view class="label">{{ i18n.text05 }}</view>
					<uni-icons type="arrowright" size="16" class="form-clear-icon arrowright pull-right"></uni-icons>
					<view class="con-form">
						<input v-model="formData.CityType" :placeholder="i18n.text51" disabled="disabled" placeholder-class="fomr-pla" name="CityType" />
						<input v-model="formData.CityId" :placeholder="i18n.text51" disabled="disabled" placeholder-class="fomr-pla" name="CityId" style="display: none;" />
					</view>
				</view>
				<uni-popup id="popupShare" ref="popupShare" type="share" @change="change"><uni-popup-share title="分享到" @select="select"></uni-popup-share></uni-popup>
				<uni-popup id="popupShares" ref="popupShares" type="share" @change="changes"><uni-popup-share-city title="分享到" @select="selects"></uni-popup-share-city></uni-popup>
				<view class="footer-button">
					<button class="button" form-type="submit">{{ i18n.text7 }}</button>
				</view>
			</form>
		</view>
		<view class="account-boxs height" v-if="statusUrl == 2">
			<view class="form-input account-list">
				<view class="label" style="margin-bottom: 0;">
					<uni-icons type="person-filled" size="16" class="form-clear-icon arrowright header-icon"></uni-icons>
					{{ i18n.text8 }}
					<view type="arrowright" size="16" class="pull-right" style="color: #06b572;">{{ i18n.text08 }}</view>
				</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text3 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formData.name || i18n.text008}}</view>
			</view>
			<view class="form-input account-list form-inputs">
				<text class="color-999">{{ i18n.text5 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">
					{{ formData.DocumentTypeNum.substr(0, 3) + '******' + formData.DocumentTypeNum.substr(14) || i18n.text008 }}
				</view>
			</view>
			<view class="form-input border-bottom account-list ">
				<text class="color-999">{{ i18n.text05 }}</text>
				<view type="arrowright" size="16" class="pull-right right-titles">{{ formData.CityType || i18n.text008}}</view>
			</view>
			<!-- <view class="form-input account-list height">
				<uni-icons type="checkmarkempty" size="16" class="form-clear-icon arrowright pull-left header-icon" style="color: #06b572;"></uni-icons>
				<view type="arrowright" size="16" class="pull-left title-size">{{ $t('levelThe.text09')}}</view>
			</view>
			<view class="form-input account-list height">
				<uni-icons type="checkmarkempty" size="16" class="form-clear-icon arrowright pull-left header-icon" style="color: #06b572;"></uni-icons>
				<view type="arrowright" size="16" class="pull-left title-size">{{ $t('levelThe.text010')}}</view>
			</view> -->
			<view class="form-input account-list height">
				<uni-icons type="checkmarkempty" size="16" class="form-clear-icon arrowright pull-left header-icon" style="color: #06b572;"></uni-icons>
				<view type="arrowright" size="16" class="pull-left title-size">{{i18n.text09}}{{getLevelList.cashAmountLimit}} U); </view>
			</view>
			<view class="form-input account-list height">
				<uni-icons type="checkmarkempty" size="16" class="form-clear-icon arrowright pull-left header-icon" style="color: #06b572;"></uni-icons>
				<view type="arrowright" size="16" class="pull-left title-size">{{i18n.text010}}{{getLevelList.tradeLimit}} CNY)</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopupShare from '@/components/uni-popup/uni-popup-share.vue';
import uniPopupShareCity from '@/components/uni-popup/uni-popup-shareCity.vue';
import md5 from '../../common/md5.js';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
import vPinyin from '@/lang/py.js'

export default {
	data() {
		return {
			formData: {
				DocumentType: '',
				name: '',
				DocumentTypeNum: '',
				type: '',
				typeId: '',
				CityId:"",
				CityType:"",
			},
			statusUrl: 0,
			getLevelList:{},
			country:"",
		};
	},
	computed: {
		i18n() {
			return this.$t('RealName');
		}
	},
	components: { uniIcons, uniPopupShare,uniPopupShareCity },
	onLoad(option) {
		uni.setNavigationBarTitle({
			title: this.$t('RealName.text8')
		});
		this.statusUrl = option.stauts;
		this.getRealNameInfoFunction();
		this.getLevelListFunction();
    },
	mounted() {},
	methods: {
		navBack() {
			uni.navigateBack();
		},
		
		async getRealNameInfoFunction() {
			uni.showLoading({ title: this.$t('RealName.text9'), mask: true });
			let res = await api.getRealNameInfoHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.formData.DocumentTypeNum = res.data.cardNo;
					this.formData.name = res.data.realName;
					this.formData.CityType = res.data.country
					const system_info = GET_STORAGE('system_info');
					// #调用汉字转拼音方法
					if(system_info.language == "en" ){
						this.formData.name = vPinyin.chineseToPinYin(res.data.realName)
					}
					if(system_info.language == "en" && res.data.country == "ZhongGuo"){
						this.formData.CityType = vPinyin.chineseToPinYin(res.data.country)
					}
					if(res.data.country == "ZhongGuo" && system_info.language != "en"){
						this.formData.CityType ="中国"
					}
					if (res.data.type == '1') {
						// this.formData.DocumentType = '身份证';
						this.formData.typeId = '1';
						this.formData.DocumentType  = this.$t('RealName.text10')
					};
					if (res.data.type == '2') {
						// this.formData.DocumentType = '护照';
						this.formData.typeId = '2';
						this.formData.DocumentType = this.$t('RealName.text11')
					}
				}
			} else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('RealName.text600'))
			}  else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getLevelListFunction() {
			uni.showLoading({ title: this.$t('RealName.text9'), mask: true });	
			let res = await api.getLevelListHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				if (res.data != null) {
					this.getLevelList = res.data[1]
				}
			}  else if(res.code === "500"){
				uni.hideLoading();
				this.$alert(this.$t('RealName.text600'))
			} else {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
		},
		change(e) {},
		confirmShare() {
			console.log("this.$refs.popupShare",this.$refs.popupShare)
			this.$refs.popupShare.open();
		},
		select(e, done) {
			this.formData.DocumentType = e.item.text;
			this.formData.type = e.item.id;
			done();
		},
		changes(e) {},
		confirmShares() {
			console.log("this.$refs.popupShares",this.$refs.popupShares)
			this.$refs.popupShares.open();
		},
		selects(e, done) {
			this.formData.CityType = e.item.text;
			this.formData.CityId = e.item.id;
			done();
		},
		
		async formSubmit(e) {
			var formData = e.detail.value;
			var type = /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/;
			if (formData.DocumentType == '') {
				this.$alert(this.$t('RealName.text12'));
			} else if (formData.formDataName == '') {
				this.$alert(this.$t('RealName.text4'));
			} else if (formData.DocumentType == this.$t('RealName.text10')) {
				if (formData.DocumentTypeNum == '') {
					this.$alert(this.$t('RealName.text6'));
				} else if (!type.test(formData.DocumentTypeNum)) {
					this.$alert(this.$t('RealName.text13'));
				}else if(formData.CityType == ''){
					this.$alert(this.$t('RealName.text51'));
				} else {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/myUser/userIdcard'
						});
					}, 1000);
					SET_STORAGE('formData', JSON.stringify(formData));
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.form-inputs {
	padding-bottom: 0;
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
.content {
	padding: 0 !important;
	.account-box {
		margin-top: 35rpx;
	}
}
.account-boxs {
	padding: 0 30rpx;
}
.arrowright {
	margin-top: 8rpx;
	color: #ccc;
}
.account-size {
	font-size: 28rpx;
	color: #86909a;
}
.form-input .label {
	margin-bottom: 20rpx;
	font-size: 26rpx;
}
.footer-button {
	position: fixed;
	bottom: 10rpx;
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
</style>
