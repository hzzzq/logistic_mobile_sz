<template>
	<view class="u-page">
		<view class="u-demo-block">
			<text class="u-demo-block__title">维修报告提交</text>
			<view class="u-demo-block__content">
				<!-- 表单 -->
				<u--form labelPosition="left" :model="model1" ref="form1">
					<u-form-item label="维保日期" prop="reportInfo.recordTime" borderBottom labelWidth="80" ref="item1" @click="dateShow = !dateShow">
						<u--input border="surround" disabled v-model="model1.reportInfo.recordTime" placeholder="维保日期">
						</u--input>
					</u-form-item>
					<u-form-item label="维保金额" prop="reportInfo.money" borderBottom labelWidth="80" ref="item1">
						<u--input border="surround"  v-model="model1.reportInfo.money" placeholder="维保金额" type="number">
						</u--input>
					</u-form-item>
					<u-form-item label="维保类别" prop="reportInfo.category" borderBottom labelWidth="80" ref="item1" @click="categoryShow = true" >
						<u--input border="surround" disabled   v-model="model1.reportInfo.category" placeholder="维保/保养">
						</u--input>
					</u-form-item>
					<!-- 概况 -->
					<u-form-item label="维保概况" prop="reportInfo.repairContent" labelWidth="80" borderBottom ref="item2">
						<u--textarea placeholder="内容字数不少于3个字" v-model="model1.reportInfo.repairContent" count>
						</u--textarea>
					</u-form-item>
					<!-- 图片相关 -->
					<u-form-item>
						<view class="u-demo-block">
							<text class="u-demo-block__title">图片文件</text>
							<view class="u-demo-block__content">
								<view class="u-page__upload-item">
									<u-upload :fileList="pictureList" @afterRead="afterRead" @delete="deletePic"
										 accept="image" multiple :maxCount="5"
										:previewFullImage="true"></u-upload>
								</view>
							</view>
						</view>
					</u-form-item>
				</u--form>
				<!-- 底部栏 -->
				<u-button type="primary" text="提交" customStyle="margin-top: 80rpx; width:320rpx;height:80rpx" @click="submit" size="large" color="#28c6c4"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 20rpx;width:320rpx;height:80rpx" @click="reset" size="large" color="#ca7b5a"></u-button>
			</view>
		</view>
		<!-- 选择器 -->
		<u-picker :show="categoryShow" :columns="categoryColumns" @cancel="cancel('categoryShow')" @confirm="categoryConfirm"></u-picker>
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel('dateShow')" mode="date" :maxDate="date"></u-datetime-picker>
	</view>
</template>

<script>
	import bus from '../../http/api/bus.js'
	var that
	export default {
		data() {
			return {
				model1: {
					reportInfo: {
					  adminId: "",
					  recordTime: "",
					  repairContent: "",
					  category:"",
					  money:0,
					  picture:""
					}
				},
				rules: {
					'reportInfo.recordTime': {
						type: 'string',
						required: true,
						message: '请选择时间',
						trigger: ['blur', 'change']
					},
					'reportInfo.repairContent': {
						type: 'string',
						required: true,
						message: '请填写维保内容',
						trigger: ['blur', 'change']
					},
					'reportInfo.money': {
						type: 'string',
						required: true,
						message: '请输入金额',
						trigger: ['blur', 'change']
					},
					'reportInfo.category': {
						type: 'string',
						required: true,
						message: '请选择维修或保养',
						trigger: ['blur', 'change']
					},
				},
				pictureList: [],
				dateShow:false,
				date: Number(new Date()),
				categoryShow:false,
				categoryColumns: [
					['维修', '保养']
				],
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		created() {
			const tempInfo = uni.getStorageSync('userInfo')
			this.model1.reportInfo.adminId = tempInfo.adminId
		},
		mounted() {
			that = this;
		},
		methods: {
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
						url: 'http://43.139.85.16:8089/user/uploadImgs/img', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'uploadImgs',
						header:{"token": uni.getStorageSync('token')},
						success: (res) => {
							let temp = JSON.parse(res.data)
							if(that.model1.reportInfo.picture.length == 0){
								that.model1.reportInfo.picture+=temp.data[0]
							}else{
								that.model1.reportInfo.picture+=(';'+temp.data[0])
							}
							resolve()
						},
						fail() {
							uni.$u.toast('图片上传失败，请重试')
						}
					});
				})
			},
			// 表单提交
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					if(that.pictureList.length == 0){
						uni.$u.toast('请上传图片后提交')
					}else{
						bus.addRepair(that.model1.reportInfo).then(res=>{
							if(res.data.code!=200){
								uni.$u.toast('上传失败，请重试')
							}else{
								uni.$u.toast('提交成功');
								that.pictureList = []
								that.model1.reportInfo.picture = ''
								that.reset();
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			// 表单重置
			reset() {
				const validateList = ['reportInfo.recordTime', 'reportInfo.repairContent','reportInfo.category','reportInfo.money']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				this[`pictureList`].splice(0, that.pictureList.length);
				that.model1.reportInfo.picture = '';
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
				
			},
			// 时间选择
			dateConfirm(e){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(e.value, 'yyyy-mm-dd')
				this.model1.reportInfo.recordTime = time
				this.dateShow = false
			},
			// 选择器取消方法
			cancel(name) {
				this[`${name}`] = false
			},
			categoryConfirm(e){
				that.model1.reportInfo.category = e.value[0]
				that.categoryShow = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-page {
		padding: 30rpx 30rpx 80rpx 30rpx;
	}

	.u-demo-block__title {
		font-size: 14px;
		color: #8f9ca2;
		margin-bottom: 8px;
		display: flex;
		flex-direction: row;
	}

	page {
		background-color: #ffffff;
	}
</style>
