<template>
	<view>
		<view class="header">
			{{historyCategory}}历史记录
		</view>
		<view class="list" style="background-color: #f1f4fb; ">
			<!-- 早中晚餐 -->
			<view class="list_item flex flexVc item_container"   @click="detailClick(item.recordList)" 
			v-if="historyCategory=='早餐'||historyCategory=='中餐'||historyCategory=='晚餐'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<text class="label">时间：<text>{{item.creteTime}}</text></text>
			</view >
			
			<!-- 消杀 -->
			<view class="list_item flex flexVc item_container"   @click="detailClick(item)"
			v-if="historyCategory == '消杀'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<text class="label" >时间：<text>{{item.disinfectTime}}</text></text>
			</view >
				
			<!-- 泔水 -->
			<view class="list_item flex flexVc item_container"   @click="detailClick(item)"
			v-if="historyCategory == '泔水'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<text class="label" >时间：<text>{{item.recordTime}}</text></text>
			</view >
				
			<!-- 迎检 -->
			<view class="list_item flex flexVc item_container"   @click="detailClick(item.inspectionTitle)"
			v-if="historyCategory == '迎检'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<text class="label" >时间：<text>{{item.inspectionTime}}</text></text>
			</view >
				
		</view>
	</view>
</template>

<script>
	var that
	import meal from '@/http/api/meal.js'
	import disinfect from '@/http/api/disinfect.js'
	import yearReport from '@/http/api/yearReport.js'
	
	export default {
		data() {
			return {
				recordInfo:[],
				historyCategory:'',
				branchCode:'',
				tempData:[],
				pageInfo:{
					current:1,
					pages:''
				},
				refreshFlag: true
			}
		},
		methods: {
			getMealData(){
				let obj = {
					branchCode: that.branchCode,
					category: that.historyCategory,
					pageNum: that.pageInfo.current
				}
				meal.getMealTime(obj).then(res=>{
					console.log(res.data.data)
					if(res.data.code!=200){
						uni.$u.toast('数据请求错误，请重试')
					}else{
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
						that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
						// res.data.data.records.forEach(item=>{
						// 	that.recordInfo.push(item)
						// })
					}
				})
			},
			getDisinfectData(){
				let obj = {
					branchCode: that.branchCode,
					pageNum: that.pageInfo.current
				}
				disinfect.getDisinfect(obj).then(res=>{
					console.log(res.data)
					that.pageInfo.current = res.data.data.current
					that.pageInfo.pages = res.data.data.pages
					that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
					// res.data.data.records.forEach(item=>{
					// 	that.recordInfo.push(item)
					// })
				})
			},
			getSwillData(){
				let obj = {
					branchCode:that.branchCode,
					pageNum: that.pageInfo.current
				}
				meal.getAllSwill(obj).then(res=>{
					if(res.data.code!=200){
						uni.$u.toast('请求错误，请重试')
					}else{
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
						that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
						// res.data.data.records.forEach(item=>{
						// 	that.recordInfo.push(item)
						// })
					}
				})
			},
			getYearData(){
				let obj = {
					pageNum: that.pageInfo.current
				}
				yearReport.getYearReport(obj).then(res=>{
					if(res.data.code!=200){
						uni.$u.toast('请求错误，请重试')
					}else{
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
						console.log(res.data)
						that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
						// res.data.data.records.forEach(item=>{
						// 	that.recordInfo.push(item)
						// })
					}
				})
			},
			detailClick(list){
				that.$Router.push({
					name: 'historyDetail',
					params: {
						list: list
					}
				})
			}
		},
		onReachBottom() { // 触底事件
			console.log("触底")
			let temp = that.pageInfo
			if(temp.current<temp.pages){
				if(that.historyCategory == '早餐'|| that.historyCategory == '中餐'||that.historyCategory=='晚餐'){
					that.pageInfo.current ++;
					that.getMealData()
				}
				if(that.historyCategory == '消杀'){
					that.pageInfo.current ++;
					that.getDisinfectData()
				}
				if(that.historyCategory == '泔水'){
					that.pageInfo.current ++;
					that.getSwillData()
				}
				if(that.historyCategory =='迎检'){
					that.pageInfo.current ++;
					that.getYearData()
				}
				console.log(that.pageInfo.current)
				that.refreshFlag = false;
			}else{
				if(!that.refreshFlag){
					uni.$u.toast("已经是最后一页了！")
				}
			}
		},
		mounted() {
			that = this
			if(that.historyCategory=='早餐'||that.historyCategory=='中餐'||that.historyCategory =='晚餐'){
				that.getMealData()	
			}
			if(that.historyCategory == '消杀'){
				that.getDisinfectData()
			}
			if(that.historyCategory == '泔水'){
				that.getSwillData()
			}
			if(that.historyCategory == '迎检'){
				that.getYearData()
			}
		},
		created() {
			/* 当前食堂单位 */
			const tempCode = uni.getStorageSync('menuCode') 
			this.branchCode = tempCode
			const historyCategory = uni.getStorageSync('historyCategory')
			//当前类别
			if(historyCategory){
				this.historyCategory = historyCategory
			}else{
				this.historyCategory = this.$Route.query.historyCategory
				uni.setStorageSync('historyCategory',this.historyCategory)
			}
		},
		beforeDestroy() {
			uni.removeStorageSync('historyCategory')
		}
	}
</script>

<style lang="scss" scoped>
//列表
.list {
	background-color: #FFFFFF;

	.list_item {
		border-top: 1rpx solid #efefef;
		padding: 12rpx;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.info_item {
			// justify-content: space-between;
			line-height: 56rpx;

			.label {
				color: #999;
				font-size: 30rpx;
			}

			.content {
				padding: 0 12rpx;
				font-size: 30rpx;
			}
		}
	}
}
.header {
	font-size: 14px;
	line-height: 56rpx;
	color: #8f9ca2;
	margin-top: 4rpx;
}
.item_container{
	flex-direction: row !important; 
	justify-content: flex-start !important;
	background-color: #FFFFFF; 
	height: 80rpx; 
	margin-bottom: 10rpx;
	text{
		margin-left: 20rpx;
	}
}
</style>
