import methods from '../request.js'

let yearReport = {
	/* 增加消杀记录 */
	addYearReport(params) {
		return methods.post('/yearInspection/addInspaction',params)
	},
	getYearReport(params){
		return methods.get('/yearInspection/findAllInspaction',params)
	}
}

export default yearReport