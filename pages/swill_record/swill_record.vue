<template>
	<view>
		<view class="btn2" @click="historyClick" >
			历史记录
		</view>
		<view style="width: 100%; height:340rpx; background-color: #FFFFFF;padding: 12px 16px;">
			<!-- row1 -->
			<view style="padding: 6px 9px;">
				<view><text class="label">单位名称：</text><text class="content">{{swillInfo.branchName}}</text></view>
			</view>
			<!-- row2 -->
			<view style="padding: 6px 9px;">
				<view><text class="label">当前日期：</text><text class="content">{{todayDate}}</text></view>
			</view>
			<!-- row3 -->
			<view class="flex flexVc" style="margin-top: 10rpx;">
				<text style="font-size: 32rpx;color:#8f9ca2;margin-left: 20rpx;">泔水重量：</text>
				<input type="number" v-model="swillInfo.weight" placeholder="输入数量" class="input"/><text style="font-size: 28rpx;margin-left: 10rpx;">千克</text>
			</view>
			<!-- row4 -->
			<!-- <u-cell-group style="background-color: #FFFFFF;margin-top: 20rpx; " :border="false">
				<u-cell title="历史记录" @click="historyClick" >
					<u-icon slot="right-icon" name="arrow-right"size="18" ></u-icon>
				</u-cell>
			</u-cell-group> -->
			<!-- 底部 -->
			<view class="btn" @click="update()" style="float: right; margin-right:20rpx;">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import meal from '@/http/api/meal.js'
	var that 
	export default {
		data() {
			return {
				date: Number(new Date()),
				todayDate:'',
				swillInfo:{
					branchCode: "",
					operator: "",
					recordTime: "",
					weight: 0,
					branchName:''
				}
			}
		},
		mounted() {
			that = this
			this.getTodayDate()
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.swillInfo.branchCode = tempCode
			}else{
				this.swillInfo.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
			const tempInfo = uni.getStorageSync('userInfo')
			this.swillInfo.operator = tempInfo.adminName
			this.swillInfo.branchName = uni.getStorageSync('menuName')
		},
		methods: {
			//获取今日日期
			getTodayDate(){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(that.date,'yyyy-mm-dd')
				that.todayDate = time
				that.swillInfo.recordTime = time
			},
			// 上传
			update(){
				meal.updateSwill(that.swillInfo).then(res=>{
					if(res.data.code!=200){
						uni.$u.toast('数据请求错误，请重试')
					}else{
						uni.$u.toast("上传成功")
						that.$router.go(0)
					}
				})
			},
			// click跳转
			historyClick(){
				that.$Router.push({
					name: 'historyRecord',
					params: {
						historyCategory: '泔水'
					}
				})
			}
		}
	}
</script>

<style>
	.label {
		color: #999;
		font-size: 32rpx;
	}
	
	.content {
		/* padding: 0 12rpx; */
		font-size: 30rpx;
	}
	.input{
		margin-left: 20rpx;  
		width: 160rpx; 
		height: 50rpx; 
		font-size: 28rpx; 
		border:#dadbde solid;
		border-width: 0.5px;
		border-radius: 4px; 
		padding: 6px 9px;
	}
	.btn {
			width: 200rpx;
			height: 52rpx;
			background-color: #28c6c4;
			color: #FFFFFF;
			line-height: 52rpx;
			text-align: center;
			border-radius: 18rpx;
			/* margin: 0 auto; */
			margin-top: 28rpx;
			font-size: 30rpx;
		}
	.btn2 {
		width: 100%;
		height: 72rpx;
		background-color: #28c6c4;
		color: #FFFFFF;
		line-height: 72rpx;
		text-align: center;
		margin: 0 auto;
		font-size: 30rpx;
	}
</style>
