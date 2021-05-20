import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import common from './modules/common';
import video from './modules/video';
import websocket from './modules/websocket';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
		common,
		video,
		websocket
  },
  getters,
});

export default store;
