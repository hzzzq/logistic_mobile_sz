<template>
	<view>
		<!-- 搜索 -->
		<view class="search_box">
			<u-search v-model="keywords" placeholder="输入姓名快速查找"  @custom="handleSearch($event)" @clear="handleClear()"></u-search>
		</view>
		<!-- 列表 -->
		<view class="list" style="background-color: #f1f4fb;">
			<u-empty id="empty" text="暂无数据" marginTop="120" v-if="(list.length == 0 ? true:false)"></u-empty>
			<view class="list_item" style="margin-bottom: 16rpx; background-color: #FFFFFF; height: 180rpx;" v-for="(item, index) in list" :key="'list' + index" >
				<!-- row1 -->
				<view class="info_item flex" style="margin-bottom: 10rpx;">
					<view style="width: 180rpx;"><text class="label">姓名:</text><text class="content">{{item.name}}</text></view>
					<!-- <view><text class="label">所在窗口:</text><text class="content">{{item.window}}</text></view> -->
					<view style="margin-left: 20rpx;"><text class="label">状态:</text><text class="content">{{item.state}}</text></view>
				</view>
				<!-- row2 -->
				<!-- <view class="info_item flex flexVc">
					<view><text class="label">联系方式:</text><text class="content">{{item.phone}}</text></view>
				</view> -->
				<!-- row3 -->
				<view class="info_item flex flexVc" style="width: 100%;">
					<view class="flex flexVc" style="width: 58%;" @click="showDate(item.userId,index)">
						<text class="label">上次核酸时间:</text>
						<u--input
							disabled
							style="margin-left: 10rpx;  height: 50rpx;"
							v-model="item.nucleinTime"
							border="surround"
						></u--input>
					</view>
					<view style="width: 40%; margin-left: 10rpx;" class="flex flexVc" @click="showTemperature(item.userId,index)">
						<text class="label">今日体温：</text>
						<!-- 三种状态  -->
						<u-button type="success" v-show="item.todayTemperature>=35&&item.todayTemperature<=37" plain="true" hairline="true" text="合格" size="small" customStyle="width:120rpx;flex:1"></u-button>
						<u-button type="warning" v-show="item.todayTemperature==0" plain="true" hairline="true" text="未检测" size="small" customStyle="width:120rpx;flex:1;color:#f9ae3d"></u-button>
						<u-button type="error" v-show="item.todayTemperature>0&&item.todayTemperature<35||item.todayTemperature>37" plain="true" hairline="true" text="不合格" size="small" customStyle="width:120rpx;flex:1"></u-button>
					</view>
				</view>
			</view>
		</view>
		<!-- 核酸时间选择器 -->
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel('dateShow')" :maxDate="date" mode="date"></u-datetime-picker>
		<!-- 体温选择器 -->
		<u-popup :show="temperatureShow" mode="bottom" closeable @close="cancel('temperatureShow')">
			<view class="u-popup-slot" style="width: 750rpx;">
				<view style="display: flex;flex-direction: row;" >
					<text style="margin: 0 auto; padding: 6px 9px;">今日体温</text>
					<u-input v-model="temperatureInfo.temperature"
						type="number"
						style="height: 70rpx;"
						placeholder="请输入今日体温"
						border="surround"></u-input>
				</view>
				<u-button
					type="success"
					text="提交"
					customStyle="width: 200rpx;margin-top:80rpx"
					@click="updateTemperatureInfo()"
				></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	var that
	import employee from '@/http/api/employee.js'
	export default {
		data() {
			return {
				//核酸信息
				nucleinInfo:{
					nucleinResult:false,
					nucleinTime:'',
					operator:'',
					userId:''
				},
				//温度信息
				temperatureInfo:{
					operator: '',
					temperature: 0,
					temperatureTime: '',
					userId: ''
				},
				//用户list
				list: [],
				branchCode:'',
				dateShow:false,
				temperatureShow:false,
				date: Number(new Date()),
				currentUserIndex:'',
				keywords:'',
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
			//获取今日日期存入
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
			this.nucleinInfo.operator = tempInfo.adminName;
			this.temperatureInfo.operator = tempInfo.adminName
		},
		methods: {
			//根据当前的branchCode 获取用户信息
			getData(branchCode){
				let temp = {branchCode: branchCode}
				employee.findAll(temp).then((res)=>{
					console.log(res.data.data)
					if(res.data.code!=200){
						uni.$u.toast('数据请求失败，请重试')
					}else{	
						let temp = res.data.data.records
						that.list = temp;
					}
				})
			},
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
						that.list = res.data.data.records
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
						that.list.push.apply(that.list, res.data.data.records);
						that.pageInfo.current = res.data.data.current
						that.pageInfo.pages = res.data.data.pages
					}
				})
			},
			// 搜索事件
			handleSearch(e) {
				// 使用keyword进行按需搜索
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
					await that.getNextPage(temp)
				}
			},
			//选择器的取消方法
			cancel(name) {
				this[`${name}`] = false
			},
			
			//获取今日日期 放入体温信息
			getTodayDate(){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(that.date,'yyyy-mm-dd')
				that.temperatureInfo.temperatureTime = time
			},
			// 展示核酸时间的选择器
			showDate(id,index){
				that.dateShow = true;
				that.nucleinInfo.userId = id;
				that.currentUserIndex = index;
			},
			// 时间选择器的确定方法 确定后直接上传并新增用户的核酸信息
			dateConfirm(e){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(e.value, 'yyyy-mm-dd')
				// this.model1.userInfo.entryTime = time
				// 改变页面渲染list的核酸时间
				that.list[that.currentUserIndex].nucleinTime = time;
				that.nucleinInfo.nucleinTime = time;
				that.updateNucleinInfo();
				this.dateShow = false;
			},
			// 核酸信息上传方法
			updateNucleinInfo(){
				let params = that.nucleinInfo
				employee.addNucleinInfo(params).then((res)=>{
					if(res.data.code != 200){
						uni.$u.toast('数据提交失败，请重试')
					}else{
						uni.$u.toast('核酸信息已更新')
						setTimeout(()=>{
							that.$router.go(0)
						},500)
					}
				})
			},
			// 体温选择器show方法
			showTemperature(id,index){
				that.temperatureInfo.userId = id;
				that.temperatureShow = true;
				that.currentUserIndex = index;
			},
			// 上传体温信息
			updateTemperatureInfo(){
				let params = that.temperatureInfo
				
				employee.addTemperatureInfo(params).then((res)=>{
					if(res.data.code != 200){
						uni.$u.toast(res.data.msg)
					}else{
						uni.$u.toast('体温信息更新成功')
						//更改当前渲染list的temperature
						that.list[that.currentUserIndex].temperature = that.temperatureInfo.temperature;
						//修改完成  关闭当前窗口
						that.temperatureShow = false
						setTimeout(()=>{
							that.$router.go(0)
						},500)
					}
				})
			},
			
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

	#empty {
		height: 500rpx;
	}
	.u-popup-slot{
		width: 200px;
		height: 230px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
