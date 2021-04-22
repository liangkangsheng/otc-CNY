/** * 注册相关 ***/
import https from '@/request/requests.js';
// 用户注册
export function userRegistration(data) {
	return https.post(`/user/userRegistration`, {
		data:data,
	});
};