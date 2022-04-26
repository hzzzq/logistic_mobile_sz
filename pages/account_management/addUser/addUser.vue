<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">用户信息</text>
			<view class="u-demo-block__content">
				<!-- 表单 -->
				<u--form labelPosition="left" :model="model1" ref="form1" :rules="rules">
					<!--
						row1 
					 -->
					 <view style="display: flex; flex-direction: row; width: 100%; " >
						 <u-form-item  ref="item1" prop="userInfo.name" style="width: 33%;" >
						 	<view class="flex flexVc" >
						 		<text class="form_lable flex_we">姓名：</text>
						 		<view class="flex_we" ref>
						 			<u--input border="none" placeholder="姓名" fontSize="26rpx"
						 				v-model="model1.userInfo.name"></u--input>
						 		</view>
						 	</view>
						 </u-form-item>
						 <u-form-item  ref="item1" prop="userInfo.sex" style="width: 33%;">
						 	<view class="flex flexVc item_view">
						 		<text class="form_lable flex_we">性别：</text>
						 		<view @click="showPicker('sexShow')" class="flex_we">
						 			<u--input border="none" placeholder="性别" disabled v-model="model1.userInfo.sex"
						 				 fontSize="26rpx"></u--input>
						 		</view>
						 	</view>
						 </u-form-item>
						 <u-form-item  ref="item1" prop="userInfo.age" style="width: 33%;">
						 	<view class="flex flexVc" >
						 		<text class="form_lable flex_we">年龄：</text>
						 		<view class="flex_we" ref>
						 			<u--input border="none" placeholder="年龄" fontSize="26rpx" type="number"
						 				v-model="model1.userInfo.age"></u--input>
						 		</view>
						 	</view>
						 </u-form-item>
					 </view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- 
						row2
					 -->
					<u-form-item  ref="item2" prop="userInfo.idNumber" style="width: 100%;">
						<view class="flex flexVc">
							<text class="form_lable flex_we">身份证：</text>
							<view class="flex_we" >
								<u--input border="none" placeholder="请填写身份证号码" fontSize="26rpx" style="width: 400rpx;" type="idcard"
									v-model="model1.userInfo.idNumber"></u--input>
							</view>
						</view>
					</u-form-item>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- 
						row3 
					-->
					<view style="display: flex;flex-direction: row; width: 100%;" >
						<u-form-item  ref="item3" style="width: 50%;" prop="userInfo.phone">
							<view class="flex flexVc">
								<text class="form_lable flex_we">手机号：</text>
								<view class="flex_we">
									<u--input border="none" placeholder="手机号" fontSize="26rpx" type="number"
										v-model="model1.userInfo.phone"></u--input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item3" style="width: 50%;" prop="userInfo.state">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we">状态：</text>
								<view class="flex_we" @click="showPicker('stateShow')">
									<u--input border="none" placeholder="在校/离校" fontSize="26rpx" disabled
										v-model="model1.userInfo.state"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- 
						row4 
					-->
					<view style="display: flex;flex-direction:row; width: 100%;">
						<u-form-item  ref="item4" style="width: 50%;" prop="userInfo.entryTime">
							<view class="flex flexVc" @click="dateShow = !dateShow">
								<text class="form_lable flex_we">入职时间：</text>
								<view class="flex_we">
									<u--input border="none" placeholder="入职时间" fontSize="26rpx"
										v-model="model1.userInfo.entryTime"></u--input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item4" style="width: 50%;" prop="userInfo.branchCode">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we">部门编号：</text>
								<view class="flex_we">
									<u--input border="none" placeholder="部门编号" fontSize="26rpx" disabled
										v-model="model1.userInfo.branchCode"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- 
						row5 
					-->
					<view style="display: flex;flex-direction: row; width: 100%;">
						<u-form-item  ref="item5" style="width: 50%;" prop="userInfo.departureTime">
							<view class="flex flexVc">
								<text class="form_lable flex_we">离职时间：</text>
								<view class="flex_we">
									<u--input border="none" placeholder="离职时间" fontSize="26rpx"
										v-model="model1.userInfo.departureTime"></u--input>
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
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!-- 
						row6 
					-->
					<u-form-item borderBottom ref="item6" prop="userInfo.idAddress">
						<view class="flex flexVc item_view">
							<text class="form_lable flex_we">身份证地址：</text>
							<view class="flex_we" >
								<u--input border="none" placeholder="身份证地址" fontSize="26rpx"
									v-model="model1.userInfo.idAddress"></u--input>
							</view>
						</view>
					</u-form-item>
					<!--
						row7 
					-->
					<u-form-item borderBottom ref="item6" prop="userInfo.currentAddress">
						<view class="flex flexVc item_view">
							<text class="form_lable flex_we">当前居住地址：</text>
							<view class="flex_we">
								<u--input border="none" placeholder="当前居住地址" fontSize="26rpx"
									v-model="model1.userInfo.currentAddress"></u--input>
							</view>
						</view>
					</u-form-item>
					<!-- 
						row8 
					-->
					<view style="display: flex;flex-direction: row;width: 100%;">
						<u-form-item  ref="item7"  style="width: 50%;" prop="userInfo.riskArea">
							<view class="flex flexVc">
								<text class="form_lable flex_we">有无到中高风险地区：</text>
								<view class="flex_we" style="margin-left: 20rpx;">
									<u--input border="none" placeholder="请填写" fontSize="26rpx"
										v-model="model1.userInfo.riskArea"></u--input>
								</view>
							</view>
						</u-form-item>
						<u-form-item  ref="item7" style="width: 50%;" prop="userInfo.outSide">
							<view class="flex flexVc item_view">
								<text class="form_lable flex_we">家中有无外来人员居住：</text>
								<view class="flex_we" style="margin-left: 10rpx;">
									<u--input border="none" placeholder="请填写" fontSize="26rpx"
										v-model="model1.userInfo.outSide"></u--input>
								</view>
							</view>
						</u-form-item>
					</view>
					<u-line color="rgb(214, 215, 217)"></u-line>
					<!--
						row9 
					-->
					<u-form-item borderBottom ref="item7" prop="userInfo.outsideRiskArea">
						<view class="flex flexVc">
							<text class="form_lable flex_we" style="width:750rpx;">外来人员有无到中高风险地区：</text>
							<view class="flex_we" style="margin-left: 20rpx;">
								<u--input border="none" placeholder="请填写" fontSize="26rpx"
									v-model="model1.userInfo.outsideRiskArea"></u--input>
							</view>
						</view>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 80rpx; width:320rpx;height:80rpx"
					@click="submit" size="large" color="#28c6c4"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 20rpx;width:320rpx;height:80rpx"
					@click="reset" size="large" color="#ca7b5a"></u-button>
			</view>
		</view>
		<u-picker :show="sexShow" :columns="sexColumns" @cancel="cancel('sexShow')" @confirm="sexConfirm"></u-picker>
		<u-picker :show="stateShow" :columns="stateColumns" @cancel="cancel('stateShow')" @confirm="stateConfirm"></u-picker>
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel('dateShow')"  mode="date"></u-datetime-picker>
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
						// userId:'',
						branchCode:'',
						window:'',
						name:'',
						sex:'',
						age:'',
						idNumber:'',
						// picture:'',
						phone:'',
						entryTime:'',
						// departureTime:'',
						// nucleinTime:'',
						// todayTemperature:'',
						state:'',
						idAddress:'',
						currentAddress:'',
						isRiskArea:'',
						isOutside:'',
						riskAreaIsOutside:'',
						//虚拟字段 前端输入是否  用来匹配布尔类型
						riskArea:'', //是否处于中高风险区
						outSide:'',//是否有外来人口
						outsideRiskArea:''//外来人口中高风险区
						
						// vaccineFrequency:'',
						// remarks:'',
						// disabled: false
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
						enum: ['在校','离校']
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
				stateColumns:[['在校','离校']],
				sexShow: false,
				stateShow: false,
				dateShow: false,
				date: Number(new Date()),
				branchCode:""
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					let params = that.dataDispose(that.model1.userInfo)
					employee.addEmployee(params).then((res)=>{
						if(res.data.code != 200 ){
							uni.$u.toast('添加失败，请重试')
						}else{
							uni.$u.toast('添加成功')
							that.reset()
						}
					})
					// uni.$u.toast('提交成功')
				}).catch(errors => {
					uni.$u.toast('请正确填写信息')
				})
			},
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
			stateConfirm(e){
				this.model1.userInfo.state = e.value[0];
				this.stateShow = false;
			},
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
			dataDispose(info){
				if(info.riskArea == '是'){info.isRiskArea = true}else{info.isRiskArea = false}
				if(info.outSide == '是'){info.isOutside = true}else{info.isOutside = false}
				if(info.outsideRiskArea == '是'){info.riskAreaIsOutside = true}else{info.riskAreaIsOutside = false}
				return info;
			}
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.branchCode = tempCode
				this.model1.userInfo.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				this.model1.userInfo.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
			}
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
</style>
