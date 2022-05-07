<template>
	<view>
		<!-- 商品选择 -->
		<view class="upload_box" style="margin: 0;" ref>
			<view class="header">
				<text style="font-size: 28rpx;color:#8f9ca2;">台账上传：</text>
				<view style="display: flex;">
					<view class="btn" @click="addClick()" v-if="mealCategory=='早餐'">
						新增
					</view>
					<view class="btn" @click="deleteClick()" v-if="mealCategory=='早餐'" style="background-color: #f56c6c;margin-left: 20rpx;">
						删除
					</view>
				</view>
			</view>
			<view v-for="(item, index ) in commodityList">
				<uni-data-picker style="margin-top: 10rpx;" placeholder="请选择商品" popup-title="选择商品"  @nodeclick="nodeClick($event,index)" :localdata="dataTree" ></uni-data-picker>
				<view class="flex flexVc" style="margin-top: 10rpx;">
					<text style="font-size: 28rpx;color:#8f9ca2;margin-left: 20rpx;">价格：<text>{{commodityList[index].price}}元</text></text>
					<input type="number" placeholder="输入数量" class="quantityInput"  v-model="commodityList[index].quantity"/>
				</view>
			</view>
		</view>

		<!-- 下午拍照上传 -->
		<view class="upload_box">
			<view class="header">
				图片上传
			</view>
			<u-upload v-if="mealCategory=='早餐'" :fileList="pictureList" @afterRead="afterRead" @delete="deletePic" name="2" multiple ></u-upload>
			<u-upload v-else :fileList="pictureList" @afterRead="afterRead" @delete="deletePic" name="2" multiple :maxCount="3"></u-upload>
		</view>
		<view class="btn" @click="update">
			上传
		</view>
	</view>
</template>

<script>
	var that 
	import meal from '@/http/api/meal.js'
