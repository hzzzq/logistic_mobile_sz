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
	findPassword(params){
		return methods.post('/admin/updatePsw',params)
	}
	
}

export default user