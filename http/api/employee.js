import methods from '../request.js'

let employee = {
	/* 获取员工列表 */
	findAll(params) {
		return methods.get('/user/getUserList',params)
	},
	// 修改员工信息
	updateEmployee(params){
		return methods.put('/user/updateUser',params)
	},
	// 添加员工信息
	addEmployee(params){
		return methods.post('/user/addUser',params)
	},
	//新增核酸信息
	addNucleinInfo(params){
		return methods.post('/nucleinRecord/addNuclein',params)
	},
	// 新增体温信息
	addTemperatureInfo(params){
		return methods.post('/temperatureRecord/addTempareture',params)
	},
	//查询疫苗信息
	findVaccineInfo(params){
		return methods.get('/vaccineRecord/findAllVaccine',params)
	},
	
}

export default employee