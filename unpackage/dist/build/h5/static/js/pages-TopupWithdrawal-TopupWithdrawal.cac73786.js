(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-TopupWithdrawal-TopupWithdrawal"],{"274a":function(t,i,n){"use strict";n.r(i);var a=n("a734"),e=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(i,t,(function(){return a[t]}))}(r);i["default"]=e.a},3121:function(t,i,n){"use strict";n.r(i);var a=n("3412"),e=n("274a");for(var r in e)"default"!==r&&function(t){n.d(i,t,(function(){return e[t]}))}(r);n("a8a5");var s,c=n("f0c5"),o=Object(c["a"])(e["default"],a["b"],a["c"],!1,null,"5c5d89f7",null,!1,a["a"],s);i["default"]=o.exports},3412:function(t,i,n){"use strict";n.d(i,"b",(function(){return e})),n.d(i,"c",(function(){return r})),n.d(i,"a",(function(){return a}));var a={uniIcons:n("0683").default},e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-uni-view",{},[n("v-uni-view",{staticClass:"status_bar"},[n("v-uni-view",{staticClass:"top_view"})],1),n("v-uni-view",{staticClass:"page-top-head flex-row"},[n("v-uni-view",{staticClass:"box-header margin-left"},[n("uni-icons",{staticStyle:{color:"#000"},attrs:{type:"arrowleft",size:"24"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.navBack.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"box-header"},[n("v-uni-view",{staticClass:"head-title"},[t._v(t._s(t.i18n.text1))])],1),n("v-uni-view",{staticClass:"box-header option"})],1),n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"account-boxs height"},[n("v-uni-view",{staticClass:"account-list height border-bottom",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.linkButtonSZ.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"pull-left"},[t._v("USDT")]),n("uni-icons",{staticClass:"form-clear-icon arrowright pull-right",attrs:{type:"arrowright",size:"16"}}),n("v-uni-text",{staticClass:"text-size text-sizeS pull-right"})],1)],1)],1)],1)},r=[]},"6ded":function(t,i,n){var a=n("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 头部标题文字颜色 */.content .account-box[data-v-5c5d89f7]{margin-top:%?35?%}.arrowright[data-v-5c5d89f7]{margin-top:%?8?%;color:#ccc}.account-size[data-v-5c5d89f7]{font-size:%?28?%;color:#86909a}.trit[data-v-5c5d89f7]{margin-left:%?45?%}.list-size[data-v-5c5d89f7]{margin:%?75?% 0 0;color:#86909a}.account-sizes[data-v-5c5d89f7]{font-size:%?28?%;color:#06b572;margin-left:%?10?%}.press[data-v-5c5d89f7]{width:%?20?%;height:%?10?%;width:100%;background:#ddd;-webkit-border-radius:%?100?%;border-radius:%?100?%;margin-top:%?20?%;position:relative}.press-box[data-v-5c5d89f7]{width:%?20?%;height:%?10?%;background:#06b572;-webkit-border-radius:%?100?%;border-radius:%?100?%;position:absolute;top:0}[data-v-5c5d89f7] uni-switch .uni-switch-input:after,\r\nuni-switch .uni-switch-input[data-v-5c5d89f7]:before{height:%?26?%}[data-v-5c5d89f7] uni-switch .uni-switch-input:after{width:%?26?%}[data-v-5c5d89f7] uni-switch .uni-switch-input{width:%?65?%;height:%?30?%}[data-v-5c5d89f7] uni-switch .uni-switch-input:after,\r\nuni-switch .uni-switch-input[data-v-5c5d89f7]:before{height:%?26?%}[data-v-5c5d89f7] uni-switch .uni-switch-input:before{width:%?62?%;height:%?26?%}[data-v-5c5d89f7] uni-switch .uni-switch-input.uni-switch-input-checked{background-color:#06b572!important;border-color:#06b572!important}',""]),t.exports=i},a734:function(t,i,n){"use strict";var a=n("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=a(n("0683")),r={data:function(){return{id:"",walletBalance:""}},computed:{i18n:function(){return this.$t("TopupWithdrawal")}},components:{uniIcons:e.default},onLoad:function(t){uni.setNavigationBarTitle({title:this.$t("TopupWithdrawal.text1")}),this.id=t.id,this.walletBalance=t.walletBalance},mounted:function(){},methods:{navBack:function(){uni.switchTab({url:"/pages/myUser/myUser"})},linkButtonSZ:function(){1!=this.id?2!=this.id||uni.navigateTo({url:"/pages/TopupWithdrawal/Withdrawal"}):uni.navigateTo({url:"/pages/TopupWithdrawal/Topup"})}}};i.default=r},a8a5:function(t,i,n){"use strict";var a=n("b733"),e=n.n(a);e.a},b733:function(t,i,n){var a=n("6ded");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var e=n("4f06").default;e("42bde30e",a,!0,{sourceMap:!1,shadowMode:!1})}}]);