import methods from '../request.js'

let disinfect = {
	/* 增加消杀记录 */
	addDisinfect(params) {
		return methods.post('/disinfectRecord/addDisinfect',params)
	},
	/* 查找消杀记录 */
	getDisinfect(params){
		return methods.get('/disinfectRecord/findAllDisinfect',params)
	}
}

export default disinfect