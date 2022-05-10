<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">用户信息</text>
			<view class="u-demo-block__content">
				<!-- 表单 -->
				<u--form labelPosition="left" :model="model1" ref="form1" :rules="rules">
					<!--row1 -->
					<view style="display: flex; flex-direction: row;">
						<!-- 左侧头像 -->
						<u-form-item  ref="item1" prop="userInfo.image" style="width: 33%;" >
							 <u-upload :fileList="pictureList" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="1" class="imageUpload" 
								ref="upload"
								width="100"
							 	height="120"
							 >
							 <image style="width: 100px; height: 120px;" mode="scaleToFill" src="../../../static/upload.png"></image>
							 </u-upload>
						</u-form-item>
						<!-- 右侧信息 -->
						<view style="width: 100%;">	
							<!-- 第一行 -->
							<view class="flex flexVc" style="flex-direction: row;"> 
								<u-form-item  ref="item1" prop="userInfo.name" style="width: 50%;" >
									<view class="flex flexVc" >
										<text class="form_lable flex_we">姓名：</text>
										<view class="flex_we" ref>
											<u--input border="none" placeholder="姓名" fontSize="26rpx"
												v-model="model1.userInfo.name"></u--input>
										</view>
									</view>
								</u-form-item>
								<u-form-item  ref="item1" prop="userInfo.sex" style="width: 50%;">
									<view class="flex flexVc item_view">
										<text class="form_lable flex_we">性别：</text>
										<view @click="showPicker('sexShow')" class="flex_we">
											<u--input border="none" placeholder="性别" disabled v-model="model1.userInfo.sex"
												 fontSize="26rpx"></u--input>
										</view>
									</view>
								</u-form-item>
							</view>
							<!-- 第二行 -->
							<view class="flex flexVc" style="flex-direction: row;"> 
								<u-form-item  ref="item1" prop="userInfo.age" style="width: 50%;">
									<view class="flex flexVc" >
										<text class="form_lable flex_we">年龄：</text>
										<view class="flex_we" ref>
											<u--input border="none" placeholder="年龄" fontSize="26rpx" type="number"
												v-model="model1.userInfo.age"></u--input>
										</view>
									</view>
								</u-form-item>
								<u-form-item  ref="item3" style="width: 50%;" prop="userInfo.state">
									<view class="flex flexVc item_view">
										<text class="form_lable flex_we">状态：</text>
										<view class="flex_we" @click="showPicker('stateShow')">
											<u--input border="none" placeholder="在校/离校/请假" fontSize="26rpx" disabled
												v-model="model1.userInfo.state"></u--input>
										</view>
									</view>
								</u-form-item>
							</view>
							<!-- 第三行 -->
							<view class="flex flexVc" style="flex-direction: row;" >
								<u-form-item  ref="item3" style="width: 100%;" prop="userInfo.phone">
									<view class="flex flexVc">
										<text class="form_lable flex_we">手机号：</text>
										<view class="flex_we">
											<u--input maxlength = "11" border="none" placeholder="手机号" fontSize="26rpx" type="number"
												v-model="model1.userInfo.phone"></u--input>
										</view>
									</view>
								</u-form-item>
							</view>
						</view>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!--row2-->
					<u-form-item  ref="item2" prop="userInfo.idNumber" style="width: 100%;">
						<view class="flex flexVc">
							<text class="form_lable flex_we">身份证：</text>
							<view class="flex_we" >
								<u--input maxlength="18" border="none" placeholder="请填写身份证号码" fontSize="26rpx" style="width: 400rpx;" type="idcard"
									v-model="model1.userInfo.idNumber"></u--input>
							</view>
						</view>
					</u-form-item>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!--row3-->
					<view style="display: flex;flex-direction:row; width: 100%;">
						<u-form-item  ref="item4" style="width: 50%;" prop="userInfo.entryTime">
							<view class="flex flexVc" @click="dateShow = !dateShow">
								<text class="form_lable flex_we">入职时间：</text>
								<view class="flex_we">
									<u--input border="none" placeholder="入职时间" fontSize="26rpx" disabled
										v-model="model1.userInfo.entryTime"></u--input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item4" style="width: 50%;" prop="userInfo.branchCode">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we">部门：</text>
								<view class="flex_we">
									<u--input border="none"  fontSize="26rpx" disabled
										v-model="model1.userInfo.branchName"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<!-- 分隔线 -->
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!--row4-->
					<view style="display: flex;flex-direction: row; width: 100%;">
						<u-form-item  ref="item5" style="width: 55%;" prop="userInfo.departureTime">
							<view class="flex flexVc">
								<text class="form_lable flex_we">是否冷链人员：</text>
								<view class="flex_we" @click="showPicker('coldShow')">
									<u--input border="none" placeholder="请选择" fontSize="26rpx" disabled
										v-model="model1.userInfo.coldInfo"></u--input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item5" style="width: 50%;" prop="userInfo.window">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we">所在窗口：</text>
								<view class="flex_we"> 
									<u--input border="none" placeholder="所在窗口" fontSize="26rpx"
										v-model="model1.userInfo.window"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<!-- 分隔线 -->
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- row5 -->
					<u-form-item borderBottom ref="item6" prop="userInfo.idAddress">
						<view class="flex flexVc item_view">
							<text class="form_lable flex_we">身份证地址：</text>
							<view class="flex_we" >
								<u--input border="none" placeholder="身份证地址" fontSize="26rpx"
									v-model="model1.userInfo.idAddress"></u--input>
							</view>
						</view>
					</u-form-item>
					<!--row6-->
					<u-form-item borderBottom ref="item6" prop="userInfo.currentAddress">
						<view class="flex flexVc item_view">
							<text class="form_lable flex_we">当前居住地址：</text>
							<view class="flex_we">
								<u--input border="none" placeholder="当前居住地址" fontSize="26rpx"
									v-model="model1.userInfo.currentAddress"></u--input>
							</view>
						</view>
					</u-form-item>
					<!--row7 -->
					<view style="display: flex;flex-direction: row;width: 100%;">
						<u-form-item  ref="item7" prop="userInfo.riskArea">
							<view class="flex flexVc">
								<text class="form_lable flex_we" style="width: 500rpx;">有无到中高风险地区：</text>
								<view class="flex_we" style="margin-left: 20rpx;" @click="riskClick('riskArea')">
									<u--input border="none" placeholder="请选择" fontSize="26rpx" disabled
										v-model="model1.userInfo.riskArea"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- row8 -->
					<view style="display: flex;flex-direction: row;width: 100%;">
						<u-form-item  ref="item7" prop="userInfo.outSide">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we"  style="width:500rpx;">家中有无外来人员居住：</text>
								<view class="flex_we" style="margin-left: 10rpx;" @click="riskClick('outSide')">
									<u--input border="none" placeholder="请选择" fontSize="26rpx" disabled
										v-model="model1.userInfo.outSide"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!--row9-->
					<u-form-item borderBottom ref="item7" prop="userInfo.outsideRiskArea">
						<view class="flex flexVc">
							<text class="form_lable flex_we" style="width:780rpx;">家中人员有无到中高风险区：</text>
							<view class="flex_we" style="margin-left: 20rpx;" @click="riskClick('outsideRiskArea')">
								<u--input border="none" placeholder="请选择" fontSize="26rpx" disabled
									v-model="model1.userInfo.outsideRiskArea"></u--input>
							</view>
						</view>
					</u-form-item>
				</u--form>
				<!-- 底部栏 -->
				<u-button type="primary" text="提交" customStyle="margin-top: 80rpx; width:320rpx;height:80rpx"
					@click="submit" size="large" color="#28c6c4"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 20rpx;width:320rpx;height:80rpx"
					@click="reset" size="large" color="#ca7b5a"></u-button>
			</view>
		</view>
		<!-- 性别选择器 -->
		<u-picker :show="sexShow" :columns="sexColumns" @cancel="cancel('sexShow')" @confirm="sexConfirm"></u-picker>
		<!-- 在校选择器 -->
		<u-picker :show="stateShow" :columns="stateColumns" @cancel="cancel('stateShow')" @confirm="stateConfirm"></u-picker>
		<!-- 入职时间 -->
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel('dateShow')"  mode="date"></u-datetime-picker>
		<!-- 中高风险等 -->
		<u-picker :show="riskShow" :columns="riskColumns" @cancel="cancel('riskShow')" @confirm="riskConfirm"></u-picker>
		<!-- 冷链 -->
		<u-picker :show="coldShow" :columns="coldColumns" @cancel="cancel('coldShow')" @confirm="coldConfirm"></u-picker>
	</view>
