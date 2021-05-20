/** * 首页模块 ***/
import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';

// 获取项目列表
export function getItemListHttp(data) {
	return http.post(`/base/getItemList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}
//获取项目详情
export function getItemDetailHttp(data) {
	return http.get(`/base/getItemDetail`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token') || ''
		}
	});
}

// 购买项目
export function investHttp(data) {
	return http.post(`/invest/invest`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}

