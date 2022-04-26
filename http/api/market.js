import methods from '../request.js'

let market = {
	/* 查询超市台账 */
	findMarketRecord(params) {
		return methods.get('/priceRecord/findAllPrice',params)
	},
	//修改超市台账的记录
	alterMarketRecord(params){
		return methods.put('/priceRecord/updatePrice',params)
	},
	//查询超市
	getMarket(params){
		return methods.get('/dictionary/findAllDict',params)
	}
	
}

export default market