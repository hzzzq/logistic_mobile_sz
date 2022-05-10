import methods from '../request.js'

let yearReport = {
	/* 增加迎检记录 */
	addYearReport(params) {
		return methods.post('/yearInspection/addInspaction',params)
	},
	/* 获取迎检记录 */
	getYearReport(params){
		return methods.get('/yearInspection/findAllInspaction',params)
	}
}

export default yearReport