<template>
	<view>
		<!-- 早中晚餐-->
		<view class="upload_box" v-if="historyCategory=='早餐'||historyCategory=='中餐'||historyCategory=='晚餐'">
			<!-- 商品详细 -->
			<view><text class="u-demo-block__title">商品</text></view>
			<!-- <view style="margin-left: 20rpx;" v-for="(item,index) in commodityList"><text>{{item.name}}：<text>{{item.quantity}}</text></text></view> -->
				<lyy-table headerFixed :contents="commodityList" :columnFixed="1" :headers="headers"  height="auto"></lyy-table>
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
			<text class="u-demo-block__title">泔水记录</text>
			<view class="cellbox" style="margin-top: 20rpx;">
				<text class="u-cell-text">上传时间：</text>
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
			<text class="u-demo-block__title">消杀记录</text>
			<view class="cellbox" style="margin-top: 20rpx;">
				<text class="u-cell-text">消杀时间：</text>
				<u--input disabled :value="detailList.disinfectTime"></u--input>
			</view>
			<view class="cellbox">
				<text class="u-cell-text">消杀人员：</text>
				<u--input disabled :value="detailList.operator"></u--input>
			</view>
			<!-- 商品图片 -->
			<view style="margin: 30rpx 0;"><text class="u-demo-block__title">图片列表</text></view>
			<view class="image_container" style=" margin-top: 0rpx;">
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
			<text class="u-demo-block__title">迎检记录</text>
			<view class="cellbox" style="margin-top: 12rpx;">
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
	import { mapGetters  } from 'vuex';
	var that
	export default {
		data() {
			return {
				// 数据列表
				detailList :[],
				commodityList:[],
				pictureList:[],
				// 历史记录标志位
				historyCategory:'',
				headers: [{
						label: '序号',
						key: 'index',
						width: this.upx2px(100)
					}, {
						label: '商品名',
						key: 'name',
						width:  this.upx2px(150)
					}, {
						label: '商品数量',
						key: 'quantity',
						width:  this.upx2px(200)
				}],
			}
		},
		computed: {
			...mapGetters([
				'getHistoryCategory',
			]),
		},
		methods: {
			upx2px(value) {
                //#ifndef MP-WEIXIN
                return uni.upx2px(value) + 'px'
                //#endif
                //#ifdef MP-WEIXIN
                return uni.upx2px(value)
                //#endif
            },
			// 餐饮数据
			mealDataInit(){
				let i = 1;
				that.detailList.forEach(item=>{
					let obj = {
						name:item.commodityName,
						quantity:item.quantity,
						index: i
					}
					that.commodityList.push(obj)
					i++
					that.pictureList.push(item.picture)
				})
			},
			// 消杀数据
			disinfectInit(){
				var tempList = that.detailList.picture.split(";");
				that.pictureList = tempList
			},
			// 迎检数据
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
			this.historyCategory = this.getHistoryCategory
			console.log(this.historyCategory)
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
		display: flex;
		margin-bottom: 14rpx;
	}
</style>