export default {
	data() {
		return {
			commodityList:[],
			pictureList:[],
			dataTree: [],
			branchCode:'',
			operator:'',
			pictureUrlList:[],
			/* 未格式化的时间 */
			date: Number(new Date()),
			/* 格式化时间 */
			todayDate:'',
			/* 早中晚餐信息 */
			mealCategory:'',
			menuList:[]
			
		};
	},
	mounted() {
		that = this
		that.getTodayDate()
		that.getCommodity()
		// that.getData(that.branchCode)
		that.dataInit()
	},
	created() {
		/* 子菜单branchCode */
		const tempCode = uni.getStorageSync('menuCode')
 		/*路由传值 区别早中晚餐*/	
		const mealCategory = uni.getStorageSync('mealCategory')
		if(tempCode){
			this.branchCode = tempCode
		}else{
			this.branchCode = this.$Route.query.branchCode
			uni.setStorageSync('menuCode', this.branchCode)
		}
		if(mealCategory){
			this.mealCategory = mealCategory
		}else{
			this.mealCategory = this.$Route.query.category
			uni.setStorageSync('mealCategory',this.mealCategory)
		}
		// 操作人员
		const tempInfo = uni.getStorageSync('userInfo')
		this.operator = tempInfo.adminName;
		
	},
	beforeDestroy() {
		uni.removeStorageSync('mealCategory')
	},
	methods: {
		/* 获取商品 */
		getCommodity(){
			let temp = {category:that.mealCategory,pageSize:9999}
			meal.getCommodity(temp).then((res)=>{
				if(res.data.code != 200){
					uni.$u.toast('数据请求失败，请重试')
				}else{
					res.data.data.records.forEach((item)=>{
						let obj = {
							text: item.dictName,
							value: item.dictId,
							price: item.details
						}
						that.dataTree.push(obj)
					})
				}
			})
		},
		dataInit(){
			if(that.mealCategory != '早餐'){
				for(var i = 0 ;i < 3 ;i++){
					let obj = {
							branchCode: that.branchCode,//
							category: that.mealCategory,
							commodityName: "",
							operator: that.operator,//
							picture: "",
							price: 0,
							quantity: ""
						};
					that.commodityList.push(obj)
				}
			}
		},
		//获取今日日期
		getTodayDate(){
			const timeFormat = uni.$u.timeFormat
			let time = timeFormat(that.date,'yyyy-mm-dd')
			that.todayDate = time
		},
		nodeClick(e,index){
			that.commodityList[index].commodityName = e.text
			that.commodityList[index].price = e.price
		},
		inputHandler(e,index){
			// that.commodityList[index].quantity = e.detail.value
		},
		// 删除图片
		deletePic(event) {
			this[`pictureList`].splice(event.index, 1)
			this[`pictureUrlList`].splice(event.index, 1)
		},
		// 新增图片  图片读取后的操作
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file) //lists为当前图片数组
			let fileListLen = this[`pictureList`].length //双向绑定图片数组的长度
			lists.map((item) => {
				this[`pictureList`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				})
			})
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url)
				let item = this[`pictureList`][fileListLen]
				this[`pictureList`].splice(fileListLen, 1, Object.assign(item, {
					status: 'success',
					message: '图片上传成功',
					url: result
				}))
				fileListLen++
			}
		},
		//上传方法
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: 'http://101.33.249.154:8089/user/uploadImgs/img', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'uploadImgs',
					header:{"token": uni.getStorageSync('token')},
					success: (res) => {
						let temp = JSON.parse(res.data)
						that.pictureUrlList.push(temp.data[0])
						resolve()
					},
					fail() {
						uni.$u.toast('图片上传失败，请重试')
					}
				});
			})
		},
		async update(){
			if(that.commodityList.length==0){
				uni.$u.toast("数据不可为空")
			}else if(that.pictureUrlList.length!=that.commodityList.length){
				uni.$u.toast("请上传对应数量的图片")
			}else{
				let i = 0;
				let flag = true
				for(var j=0;j<that.commodityList.length;j++){
					if(that.commodityList[j].commodityName == ""){
						flag = false;
						break;
					}
					if(that.commodityList[j].quantity == ""){
						flag = false;
						break;
					}
					that.commodityList[j].picture = that.pictureUrlList[i];
					i++;
				}
				//判断信息是否完整  不完整上部循环会直接跳出到这里进行toast
				if(!flag){
					uni.$u.toast("请填写完整信息")
				}else{
					//添加数据
					meal.addMealsRecord(that.commodityList).then(res=>{
						
						if(res.data.code!=200){
							uni.$u.toast(res.data.msg)
						}else{
							uni.$u.toast("数据上传成功")
							// 重定向刷新数据
							setTimeout(()=>{
								that.$router.go(0)
							},500)
						}
					})
				}
			}
		},
		addClick(){
			let temp ={
					branchCode: that.branchCode,//
					category: that.mealCategory,
					commodityName: "",
					operator: that.operator,//
					picture: "",
					price: 0,
					quantity: ""
				};
			that.commodityList.push(temp)
		},
		deleteClick(){
			that.commodityList.splice(that.commodityList.length-1,1)
		}
		
	}
};
</script>

<style lang="scss" scoped>
	.upload_box {
		margin-top: 18rpx;
		background-color: #FFFFFF;
		padding: 24rpx ;
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
	.point_container{
		background-color: #FFFFFF;
		height: 120rpx;
		padding: 50rpx 30rpx;
	}
	.quantityInput{
		margin-left: 20rpx;  
		width: 150rpx; 
		height: 50rpx; 
		font-size: 28rpx; 
		border:#dadbde solid;
		border-width: 0.5px;
		border-radius: 4px; 
		padding: 6px 9px;
	}
	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		 .btn {
				width: 150rpx;
				height: 72rpx;
				background-color: #28c6c4;
				color: #FFFFFF;
				line-height: 72rpx;
				text-align: center;
				border-radius: 18rpx;
				font-size: 30rpx;
				margin: 0;
			}
	}
</style>
