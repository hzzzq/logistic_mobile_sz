<template>
	<view class="u-page">
		<view class="btn2" @click="historyClick" >
			历史记录
		</view>
		<view class="u-demo-block">
			<text class="u-demo-block__title">报告提交</text>
			<view class="u-demo-block__content">
				<!-- 表单 -->
				<u--form labelPosition="left" :model="model1" ref="form1">
					<!-- 标题 -->
					<u-form-item label="报告标题" prop="reportInfo.inspectionTitle" borderBottom labelWidth="80" ref="item1">
						<u--input border="surround" v-model="model1.reportInfo.inspectionTitle" placeholder="标题字数不少于3个字">
						</u--input>
					</u-form-item>
					<u-form-item label="迎检人员" prop="reportInfo.operator" borderBottom labelWidth="80" ref="item1">
						<u--input border="surround" v-model="model1.reportInfo.operator" placeholder="请输入人员名字">
						</u--input>
					</u-form-item>
					<u-form-item label="迎检日期" prop="reportInfo.inspectionTime" borderBottom labelWidth="80" ref="item1" @click="dateClick">
						<u--input border="surround" disabled v-model="model1.reportInfo.inspectionTime" placeholder="年检日期">
						</u--input>
					</u-form-item>
					<u-form-item label="迎检重点" prop="reportInfo.importance" borderBottom labelWidth="80" ref="item1">
						<u--input border="surround" v-model="model1.reportInfo.importance" placeholder="年检重点">
						</u--input>
					</u-form-item>
					<!-- 概况 -->
					<u-form-item label="迎检概况" prop="reportInfo.description" labelWidth="80" borderBottom ref="item2">
						<u--textarea placeholder="内容字数不少于3个字" v-model="model1.reportInfo.description" count>
						</u--textarea>
					</u-form-item>
					<!-- 图片相关 -->
					<u-form-item>
						<view>
							<text class="u-demo-block__title">图片文件</text>
							<view class="u-demo-block__content">
								<view class="u-page__upload-item">
									<u-upload :fileList="pictureList" @afterRead="afterRead" @delete="deletePic"
										 accept="image" multiple :maxCount="10"
										:previewFullImage="true"></u-upload>
								</view>
							</view>
						</view>
					</u-form-item>
				</u--form>
				<!-- 历史记录 -->
				<!-- <u-cell-group style="background-color: #FFFFFF;">
					<u-cell title="历史记录" @click="historyClick">
						<u-icon slot="right-icon" name="arrow-right"size="18" ></u-icon>
					</u-cell>
				</u-cell-group> -->
				<u-button type="primary" text="提交" customStyle="margin-top: 80rpx; width:320rpx;height:80rpx" @click="submit" size="large" color="#28c6c4"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 20rpx;width:320rpx;height:80rpx" @click="reset" size="large" color="#ca7b5a"></u-button>
			</view>
		</view>
		<u-datetime-picker :show="dateShow" v-model="date" @confirm="dateConfirm" @cancel="cancel" mode="datetime" :maxDate="date"></u-datetime-picker>
	</view>
</template>

<script>
	import yearReport from '../../http/api/yearReport.js'
	var that
	export default {
		data() {
			return {
				/* 绑定表单 */
				model1: {
					reportInfo: {
						inspectionTitle: '',
						inspectionTime:'',
						description:'',
						operator: '',
						picture:'',
						importance:''
					},
				},
				/* 表单验证规则 */
				rules: {
					'reportInfo.inspectionTitle': {
						type: 'string',
						required: true,
						message: '请填写标题',
						trigger: ['blur', 'change']
					},
					'reportInfo.operator': {
						type: 'string',
						required: true,
						message: '请填写人员名字',
						trigger: ['blur', 'change']
					},
					'reportInfo.inspectionTime': {
						type: 'date',
						required: true,
						message: '请填写年检日期',
						trigger: ['blur', 'change']
					},
					'reportInfo.description': {
						type: 'string',
						required: true,
						message: '请填写年检概述',
						trigger: ['blur', 'change']
					},
					'reportInfo.importance': {
						type: 'string',
						required: true,
						message: '请填写迎检重点',
						trigger: ['blur', 'change']
					}
				}, 
				pictureList: [],
				dateShow:false,
				date: Number(new Date()),
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			if(tempCode){
				this.model1.reportInfo.branchCode = tempCode
			}else{
				this.model1.reportInfo.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.model1.reportInfo.branchCode)
			}
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
			//图片上传方法
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
			/* 表单提交 */
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					if(that.pictureList.length == 0){
						uni.$u.toast('请上传图片')
					}else{
						yearReport.addYearReport(that.model1.reportInfo).then((res)=>{
							if(res.data.code!=200){
								uni.$u.toast('提交失败，请重试')
							}else{
								that.reset();
								that.pictureList = [];
								that.model1.reportInfo.picture = '';
								uni.$u.toast('提交成功');
							}
						})
						uni.$u.toast('上传成功')
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			/* 表单重置 */
			reset() {
				const validateList = ['reportInfo.inspectionTitle', 'reportInfo.inspectionTime', 'reportInfo.description', 'reportInfo.operator','reportInfo.importance']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
			/* 选择器 */
			dateConfirm(e){
				const timeFormat = uni.$u.timeFormat
				let time = timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				this.model1.reportInfo.inspectionTime = time
				this.dateShow = false
			},
			// 选择器取消方法
			cancel() {
				this.dateShow = false
			},
			historyClick(){
				that.$Router.push({
					name: 'historyRecord',
					params: {
						historyCategory: '迎检'
					}
				})
			},
			dateClick(){
				this.dateShow = !this.dateShow
				this.date =  Number(new Date())
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-demo-block {
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
	.btn2 {
		width: 100%;
		height: 72rpx;
		background-color: #28c6c4;
		color: #FFFFFF;
		line-height: 72rpx;
		text-align: center;
		margin: 0 auto;
		font-size: 30rpx;
	}
</style>
