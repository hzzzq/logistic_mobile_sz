import methods from '../request.js'

let disinfect = {
	/* 增加消杀记录 */
	addDisinfect(params) {
		return methods.post('/disinfectRecord/addDisinfect',params)
	},
	getDisinfect(params){
		return methods.get('/disinfectRecord/findAllDisinfect',params)
	}
}

export default disinfect