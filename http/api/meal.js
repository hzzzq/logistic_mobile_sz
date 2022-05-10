import methods from '../request.js'

let meal = {
	/* 增加消杀记录 */
	addMealsRecord(params) {
		return methods.post('/mealRecord/addMeal',params)
	},
	//获取所有的记录
	getMealsRecord(params){
		return methods.get('/mealRecord/findAllMeal',params)
	},
	//获取商品
	getCommodity(params){
		return methods.get('/dictionary/findAllDict',params)
	},
	//提交泔水
	updateSwill(params){
		return methods.post('/swill/addSwill',params)
	},
	/* 获取早中晚餐历史记录 */
	getMealTime(params){
		return methods.get('/mealRecord/findTime',params)
	},
	/* 获取泔水信息 */
	getAllSwill(params){
		return methods.get('/swill/findAllSwill',params)
	}
}

export default meal