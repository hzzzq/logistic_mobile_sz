<template>
	<view>
		<u--form class="ListItem" labelPosition="left" :model="model1" ref="form1" :rules="rules">
			<!-- 1 -->
			<view style="display: flex; flex-direction: row;">
				<!-- 左侧头像 -->
				<u-form-item  ref="item1" prop="userInfo.image" style="width: 33%;" @click=showPicker() >
					 <u-upload :fileList="pictureList" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1" class="imageUpload" :disabled="UnModifiable"
						ref="upload"
						width="100"
					 	height="120"
					 >
					 <image style="width: 100px; height: 120px;" mode="scaleToFill":src="model1.userInfo.picture==null?'../../static/upload.png':model1.userInfo.picture"></image>
					 </u-upload>
				</u-form-item>
				<!-- 右侧信息 -->
				<view style="width: 100%;">	
					<!-- 第一行 -->
					<view class="flex flexVc" style="flex-direction: row;"> 
						<u-form-item  ref="item1" prop="userInfo.name" style="width: 50%;" >
							<view class="flex flexVc" >
								<text class="label" style="width: 80%;">姓名：</text>
								<view>
									<input class="val" placeholder="姓名":disabled="UnModifiable"
										v-model="model1.userInfo.name"></input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item1" prop="userInfo.sex" style="width: 50%;">
							<view class="flex flexVc item_view">
								<text class="label" style="width: 80%;">性别：</text>
								<view @click="showPicker('sexShow')">
									<input class="val" placeholder="性别"  v-model="model1.userInfo.sex" disabled
										 ></input>
								</view>
							</view>
						</u-form-item>
					</view>
					<!-- 第二行 -->
					<view class="flex flexVc" style="flex-direction: row;"> 
						<u-form-item  ref="item1" prop="userInfo.age" style="width: 50%;">
							<view class="flex flexVc" >
								<text class="label" style="width: 80%;">年龄：</text>
								<view>
									<input class="val" placeholder="年龄"  type="number" :disabled="UnModifiable"
										v-model="model1.userInfo.age"></input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item3" style="width: 50%;" prop="userInfo.state">
							<view class="flex flexVc item_view">
								<text class="label" style="width: 80%;">状态：</text>
								<view @click="showPicker('stateShow')">
									<input class="val" placeholder="在校/离校/请假" disabled=""
										v-model="model1.userInfo.state"></input>
								</view>
							</view>
						</u-form-item>
					</view>
					<!-- 第三行 -->
					<view class="flex flexVc" style="flex-direction: row;" >
						<u-form-item  ref="item3" style="width: 100%;" prop="userInfo.phone">
							<view class="flex flexVc">
								<text class="label">手机号：</text>
								<view >
									<input class="val" maxlength = "11"  placeholder="手机号" type="number" :disabled="UnModifiable"
										v-model="model1.userInfo.phone"></input>
								</view>
							</view>
						</u-form-item>
					</view>
				</view>
			</view>
			<!-- 2 -->
			<!-- 3 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<u-form-item prop="userInfo.entryTime" class="item flex" style="width: 50%;">
					<view class="label">入职时间</view>
					<input class="val" disabled="true" v-model="model1.userInfo.entryTime" @click="showPicker('dateShow')"/>
				</u-form-item>
				<u-form-item prop="userInfo.window" class="item flex"  style="width: 50%;">
					<view class="label">所在窗口</view>
					<input class="val" :disabled="UnModifiable" v-model="model1.userInfo.window"/>
				</u-form-item>
			</view>
			<!-- 4 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<u-form-item prop="userInfo.coldInfo" class="item flex">
					<view class="label" style="width: 100%;float: left !important;">是否冷链人员</view>
					<input class="val"  :disabled="UnModifiable" v-model="model1.userInfo.coldInfo" />	
				</u-form-item>
			</view>
			<!-- 4 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<u-form-item prop="userInfo.isRiskAreaInfo" class="item flex">
					<view class="label" style="width: 100%;float: left !important;">是否处于中高风险地区</view>
					<input class="val"  :disabled="UnModifiable" v-model="model1.userInfo.isRiskAreaInfo" />
				</u-form-item>
			</view>
			<!-- 5 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<u-form-item prop="userInfo.isOutsideInfo" class="item flex">
					<view class="label" style="width: 100%;">家中是否有外来人员居住</view>
					<input class="val" :disabled="UnModifiable" v-model="model1.userInfo.isOutsideInfo" />
				</u-form-item>
			</view>
			<!-- 6 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<u-form-item prop="userInfo.riskAreaIsOutsideInfo" class="item flex">
					<view class="label" style="width: 100%;">外来人员是否来自中高风险区</view>
					<input class="val" :disabled="UnModifiable" v-model=" model1.userInfo.riskAreaIsOutsideInfo" />
				</u-form-item>
			</view>
		</u--form>
		<!-- 编辑按钮 -->
		<view>
			<u-button type="primary" text="点击修改信息" customStyle="width:320rpx;height:80rpx" v-if="UnModifiable"
				@click="Change('change')" size="large" color="#28c6c4"></u-button>
			<u-button type="primary" text="提交" customStyle="width:320rpx;height:80rpx" v-if="!UnModifiable"
				@click="Change('save')" size="large" color="#28c6c4"></u-button>
		</view>
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel('dateShow')" mode="date" :maxDate="date"></u-datetime-picker>
		<u-picker :show="stateShow" :columns="stateColumns" @cancel="cancel('stateShow')" @confirm="stateConfirm"></u-picker>
		<u-picker :show="sexShow" :columns="sexColumns" @cancel="cancel('sexShow')" @confirm="sexConfirm"></u-picker>
	</view>
