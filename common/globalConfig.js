// const APIBASE=process.env.NODE_ENV === 'production' ? "http://192.168.31.12:8081" : "http://192.168.31.12:8081"
// 钱包新接口地址： 
const APIBASE=process.env.NODE_ENV === 'production' ? "http://35.73.84.193/uweb" : "http://35.73.84.193/uweb";
const PLATFORM = uni.getSystemInfoSync().platform
const PUBLICDATA={
	  // #ifdef APP-PLUS
	  "appId": plus.runtime.appid,
	  "appVersion": plus.runtime.version,
	  "phoneModel": uni.getSystemInfoSync().model || 'iphone',
	  "sign": "string",
	  "sysType": PLATFORM == 'android' ? 0 : (PLATFORM == 'ios' ? 1 : 3),
	  "versionNo": plus.runtime.versionCode,
	  // #endif
	  // #ifndef APP-PLUS
	  "appId": "AD45464661",
	  "appVersion": "1.0",
	  "phoneModel": uni.getSystemInfoSync().model || 'iphone',
	  "sign": "string",
	  "sysType": PLATFORM == 'android' ? 0 : (PLATFORM == 'ios' ? 1 : 3),
	  "versionNo": 1
	  // #endif
}

let TOAST=function(title,icon,time,ok,fail){
		uni.showToast({
			'title': title,
			'icon':icon||'none',
			'mask':true,
			'duration':time||1500,
			'success': ok,
			'fail':fail
		});
	}

let CONFIRM=function(title,content,confirmText,ok,confirmColor,fail,cancelText,cancelColor){
		uni.showModal({
			'title':title,
			'content':content,
			'confirmText':confirmText||'确定',
			'confirmColor':confirmColor||'#FF3733',
			'cancelText':cancelText||'取消',
			'cancelColor':cancelColor||'#000000',
			'success': ok,
			'fail':fail
		});
	}

let SET_STORAGE=function (KEY,DATA){
	try {
	    uni.setStorageSync(KEY, DATA);
	} catch (e) {
	    TOAST(`本地存储${KEY}失败！`)
	}
}

let GET_STORAGE=function (KEY){
	let value=""
	try {
	    value=uni.getStorageSync(KEY);
		return value
	} catch (e) {
	    TOAST(`获取本地${KEY}失败！`)
		return value
	}
	
}

let REMOVE_STORAGE=function (KEY){
	let value=""
	try {
	    uni.removeStorageSync(KEY);
	} catch (e) {
	    TOAST(`删除本地${KEY}失败！`)
	}
}

export {
	APIBASE,
	TOAST,
	CONFIRM,
	SET_STORAGE,
	GET_STORAGE,
	REMOVE_STORAGE,
	PUBLICDATA,
}
