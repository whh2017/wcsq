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
	
	/* 显示首页热帖排行列表 */
	getPlus () {
		return axios.get(`${baseUrl}/getplus` , config);
	}

	getBbsPlus () {
		return axios.get(`${baseUrl}/getbbsplus`, config);
	}

	getPlusByPage(param) {
		return axios.post(`${baseUrl}/getplusbypage`, param , config);
	}

	publishPlus(param) {
		return axios.post(`${baseUrl}/publishplus`, param , config);
	}

	getGoods() {
		return axios.get(`${baseUrl}/getgoods`, config);
	}

	getUser(param) {
		return axios.post(`${baseUrl}/getuser`, param , config);
	}

	submitUserForm(param) {
		return axios.post(`${baseUrl}/submituserform`, param , config);
	}

	isCorrect(param) {
		return axios.post(`${baseUrl}/iscorrect`, param , config);
	}

	submitPassword(param) {
		return axios.post(`${baseUrl}/submitpassword`, param , config);
	}

	getSelfGoods() {
		return axios.get(`${baseUrl}/getselfgoods` , config);
	}
	
	getGoodDetail(param) {
		return axios.post(`${baseUrl}/getgooddetail`, param , config);
	}
}
export default API;