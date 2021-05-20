/**
 * version 1.1.7
 */
import {
	APIBASE,
	TOAST
} from '@/common/globalConfig.js'
import store from '@/store/index.js'
import mock from '@/data/data.json'
class Request {
	constructor(config = {}) {
		this.config = {};
		this.config.baseUrl = config.baseUrl ? config.baseUrl : '';
		this.config.dataType = config.dataType ? config.dataType : 'json';
		this.config.responseType = config.responseType ? config.responseType : 'text';
		this.config.header = config.header ? config.header : {};
		this.reqInterceptors = null;
		this.resInterceptors = null;
		this.interceptors = {
			request: fn => {
				this.reqInterceptors = fn;
			},
			response: fn => {
				this.resInterceptors = fn;
			}
		}
	}
	async get(url, config = {}) {
		return this._request('get', url, config);
	}
	async post(url, config = {}) {
		return this._request('post', url, config);
	}
	async put(url, config = {}) {
		return this._request('put', url, config);
	}
	async delete(url, config = {}) {
		return this._request('delete', url, config);
	}
	setConfig(config = {}) {
		this.config = this._deepCopy(this._merge(this.config, config));
	}
	getConfig() {
		return this.config;
	}
	_request(method, url, config) {
		const _this = this;
		let newConfig = this._deepCopy(this._merge(this.config, config));
		let lastConfig = {};
		if (this.reqInterceptors && typeof this.reqInterceptors === 'function') {
			let reqInterceptors = this.reqInterceptors(newConfig);
			if (!reqInterceptors && process.env.NODE_ENV === "development") {
				console.warn('请求被拦截，此消息仅在开发环境显示。')
				return false;
			} else if (Object.prototype.toString.call(reqInterceptors) === "[object Promise]") {
				return reqInterceptors;
			}
			lastConfig = this._deepCopy(reqInterceptors);
		} else {
			lastConfig = this._deepCopy(newConfig);
		}
		let fullUrl = this._formatUrl(lastConfig.baseUrl, url);

		return new Promise((resolve, reject) => {
			let name = _this._getApiName(fullUrl); // 请求拦截
			resolve(mock[name]);
		})
	}
	_formatUrl(baseUrl, url) {
		if (!baseUrl) return url;
		if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) return url
		let formatUrl = '';
		const baseUrlEndsWithSlash = baseUrl.endsWith('/');
		const urlStartsWithSlash = url.startsWith('/');
		if (baseUrlEndsWithSlash && urlStartsWithSlash) {
			formatUrl = baseUrl + url.substring(1);
		} else if (baseUrlEndsWithSlash || urlStartsWithSlash) {
			formatUrl = baseUrl + url;
		} else {
			formatUrl = baseUrl + '/' + url;
		}
		return formatUrl;
	}
	_merge(oldConfig, newConfig) {
		let mergeConfig = this._deepCopy(oldConfig);
		if (!newConfig || !Object.keys(newConfig).length) return mergeConfig;
		for (let key in newConfig) {
			if (key !== 'header') {
				mergeConfig[key] = newConfig[key];
			} else {
				if (Object.prototype.toString.call(newConfig[key]) === '[object Object]') {
					for (let headerKey in newConfig[key]) {
						mergeConfig[key][headerKey] = newConfig[key][headerKey];
					}
				}
			}
		}
		return mergeConfig;
	}
	_deepCopy(obj) {
		let result = Array.isArray(obj) ? [] : {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (typeof obj[key] === 'object') {
					result[key] = this._deepCopy(obj[key]);
				} else {
					result[key] = obj[key];
				}
			}
		}
		return result;
	}
	_getApiName(url) {
		let urls = url.split("/");
		let last = urls[urls.length - 1].split("?")[0];
		return last;
	}
}

if (!global.$request) {
	global.$request = new Request({
		baseUrl: APIBASE
	});
}

export default global.$request;
