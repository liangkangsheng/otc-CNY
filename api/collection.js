/** * 收款账户模块 ***/
import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';

// 保存用户收款账户信息
export function saveReceiveAccountHttp(data) {
	return http.post(`/center/saveReceiveAccount`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
		}
	});
}
// 获取收款账户列表
export function getReceiveAccountListHttp(data) {
	return http.get(`/center/getReceiveAccountList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
		}
	});
}
//收款账户统计
export function getReceiveStatisHttp(data) {
	return http.get(`/center/getReceiveStatis`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
		}
	});
}
