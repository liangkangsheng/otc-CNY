<template>
	<view class="">
		<view class="status_bar"><view class="top_view"></view></view>
		<view class="page-top-head flex-row">
			<view class="box-header margin-left"><uni-icons type="arrowleft" size="24" style="color: #000;" @click="navBack"></uni-icons></view>
			<view class="box-header">
				<view class="head-title">{{ i18n.text01 }}</view>
			</view>
			<view class="box-header"></view>
		</view>

		<view class="content">
			<view class="header">
				<view
					v-for="(tab, index) in tabBarPay"
					:key="tab.id"
					class="uni-tab-item-pay"
					:class="tabIndexPay == index ? 'uni-tab-item-border-active-pay' : ''"
					:id="tab.id"
					:data-current="index"
					@click="ontabtapPay"
				>
					<text class="text-b" :class="tabIndexPay == index ? 'uni-tab-item-title-active-pay' : ''">{{ tab.name }}</text>
				</view>
			</view>
			<!-- 购买设置 -->
			<form @submit="formSubmitPayment" v-show="!tabsOpenPay">
				<view class="right-title height setup">
					<text class="pull-left">基础设置</text>
					<text class="pull-right">
						当前盘口价格：
						<text style="color: #06b572;">￥{{ unitPriced }}</text>
						CNY
					</text>
				</view>
				<view class="back-wither height">
					<view class="view-p height borderBottom">
						<text class="user-pay">{{ checked == true ? i18n.text024 : i18n.text025 }}</text>
						<!-- <text class="uedt">USDT</text> -->
						<view class="switch"><switch name="switch" :checked="checked" @change="switch1Change" /></view>
					</view>
					<view class="view-p height">
						<text class="user-pay pull-left">{{ i18n.text020 }}</text>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 0;">
							<uni-icons type="arrowdown" size="14" color="#333" class="pull-right" style="margin-top: 4rpx;"></uni-icons>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="payment.PayIndex == 1">
							<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
							<text class="uni-font-size text-users">{{ i18n.text023 }}</text>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="payment.PayIndex == 2">
							<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
							<text class="uni-font-size text-users">{{ i18n.text022 }}</text>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="payment.PayIndex == 3">
							<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
							<text class="uni-font-size text-users">{{ i18n.text021 }}</text>
						</view>
					</view>
				</view>
				
				<view class="back-wither height">
					<!-- 定价方式 -->
					<view class="form-input height view-top" @click="handleShowShare(2)">
						<view class="pull-left input-name">{{ i18n.text02 }}</view>
						<view class="pull-left input-name">{{payment.pricing == 0?i18n.text027:i18n.text028 }}</view>
						<!-- arrowup arrowdown -->
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin"></uni-icons>
					</view>
					<!-- 浮动比例 -->
					<view class="form-input height view-top input-padding" v-if="payment.pricing == 1">
						<view class="pull-left input-name">{{ i18n.text03 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text04')" v-model="payment.floating" name="floating" /></view>
						<view class="pull-right input-names">%</view>
					</view>
					<!-- 单价 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text05 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text06')" v-model="payment.unitPrice" name="unitPrice" :disabled="payment.pricing == 1?true:false"/></view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 数量 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text07 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text08')" v-model="payment.unit" name="unit" /></view>
						<view class="pull-right input-names">USDT</view>
					</view>
					<!-- 总金额 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text09 }}</view>
						<view class="form-input-box pull-left"><input type="number" :placeholder="$t('orderUp.text011')" v-model="payment.payAll" name="payAll" :disabled="payment.pricing == 1?true:false"/></view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 隐藏价格 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text012 }}</view>
						<view class="form-input-box pull-left"><input type="number" :placeholder="$t('orderUp.text013')" v-model="payment.pay" name="payAll" disabled /></view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 交易限制 -->
					<view class="right-title height  setup" style="padding-top: 30rpx;padding-bottom: 0;">
						<view class="pull-left input-name">{{ i18n.text014 }}</view>
					</view>
					<!-- 单笔限额 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text015 }}</view>
						<view class="form-input-box pull-left">
							<input
								type="number"
								placeholder=""
								v-model="payment.payAllw"
								name="payAllw"
								class="pull-left"
								style="width: 26%;border: 1px solid #ddd;padding: 0 2%;"
							/>
							<view class="pull-left" style="margin:0 30rpx;">-</view>
							<input
								type="number"
								placeholder=""
								v-model="payment.payAllx"
								name="payAllx"
								class="pull-left"
								style="width: 26%;border: 1px solid #ddd;padding: 0 2%;"
							/>
						</view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 认证等级 -->
					<view class="form-input height view-top input-padding" @click="handleShowShare(3)">
						<view class="pull-left input-name">{{ i18n.text016 }}</view>
						<view class="form-input-box pull-left ">{{payment.level == 0?i18n.text029:i18n.text030 }}</view>
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin"></uni-icons>
						<!-- arrowup arrowdown -->
					</view>
					<!-- 交易说明 -->
					<view class="form-input height view-top input-padding" style="border-bottom:none ;">
						<view class="pull-left input-name">{{ i18n.text018 }}</view>
						<view class="form-input-box pull-left ">
							<textarea
								@blur="bindTextAreaBlur"
								auto-height
								name="textarea"
								v-model="payment.textarea"
								placeholder-style="color:grey"
								:placeholder="$t('orderUp.text019')"
								style="width: 100%;"
							/>
						</view>
					</view>
				</view>
				<view class="back-wither height fonSise" style="margin-bottom: 120rpx;">{{ i18n.text031 }}</view>
				<view class="footer-Bu">
					<button class="button" form-type="submit">{{ i18n.text14 }}</button>
				</view>
			</form>

			<!-- 出售设置 -->
			<form @submit="formSubmit" class="pay-false" v-show="tabsOpenPay">
				<view class="right-title height setup">
					<text class="pull-left">基础设置</text>
					<text class="pull-right">
						当前盘口价格：
						<text style="color: #de6334;">￥{{ unitPriced }}</text>
						CNY
					</text>
				</view>
				<view class="back-wither height">
					<view class="view-p height borderBottom">
						<text class="user-pays">{{ checkeds == true ? i18n.text024 : i18n.text025 }}</text>
						<!-- <text class="uedt">USDT</text> -->
						<view class="switch"><switch name="switchs" :checked="checkeds" @change="switch2Change" /></view>
					</view>
					<view class="view-p height">
						<text class="user-pays pull-left">{{ i18n.text033 }}</text>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 0;">
							<uni-icons type="arrowdown" size="14" color="#333" class="pull-right" style="margin-top: 4rpx;"></uni-icons>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="sell.PayIndex == 1">
							<image src="../../static/icon/alipay_icon.png" mode="" class="icon-img pull-left"></image>
							<text class="uni-font-size text-users">{{ i18n.text023 }}</text>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="sell.PayIndex == 2">
							<image src="../../static/icon/pay_icon3.png" mode="" class="icon-img"></image>
							<text class="uni-font-size text-users">{{ i18n.text022 }}</text>
						</view>
						<view class="paySatus height pull-right" @click="handleShowShare(1)" style="margin-right: 10rpx;" v-if="sell.PayIndex == 3">
							<image src="../../static/icon/wechat_icon.png" mode="" class="icon-img"></image>
							<text class="uni-font-size text-users">{{ i18n.text021 }}</text>
						</view>
					</view>
					<view class="height view-top input-padding border-bottom-none">
						<text class="user-pays pull-left">{{ i18n.text54 }}</text>
						
						<text class="pull-right uni-font-size" @click="handleShowShare(5)">{{receiveAccount || i18n.text54}}</text>
						<!-- <picker @change="pickerChangeYH" :range="dataYH" range-key="text" >
							
						</picker> -->
					</view>
				</view>
				<view class="back-wither height">
					<!-- 定价方式 -->
					<view class="form-input height view-top" @click="handleShowShare(2)">
						<view class="pull-left input-name">{{i18n.text02}}</view>
						<view class="form-input-box pull-left">{{sell.pricing == 0?i18n.text027:i18n.text028 }}</view>
						<!-- arrowup arrowdown -->
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin"></uni-icons>
					</view>
					<!-- 浮动比例 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text03 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text04')" v-model="sell.floating" name="floating" /></view>
						<view class="pull-right input-names">%</view>
					</view>
					<!-- 单价 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text05 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text06')" v-model="sell.unitPrice" name="unitPrice" :disabled="sell.pricing == 1?true:false"/></view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 数量 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text07 }}</view>
						<view class="form-input-box pull-left "><input type="number" :placeholder="$t('orderUp.text08')" v-model="sell.unit" name="unit" /></view>
						<view class="pull-right input-names">USDT</view>
					</view>
					<!-- 总金额 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text09 }}</view>
						<view class="form-input-box pull-left"><input type="number" :placeholder="$t('orderUp.text011')" v-model="sell.payAll" name="payAll" :disabled="sell.pricing == 1?true:false" /></view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 隐藏价格 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text012 }}</view>
						<view class="form-input-box pull-left"><input type="number" :placeholder="$t('orderUp.text013')" v-model="sell.pay" name="pay" disabled /></view>
						<view class="pull-right input-names">CNY</view>
						
					</view>
					<!-- 是否T+1 -->
					<view class="form-input height view-top input-padding" @click="handleShowShare(4)">
						<view class="pull-left input-name">{{ i18n.text034 }}</view>
						<view class="form-input-box pull-left">{{sell.status == 0?i18n.text036:i18n.text037 }}</view>
				        <uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin"></uni-icons>	
					</view>
					<!-- 交易限制 -->
					<view class="right-title height  setup" style="padding-top: 30rpx;padding-bottom: 0;">
						<view class="pull-left input-name">{{ i18n.text014 }}</view>
					</view>
					<!-- 单笔限额 -->
					<view class="form-input height view-top input-padding">
						<view class="pull-left input-name">{{ i18n.text015 }}</view>
						<view class="form-input-box pull-left">
							<input type="number" placeholder="" v-model="sell.payAllw" name="payAllw" class="pull-left" style="width: 26%;border: 1px solid #ddd;padding: 0 2%;" />
							<view class="pull-left" style="margin:0 30rpx;">-</view>
							<input type="number" placeholder="" v-model="sell.payAllx" name="payAllx" class="pull-left" style="width: 26%;border: 1px solid #ddd;padding: 0 2%;" />
						</view>
						<view class="pull-right input-names">CNY</view>
					</view>
					<!-- 认证等级 -->
					<view class="form-input height view-top input-padding" @click="handleShowShare(3)">
						<view class="pull-left input-name">{{ i18n.text016 }}</view>
						<view class="form-input-box pull-left ">{{sell.level == 0?i18n.text029:i18n.text030 }}</view>
						<uni-icons type="arrowdown" size="14" color="#333" class="pull-right icon-margin"></uni-icons>
						<!-- arrowup arrowdown -->
					</view>
					<!-- 交易说明 -->
					<view class="form-input height view-top input-padding" style="border-bottom:none ;">
						<view class="pull-left input-name">{{ i18n.text018 }}</view>
						<view class="form-input-box pull-left ">
							<textarea
								@blur="bindTextAreaBlur"
								auto-height
								name="textarea"
								v-model="payment.textarea"
								placeholder-style="color:grey"
								:placeholder="$t('orderUp.text019')"
								style="width: 100%;"
							/>
						</view>
					</view>
				</view>
				<view class="back-wither height fonSise">{{ i18n.text032 }}</view>
				<view class="back-wither height fonSise" style="margin-bottom: 120rpx;">{{ i18n.text038 }}</view>
				<view class="footer-Bu">
					<button class="button buttonF" form-type="submit">{{ i18n.text24 }}</button>
				</view>
			</form>
			<!-- 中部弹框 -->
			<uni-popup id="popupDialog" ref="popupDialog" type="dialog" @change="change">
				<uni-popup-dialog
					:type="msgType"
					:title="i18n.text25"
					:content="dialogContent"
					:before-close="true"
					@confirm="dialogConfirm"
					@close="dialogClose"
				></uni-popup-dialog>
			</uni-popup>
			<!-- 底部弹框-->
			<view class="share">
				<view :class="{ 'share-box': shareState }" @click="handleHiddenShare"></view>
				<view class="share-item" :class="{ 'share-show': shareState }">
					<!-- 付款 -->
					<view class="height" v-if="handleShare == 1">
						<view class="list-box-share borderBottom height" style="margin-bottom: 0;">
							<view class="pull-left">{{ tabIndexPay == 0 ? i18n.text020 : i18n.text033 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text026 }}</view>
						</view>
						<view
							class="pay-list border-bottom height border-bottom-none"
							:key="tab.id"
							:data-current="index"
							v-for="(tab, index) in tabBarsPayPrice"
							@click="HiddenShare(index, tab.id, tab.name)"
						>
							<image :src="tab.src" mode="" class="icon-img"></image>
							<text class="uni-font-size text-users">{{ tab.name }}</text>
							<view v-if="tabIndexPay == 0">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="payment.PayIndex == tab.id"></uni-icons>
							</view>
							<view v-if="tabIndexPay == 1">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.PayIndex == tab.id"></uni-icons>
							</view>
						</view>
					</view>
					<!-- 定价方式 -->
					<view class="height" v-if="handleShare == 2">
						<view class="list-box-share borderBottom height" style="margin-bottom: 0;">
							<view class="pull-left">{{ i18n.text02 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text026 }}</view>
						</view>
						<view class="pay-list border-bottom height" @click="HiddenShare(0,0,$t('orderUp.text027'))">
							<text class="uni-font-size text-users">{{ i18n.text027 }}</text>
							<view v-if="tabIndexPay == 0">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="payment.pricing == 0"></uni-icons>
							</view>
							<view v-if="tabIndexPay == 1">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.pricing == 0"></uni-icons>
							</view>
						</view>
						<view class="pay-list height" @click="HiddenShare(1,1,$t('orderUp.text028'))" style="padding-bottom: 0;">
							<text class="uni-font-size text-users">{{ i18n.text028 }}</text>
							<view v-if="tabIndexPay == 0">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="payment.pricing == 1"></uni-icons>
							</view>
							<view v-if="tabIndexPay == 1">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.pricing == 1"></uni-icons>
							</view>
						</view>
					</view>
					<!-- 认证等级 -->
					<view class="height" v-if="handleShare == 3">
						<view class="list-box-share borderBottom height" style="margin-bottom: 0;">
							<view class="pull-left">{{ i18n.text016 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text026 }}</view>
						</view>
						<view class="pay-list border-bottom height" @click="HiddenShare(0,0,$t('orderUp.text036'))">
							<text class="uni-font-size text-users">{{ i18n.text029 }}</text>
							<view v-if="tabIndexPay == 0">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="payment.level == 0"></uni-icons>
							</view>
							<view v-if="tabIndexPay == 1">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.level == 0"></uni-icons>
							</view>
						</view>
						<view class="pay-list height " @click="HiddenShare(1,1,$t('orderUp.text036'))" style="padding-bottom: 0;">
							<text class="uni-font-size text-users">{{ i18n.text030 }}</text>
							<view v-if="tabIndexPay == 0">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="payment.level == 1"></uni-icons>
							</view>
							<view v-if="tabIndexPay == 1">
								<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.level == 1"></uni-icons>
							</view>
						</view>
					</view>
					<!-- 是否t+1 -->
					<view class="height" v-if="handleShare == 4">
						<view class="list-box-share borderBottom height" style="margin-bottom: 0;">
							<view class="pull-left">{{ i18n.text034 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text026 }}</view>
						</view>
						<view class="pay-list border-bottom height" @click="HiddenShare(0,0,$t('orderUp.text036'))" >
							<text class="uni-font-size text-users">{{ i18n.text036 }}</text>
							<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.status == 0"></uni-icons>
						</view>
						<view class="pay-list height " @click="HiddenShare(1,1,$t('orderUp.text037'))" style="padding-bottom: 0;">
							<text class="uni-font-size text-users">{{ i18n.text037 }}</text>
							<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.status == 1"></uni-icons>
						</view>
					</view>
					<!-- 收款账号 -->
					<view class="height" v-if="handleShare == 5">
						<view class="list-box-share borderBottom height" style="margin-bottom: 0;">
							<view class="pull-left" v-if="sell.PayIndex == 1">{{ i18n.text0233 }}</view>
							<view class="pull-left" v-if="sell.PayIndex == 2">{{ i18n.text0222 }}</view>
							<view class="pull-left" v-if="sell.PayIndex == 3">{{ i18n.text0211 }}</view>
							<view class="cancel pull-right" @click.stop="handleHiddenShare">{{ i18n.text026 }}</view>
						</view>
						<view class="height">
							<view class="pay-list border-bottom height border-bottom-none" @click="HiddenShare(index,item.tid,item.text)" v-if="sell.PayIndex == 1" v-for="(item,index) in dataZFB">
								<text class="uni-font-size text-users">{{ item.text }}</text>
								<view class="pull-right" v-if="sell.tid == item.tid">
									<uni-icons type="checkmarkempty" size="14" color="#de6334" class="pull-right" ></uni-icons>
								</view>
							</view>
							<view class="pay-list height" v-if="dataZFB.length == 0 && sell.PayIndex == 1" style="text-align: center;color: #999;"> {{ i18n.text039 }} </view>
						</view>
						<view class="height">
							<view class="pay-list border-bottom height border-bottom-none" @click="HiddenShare(index,item.tid,item.text)" v-if="sell.PayIndex == 2" v-for="(item,index) in dataYH">
								<text class="uni-font-size text-users">{{ item.text }}</text>
								<view class="pull-right" v-if="sell.tid == item.tid">
									<uni-icons type="checkmarkempty" size="14" color="#de6334" class="pull-right" ></uni-icons>
								</view>
							</view>
							<view class="pay-list height" v-if="dataYH.length == 0 && sell.PayIndex == 2" style="text-align: center;color: #999;"> {{ i18n.text039 }} </view>
						</view>
						<view class="height">
							<view class="pay-list border-bottom height border-bottom-none" @click="HiddenShare(index,item.tid,item.text)" v-if="sell.PayIndex == 3" v-for="(item,index) in dataWX">
								<text class="uni-font-size text-users">{{ item.text }}</text>
								<view class="pull-right" v-if="sell.tid == item.tid">
									<uni-icons type="checkmarkempty" size="14" color="#de6334" class="pull-right" ></uni-icons>
								</view>
							</view>
							<view class="pay-list height" v-if="dataWX.length == 0 && sell.PayIndex == 3" style="text-align: center;color: #999;"> {{ i18n.text039 }} </view>
						</view>
					<!-- 	
						<view class="pay-list height " @click="HiddenShare(1,1,$t('orderUp.text037'))" style="padding-bottom: 0;">
							<text class="uni-font-size text-users">{{ i18n.text037 }}</text>
							<uni-icons type="checkmarkempty" size="14" :color="tabIndexPay == 0 ? '#06b572' : '#de6334'" class="pull-right" v-if="sell.status == 1"></uni-icons>
						</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import api from '@/api/index.js';
