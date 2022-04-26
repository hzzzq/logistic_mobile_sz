import methods from '../request.js'

let yearReport = {
	/* 增加消杀记录 */
	addYearReport(params) {
		return methods.post('/yearInspection/addInspaction',params)
	}
}

export default yearReport