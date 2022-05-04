<template>
	<view>
		<view class="header">
			核酸记录
		</view>
		<view class="list" style="background-color: #f1f4fb; ">
			<view class="list_item flex flexVc" style="flex-direction: row; justify-content: flex-start; background-color: #FFFFFF; height: 80rpx; margin-bottom: 10rpx;" v-for="(item, index) in recordInfo" :key="'record' + index" >
				<text class="label">日期：<text>{{item.nucleinTime}}</text></text>
				<text style="margin-left: 80rpx;">检测结果：<text>{{item.nucleinResult==true?'阳性':'阴性'}}</text></text>
			</view >
		</view>
	</view>
</template>

<script>
	var that
	import user from '../../../http/api/user.js'
	export default {
		data() {
			return {
				params:{
					userid:''
				},
				recordInfo:[],
				refreshFlag:true,
				pageInfo:{
					current:'',
					pages:''
				}
			}
		},
		methods: {
			getData(){
				user.findAllNuclein(that.params).then(res=>{
					that.pageInfo.current = res.data.data.current
					that.pageInfo.pages = res.data.data.pages
					res.data.data.records.forEach(item=>{
						that.recordInfo.push(item)
					})
				})
			},
			getNextPage(){
				let params = {
					userId: that.params.userId,
					pageNum : that.pageInfo.current+1
				}
				user.findAllNuclein(params).then(res=>{
					that.pageInfo.current = res.data.data.current
					that.pageInfo.pages = res.data.data.pages
					that.recordInfo.push.apply(that.recordInfo, res.data.data.records);
				})
			}
		},
		onReachBottom() { // 触底事件
			let temp = that.pageInfo
			if(temp.current<temp.pages){
				that.getNextPage();
				that.refreshFlag = false;
			}else{
				if(!that.refreshFlag){
					uni.$u.toast("已经是最后一页了！")
				}
			}
		},
		created() {
			const tempId = uni.getStorageSync('nucleinId')
			if (tempId) {
				this.params.userId = tempId
			} else {
				this.params.userId = this.$Route.query.nucleinId
				uni.setStorageSync('nucleinId', this.params.userId)
			}
		},
		mounted() {
			that = this
			that.getData()
		}
	}
</script>

<style  lang="scss" scoped>
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
</style>
