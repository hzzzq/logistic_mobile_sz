<template>
	<view>
		<view class="list" style="background-color: #f1f4fb; ">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(recordInfo.length == 0 ? true:false)"></u-empty>
			
			<view style="border-radius:12px; background-color: #FFFFFF; margin: 10px 10px;"  v-for="(item, index) in recordInfo" :key="'record' + index" >
				<u-cell icon="file-text" title="体温记录" titleStyle="font-size: 32rpx" iconStyle="font-size:40rpx">
				</u-cell>
				<view style="height: 100rpx;padding: 10px 15px;line-height: 55rpx;">
					<text class="label" style="color: #9b9b9c;">日期：<text style="color: #3f3356;">{{item.temperatureTime}}</text></text>
					<text style="margin-left: 60rpx;color: #9b9b9c;">当日体温：<text style="color: #3f3356;">{{item.temperature}}</text></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that
	import user from '@/http/api/user.js'
	export default {
		data() {
			return {
				recordInfo:[],
				params:{
					userId:''
				},
				pageInfo:{
					current:'',
					pages:''
				},
				refreshFlag:true
			}
		},
		methods: {
			getData(){
				user.findAllTemperature(that.params).then(res=>{
					// console.log(res.data)
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
				user.findAllTemperature(that.params).then(res=>{
					// console.log(res.data)
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
		mounted() {
			that = this
			that.getData()
		},
		created() {
			const tempId = uni.getStorageSync('temperatureId')
			if (tempId) {
				this.params.userId = tempId
			} else {
				this.params.userId = this.$Route.query.temperatureId
				uni.setStorageSync('temperatureId', this.params.userId)
			}
		},
		beforeDestroy() {
			uni.removeStorageSync('temperatureId')
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
#empty {
		height: 500rpx;
	}
	
</style>
