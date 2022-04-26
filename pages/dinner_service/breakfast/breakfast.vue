<template>
	<view>
		<view class="flex flexVc point_container" style="text-align: center; justify-content: center;">
			<text style="font-size: 34rpx; font-weight: bold;">早餐台账</text>
		</view>
		<!-- 上午拍照上传 -->
		<view class="upload_box">
			<view class="header">
				第一次图片
			</view>
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
		<view class="btn" @click="navTo" v-if="flag">
			增加台账
		</view>
		<view style="text-align: center; margin-top: 20rpx; font-weight: bold;" v-else><text>今日已添加完成</text></view>
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
				todayDate: ''
			};
		},
		mounted() {
			that = this
			that.getTodayDate()
			that.getData()
			console.log(that.fileList1)
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
				this.$Router.push({ name: 'addRecord', params: { category: '早餐' }})
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
					category: '早餐',
					toDay: that.todayDate
				}
				meal.getMealsRecord(params).then(res => {
					if (res.data.code != 200) {
						uni.$u.toast('数据请求错误，请重试')
					} else {
						//成功
						let recordList = res.data.data.records
						if (recordList.length == 3) {
							for (var i = 0; i < 3; i++) {
								that.fileList1.push(recordList[i].picture)
							}
							that.flag = false
						}
					}
				})
			},
			imageClick(index) {
				uni.previewImage({
					current: index,
					urls: that.fileList1,
					fail(err) {
						console.log(err)
					}
				});
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

		height: 280rpx;
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
		height: 120rpx;
		padding: 50rpx 30rpx;
	}

	.image_container {
		display: flex;
		flex-direction: row;
	}
</style>
