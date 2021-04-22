import LangEn from './en.js'
import LangChs from './zh.js'
import LangJt from './jt.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			res.language = res.language = "cn" 
			uni.setStorageSync('system_info', res);
		}
	})
}
const cur_lang = system_info.language == 'en' ? 'en' : 'cn'
const i18n = new VueI18n({
	locale: cur_lang || 'cn',  // 默认选择的语言
	messages: {  
			'en': LangEn,
			'cn': LangChs,
			'zh_JT':LangJt
		}
})
export default i18n