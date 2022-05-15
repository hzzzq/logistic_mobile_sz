<template>
	<view>
		<view class="header">
			{{historyCategory}}历史记录
		</view>
		<view class="list" style="background-color: #f1f4fb; ">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(recordInfo.length == 0 ? true:false)"></u-empty>
			
			<!-- 早中晚餐 -->
			<view style="border-radius:12px; background-color: #FFFFFF; margin: 10px 10px;"  @click="detailClick(item.recordList)" 
			v-if="historyCategory=='早餐'||historyCategory=='中餐'||historyCategory=='晚餐'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<u-cell icon="file-text" :title="historyCategory+'记录'" titleStyle="font-size: 32rpx" iconStyle="font-size:40rpx">
					<u-icon name="arrow-right" size="18"slot="right-icon" color="#c0c4cc"></u-icon>
				</u-cell>
				<view style="height: 100rpx;padding: 10px 15px;line-height: 55rpx;">
					<text style="color: #9b9b9c;">记录时间：<text style="color: #3f3356;">{{item.creteTime}}</text></text>
				</view>
			</view>
			
			<!-- 消杀 -->
			<view style="border-radius:12px; background-color: #FFFFFF; margin: 10px 10px;"   @click="detailClick(item)"
			v-if="historyCategory == '消杀'"
			v-for="(item, index) in recordInfo" :key="'record' + index">
				<u-cell icon="file-text" :title="historyCategory+'记录'" titleStyle="font-size: 32rpx" iconStyle="font-size:40rpx">
					<u-icon name="arrow-right" size="18"slot="right-icon" color="#c0c4cc"></u-icon>
				</u-cell>
				<view style="height: 100rpx;padding: 10px 15px;line-height: 55rpx;">
					<text style="color: #9b9b9c;">记录时间：<text style="color: #3f3356;">{{item.disinfectTime}}</text></text>
				</view>
			</view>
			
			<!-- 泔水 -->
			<view style="border-radius:12px; background-color: #FFFFFF; margin: 10px 10px;"  @click="detailClick(item)"
			v-if="historyCategory == '泔水'"
			v-for="(item, index) in recordInfo" :key="'record' + index">
				<u-cell icon="file-text" :title="historyCategory+'记录'" titleStyle="font-size: 32rpx" iconStyle="font-size:40rpx">
					<u-icon name="arrow-right" size="18"slot="right-icon" color="#c0c4cc"></u-icon>
				</u-cell>
				<view style="height: 100rpx;padding: 10px 15px;line-height: 55rpx;">
					<text style="color: #9b9b9c;">记录时间：<text style="color: #3f3356;">{{item.recordTime}}</text></text>
				</view>
			</view>
			
			<!-- 迎检 -->
			<view style="border-radius:12px; background-color: #FFFFFF; margin: 10px 10px;"  @click="detailClick(item.inspectionTitle)"
			v-if="historyCategory == '迎检'"
			v-for="(item, index) in recordInfo" :key="'record' + index" >
				<u-cell icon="file-text" :title="historyCategory+'记录'" titleStyle="font-size: 32rpx" iconStyle="font-size:40rpx">
					<u-icon name="arrow-right" size="18"slot="right-icon" color="#c0c4cc"></u-icon>
				</u-cell>
				<view style="height: 100rpx;padding: 10px 15px;line-height: 55rpx;">
					<text style="color: #9b9b9c;">记录时间：<text style="color: #3f3356;">{{item.inspectionTime}}</text></text>
				</view>
			</view>
				
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
					if(res.data.code!=200){
						uni.$u.toast('数据请求错误，请重试')
					}else{
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
						that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
					}
				})
			},
			getDisinfectData(){
				let obj = {
					branchCode: that.branchCode,
					pageNum: that.pageInfo.current
				}
				disinfect.getDisinfect(obj).then(res=>{
					that.pageInfo.current = res.data.data.current
					that.pageInfo.pages = res.data.data.pages
					that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
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
						that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
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
	font-size: 15px;
	line-height: 56rpx;
	color: #8f9ca2;
	margin-top: 10rpx;
	margin-left: 10rpx;
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
#empty {
		height: 500rpx;
	}
</style>
