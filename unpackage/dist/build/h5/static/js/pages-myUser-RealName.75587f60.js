(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-myUser-RealName"],{"0963":function(t,e,a){"use strict";a.r(e);var i=a("496e"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},1740:function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"uni-popup-share"},[a("v-uni-view",{staticClass:"uni-share-content"},[a("v-uni-view",{staticClass:"uni-share-content-box"},[t._l(t.bottomData,(function(e,i){return a("v-uni-view",{key:i,staticClass:"uni-share-content-item",on:{click:function(a){a.stopPropagation(),arguments[0]=a=t.$handleEvent(a),t.select(e,i)}}},[a("v-uni-text",{staticClass:"uni-share-text"},[t._v(t._s(e.text))])],1)})),a("v-uni-view",{staticClass:"back-color"})],2)],1),a("v-uni-view",{staticClass:"uni-share-button-box"},[a("v-uni-button",{staticClass:"uni-share-button",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.close.apply(void 0,arguments)}}},[t._v("取消")])],1)],1)},o=[]},"1fcd":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniPopupShare",props:{title:{type:String,default:"分享到"}},inject:["popup"],data:function(){return{bottomData:[{text:this.$t("RealName.text50"),id:"1"}]}},computed:{i18n:function(){return this.$t("RealName")}},created:function(){},methods:{select:function(t,e){var a=this;this.$emit("select",{item:t,index:e},(function(){a.popup.close()}))},close:function(){this.popup.close()}}};e.default=i},2149:function(t,e,a){"use strict";var i=a("dc16"),n=a.n(i);n.a},"341e":function(t,e,a){var i=a("9fae");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("20fd22e8",i,!0,{sourceMap:!1,shadowMode:!1})},4319:function(t,e,a){"use strict";a.r(e);var i=a("1740"),n=a("6173");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("2149");var r,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"767e5cb0",null,!1,i["a"],r);e["default"]=c.exports},"496e":function(t,e,a){"use strict";(function(t){var i=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("96cf");var n=i(a("1da1")),o=i(a("0683")),r=i(a("11a2")),s=i(a("4319")),c=(i(a("d69b")),i(a("833e"))),l=a("f21f"),u=i(a("3333")),p={data:function(){return{formData:{DocumentType:"",name:"",DocumentTypeNum:"",type:"",typeId:"",CityId:"",CityType:""},statusUrl:0,getLevelList:{},country:""}},computed:{i18n:function(){return this.$t("RealName")}},components:{uniIcons:o.default,uniPopupShare:r.default,uniPopupShareCity:s.default},onLoad:function(t){uni.setNavigationBarTitle({title:this.$t("RealName.text8")}),this.statusUrl=t.stauts,this.getRealNameInfoFunction(),this.getLevelListFunction()},mounted:function(){},methods:{navBack:function(){uni.navigateBack()},getRealNameInfoFunction:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:t.$t("RealName.text9"),mask:!0}),e.next=3,c.default.getRealNameInfoHttp({});case 3:a=e.sent,"000"===a.code?(uni.hideLoading(),null!=a.data&&(t.formData.DocumentTypeNum=a.data.cardNo,t.formData.name=a.data.realName,t.formData.CityType=a.data.country,i=(0,l.GET_STORAGE)("system_info"),"en"==i.language&&(t.formData.name=u.default.chineseToPinYin(a.data.realName)),"en"==i.language&&"YinDu"==a.data.country&&(t.formData.CityType=u.default.chineseToPinYin(a.data.country)),"YinDu"==a.data.country&&"en"!=i.language&&(t.formData.CityType="印度"),"1"==a.data.type&&(t.formData.typeId="1",t.formData.DocumentType=t.$t("RealName.text10")),"2"==a.data.type&&(t.formData.typeId="2",t.formData.DocumentType=t.$t("RealName.text11")))):"500"===a.code?(uni.hideLoading(),t.$alert(t.$t("RealName.text600"))):(uni.hideLoading(),uni.showToast({title:a.errorMessage,icon:"none"}));case 5:case"end":return e.stop()}}),e)})))()},getLevelListFunction:function(){var t=this;return(0,n.default)(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:t.$t("RealName.text9"),mask:!0}),e.next=3,c.default.getLevelListHttp({});case 3:a=e.sent,"000"===a.code?(uni.hideLoading(),null!=a.data&&(t.getLevelList=a.data[1])):"500"===a.code?(uni.hideLoading(),t.$alert(t.$t("RealName.text600"))):(uni.hideLoading(),t.$alert(a.errorMessage));case 5:case"end":return e.stop()}}),e)})))()},change:function(t){},confirmShare:function(){t.log("this.$refs.popupShare",this.$refs.popupShare),this.$refs.popupShare.open()},select:function(t,e){this.formData.DocumentType=t.item.text,this.formData.type=t.item.id,e()},changes:function(t){},confirmShares:function(){t.log("this.$refs.popupShares",this.$refs.popupShares),this.$refs.popupShares.open()},selects:function(t,e){this.formData.CityType=t.item.text,this.formData.CityId=t.item.id,e()},formSubmit:function(t){var e=this;return(0,n.default)(regeneratorRuntime.mark((function a(){var i,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:i=t.detail.value,n=/^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X|x)?$/,""==i.DocumentType?e.$alert(e.$t("RealName.text12")):""==i.formDataName?e.$alert(e.$t("RealName.text4")):i.DocumentType==e.$t("RealName.text10")&&(""==i.DocumentTypeNum?e.$alert(e.$t("RealName.text6")):n.test(i.DocumentTypeNum)?""==i.CityType?e.$alert(e.$t("RealName.text51")):(setTimeout((function(){uni.navigateTo({url:"/pages/myUser/userIdcard"})}),1e3),(0,l.SET_STORAGE)("formData",JSON.stringify(i))):e.$alert(e.$t("RealName.text13")));case 3:case"end":return a.stop()}}),a)})))()}}};e.default=p}).call(this,a("5a52")["default"])},6173:function(t,e,a){"use strict";a.r(e);var i=a("1fcd"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"82ba":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var i={uniIcons:a("0683").default,uniPopup:a("450c").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"status_bar"},[a("v-uni-view",{staticClass:"top_view"})],1),a("v-uni-view",{staticClass:"page-top-head flex-row"},[a("v-uni-view",{staticClass:"box-header margin-left"},[a("uni-icons",{staticStyle:{color:"#000"},attrs:{type:"arrowleft",size:"24"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navBack.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"box-header"},[a("v-uni-view",{staticClass:"head-title"},[t._v(t._s(t.i18n.text8))])],1),a("v-uni-view",{staticClass:"box-header option"})],1),2!=t.statusUrl?a("v-uni-view",{staticClass:"account-boxs height"},[a("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.formSubmit.apply(void 0,arguments)},reset:function(e){arguments[0]=e=t.$handleEvent(e),t.formReset.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"form-input border-bottom account-list",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmShare.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"label"},[t._v(t._s(t.i18n.text1))]),a("uni-icons",{staticClass:"form-clear-icon arrowright pull-right",attrs:{type:"arrowright",size:"16"}}),a("v-uni-view",{staticClass:"con-form"},[a("v-uni-input",{attrs:{placeholder:t.i18n.text2,disabled:"disabled","placeholder-class":"fomr-pla",name:"DocumentType"},model:{value:t.formData.DocumentType,callback:function(e){t.$set(t.formData,"DocumentType",e)},expression:"formData.DocumentType"}}),a("v-uni-input",{staticStyle:{display:"none"},attrs:{placeholder:t.i18n.text2,disabled:"disabled","placeholder-class":"fomr-pla",name:"typeId"},model:{value:t.formData.type,callback:function(e){t.$set(t.formData,"type",e)},expression:"formData.type"}})],1)],1),a("v-uni-view",{staticClass:"form-input border-bottom account-list"},[a("v-uni-view",{staticClass:"label"},[t._v(t._s(t.i18n.text3))]),a("v-uni-view",{staticClass:"con-form"},[a("v-uni-input",{attrs:{placeholder:t.i18n.text4,"placeholder-class":"fomr-pla",name:"formDataName"},model:{value:t.formData.name,callback:function(e){t.$set(t.formData,"name",e)},expression:"formData.name"}})],1)],1),a("v-uni-view",{staticClass:"form-input border-bottom account-list"},[a("v-uni-view",{staticClass:"label"},[t._v(t._s(t.i18n.text5))]),a("v-uni-view",{staticClass:"con-form"},[a("v-uni-input",{attrs:{placeholder:t.i18n.text6,"placeholder-class":"fomr-pla",name:"DocumentTypeNum",maxlength:"18"},model:{value:t.formData.DocumentTypeNum,callback:function(e){t.$set(t.formData,"DocumentTypeNum",e)},expression:"formData.DocumentTypeNum"}})],1)],1),a("v-uni-view",{staticClass:"form-input border-bottom account-list",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmShares.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"label"},[t._v(t._s(t.i18n.text05))]),a("uni-icons",{staticClass:"form-clear-icon arrowright pull-right",attrs:{type:"arrowright",size:"16"}}),a("v-uni-view",{staticClass:"con-form"},[a("v-uni-input",{attrs:{placeholder:t.i18n.text51,disabled:"disabled","placeholder-class":"fomr-pla",name:"CityType"},model:{value:t.formData.CityType,callback:function(e){t.$set(t.formData,"CityType",e)},expression:"formData.CityType"}}),a("v-uni-input",{staticStyle:{display:"none"},attrs:{placeholder:t.i18n.text51,disabled:"disabled","placeholder-class":"fomr-pla",name:"CityId"},model:{value:t.formData.CityId,callback:function(e){t.$set(t.formData,"CityId",e)},expression:"formData.CityId"}})],1)],1),a("uni-popup",{ref:"popupShare",attrs:{id:"popupShare",type:"share"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)}}},[a("uni-popup-share",{attrs:{title:"分享到"},on:{select:function(e){arguments[0]=e=t.$handleEvent(e),t.select.apply(void 0,arguments)}}})],1),a("uni-popup",{ref:"popupShares",attrs:{id:"popupShares",type:"share"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.changes.apply(void 0,arguments)}}},[a("uni-popup-share-city",{attrs:{title:"分享到"},on:{select:function(e){arguments[0]=e=t.$handleEvent(e),t.selects.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"footer-button"},[a("v-uni-button",{staticClass:"button",attrs:{"form-type":"submit"}},[t._v(t._s(t.i18n.text7))])],1)],1)],1):t._e(),2==t.statusUrl?a("v-uni-view",{staticClass:"account-boxs height"},[a("v-uni-view",{staticClass:"form-input account-list"},[a("v-uni-view",{staticClass:"label",staticStyle:{"margin-bottom":"0"}},[a("uni-icons",{staticClass:"form-clear-icon arrowright header-icon",attrs:{type:"person-filled",size:"16"}}),t._v(t._s(t.i18n.text8)),a("v-uni-view",{staticClass:"pull-right",staticStyle:{color:"#06b572"},attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.i18n.text08))])],1)],1),a("v-uni-view",{staticClass:"form-input account-list form-inputs"},[a("v-uni-text",{staticClass:"color-999"},[t._v(t._s(t.i18n.text3))]),a("v-uni-view",{staticClass:"pull-right right-titles",attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.formData.name||t.i18n.text008))])],1),a("v-uni-view",{staticClass:"form-input account-list form-inputs"},[a("v-uni-text",{staticClass:"color-999"},[t._v(t._s(t.i18n.text5))]),a("v-uni-view",{staticClass:"pull-right right-titles",attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.formData.DocumentTypeNum.substr(0,3)+"******"+t.formData.DocumentTypeNum.substr(14)||t.i18n.text008))])],1),a("v-uni-view",{staticClass:"form-input border-bottom account-list "},[a("v-uni-text",{staticClass:"color-999"},[t._v(t._s(t.i18n.text05))]),a("v-uni-view",{staticClass:"pull-right right-titles",attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.formData.CityType||t.i18n.text008))])],1),a("v-uni-view",{staticClass:"form-input account-list height"},[a("uni-icons",{staticClass:"form-clear-icon arrowright pull-left header-icon",staticStyle:{color:"#06b572"},attrs:{type:"checkmarkempty",size:"16"}}),a("v-uni-view",{staticClass:"pull-left title-size",attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.i18n.text09)+t._s(t.getLevelList.cashAmountLimit)+" U);")])],1),a("v-uni-view",{staticClass:"form-input account-list height"},[a("uni-icons",{staticClass:"form-clear-icon arrowright pull-left header-icon",staticStyle:{color:"#06b572"},attrs:{type:"checkmarkempty",size:"16"}}),a("v-uni-view",{staticClass:"pull-left title-size",attrs:{type:"arrowright",size:"16"}},[t._v(t._s(t.i18n.text010)+t._s(t.getLevelList.tradeLimit)+" CNY)")])],1)],1):t._e()],1)},o=[]},"9dfd":function(t,e,a){"use strict";a.r(e);var i=a("82ba"),n=a("0963");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("a391");var r,s=a("f0c5"),c=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"01074b8e",null,!1,i["a"],r);e["default"]=c.exports},"9fae":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */\r\n/* 头部标题文字颜色 */.form-inputs[data-v-01074b8e]{padding-bottom:0}.title-size[data-v-01074b8e],\r\n.right-titles[data-v-01074b8e]{font-size:%?26?%}.header-icon[data-v-01074b8e]{margin-right:%?20?%}.color-999[data-v-01074b8e]{color:#999;font-size:%?26?%}.content[data-v-01074b8e]{padding:0!important}.content .account-box[data-v-01074b8e]{margin-top:%?35?%}.account-boxs[data-v-01074b8e]{padding:0 %?30?%}.arrowright[data-v-01074b8e]{margin-top:%?8?%;color:#ccc}.account-size[data-v-01074b8e]{font-size:%?28?%;color:#86909a}.form-input .label[data-v-01074b8e]{margin-bottom:%?20?%;font-size:%?26?%}.footer-button[data-v-01074b8e]{position:fixed;bottom:%?10?%;right:%?30?%;left:%?30?%;background-color:#fff}.button[data-v-01074b8e]{-webkit-border-radius:5px;border-radius:5px;height:46px;background:#06b572;text-align:center;color:#fff;font-size:15px;line-height:46px;margin:11px 0}',""]),t.exports=e},a391:function(t,e,a){"use strict";var i=a("341e"),n=a.n(i);n.a},d9cc:function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,".uni-popup-share[data-v-767e5cb0]{background-color:#fff}.uni-share-title[data-v-767e5cb0]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;height:40px}.uni-share-title-text[data-v-767e5cb0]{font-size:14px;color:#666}.uni-share-content[data-v-767e5cb0]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.uni-share-content-box[data-v-767e5cb0]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:100%}.uni-share-content-item[data-v-767e5cb0]:first-child{border-bottom:1px solid #ddd}.uni-share-content-item[data-v-767e5cb0]:last-child{margin-bottom:%?30?%}.uni-share-content-item[data-v-767e5cb0]{width:100%;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding:10px 0;-webkit-box-align:center;-webkit-align-items:center;align-items:center;line-height:25px}.uni-share-content-item[data-v-767e5cb0]:active{background-color:#f5f5f5}.uni-share-image[data-v-767e5cb0]{width:30px;height:30px}.uni-share-text[data-v-767e5cb0]{font-size:14px;color:#3b4144}.uni-share-button-box[data-v-767e5cb0]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;\r\n-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;padding:10px 15px}.uni-share-button[data-v-767e5cb0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;-webkit-border-radius:50px;border-radius:50px;color:#666;font-size:16px}.uni-share-button[data-v-767e5cb0]::after{-webkit-border-radius:50px;border-radius:50px}",""]),t.exports=e},dc16:function(t,e,a){var i=a("d9cc");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("46293e7c",i,!0,{sourceMap:!1,shadowMode:!1})}}]);