import pako from '@/hybrid/html/pako.js'
const websocket = {
	state: {
		socketTask: null,
		is_open_socket: false
	},

	mutations: {
		WEBSOCKET_INIT(state, url) {
			// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
			console.log('websocket 连接 url: ' + url)
			state.socketTask = uni.connectSocket({
				url: url, //'wss://api.huobiasia.vip/ws',
				// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
				success(data) {
					console.log("websocket连接成功", data);
				},
			});
			console.log(state.socketTask)
			// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
			state.socketTask.onOpen((res) => {
				console.log("WebSocket连接正常打开中...！");
				state.is_open_socket = true;
				// 注：只有连接正常打开中 ，才能正常收到消息
				
			});
			
			state.socketTask.onClose(function(res){
				console.log("connection closed (" + res.code + ")");
			});
			
			state.socketTask.onMessage((res) => {
				//console.log("收到服务器内容：" + res.data);
				//let blob = res.data;
				//let reader = new FileReader();
				//reader.onload = function (res) {
				//收到数据
				if(typeof res.data !== "object"){
					return false;
				}
				let ploydata = new Uint8Array(res.data);
				let msg = pako.inflate(ploydata, {to: 'string'});
				let result = JSON.parse(msg)
				//console.log("收到服务器内容：" + JSON.stringify(result));
				if(result.ping){
					let data = {'pong': result.ping}
					state.socketTask.send({
						data: JSON.stringify(data),
						async success() {
							//console.log("pong消息发送成功");
						},
					});
				}else if(result.status === 'ok'){
					console.log("status is ok");
					//if(typeof(result.ch) === "undefined") return
					//uni.$emit(result.ch,{data: result})
				}else if(result.ch != "" && result.ch !=null && result.ch != undefined){
					uni.$emit(result.ch,{data: result})
				}
				//}
				//reader.readAsArrayBuffer(blob, "utf-8");
			});
		},
		
		WEBSOCKET_SEND(state, p) {
			//console.log("ws发送:", p);
			if (state.is_open_socket) {
				state.socketTask.send({
					data: p,
					async success() {
						console.log("消息发送成功:"+p);
					},
				});
			}
		}
	},

	actions: {
		WEBSOCKET_INIT({
			commit
		}, url) {
			commit('WEBSOCKET_INIT', url)
		},
		WEBSOCKET_SEND({
			commit
		}, p) {
			commit('WEBSOCKET_SEND', p)
		}
	}
}

export default websocket
