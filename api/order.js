/** * 订单模块 ***/
import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';

// 取消订单
export function cancelOrderHttp(data) {
	return http.post(`/trade/cancelOrder`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
// 发放USDT
export function confirmSaleHttp(data) {
	return http.post(`/trade/confirmSale`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
//根据订单id获取订单详情
export function getOrderInfoHttp(data) {
	return http.get(`/trade/getOrderInfo`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
//获取订单列表
export function getOrderListHttp(data) {
	return http.get(`/trade/getOrderList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token')
		}
	});
}
//订单重新支付
export function goPayHttp(data) {
	return http.post(`/trade/goPay`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
// 订单确认
export function paySuccessHttp(data) {
	return http.post(`/trade/paySuccess`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
//校验支付密码
export function verifyPayPwdHttp(data) {
	return http.post(`/trade/verifyPayPwd`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}

//用户挂单历史记录
export function getAutoSettingPageHttp(data) {
	return http.get(`/auto/getAutoSettingPage`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
//回去对应的订单列表信息
export function getOrderListsHttp(data) {
	return http.get(`/auto/getOrderList`, {
		data: data,
		header: {
			'user-token': GET_STORAGE('token'),
			"Content-Type":"application/x-www-form-urlencoded"
		}
	});
}
