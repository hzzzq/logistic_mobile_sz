<template>
	<view>
	<!-- 	<view class="flex flexVc point_container" style="text-align: center; justify-content: center;">
			<text style="font-size: 34rpx; font-weight: bold;">晚餐台账</text>
		</view> -->
		<view class="header">
			 <u-notice-bar :text="text1"></u-notice-bar>
		</view>
		<!-- 第一次拍照上传 -->
		<view class="upload_box">
			
			<view class="header">
				第一次图片
			</view>
			<!-- 商品详细 -->
			<view style="padding: 9rpx 9rpx;">
				<text>商品：</text>
				<view style="margin-left: 20rpx;" v-for="(item,index) in commodityList1"><text>{{item.name}}：<text>{{item.quantity}}</text></text></view>
			</view>
			<view class="image_container">
				<view v-for="(item,index) in fileList1" @click="imageClick(1,index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="fileList1.length == 0">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" src="../../../static/empty.png"></image>
				</view>
			</view>
		</view>

		<!-- 第二次拍照上传 -->
		<view class="upload_box">
			<view class="header">
				第二次图片
			</view>
			<view style="padding: 9rpx 9rpx;">
				<text>商品：</text>
				<view style="margin-left: 20rpx;" v-for="(item,index) in commodityList2"><text>{{item.name}}：<text>{{item.quantity}}</text></text></view>
			</view>
			<view class="image_container">
				<view v-for="(item,index) in fileList2" @click="imageClick(2,index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="fileList2.length == 0">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" src="../../../static/empty.png"></image>
				</view>
			</view>
		</view>
		<!-- 底部栏 -->
		<u-cell-group style="background-color: #FFFFFF;">
			<u-cell title="历史记录" @click="historyClick">
				<u-icon slot="right-icon" name="arrow-right"size="18" ></u-icon>
			</u-cell>
		</u-cell-group>
		<view class="btn" @click="navTo" v-if="flag">
			增加台账
		</view>
		<view style="text-align: center; margin-top: 20rpx; font-weight: bold;" v-if="!flag"><text>今日已添加完成</text></view>
	</view>
</template>

<script>
var that
import meal from "@/http/api/meal.js"
export default {
	data() {
		return {
			fileList1: [],
			fileList2: [],
			commodityList1:[],
			commodityList2:[],
			date: Number(new Date()),
			/* 上传次数已满标志位 */
			flag: true,
			branchCode: '',
			todayDate: '',
			text1:'晚餐台账上传时段 ：第一次: 16:30----17:00  第二次: 18:00----18:30'
		};
	},
	mounted() {
		that = this
		that.getTodayDate()
		that.getData()
	},
	created() {
		const tempCode = uni.getStorageSync('menuCode')
		if (tempCode) {
			this.branchCode = tempCode
		} else {
			this.branchCode = this.$Route.query.branchCode
			uni.setStorageSync('menuCode', this.branchCode)
		}
	},
	methods: {
		navTo() {
			if(that.checkTime()){
				this.$Router.push({ name: 'addRecord', params: { category: '晚餐' }})
			}else{
				uni.$u.toast('请在规定时间内上传')
			}
		},
		//获取今日日期
		getTodayDate() {
			const timeFormat = uni.$u.timeFormat
			let time = timeFormat(that.date, 'yyyy-mm-dd')
			that.todayDate = time
		},
		async getData() {
			let params = {
				branchCode: that.branchCode,
				category: '晚餐',
				toDay: that.todayDate
			}
			meal.getMealsRecord(params).then(res => {
				if (res.data.code != 200) {
					uni.$u.toast('数据请求错误，请重试')
				} else {
					//成功
					let recordList = res.data.data.records
					if (recordList.length == 6) {
						for (var i = 0; i < 3; i++) {
							let obj = {
								name: recordList[i].commodityName,
								quantity: recordList[i].quantity
							}
							// 第二次的图片
							that.commodityList2.push(obj)
							that.fileList2.push(recordList[i].picture)
						}
						for (var j = 3; j < 6; j++) {
							let obj = {
								name: recordList[j].commodityName,
								quantity: recordList[j].quantity
							}
							// 第一次的图片
							that.commodityList1.push(obj)
							that.fileList1.push(recordList[j].picture)
						}
						that.flag = false
					} else if (recordList.length == 3) {
						for (var i = 0; i < 3; i++) {
							let obj = {
								name: recordList[i].commodityName,
								quantity: recordList[i].quantity
							}
							that.commodityList1.push(obj)
							that.fileList1.push(recordList[i].picture)
						}
					}
				}
			})
		},
		imageClick(flag, index) {
			if (flag == 1) {
				uni.previewImage({
					current: index,
					urls: that.fileList1,
					fail(err) {
						uni.$u.toast(err)
					}
				});
			} else {
				uni.previewImage({
					current: index,
					urls: that.fileList2,
					fail(err) {
						uni.$u.toast(err)
					}
				});
			}
		},
		historyClick(){
			that.$Router.push({
				name: 'historyRecord',
				params: {
					historyCategory: '晚餐'
				}
			})
		},
		checkTime(){
			let time = new Date()
			let timeLowwer1 =  new Date(that.todayDate + ' 16:30') 
			let timeUpper1 = new Date(that.todayDate + ' 17:00') 
			let timeLowwer2 = new Date(that.todayDate + ' 18:00') 
			let timeUpper2 = new Date(that.todayDate + ' 18:30') 
			let flag1 = time>=timeLowwer1&&time<=timeUpper1
			let flag2 = time>=timeLowwer2&&time<=timeUpper2
			return (flag1||flag2)
		}
	}
};
</script>

<style lang="scss" scoped>
	.upload_box {
		margin-top: 18rpx;
		background-color: #FFFFFF;
		padding: 24rpx;

		.header {
			font-size: 14px;
			line-height: 56rpx;
			color: #8f9ca2;
		}
	}

	.btn {
		width: 320rpx;
		height: 72rpx;
		background-color: #28c6c4;
		color: #FFFFFF;
		line-height: 72rpx;
		text-align: center;
		border-radius: 18rpx;
		margin: 0 auto;
		margin-top: 36rpx;
		font-size: 30rpx;
	}

	.point_container {
		background-color: #FFFFFF;
		height: 80rpx;
		padding: 43rpx 30rpx;
	}

	.image_container {
		display: flex;
		flex-direction: row;
	}
</style>
