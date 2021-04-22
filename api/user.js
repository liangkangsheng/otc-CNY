/** * 用户个人中心相关 ***/
import http from '@/request/request.js';
import { PUBLICDATA,GET_STORAGE,APIBASE } from '@/common/globalConfig.js'

// 用户提币
export function walletCash(data) {
	return http.post(`/center/walletCash`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
// 获取用户基本信息
export function getUserInfoHttp(data) {
	return http.get(`/center/getUserInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
// 提交实名认证信息
export function saveRealNameApplyHttp(data) {
	return http.post(`/center/saveRealNameApply`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};

// 文件上传
export function uploadPicHttp(data) {
	return http.post(`/base/uploadPic`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
// 重设支付密码
export function resetPayPwdHttp(data) {
	return http.post(`/center/resetPayPwd`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
// 重设登录密码
export function resetLoginPwdHttp(data) {
	return http.post(`/center/resetLoginPwd`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
// 提币数据展示
export function walletDataHttp(data) {
	return http.get(`/center/walletData`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
//用户充币
export function walletRechargeHttp(data) {
	return http.get(`/center/walletRecharge`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
//查询财务记录
export function queryWalletLogsHttp(data) {
	return http.post(`/center/queryWalletLogs`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
//获取实名认证信息
export function getRealNameInfoHttp(data) {
	return http.get(`/center/getRealNameInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
//获取单项我的资产
export function getMyAssetsItemHttp(data) {
	return http.get(`/center/getMyAssetsItem`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token')
	    }
	});
};
//删除收款账户
export function delReceiveAccountHttp(data) {
	return http.delete(`/center/delReceiveAccount`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
		  "Content-Type":"application/x-www-form-urlencoded"
	    }
	});
};
//获取机构认证信息
export function getOrganVerifyInfoHttp(data) {
	return http.get(`/center/getOrganVerifyInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
//用户提交保证金
export function handleMarginInfoHttp(data) {
	return http.post(`/center/handleMarginInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};//用户提交保证金
export function returnMarginInfoHttp(data) {
	return http.post(`/center/returnMarginInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};

// 用户提交保证金记录
export function getMarginInfoHttp(data) {
	return http.get(`/center/getMarginInfo`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
//提交机构认证信息
export function saveOrganVerifyApplyHttp(data) {
	return http.post(`/center/saveOrganVerifyApply`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function verifyEmailHttp(data) {
	return http.post(`/center/verifyEmail`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function sendEmailHttp(data) {
	return http.get(`/center/sendEmail`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function getSysConfigListHttp(data) {
	return http.get(`/center/getSysConfigList`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function getLevelListHttp(data) {
	return http.get(`/center/getLevelList`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function queryWalletCashHttp(data) {
	return http.post(`/center/queryWalletCash`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
export function queryWalletRechargeHttp(data) {
	return http.post(`/center/queryWalletRecharge`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
// 查询提现详情
export function getWalletCashDetailHttp(data) {
	return http.get(`/center/getWalletCashDetail`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
// 查询充值记录详情
export function getWalletRechargeDetailHttp(data) {
	return http.get(`/center/getWalletRechargeDetail`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
// 查询充值记录详情
export function getMinRechargeHttp(data) {
	return http.get(`/center/getMinRecharge`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};

// 关闭谷歌整整
export function closeVerifyHttp(data) {
	return http.get(`/center/closeVerify`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
// 开启谷歌验证
export function openGoogleVerifyHttp(data) {
	return http.get(`/center/openGoogleVerify`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
// 谷歌验证吗
export function openVerifyHttp(data) {
	return http.get(`/center/openVerify`, {
		data:data,
	    header:{
		  'user-token':GET_STORAGE('token'),
	    }
	});
};
