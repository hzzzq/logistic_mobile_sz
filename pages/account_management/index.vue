<template>
	<view>
		<!-- 搜索 -->
		<view class="search_box">
			<u-search v-model="keywords" placeholder="输入姓名快速查找" @custom="handleSearch($event)" @clear="handleClear()"></u-search>
		</view>
		<!-- 列表 -->
		<view class="list">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(userList.length == 0 ? true:false)"></u-empty>
			<!-- 列表项 -->
			<view class="list_item" @click="navtoDetails(item.userId)" v-for="(item, index) in userList" 
				:key="'userList' + index">
				<view class="info_item flex flexVc" style="flex-direction: row;width: 100%;">
					<!-- 头像 -->
					<image style="width: 18%; height: 130rpx; margin-left: 10rpx; border-radius: 30rpx;" :src="item.picture==null?defaultPicture:item.picture"></image>
					<!-- 信息 -->
					<view style="margin-left: 20rpx; width: 80%; height:130rpx;display: flex;flex-direction: row; justify-content: space-between; ">
						<view>
							<text class="content" style="display: block;">{{item.name}}</text>
							<view><text style="color: #999; font-size: 32rpx;padding: 0 6rpx;">所在窗口:</text><text>{{item.windows}}</text></view>
						</view>
						<view class="flex" style="flex-direction: row; justify-content: center; align-items: center;"  >
							<u-tag text="离职" size="mini" style="margin-right: 10rpx;" type="error" v-if="item.disabled"></u-tag>
							<u-tag text="冷链" size="mini" style="margin-right: 10rpx;" v-if="item.cold"></u-tag>
							<u-button class="ins" v-show="item.state=='在校'" type="success" plain hairline :text="item.state" size="normal" customStyle="width:100rpx; font-size:32rpx"></u-button>
							<u-button class="ins" v-show="item.state=='离职'" type="error" plain hairline :text="item.state" size="normal" customStyle="width:100rpx;"></u-button>
							<u-button class="ins" v-show="item.state=='请假'" type="warning" plain hairline :text="item.state" size="normal" customStyle="width:100rpx; font-size:32rpx;color:#f9ae3d"></u-button>
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
				// 搜索框内容
				keywords:'',
				userList: [],
				branchCode:'',
				pageInfo:{
					current:'',
					pages:''
				},
				/* 判断是否处于搜索状态 */
				searchFlag:false,
				// 判断是否处于刷新状态  解决刷新自动触发一次触底函数的问题
				refreshFlag:true,
				// 进入详情后退出刷新页面flag
				onShowFlag:false,
				defaultPicture:'http://nobug.love/logistic/image/user.png'
			};
		},
		watch: {
			// 监听搜索框
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
			let temp = that.pageInfo
			if(temp.current<temp.pages){
				that.getMore();
				that.refreshFlag = false;
			}else{
				if(!that.refreshFlag){
					uni.$u.toast("已经是最后一页了！")
				}
			}
		},
		onShow() {
			if(this.onShowFlag){
				let temp = {branchCode: that.branchCode}
				this.getData(temp)
				this.onShowFlag = false
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
			// 下一页数据的请求方法
			getNextPage(temp){
				employee.findAll(temp).then((res)=>{
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
				that.onShowFlag = true;
				this.$Router.push({
					name: 'account_details',
					params: {
						userId: item,
						branchCode: that.branchCode
					}
				})
			},
			// 添加员工
			navtoAdd() {
				that.onShowFlag = true;
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
		margin-top: 6rpx;
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
