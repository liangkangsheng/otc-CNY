import api from '@/api/index.js';
import { TOAST,SET_STORAGE,GET_STORAGE,REMOVE_STORAGE } from '@/common/globalConfig.js'

const common = {
	namespaced: true,
	state: {
		token: GET_STORAGE('token'),
		userInfo: GET_STORAGE('userInfo'),
		accountInfo:{},
		helpInfo:[]
	},
	mutations:{
		SET_TOKEN(state, token) {
		    state.token = token;
			SET_STORAGE('token',token)
		},
		SET_PERSONAL(state, provider){
			state.userInfo=Object.assign({},state.userInfo,provider)
			SET_STORAGE('userInfo',state.userInfo)
		},
		RESET_PERSONAL(state, provider){
			state.userInfo={}
		},
		SET_HELPINFO(state, provider){
			state.helpInfo.splice(0,state.helpInfo.length,...provider)
		}
	},
	actions:{
		async logoOutAction({ commit,state },provider){
			// commit('SET_TOKEN', '')
			// commit('RESET_PERSONAL')
			REMOVE_STORAGE('token')
			// REMOVE_STORAGE('userInfo')
			uni.reLaunch({
				url:"/pages/loginReg/login"
			})
		},
		// async loginAction({ dispatch,commit,state },provider){
		// 	let data=await api.accountLoginFn(provider)
		// 		if(data.code === '000'){
		// 			commit('SET_TOKEN', data.data);
		// 			dispatch('personalAction')
		// 			return data.code
		// 		}else{
		// 			TOAST(data.errorMessage)
		// 		}
		// },
		// async personalAction({ commit,state },provider){
		// 	let data=await api.personalFn(provider)
		// 		if(data.code === '000'){
		// 			return data.code
		// 		}else{
		// 			TOAST(data.errorMessage)
		// 		}
		// },
		// async updateInfoAction({ commit,state },provider){
		// 	let data=await api.updateInfoFn(provider)
		// 		if(data.code === '000'){

		// 			commit('SET_PERSONAL', provider);
		// 			return data.code
		// 		}else{
		// 			TOAST(data.errorMessage)
		// 		}
		// },
		// async verifiedAction({ dispatch,commit,state },provider){
		// 	let data=await api.verifiedFn(provider)
		// 	    data=JSON.parse(data.data)
		// 		if(data.code === '000'){
		// 			dispatch('personalAction')
		// 			return data.code
		// 		}else{
		// 			TOAST(data.errorMessage)
		// 		}
		// },
		// async queryHelpAction({ dispatch,commit,state },provider){
		// 	let data=await api.queryHelpFn()
		// 		if(data.code === '000'){
		// 			commit('SET_HELPINFO',data.data)
		// 		}else{
		// 			TOAST(data.errorMessage)
		// 		}
		// }
	}
}

export default common;