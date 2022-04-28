<template>
	<view>
		<!-- 搜索 -->
		<view class="search_box">
			<u-search v-model="keywords" placeholder="输入姓名快速查找" @custom="handleSearch($event)" @clear="handleClear()"></u-search>
		</view>
		<!-- 列表 -->
		<view class="list">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(userList.length == 0 ? true:false)"></u-empty>
			<view class="list_item" @click="navtoDetails(item.userId)" v-for="(item, index) in userList"
				:key="'userList' + index">
				<view class="info_item flex flexVc" style="flex-direction: row;width: 100%;">
					<image style="width: 18%; height: 130rpx; margin-left: 10rpx; border-radius: 30rpx;" :src="item.picture"></image>
					<view style="margin-left: 20rpx; width: 70%; height:130rpx;display: flex;flex-direction: row; justify-content: space-between; ">
						<view>
							<text class="content" style="display: block;">{{item.name}}</text>
							<view><text style="color: #999; font-size: 32rpx;padding: 0 6rpx;">所在窗口:</text><text>{{item.window}}</text></view>
						</view>
						<view class="flex" style="flex-direction: row; justify-content: center; align-items: center;"  >
							<u-button class="ins" v-show="item.state=='在校'" type="success" plain hairline :text="item.state" size="normal" customStyle="width:120rpx; font-size:32rpx"></u-button>
							<u-button class="ins" v-show="item.state=='离校'" type="warning" plain hairline :text="item.state" size="normal" customStyle="width:120rpx; font-size:32rpx;color:#f9ae3d"></u-button>
							<!-- <text style="padding: 0 6rpx;display: block;">{{item.state}}</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部添加人员 -->
		<view class="addBottomBox flex flexHc">
			<view class="btn" @click="navtoAdd">
				添加人员
			</view>
		</view>
		
	</view>
</template>

<script>
	var that
	import employee from '@/http/api/employee.js'
	export default {
		data() {
			return {
				keywords:'',
				userList: [],
				branchCode:'',
				pageInfo:{
					current:'',
					pages:''
				},
				/* 判断是否处于搜索状态 */
				searchFlag:false,
				refreshFlag:true
			};
		},
		watch: {
		    keywords: {
		        handler(newValue, oldValue) {
					if(oldValue!=undefined&&newValue ==''){
						let temp = {branchCode:that.branchCode}
						that.getData(temp)
						that.searchFlag = false
					}
		        },
		        immediate: true
		    }
		},
		onReachBottom() { // 触底事件
			console.log("触底")
			let temp = that.pageInfo
			// console.log(that.userList)
			if(temp.current<temp.pages){
				that.getMore();
				that.refreshFlag = false;
			}else{
				if(!that.refreshFlag){
					uni.$u.toast("已经是最后一页了！")
				}
			}
		},
		mounted() {
			that = this
			let temp = {branchCode: that.branchCode}
			that.getData(temp)
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
		},
		methods: {
			// 获取数据
			getData(params) {
				employee.findAll(params).then((res)=>{
					if(res.data.code!=200){
						uni.showToast({
							title:"数据获取失败，请重试",
							icon:'none',
							duration:1000
						})
					}else{
						that.userList = res.data.data.records
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
					}
				})
			},
			getNextPage(temp){
				employee.findAll(temp).then((res)=>{
					console.log(res.data)
					if(res.data.code!=200){
						uni.showToast({
							title:"数据获取失败，请重试",
							icon:'none',
							duration:1000
						})
					}else{
						/* 与getdata区别开  一个为等于 一个为数组合并 */
						that.userList.push.apply(that.userList, res.data.data.records);
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
					}
				})
			},
			// 搜索事件
			handleSearch(e) {
				if(e!=""){
					let temp = {branchCode : that.branchCode, name: e}
					that.getData(temp)
					that.searchFlag = true
				}else{
					/* 无内容点击搜索框按钮 */
					let temp = {branchCode: that.branchCode}
					that.getData(temp)
				}
			},
			// 输入框清空
			handleClear() {
				that.$nextTick(() => {
					that.searchFlag = false
					let temp = {branchCode: that.branchCode}
					that.getData(temp)
				})
			},
			// 加载下一页数据
			async getMore() {
				//判断是搜索后的数据的下一页  还是未搜索的数据的下一页： searchFlag
				if(that.searchFlag = true){
					let temp = {
						branchCode : that.branchCode,
						pageNum: that.pageInfo.current+1,
						name: that.keywords
					}
					await that.getNextPage(temp)
				}else{
					let temp = {
						branchCode : that.branchCode,
						pageNum: that.pageInfo.current+1
					}
					that.getNextPage(temp)
				}
			},
			// 跳转到用户详情
			navtoDetails(item) {
				console.log("userId:::::::"+item)
				this.$Router.push({
					name: 'account_details',
					params: {
						userId: item
					}
				})
		 },
			// 添加员工
			navtoAdd() {
			 this.$Router.push({
					name: 'addUser',
					params:{
						branchCode : that.branchCode
					}
				})
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
				// justify-content: space-between;
				line-height: 56rpx;

				.label {
					color: #999;
					font-size: 30rpx;
				}

				.content {
					padding: 0 6rpx;
					font-size: 32rpx;
				}
			}
		}
	}

	// 底部
	.addBottomBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		padding: 12rpx 24rpx;
		background-color: #FFFFFF;

		.btn {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			font-size:30rpx;
			color: #FFFFFF;
			background-color: #28c6c4;
			text-align: center;
			border-radius: 8rpx;
		}
	}

	#empty {
		height: 500rpx;
	}
	
</style>
