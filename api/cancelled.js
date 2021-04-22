/** * 首页模块 ***/
import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';

//开启挂单自动购买设置
export function autoBuyHttp(data) {
	return http.post(`/auto/autoBuy`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
		}
	});
}
// 关闭挂单自动购买设置
export function autoBuyCloseHttp(data) {
	return http.post(`/auto/autoBuyClose`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
// 开启挂单自动出售设置
export function autoSaleHttp(data) {
	return http.post(`/auto/autoSale`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
		}
	});
}
// 关闭挂单自动出售设置
export function autoSaleCloseHttp(data) {
	return http.post(`/auto/autoSaleClose`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
};
//挂单购买设置回显
export function getAutoSettingBuyHttp(data) {
	return http.get(`/auto/getAutoSettingBuy`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
};
//挂单出售设置回显
export function getAutoSettingSaleHttp(data) {
	return http.get(`/auto/getAutoSettingSale`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