</template>

<script>
	import employee  from '@/http/api/employee.js'
	var that
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						branchCode:'',
						window:'',
						name:'',
						sex:'',
						age:'',
						idNumber:'',
						cold:'',
						coldInfo:'',
						picture:'',
						phone:'',
						entryTime:'',
						state:'',
						idAddress:'',
						currentAddress:'',
					// -----------------------
						isRiskArea:'',
						isOutside:'',
						riskAreaIsOutside:'',
						//虚拟字段 前端输入是否  用来匹配布尔类型
						riskArea:'', //是否处于中高风险区
						outSide:'',//是否有外来人口
						outsideRiskArea:'',//外来人口中高风险区
					// -----------------------
						branchName:''
					},
				},
				/* 表单验证规则 */
				rules: {
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
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					'userInfo.riskArea': {
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
						message: '请输入在校或离校',
						trigger: ['change'],
						enum: ['在校','离校' ,'请假']
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
					'userInfo.idAddress':{
						type: 'string',
						required:true,
						message:'请输入身份证地址',
						trigger:['change']
					},
					'userInfo.currentAddress':{
						type:'string',
						required:true,
						message:'请输入当前居住地址',
						trigger:['change']
					},
					'userInfo.outSide': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					},
					'userInfo.outsideRiskArea': {
						type: 'enum',
						required: true,
						message: '请输入是或否',
						trigger: ['change'],
						enum: ['是','否']
					}
				},
				/* 性别选择器数组 */
				sexColumns: [
					['男', '女']
				],
				stateColumns:[['在校','离校','请假']],
				riskColumns:[['是','否']],
				coldColumns:[['是','否']],
				sexShow: false,
				stateShow: false,
				dateShow: false,
				date: Number(new Date()),
				branchCode:"",
				riskShow:false,
				/* 当前选择的是 是否去过中高风险   家中有无外来人员等 */
				riskSelect:'',
				coldShow:false,
				pictureList: []
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			// 表单提交
			submit() {
				this.$refs.form1.validate().then(res => {
					if(that.pictureList.length == 0){
						uni.$u.toast('请上传用户头像')
					}else{
						let params = that.dataDispose(that.model1.userInfo)
						employee.addEmployee(params).then((res)=>{
							if(res.data.code != 200 ){
								uni.$u.toast('添加失败，请重试')
							}else{
								uni.$u.toast('添加成功')
								that.pictureList = []
								that.model1.userInfo.picture = ''
								that.reset()
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('请正确填写信息')
				})
			},
			// 表单重置
			reset() {
				const validateList = ['userInfo.name', 'userInfo.sex', 'userInfo.age', 'userInfo.idNumber', 'userInfo.phone','userInfo.state','userInfo.entryTime','userInfo.window',
					'userInfo.idAddress', 'userInfo.currentAddress', 'userInfo.riskArea','userInfo.outSide','userInfo.outsideRiskArea'
				]
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
			// 性别选择器 点击方法
			showPicker(name) {
				this[`${name}`] = true
			},
			// 选定性别改变双向绑定的属性
			sexConfirm(e) {
				this.model1.userInfo.sex = e.value[0];
				this.sexShow = false;
			},
			// 在校
			stateConfirm(e){
				this.model1.userInfo.state = e.value[0];
				this.stateShow = false;
			},
			// 时间选择
			dateConfirm(e){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(e.value, 'yyyy-mm-dd')
				this.model1.userInfo.entryTime = time
				this.dateShow = false
			},
			// 选择器取消方法
			cancel(name) {
				this[`${name}`] = false
			},
			// 后端记录01对应是否塞入对象
			dataDispose(info){
				if(info.riskArea == '是'){info.isRiskArea = true}else{info.isRiskArea = false}
				if(info.outSide == '是'){info.isOutside = true}else{info.isOutside = false}
				if(info.outsideRiskArea == '是'){info.riskAreaIsOutside = true}else{info.riskAreaIsOutside = false}
				return info;
			},
			// 中高风险等确定方法
			riskConfirm(e){
				let flag = that.riskSelect
				let value = e.value[0]
				if(flag == 'riskArea'){
					that.model1.userInfo.riskArea = value
				}
				if(flag == 'outSide'){
					that.model1.userInfo.outSide = value
				}
				if(flag == 'outsideRiskArea'){
					that.model1.userInfo.outsideRiskArea = value
				}
				that.riskShow = false
			},
			riskClick(name){
				that.riskShow = true
				that.riskSelect = name
			},
			coldConfirm(e){
				let bool = e.value[0]
				let params = bool=='是'?1:0
				that.model1.userInfo.cold = params
				that.model1.userInfo.coldInfo = bool
				that.coldShow = false
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
							that.model1.userInfo.picture = temp.data[0]
							resolve()
						},
						fail() {
							uni.$u.toast('图片上传失败，请重试')
						}
					});
				})
			},
		},
		created() {
			// params传值解决刷新无数据问题: 存入storge中存取
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.branchCode = tempCode
				this.model1.userInfo.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				this.model1.userInfo.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
			let tempName = uni.getStorageSync('menuName')
			this.model1.userInfo.branchName = tempName;
		},
		mounted() {
			that = this;
		}
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 30rpx 30rpx 80rpx 30rpx;
	}

	.u-demo-block__title {
		font-size: 30rpx;
		color: #8f9ca2;
		margin-bottom: 8px;
		display: flex;
		flex-direction: row;
	}

	page {
		// background-color: #ffffff;
	}

	.form_lable {
		font-size: 28rpx;
		font-weight: bold;
		// text-align: center;
	}

	.item_view {
		padding-left: 10rpx;
	}

	.flex_we {
		flex: 1;
	}
	.imageUpload{
		width: 100px;
		height: 120px;
	}
</style>
