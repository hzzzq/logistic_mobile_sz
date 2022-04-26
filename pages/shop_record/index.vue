<template>
	<view>
		<!-- 搜索 -->
		<view class="search_box">
			<u-search v-model="params.keywords" placeholder="输入商品名称快速查找" @search="handleSerach()" @clear="handleClear()">
			</u-search>
		</view>
		<!-- 列表 -->
		<view class="list">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(list.length == 0 ? true:false)"></u-empty>
			<view class="list_item" v-for="(item, index) in list" :key="'list' + index">
				<view class="info_item flex">
					<view><text class="label">商品名称:</text><text class="content">{{item.name}}</text></view>
				</view>
				<view class="info_item flex flexVc" style="width: 100%;">
					<view style="width: 60%;"><text class="label">商品条码:</text><text class="content">{{item.barCode}}</text></view>
					<view class="flex flexVc" style="width: 38%;">
						<text class="label">参考超市:</text>
						<view @click="selectMarket(item)">
							<u--input class="priceInput" disabled v-model="item.contrastSupermarket" placeholder="选择超市" border="surround" style="width: 150rpx; height: 50rpx;" ></u--input>
						</view>
					</view>
				</view>
				<view class="info_item flex flexVc" style="width: 100%;">
					<view style="width: 60%;"><text class="label">商品价格:</text><text class="content">{{item.price}}</text></view>
					<view class="flex flexVc" style="width: 38%;">
						<text class="label">参考价格:</text>
						<view>
							<input  type="number"  placeholder="输入价格" @blur = "handleInputUpdate($event)" v-model="item.contrastPrice" @focus="getItemInfo(item)"
							style="width: 150rpx; height: 50rpx; font-size: 28rpx; border:#dadbde solid;border-width: 0.5px;border-radius: 4px; padding: 6px 9px;"  />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择器 -->
		<u-picker
			:show="marketShow"
			:columns="marketColumns"
			@cancel="cancel"
			@confirm="marketConfirm"
		></u-picker>
	</view>
</template>

<script>
	var that 
	import market from '@/http/api/market.js'
	export default {
		data() {
			return {
				commodityInfo:{},
				params: { // 获取数据参数
					page: 1,
					limit: 14,
					keywords: ''
				},
				total: 0, // 总数据条数
				list: [],
				currentItem:'',
				branchCode:'',
				marketShow: false,
				marketColumns:[],
				date: Number(new Date()),
				adminId:'',
				todayDate:''
			};
		},
		onReachBottom() { // 触底事件
			if (this.total >= this.params.page * this.params.limit) {
				this.params.page++
				this.$nextTick(() => {
					this.getMore()
				})
				return
			}
		},
		mounted() {
			that = this
			that.getData()
			that.getMarket()
			that.getTodayDate()
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
			const tempInfo = uni.getStorageSync('userInfo')
			this.adminId = tempInfo.adminId
			console.log(this.adminId)
		},
		methods: {
			// 获取商品数据
			getData(){
				market.findMarketRecord(that.branchCode).then((res)=>{
					if(res.data.code!=200){
						uni.$u.toast('数据请求失败，请重试')
					}else{
						that.list = res.data.data.records
					}
				})
			},
			getMarket(){
				let temp ={category:'超市'} 
				market.getMarket(temp).then((res)=>{
					if(res.data.code!=200){
						uni.$u.toast('数据请求失败，请重试')
					}else{
						let tempList = []
						res.data.data.records.forEach((item)=>{
							tempList.push(item.dictName)
						})
						that.marketColumns.push(tempList)
					}
				})
			},
			getTodayDate(){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(that.date,'yyyy-mm-dd')
				that.todayDate = time
			},
			selectMarket(item){
				that.marketShow = true;
				that.commodityInfo = item;
			},
			// 搜索事件
			handleSearch() {
				// 使用keyword进行按需搜索
				this.getData()
			},
			// 输入框清空
			handleClear() {
				this.params.keywords = '',
					this.$nextTick(() => {
						//获取所有数据
						this.getData()
					})
			},
			// 加载下一页数据
			async getMore() {
				const res = await getAccountList(this.params)
				if (res.data.code == 200) {
					this.list = [...this.list, ...res.data] || []
				}
			},
			marketConfirm(e) {
				that.commodityInfo.recordTime = that.todayDate;
				that.commodityInfo.adminId = that.adminId
				that.commodityInfo.contrastSupermarket = e.value[0]
				let temp = JSON.stringify(that.commodityInfo)
				market.alterMarketRecord(temp).then((res)=>{
					if(res.data.code!=200){
						uni.$u.toast('数据提交失败，请重试')
					}else{
						uni.$u.toast('超市信息已更改')
					}
				})
				that.marketShow = false
			},
			cancel() {
				that.marketShow = false
			},
			editClick(index){
				this.currentItem = index;
				this.nucleinShow = true;
				console.log(this.currentItem)
			},
			handleInputUpdate(e){
				let temp = that.commodityInfo
				temp.recordTime = that.todayDate;
				temp.adminId = that.adminId
				temp.contrastPrice = Number(e.detail.value)
				let params = JSON.stringify(temp)
				market.alterMarketRecord(params).then((res)=>{
					if(res.data.code!=200){
						uni.$u.toast('数据提交失败，请重试')
					}else{
						uni.$u.toast('价格信息已更改')
					}
				})
			},
			getItemInfo(item){
				that.commodityInfo = item
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		padding-bottom: 120rpx;
	}

	// 搜索控件
	.search_box {
		margin-top: 12rpx;
		background-color: #FFFFFF;
		padding: 18rpx 24rpx;
	}

	// 列表
	.list {
		background-color: #FFFFFF;

		.list_item {
			border-top: 1rpx solid #efefef;
			padding: 12rpx;
			cursor: pointer;

			.info_item {
				justify-content: space-between;
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

	#empty {
		height: 500rpx;
	}
</style>
