<template>
	<view>
		<!-- 早中晚餐-->
		<view class="upload_box" v-if="historyCategory=='早餐'||historyCategory=='中餐'||historyCategory=='晚餐'">
			<!-- 商品详细 -->
			<view><text class="u-demo-block__title">商品</text></view>
			<view style="margin-left: 20rpx;" v-for="(item,index) in commodityList"><text>{{item.name}}：<text>{{item.quantity}}</text></text></view>
			<!-- 商品图片 -->
			<view style="margin: 10rpx 0;"><text class="u-demo-block__title">图片列表</text></view>
			<view class="image_container">
				<view v-for="(item,index) in pictureList" @click="imageClick(index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="pictureList.length == 0">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" src="../../../static/empty.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 泔水信息 -->
		<view class="upload_box" v-if="historyCategory=='泔水'">
			<view class="cellbox">
				<text class="u-cell-text">泔水记录时间：</text>
				<text style="margin-left: 20rpx;">{{detailList.recordTime}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">操作人员：</text>
				<text style="margin-left: 20rpx;">{{detailList.operator}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">泔水重量：</text>
				<text style="margin-left: 20rpx;">{{detailList.weight}}kg</text>
			</view>
		</view>
		
		<!-- 消杀记录 -->
		<view v-if="historyCategory == '消杀'" class="upload_box">
			<view class="cellbox">
				<text class="u-cell-text">消杀时间：</text>
				<text style="margin-left: 20rpx;">{{detailList.disinfectTime}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">消杀人员：</text>
				<text style="margin-left: 20rpx;">{{detailList.operator}}</text>
			</view>
			<!-- 商品图片 -->
			<view style="margin: 10rpx 0;"><text class="u-demo-block__title">图片列表</text></view>
			<view class="image_container">
				<view v-for="(item,index) in pictureList" @click="imageClick(index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="pictureList.length == 0">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" src="../../../static/empty.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 迎检记录 -->
		<view v-if="historyCategory == '迎检'" class="upload_box">
			<view class="cellbox">
				<text class="u-cell-text">迎检标题：</text>
				<text style="margin-left: 20rpx;">{{detailList.inspectionTitle}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">迎检时间：</text>
				<text style="margin-left: 20rpx;">{{detailList.inspectionTime}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">迎检人员：</text>
				<text style="margin-left: 20rpx;">{{detailList.operator}}</text>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">迎检概况：</text>
			</view>
			<u--textarea  v-model="detailList.description" disabled ></u--textarea>
			<!-- 商品图片 -->
			<view style="margin: 10rpx 0;"><text class="u-demo-block__title">图片列表</text></view>
			<view class="image_container">
				<view v-for="(item,index) in pictureList" @click="imageClick(index)">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" :src="item"></image>
				</view>
				<view v-if="pictureList.length == 0">
					<image style="width: 160rpx; height: 160rpx; margin-left: 10rpx;" mode="aspectFill" src="../../../static/empty.png"></image>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import yearReport from '../../../http/api/yearReport.js'
	var that
	export default {
		data() {
			return {
				detailList :[],
				commodityList:[],
				pictureList:[],
				historyCategory:''
			}
		},
		methods: {
			mealDataInit(){
				console.log(that.detailList)
				that.detailList.forEach(item=>{
					let obj = {
						name:item.commodityName,
						quantity:item.quantity
					}
					that.commodityList.push(obj)
					that.pictureList.push(item.picture)
				})
			},
			disinfectInit(){
				console.log(that.detailList)
				var tempList = that.detailList.picture.split(";");
				that.pictureList = tempList
			},
			yearReportInit(){
				/* 此时的this.detailList 为迎检标题 */
				let obj = {
					name: that.detailList
				}
				yearReport.getYearReport(obj).then(res=>{
					that.detailList = res.data.data.records[0]
					that.pictureList.push( res.data.data.records[0].picture)
				})
			},
			imageClick(index){
				console.log(index)
				uni.previewImage({
					current:index,
					urls:that.pictureList,
					fail() {
						uni.$u.toast('图片预览失败，请重试')
					}
				})
			}
		},
		mounted() {
			that = this
			if(that.historyCategory =='早餐'||that.historyCategory=='中餐'||that.historyCategory=='晚餐'){
				that.mealDataInit()
			}
			if(that.historyCategory == '消杀'){
				that.disinfectInit()
			}
			if(that.historyCategory == '迎检'){
				that.yearReportInit()
			}
		},
		created() {
			this.historyCategory = uni.getStorageSync('historyCategory')
			/* 早中晚餐传过来的list */
			const tempList = uni.getStorageSync('detailList')
			if(tempList){
				this.detailList = tempList
			}else{
				this.detailList = this.$Route.query.list
				uni.setStorageSync('detailList',this.detailList)
			}
			console.log(this.detailList)
		},
		beforeDestroy() {
			uni.removeStorageSync('detailList')
		}
	}
</script>

<style lang="scss" scoped>
.upload_box {
		background-color: #FFFFFF;
		padding: 24rpx;

		.header {
			font-size: 14px;
			line-height: 56rpx;
			color: #8f9ca2;
		}

	}
	.image_container {
		display: flex;
		flex-direction: row;
	}
	.u-demo-block__title{
		font-size: 15px;
		color: #8f9ca2;
	}
	.cellbox{
		height: 60rpx;
		line-height: 60rpx;
	}
</style>
