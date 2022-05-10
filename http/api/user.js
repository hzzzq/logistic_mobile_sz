import methods from '../request.js'

let user = {
	/* 登录 */
	login(params) {
		return methods.post('/admin/login',params)
	},
	// 获取用户的对应权限
	getMenu(params){
		return methods.get('/branch/branchCatalogue', params)
	},
	//找回密码
	findPassword(params){
		return methods.post('/admin/updatePsw',params)
	},
	// 查找体温信息
	findAllTemperature(params){
		return methods.get('/temperatureRecord/findAllTempareture',params)
	},
	// 查找核酸信息
	findAllNuclein(params){
		return methods.get('/nucleinRecord/findAllNuclein',params)
	}
	
}

export default user