/** * 首页模块 ***/
import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';

// 获取USDT单价
export function getUSDTPrice(data) {
	return http.get(`/base/getUSDTPrice`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
//公告列表
export function queryNoticeHttp(data) {
	return http.post(`/base/queryNotice`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}
//公告列表
export function getNoticeDetailHttp(data) {
	return http.get(`/base/getNoticeDetail`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}
// 匹配售卖USDT订单
export function matchSaleInfoHttp(data) {
	return http.post(`/trade/matchSaleInfo`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}
// 一键出售USDT
export function saleInfoHttp(data) {
	return http.post(`/trade/saleInfo`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
// 匹配购买USDT订单
export function matchBuyInfoHttp(data) {
	return http.post(`/trade/matchBuyInfo`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}
// 一键购买USDT
export function buyInfoHttp(data) {
	return http.post(`/trade/buyInfo`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
// 版本号
export function getLatestVersionHttp(data) {
	return http.post(`/base/getLatestVersion`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}

// 获取挂买单列表
export function getAutoSettingBuyList(data) {
	return http.post(`/base/getAutoSettingBuyList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}

// 获取挂卖单列表
export function getAutoSettingSaleList(data) {
	return http.post(`/base/getAutoSettingSaleList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}

// 获取图片列表
export function getSysCarouselsList(data) {
	return http.get(`/base/getSysCarouselsList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}