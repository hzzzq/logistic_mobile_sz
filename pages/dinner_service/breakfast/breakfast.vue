<template>
	<view>
		<!-- 上午拍照上传 -->
		<view class="upload_box">
			<view class="header">
				今日早餐
			</view>
			<!-- 商品详细 -->
			<view style="padding: 9rpx 9rpx;">
				<text>商品：</text>
				<view style="margin-left: 20rpx;" v-for="(item,index) in commodityList"><text>{{item.name}}：<text>{{item.quantity}}</text></text></view>
			</view>
			<!-- 商品图片 -->
			<view class="image_container">
				<view v-for="(item,index) in fileList1" @click="imageClick(index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="fileList1.length == 0">
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
				date: Number(new Date()),
				/* 上传次数已满标志位 */
				flag: true,
				branchCode: '',
				todayDate: '',
				commodityList:[]
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
			// 跳转
			navTo() {
				this.$Router.push({ name: 'addRecord', params: { category: '早餐' }})
			},
			//获取今日日期
			getTodayDate() {
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(that.date, 'yyyy-mm-dd')
				that.todayDate = time
			},
			// 数据获取
			async getData() {
				let params = {
					branchCode: that.branchCode,
					category: '早餐',
					toDay: that.todayDate
				}
				meal.getMealsRecord(params).then(res => {
					if (res.data.code != 200) {
						uni.$u.toast('数据请求错误，请重试')
					} else {
						//成功
						let recordList = res.data.data.records
						if (recordList.length != 0) {
							for (var i = 0; i < recordList.length; i++) {
								let obj = {
									name:recordList[i].commodityName,
									quantity:recordList[i].quantity
								}
								that.commodityList.push(obj)
								that.fileList1.push(recordList[i].picture)
							}
							that.flag = false
						}
					}
				})
			},
			// 图片预览
			imageClick(index) {
				uni.previewImage({
					current: index,
					urls: that.fileList1,
					fail(err) {
						uni.$u.toast(err)
					}
				});
			},
			// 历史跳转
			historyClick(){
				that.$Router.push({
					name: 'historyRecord',
					params: {
						historyCategory: '早餐'
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.upload_box {
		// margin-top: 18rpx;
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