</template>

<script>
	var that
	import employee from '@/http/api/employee.js'
	export default {
		data() {
			return {
				// 表单信息
				model1:{
					userInfo:{
						
					}
				},
				// 修改按钮判断
				UnModifiable: true,
				userId:'',
				branchCode:'',
				// 表单验证规则
				rules:{
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					'userInfo.sex': {
						type: 'enum',
						required: true,
						message: '请输入男或女',
						trigger: ['blur', 'change'],
						enum:['男','女']
					},
					'userInfo.isRiskAreaInfo': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					},
					'userInfo.idNumber': [{
						type: 'string',
						required: true,
						message: '请填写身份证号码',
						trigger: ['blur', 'change'],
						len:18
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.idCard(value);
						},
						message: "请输入正确的身份证格式",
						trigger: ["change", "blur"],
					}],
					'userInfo.age':{
						type:'string',
						max:3,
						required:true,
						message:'请输入年龄',
						trigger: ["change", "blur"],
					},
					'userInfo.phone': [{
						type: 'string',
						required: true,
						message: '请填写手机号码',
						trigger: ['blur', 'change'],
						len:11
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value);
						},
						message: "请输入正确的手机号码",
						trigger: ["change", "blur"],
					}],
					'userInfo.state': {
						type: 'enum',
						required: true,
						message: '请输入在校/离校/请假',
						trigger: ['change'],
						enum: ['在校','离校','请假']
					},
					'userInfo.entryTime': {
						type: 'date',
						required: true,
						message: '请输入入职日期',
						trigger: ['change']
					},
					'userInfo.window':{
						type: 'string',
						required:true,
						message:'请输入所在窗口',
						trigger:['change']
					},
					'userInfo.isOutsideInfo': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					},
					'userInfo.riskAreaIsOutsideInfo': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					},
					'userInfo.coldInfo': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					}
				},
				dateShow:false,
				date: Number(new Date()),
				stateShow:false,
				sexShow:false,
				stateColumns:[['在校','离校','请假']],
				/* 性别选择器数组 */
				sexColumns: [
					['男', '女']
				],
				pictureList:[]
			}
		},
		created() {
			const userId = uni.getStorageSync('userId')
			if(userId){
				this.userId = userId
			}else{
				this.userId = this.$Route.query.userId
				uni.setStorageSync('userId', this.userId)
			}
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		beforeDestroy() {
			uni.removeStorage({
				key:'userId'
			})
		},
		mounted() {
			that = this;
			that.getData()
		},
		methods: {
			// 跳转到修改状态
			Change(info) {
				if(info=="change"){
					this.UnModifiable = !this.UnModifiable;
				}else{
					this.$refs.form1.validate().then(res => {
						let temp = that.model1.userInfo
						if(temp.isRiskAreaInfo =='是'){
							temp.isRiskArea = true
						}else{
							temp.isRiskArea = false
						}
						if(temp.isOutsideInfo == '是'){
							temp.isOutside = true
						}else{
							temp.isOutside = false
						}
						if(temp.riskAreaIsOutsideInfo == '是')
						{
							temp.riskAreaIsOutside = true
						}else{
							temp.riskAreaIsOutside = false
						}
						if(temp.coldInfo == '是'){
							temp.cold = true
						}else{
							temp.cold = false
						}
						let params = JSON.stringify(temp)
						employee.updateEmployee(params).then((res)=>{
							if(res.data.code!=200){
								uni.$u.toast("数据修改失败，请重试")
							}else{
								uni.$u.toast("数据修改成功")
								that.pictureList = []
								that.UnModifiable = !that.UnModifiable
							}
						})
					}).catch(errors => {
						uni.$u.toast('请正确填写信息')
					})
				}
			},
			// 获取用户信息详情
			getData(){
				let temp =  {userId: this.userId , branchCode: that.branchCode}
				employee.findAll(temp).then((res)=>{
					if(res.data.code!=200){
						uni.showToast({
							title:"请求数据失败，请重试",
							icon:'none',
							duration:1000
						})
					}else{
						let temp = res.data.data.records[0]
						// 返回数据01转是否
						if(temp.isRiskArea){
							temp.isRiskAreaInfo = '是'
						}else{
							temp.isRiskAreaInfo = '否'
						}
						if(temp.isOutside){
							temp.isOutsideInfo = '是'
						}else{
							temp.isOutsideInfo = '否'
						}
						if(temp.riskAreaIsOutside)
						{
							temp.riskAreaIsOutsideInfo = '是'
						}else{
							temp.riskAreaIsOutsideInfo = '否'
						}
						if(temp.cold){
							temp.coldInfo = '是'
						}else{
							temp.coldInfo = '否'
						}
						that.model1.userInfo = temp
					}
				})
			},
			showPicker(name){
				if(that.UnModifiable){
					uni.$u.toast("请点击按钮进入修改状态")
				}else{
					that[`${name}`] = !that[`${name}`]
					that.date =  Number(new Date())
				}
			},
			dateConfirm(e){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(e.value, 'yyyy-mm-dd')
				// that.model1.userInfo.entryTime
				that.model1.userInfo.entryTime = time
				that.dateShow = false
			},
			cancel(name){
				this[`${name}`] = false
			},
			stateConfirm(e){
				that.model1.userInfo.state  = e.value
				that.stateShow = false
			},
			sexConfirm(e){
				that.model1.userInfo.sex = e.value
				that.sexShow = false
			},
			// 删除图片
			deletePic(event) {
				this[`pictureList`].splice(event.index, 1)
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
							that.model1.userInfo.picture = temp.data[0]
							resolve()
						},
						fail() {
							uni.$u.toast('图片上传失败，请重试')
						}
					});
				})
			},
		}
	};
</script>

<style lang="scss" scoped>
	.ListItem {
		background-color: #ffffff;
		margin-bottom: 28rpx;
		margin-top: 16rpx;
		padding: 22rpx;
		font-size: 30rpx;

		.coloum_item {
			padding: 18rpx 0;

			.item {
				flex: 1;
				padding: 0 8rpx;
				align-items: center;
				// text-align: center;
			}
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
	}
	.label {
		width:124rpx;
		font-weight: bold;
	}
	
	.val {
		width: 60%;
		color: #999;
		font-size: 30rpx;
		// margin: 0 auto;
		// border: solid 1px #007AFF;
	}
</style>
