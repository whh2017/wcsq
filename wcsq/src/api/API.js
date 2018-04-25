import axios from 'axios'
import config from './config'
const baseUrl = "http://localhost:8081"

class API {
	//刷新當前用戶列表
	// getUsers (param) {	
	// 	// return axios.post(param.api,{},config);
	// 	return axios.get(`${baseUrl}/user`,config);
	// }

	/* 用户登录状态模拟校验 */
	checkLogin (param) {
		return axios.post(`${baseUrl}/checklogin`, param , config);
	}

	/* 用户注册状态模拟校验 */
	checkEnroll (param) {
		return axios.post(`${baseUrl}/checkenroll`, param , config);
	}
	
}
export default API;