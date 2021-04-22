import api from '@/api/index.js';
import { TOAST,SET_STORAGE,GET_STORAGE,REMOVE_STORAGE } from '@/common/globalConfig.js'

const video = {
	namespaced: true,
	state: {
		cachVideo:"",
	},
	mutations:{
		SET_CACHVIDEO(state, provider) {
		    state.cachVideo = provider
		}
	},
	actions:{
		async testAction({ commit,state },provider){
			
		}
	}
}

export default video;