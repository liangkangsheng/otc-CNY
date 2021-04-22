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
// 发送验证码
export function Login(data) {
    return http.post(`/base/sendSmsCode`, {
	    data:data,
    });
}
// 用户登录
export function getUserToken(data) {
    return http.post(httpLink+`/user/getUserToken`, {
	    data:data,
    });
}
// 根据用户名密码校验用户
export function cheakUserHttp(data) {
	return http.post(httpLink+`/user/cheakUser`, {
		data:data,
	});
};
// 校验短信验证码
export function verifySmsCodeHttp(data) {
	return http.post(`/base/verifySmsCode`, {
		data:data,
	});
};

// 忘记密码
export function forgetPasswordHttp(data) {
	return http.post(httpLink+`/user/forgetPassword`, {
		data:data,
	});
};