import { TOAST, SET_STORAGE, GET_STORAGE, REMOVE_STORAGE } from '@/common/globalConfig.js';
export default {
	data() {
		return {
			
			unitPriced: '0',
			shareState: false,
			handleShare: '',
			// 挂单start
			buyShow: {
				yinhangka: true,
				zhifubao: false,
				weixin: false
			},
			sellShow: {
				yinhangka: true,
				zhifubao: false,
				weixin: false
			},
			payment: {
				aliPayLimit: '', //Momo付款限额
				aliPayPrice: '', //Momo付款单价
				bankPayLimit: '', //银行卡付款限额
				bankPayPrice: '', //银行卡付款单价
				weixinPayLimit: '', //微信付款限额
				weixinPayPrice: '', //微信付款单价
				buyCount: '', //购买数量

				pricing: 0, //定价方式 固定价格 浮动价格
				floating: '',
				unitPrice: '',
				unit: '',
				payAll: '',
				payAllw: '',
				payAllx: '',
				level: 0,
				textarea: '',
				pay: '',
				PayIndex:2,//支付方式 索引
			},
			sell: {
				aliPayPrice: '', //支付宝收款单价
				weixinPrice: '', //微信收款单价
				bankPayPrice: '', //银行卡收款单价
				saleCount: '', //出售数量

				pricing: 0, //定价方式 固定价格 浮动价格
				floating: '',
				unitPrice: '',
				unit: '',
				payAll: '',
				payAllw: '',
				payAllx: '',
				level:0,
				textarea: '',
				pay: '',
				status:0,//是否t+1 索引
				PayIndex:2,//支付方式 索引
				tid:""
			},
			receiveAccountId: '', // 设置收款账户
			receiveAccount: '',
			checkeds: false,
			checked: false,
			show: false,
			shows: false,
			// 挂单end

			loadMore: true,
			noMsg: true,
			Price: -1,
			PriceS: -1,
			tabIndexPay: 0,
			// 支付方式
			tabBarsPayPrice: [
				{
					name: this.$t('orderUp.text27'),
					id: '2',
					src: '../../static/icon/pay_icon3.png'
				},
				{
					name: this.$t('orderUp.text26'),
					id: '1',
					src: '../../static/icon/alipay_icon.png'
				},
				{
					name: this.$t('orderUp.text56'),
					id: '3',
					src: '../../static/icon/wechat_icon.png'
				}
			],
			tabBarPay: [
				{
					name: this.$t('orderUp.text28'),
					id: '0'
				},
				{
					name: this.$t('orderUp.text29'),
					id: '1'
				}
			],
			tabBarsPayPriceArr: ['2'],
			tabBarsPayPriceArrS: ['2'],
			dialogContent: '',
			tabsOpenPay: false,
			tabsOpen: false,
			tabIndexM: 0,
			tabsOpenM: false,
			dialogContent: '',
			BarPayPriceNum: '',
			msgType: 'success',
			unitPrice: '',
			dataZFB: [],
			dataYH: [],
			dataWX: [],
			tid: 0,
			convertMoney: '',
			walletBalance: '',
			minBuyOrderCount: '',
			minSaleOrderCount: '',
			minBuyOrderCountSTR: '',
			minSaleOrderCountSTR: ''
		};
	},
	computed: {
		i18n() {
			return this.$t('orderUp');
		}
	},
	components: { uniIcons, uniPopup },
	onLoad() {
		uni.setNavigationBarTitle({
			title: this.$t('orderUp.text30')
		});
		this.getUSDTPrice(); // 获取单价
		this.getAutoSettingBuyFunftion(1);
		this.getReceiveAccountListFunction();
		this.getMyAssetsItemFunction();
	},
	onPullDownRefresh() {
		let _this = this;
		setTimeout(() => {
			if (this.tabIndexPay == '0') {
				this.getAutoSettingBuyFunftion();
			}
			if (this.tabIndexPay == '1') {
				this.getAutoSettingSaleftion();
			}
			this.getMyAssetsItemFunction();
			this.getUSDTPrice();
			uni.stopPullDownRefresh();
		}, 300);
	},
	mounted() {},
	methods: {
		// 底部弹框start
		// 显示
		handleShowShare(val) {
			this.shareState = true;
			this.handleShare = val;
		},
		// 隐藏
		handleHiddenShare() {
			this.shareState = false;
		},
		// 底部菜单选项
		HiddenShare(index, id, name) {
			if (this.tabIndexPay == 0) {
				console.log('我要买');
				if (this.handleShare == 1) {
					console.log(index, id, name);
					this.payment.PayIndex = id;
				}
				if (this.handleShare == 2) {
					this.payment.pricing = id;
				}
				if (this.handleShare == 3) {
					this.payment.level = id;
				}
			}
			if (this.tabIndexPay == 1) {
				console.log('我要卖');
				if (this.handleShare == 1) {
					console.log(index, id, name);
					this.sell.PayIndex = id;
					this.receiveAccount = "";
					this.getReceiveAccountListFunction();
				}
				if (this.handleShare == 2) {
					this.sell.pricing = id;
				}
				if (this.handleShare == 3) {
					this.sell.level = id;
				}
				if (this.handleShare == 4) {
					this.sell.status = id;
				}
				if (this.handleShare == 5) {
					this.sell.tid = id;
					this.receiveAccount = name
				}
			}
			this.handleHiddenShare();
		},
		// 底部弹框end
		bindTextAreaBlur: function(e) {
			console.log(e.detail.value);
		},
		async getMyAssetsItemFunction() {
			uni.showLoading({ title: this.$t('myUser.text13'), mask: true });
			let res = await api.getMyAssetsItemHttp({
				coinSymbol: 'USDT'
			});
			if (res.code === '000') {
				uni.hideLoading();
				this.convertMoney = +res.data.convertMoney;
				this.walletBalance = +res.data.walletBalance;
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		async getUSDTPrice() {
			uni.showLoading({ title: this.$t('index.text27'), mask: true });
			let res = await api.getUSDTPrice({});
			if (res.code === '000') {
				uni.hideLoading();
				this.unitPriced = res.data.usdtPrice;
				this.payment.unitPrice = res.data.usdtPrice;
				this.sell.unitPrice = res.data.usdtPrice;
				this.minBuyOrderCount = +res.data.minBuyOrderCount;
				this.minBuyOrderCountSTR = this.$t('orderUp.text3') + '，' + res.data.minBuyOrderCount + '个起';
				this.minSaleOrderCount = +res.data.minSaleOrderCount;
				this.minSaleOrderCountSTR = this.$t('orderUp.text19') + '，' + res.data.minSaleOrderCount + '个起';
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		pickerChangeYH(e) {
			this.receiveAccountId = this.dataYH[e.target.value].tid;
			this.receiveAccount = this.dataYH[e.target.value].text;
		},
		pickerChangeZFB(e) {
			this.receiveAccountId = this.dataZFB[e.target.value].tid;
			this.receiveAccount = this.dataZFB[e.target.value].text;
		},
		pickerChangeWX(e) {
			this.receiveAccountId = this.dataWX[e.target.value].tid;
			this.receiveAccount = this.dataWX[e.target.value].text;
		},
		cancelledButton() {
			uni.navigateTo({
				url: '/pages/upOrder/cancelledRecorded'
			});
		},
		// 1 2 购买 1 3 售卖 input框
		navBack() {
			uni.navigateBack();
		},
		tabBarPayButton(type) {},
		switch1Change: function(e) {
			if (e.target.value == false) {
				this.autoBuyCloseFunftion();
				return;
			}
			if (e.target.value == true) {
				return;
			}
		},
		switch2Change: function(e) {
			if (e.target.value == false) {
				this.autoSaleCloseFunftion();
				return;
			}
			if (e.target.value == true) {
				return;
			}
		},
		async autoBuyCloseFunftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.autoBuyCloseHttp({ lang: system_info.language });
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text32'));
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		async autoSaleCloseFunftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			const system_info = GET_STORAGE('system_info');
			let res = await api.autoSaleCloseHttp({ lang: system_info.language });
			if (res.code === '000') {
				this.$alert(this.$t('orderUp.text33'));
				uni.hideLoading();
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		//自动挂单购买
		async autoBuyFunftion(status) {
			if (this.payment.buyCount < this.minBuyOrderCount) {
				this.$alert(this.$t('orderUp.text67'));
				return;
			}
			// if(this.walletBalance < this.minBuyOrderCount){
			// 	this.$alert(this.$t('orderUp.text69'));
			// 	return;
			// }
			const system_info = GET_STORAGE('system_info');
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			var obj = {};
			if (this.tabBarsPayPriceArr.toString() == '1') {
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: this.payment.aliPayLimit,
					aliPayPrice: this.payment.aliPayPrice,
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit: '',
					bankPayPrice: '',
					weixinPayLimit: '',
					weixinPayPrice: '',
					status: status
				};
			} else if (this.tabBarsPayPriceArr.toString() == '2') {
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: '',
					aliPayPrice: '',
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit: this.payment.bankPayLimit,
					bankPayPrice: this.payment.bankPayPrice,
					weixinPayLimit: '',
					weixinPayPrice: '',
					status: status
				};
			} else if (this.tabBarsPayPriceArr.toString() == '3') {
				obj = {
					buyCount: this.payment.buyCount,
					aliPayLimit: '',
					aliPayPrice: '',
					lang: system_info.language,
					payType: this.tabBarsPayPriceArr.toString(),
					bankPayLimit: '',
					bankPayPrice: '',
					weixinPayLimit: this.payment.weixinPayLimit,
					weixinPayPrice: this.payment.weixinPayPrice,
					status: status
				};
			}
			let res = await api.autoBuyHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text46'));
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		// 自动出售挂单
		async autoSaleFunftion(status) {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			// system_info.language
			const system_info = GET_STORAGE('system_info');
			var obj = {};
			let res = await api.autoSaleHttp(obj);
			if (res.code === '000') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text47'));
			}
			if (res.code !== '000') {
				uni.hideLoading();
				this.$alert(res.errorMessage);
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		//挂单购买设置回显
		async getAutoSettingBuyFunftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			let res = await api.getAutoSettingBuyHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.payment.buyCount = res.data.buyCount;
				this.payment.aliPayLimit = res.data.aliPayLimit;
				this.payment.aliPayPrice = res.data.aliPayPrice;
				this.payment.buyCount = res.data.buyCount;
				this.payment.bankPayLimit = res.data.bankPayLimit;
				this.payment.bankPayPrice = res.data.bankPayPrice;
				if (res.data.status == '1') {
					this.checked = true;
				} else {
					this.checked = false;
				}
			}
			if (res.code !== '000') {
				uni.hideLoading();
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		//挂单出售设置回显
		async getAutoSettingSaleftion() {
			uni.showLoading({ title: this.$t('orderUp.text31'), mask: true });
			let res = await api.getAutoSettingSaleHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.sell.saleCount = res.data.saleCount;
				this.sell.aliPayPrice = res.data.aliPayPrice;
				this.sell.bankPayPrice = res.data.bankPayPrice;
				if (res.data.status == '1') {
					this.checkeds = true;
				} else {
					this.checkeds = false;
				}
				this.shows = true;
			}
			if (res.code !== '000') {
				uni.hideLoading();
			}
			if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('orderUp.text600'));
			}
		},
		// 获取用户收款账户列表
		async getReceiveAccountListFunction() {
			uni.showLoading({ title: this.$t('collection.text13'), mask: true });
			let res = await api.getReceiveAccountListHttp({});
			if (res.code === '000') {
				uni.hideLoading();
				this.dataZFB = []
				this.dataYH = []
				this.dataWX = []
				if (res.data != '') {
					for (var i = 0; i < res.data.length; i++) {
						let d = {
							// bankNum alipayNum
							// text: res.data[i].alipayNum,
							tid: res.data[i].id
						};
						if (res.data[i].receiveAccountType == '1') {
							d.text = res.data[i].alipayNum;
							this.dataZFB.push(d);
						} else if (res.data[i].receiveAccountType == '2') {
							d.text = res.data[i].bankNum;
							this.dataYH.push(d);
						} else {
							d.text = res.data[i].wechatNum;
							this.dataWX.push(d);
						}
						console.log("this.dataZFB",this.dataZFB)
						console.log("this.dataYH",this.dataYH)
						console.log("this.dataWX",this.dataWX)
					}
					return;
				}
				if (res.data == '') {
					return;
				}
			} else if (res.code === '500') {
				uni.hideLoading();
				this.$alert(this.$t('collection.text600'));
			} else {
				uni.hideLoading();
				uni.showToast({ title: res.errorMessage, icon: 'none' });
			}
		},
		// 出售
		tabBarPayPriceS(index) {
			this.tabBarsPayPriceArrS = [];
			this.receiveAccountId = '';
			this.tabBarsPayPriceArrS.push(index);
			if (this.tabBarsPayPriceArrS.length == 0) {
				this.$alert(this.$t('orderUp.text50'));
				this.tabBarsPayPriceArrS = [];
				this.tabBarsPayPriceArrS.push(index);
				return;
			}
			if (this.tabBarsPayPriceArrS.includes('1')) {
				this.sellShow.zhifubao = true;
			} else {
				this.sellShow.zhifubao = false;
			}
			if (this.tabBarsPayPriceArrS.includes('2')) {
				this.sellShow.yinhangka = true;
			} else {
				this.sellShow.yinhangka = false;
			}
			if (this.tabBarsPayPriceArrS.includes('3')) {
				this.sellShow.weixin = true;
			} else {
				this.sellShow.weixin = false;
			}
		},
		//购买 Momo与银行卡
		tabBarPayPrice(index) {
			this.tabBarsPayPriceArr = [];
			this.tabBarsPayPriceArr.push(index);
			if (this.tabBarsPayPriceArr.length == 0) {
				this.$alert(this.$t('orderUp.text49'));
				this.tabBarsPayPriceArr = [];
				this.tabBarsPayPriceArr.push(index);
				return;
			}
			if (this.tabBarsPayPriceArr.includes('1')) {
				this.buyShow.zhifubao = true;
			} else {
				this.buyShow.zhifubao = false;
			}
			if (this.tabBarsPayPriceArr.includes('2')) {
				this.buyShow.yinhangka = true;
			} else {
				this.buyShow.yinhangka = false;
			}
			if (this.tabBarsPayPriceArr.includes('3')) {
				this.buyShow.weixin = true;
			} else {
				this.buyShow.weixin = false;
			}
		},
		formSubmitPayment: function(e) {
			var formData = e.detail.value;
			if (this.tabBarsPayPriceArr.toString() == '1') {
				if (this.payment.aliPayLimit == null || this.payment.aliPayLimit == '') {
					this.$alert(this.$t('orderUp.text34'));
				} else if (this.payment.aliPayPrice == null || this.payment.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text35'));
				} else if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else if (this.tabBarsPayPriceArr.toString() == '2') {
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.bankPayPrice == null || this.payment.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text41'));
				} else if (this.payment.bankPayLimit == null || this.payment.bankPayLimit == '') {
					this.$alert(this.$t('orderUp.text40'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else if (this.tabBarsPayPriceArr.toString() == '3') {
				// 微信 weixinPayPrice weixinPayLimit
				console.log('wechat');
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.weixinPayPrice == null || this.payment.weixinPayPrice == '') {
					this.$alert(this.$t('orderUp.text65'));
				} else if (this.payment.weixinPayLimit == null || this.payment.weixinPayLimit == '') {
					this.$alert(this.$t('orderUp.text64'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			} else {
				if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.bankPayLimit == null || this.payment.bankPayLimit == '') {
					this.$alert(this.$t('orderUp.text40'));
				} else if (this.payment.bankPayPrice == null || this.payment.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text41'));
				} else if (this.payment.buyCount == null || this.payment.buyCount == '') {
					this.$alert(this.$t('orderUp.text36'));
				} else if (this.payment.aliPayLimit == null || this.payment.aliPayLimit == '') {
					this.$alert(this.$t('orderUp.text34'));
				} else if (this.payment.aliPayPrice == null || this.payment.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text35'));
				} else if (formData.switch == true) {
					this.dialogContent = this.$t('orderUp.text37') + this.payment.buyCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text39'));
				}
			}
		},
		formSubmit: function(e) {
			var formData = e.detail.value;

			if (this.tabBarsPayPriceArrS.toString() == '1') {
				if (this.sell.saleCount == null || this.sell.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.aliPayPrice == null || this.sell.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text42'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else if (this.tabBarsPayPriceArrS.toString() == '2') {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.bankPayPrice == null || this.sell.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text45'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else if (this.tabBarsPayPriceArrS.toString() == '3') {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.weixinPrice == null || this.sell.weixinPrice == '') {
					this.$alert(this.$t('orderUp.text66'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			} else {
				if (formData.saleCount == null || formData.saleCount == '') {
					this.$alert(this.$t('orderUp.text48'));
				} else if (this.sell.bankPayPrice == null || this.sell.bankPayPrice == '') {
					this.$alert(this.$t('orderUp.text45'));
				} else if (this.sell.aliPayPrice == null || this.sell.aliPayPrice == '') {
					this.$alert(this.$t('orderUp.text42'));
				} else if (formData.switchs == true) {
					this.dialogContent = this.$t('orderUp.text43') + this.sell.saleCount + this.$t('orderUp.text38');
					this.toggleMessage('success');
				} else {
					this.$alert(this.$t('orderUp.text44'));
				}
			}
		},
		/**
		 * 对话框取消按钮
		 */
		dialogClose(done) {
			this.msgType = 'info';
			this.message = '点击了对话框的取消按钮';
			this.$refs.popupDialog.open();
			// 需要执行 done 才能关闭对话框
			done();
		},
		/**
		 * 对话框点击确认按钮
		 */
		dialogConfirm(done) {
			this.$refs.popupDialog.open();
			if (this.tabIndexPay == 0) {
				this.autoBuyFunftion('1');
			} else {
				this.autoSaleFunftion('1');
				this.tabBarsPayPriceArrS.toString();
			}
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
		ontabtapPay(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndexPay === index) {
				return;
			}
			this.tabIndexPay = index;
			if (this.tabIndexPay == 0) {
				this.getAutoSettingBuyFunftion();
			} else {
				this.getAutoSettingSaleftion();
			}
			this.tabsOpenPay = !this.tabsOpenPay;
		},
		async submitLoginFn() {
			this.$alert('提示信息');
		}
	}
};
</script>

<style lang="scss" scoped>
.fonSise {
	font-size: 28rpx;
}
.input-padding {
	padding-top: 15rpx;
}
.icon-margin {
	margin-top: 10rpx;
}
.form-input {
	border-bottom: 1px solid #ddd;
	padding-bottom: 15rpx;
}
.input-name {
	width: 25%;
	text-align: left;
}
.form-input-box {
	width: 60%;
}
// 挂单start
.setup {
	padding-bottom: 30rpx;
}
.lable-name {
	margin: 20rpx 0 10rpx;
}
.canelButton {
	margin-right: 20rpx;
}
.inputs-CNY {
	font-size: $uni-font-size;
	float: left;
	margin-left: 20rpx;
}
.form-inputs {
	width: 100%;
	border-bottom: 1px solid #ddd;
	border-radius: 10rpx;
	padding: 10rpx 0;
	float: left;
	// margin: 20rpx 0;
}
.uni-base-color-06b572 {
	background-color: $uni-base-color-06b572;
}
.uni-base-color-de6334 {
	background-color: $uni-base-color-de6334;
}
.uni-btn-v {
	border-radius: 10rpx;
	color: #fff;
	font-size: $uni-font-size;
	float: right;
	padding: 10rpx 20rpx;
	text-align: center;
	margin-top: 15rpx;
}
.content {
	.back-wither {
		box-shadow: 0 0 4rpx #999;
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 28rpx;
		.size {
			font-weight: bold;
		}
		.user-pay {
			font-size: 26rpx;
			color: #06b572;
		}
		.user-pays {
			font-size: 26rpx;
			color: #de6334;
		}
		.uedt {
			margin-left: 10rpx;
			font-size: 26rpx;
		}
		.switch {
			float: right;
		}
		.pay-cny {
			font-size: $uni-font-size;
			float: left;
		}
		.view-top {
			width: 100%;
			.uni-font-size {
				float: right;
			}
		}
		.text-users {
			display: block;
			float: left;
			line-height: 30rpx;
		}
		.border-bottom {
			padding: 20rpx 0;
		}
		.up-pay {
			padding: 20rpx 0 0;
			font-size: $uni-font-size;
		}
		.icon-img {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
			display: block;
			float: left;
		}
		.arrowright {
			float: right;
		}
		.pay-list {
			padding-top: 0 !important;
			padding-bottom: 20rpx;
		}
	}
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
// 挂单 end

.header {
	padding: 20rpx 0;
	height: 80rpx;
	margin-bottom: 20rpx;
}
.pay-lists {
	color: #ccc !important;
}
.pay-actives {
	position: absolute;
	left: 20rpx;
	top: 24rpx;
}
.remonk-box {
	max-height: 480rpx;
	overflow: auto;
	margin-top: 20rpx;
	.remonk-list {
		margin: 10rpx 0;
	}
}
.footer-Bu {
	position: fixed;
	bottom: 0;
	right: 0;
	border-top: 1px solid #ddd;
	left: 0;
	background: #fff;
	.button {
		border-radius: 10rpx;
		height: 80rpx;
		background: #06b572;
		text-align: center;
		color: #fff;
		font-size: 26rpx;
		line-height: 80rpx;
		margin: 20rpx;
	}
}

.pays-list {
	margin: 18rpx 0;
}
.pay-price {
	float: right;
	color: #06b572;
	font-size: 30rpx;
}
.pay-prices {
	font-size: 30rpx;
	float: right;
}
.pay-box {
	height: 155rpx;
	margin-top: 10rpx;
	.pay-list:nth-child(2) {
		margin: 0 5% 0;
	}
	.pay-active {
		overflow: hidden;
		color: #06b572 !important;
		border: 1px solid #06b572 !important;
		position: relative;
		.checkmarkempty {
			width: 120rpx;
			height: 80rpx;
			position: absolute;
			bottom: -50rpx;
			right: -50rpx;
			background: #06b572;
			transform: rotate(140deg);
		}
		.form-clear-icons {
			display: block;
			margin-left: -20rpx;
			margin-top: -10rpx;
			transform: rotate(-140deg) !important;
		}
	}
	.pay-activeS {
		overflow: hidden;
		color: #de6334 !important;
		border: 1px solid #de6334 !important;
		position: relative;
		.checkmarkempty {
			width: 120rpx;
			height: 80rpx;
			position: absolute;
			bottom: -50rpx;
			right: -50rpx;
			background: #de6334;
			transform: rotate(140deg);
		}
		.form-clear-icons {
			display: block;
			margin-left: -20rpx;
			margin-top: -10rpx;
			transform: rotate(-140deg) !important;
		}
	}
	.pay-list {
		border: 1px solid #eef0f7;
		width: 30%;
		height: 150rpx;
		float: left;
		font-size: $uni-font-size;
		color: #ccc;
		line-height: 150rpx;
		border-radius: 10rpx;
		background: #eef0f7;
		text-align: center;
		position: relative;
	}
}
.uni-font-size {
	font-size: $uni-font-size;
	color: $uni-textJ-color;
}
.form-input {
	// border: none;
	// border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	// border-radius: 10rpx;
	// height: 90rpx;
	// padding-top: 24rpx;
	// padding-left: 60rpx;
	// padding-right: 120rpx;
	// position: relative;
	// margin-bottom: 30rpx;
	.input-Eos {
		width: 120rpx;
		font-size: 26rpx;
		color: #06b572;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		text-align: center;
		line-height: 85rpx;
	}
}
.content {
	background: #fff;
	.text-b {
		color: $uni-textJ-color;
		float: left;
		line-height: 32rpx;
	}
	.text-s {
		float: left;
		color: $uni-textJ-color;
		font-size: 24rpx;
		line-height: 58rpx;
		margin-left: 20rpx;
	}
	.help {
		margin: 20rpx 0;
	}
	.form-clear-icon {
		display: block;
		float: left;
	}
	.text-eos {
		color: $uni-textJ-color;
		font-size: 22rpx;
		display: block;
		float: left;
		line-height: 1;
		margin-left: 10rpx;
		.text-number {
			color: #333;
		}
	}
}
.borderBottom {
	border-bottom: 1px solid #ddd;
	padding-bottom: 24rpx;
	margin-bottom: 24rpx;
}
.scroll-h {
	width: 100%;
	height: 80rpx;
	flex-direction: row;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item:first-child .uni-tab-item-title {
	border-right: 2px solid #dddddd;
	padding-right: 12rpx;
}
.uni-tab-item:last-child .uni-tab-item-title {
	padding-left: 12rpx;
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	text-align: center;
}
.uni-tab-item-title {
	color: $uni-textJ-color;
	font-weight: bold;
	font-size: 26rpx;
	height: 80rpx;

	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.uni-tab-item-title-active,
.uni-tab-item-title-activeM,
.uni-tab-item-title-active-pay {
	color: #333 !important;
}
.uni-tab-item-pay {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	text-align: center;
}
.uni-tab-item-pay:first-child .text-b {
	border-right: 2px solid #dddddd;
	padding-right: 12rpx;
}
.uni-tab-item-pay .text-b {
	border-right: none !important;
	font-size: 24rpx;
	transition: all 0.1s linear;
}
.uni-tab-item-title-active-pay {
	font-size: 40rpx !important;
}
.uni-tab-item-pay {
	padding-left: 12rpx;
	vertical-align: middle;
}
.buttonF {
	background: #de6334 !important;
}
.switch-pay {
	width: 100%;
	color: #06b572;
	text-align: right;
	font-size: 24rpx;
}
.switch-pay .uni-icons {
	vertical-align: text-bottom;
}
.switch-pay2 {
	color: #de6334;
}

.pickerPlugin {
	margin: 20rpx 0;
	.pickerInput {
		margin-top: 20rpx;
	}
}
</style>
