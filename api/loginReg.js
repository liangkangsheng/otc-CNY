import http from '@/request/request.js';
import {
	PUBLICDATA,
	GET_STORAGE
} from '@/common/globalConfig.js'
import {
	httpLink
} from './http.js';




// 用户注册
export function userRegistration(data) {
	return http.post(httpLink+`/user/userRegistration`, {
		data:data,
	});
};
// 发送短信验证码
export function sendSmsCode(data) {
    return http.post(`/base/sendSmsCode`, {
	    data:data,
    });
}
// 发送邮箱验证码
export function sendEmailCode(data) {
    return http.post(`/base/sendEmailCode`, {
	    data:data,
    });
}
// 用户登录
export function getUserToken(data) {
    return http.post(httpLink+`/user/getUserToken`, {
	    data:data,
    });
}
// 根据手机号密码校验用户
export function cheakUserHttp(data) {
	return http.post(httpLink+`/user/cheakUserByPhone`, {
		data:data,
	});
};
// 根据邮箱密码校验用户
export function cheakUserByEmail(data) {
	return http.post(httpLink+`/user/cheakUserByEmail`, {
		data:data,
	});
};
// 校验短信验证码
export function verifySmsCodeHttp(data) {
	return http.post(`/base/verifySmsCode`, {
		data:data,
	});
};

// 校验邮箱验证码
export function verifyEmailCodeHttp(data) {
	return http.post(`/base/verifyEmailCode`, {
		data:data,
	});
};

// 忘记密码
export function forgetPasswordHttp(data) {
	return http.post(httpLink+`/user/forgetPassword`, {
		data:data,
	});
};
