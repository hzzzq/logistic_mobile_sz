import methods from '../request.js'

let bus = {
	/* 增加维保记录 */
	addRepair(params) {
		return methods.post('/repair/addRepair',params)
	}
}

export default bus