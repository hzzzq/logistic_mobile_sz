<template>
	<view>
		<view class="ListItem">
			<!-- 1 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex"  style="width: 33%;">
					<view class="label" >姓名</view>
					<input class="val":disabled="UnModifiable" v-model="userInfo.name" :value="userInfo.name" />
				</view>
				<view class="item flex" style="width: 33%;">
					<view class="label">性别</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.sex" :value="userInfo.sex" />
				</view>
				<view class="item flex" style="width: 33%;">
					<view class="label">年龄</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.age" :value="userInfo.age" />
				</view>
			</view>
			<!-- 2 -->
			<view class="coloum_item flex flexVc">
				<view class="item flex">
					<view class="label">身份证</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.idNumber" :value="userInfo.idNumber" />
				</view>
			</view>
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex" style="width: 50%;">
					<view class="label">手机号</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.phone" :value="userInfo.phone" />
				</view>
				<view class="item flex" style="width: 50%;">
					<view class="label">状态</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.state" :value="userInfo.state" />
				</view>
			</view>
			<!-- 4 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex" style="width: 50%;">
					<view class="label">入职时间</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.entryTime" :value="userInfo.entryTime" />
				</view>
				<view class="item flex" style="width: 50%;">
					<view class="label">部门编号</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.branchCode" :value="userInfo.branchCode" />
				</view>
			</view>
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex"  style="width: 50%;">
					<view class="label">所在窗口</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.window" :value="userInfo.window" />
				</view>
				<view class="item flex" style="width: 50%;">
					<!-- <view class="label">离职时间</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.departureTime" :value="userInfo.departureTime" /> -->
				</view>
			</view>
			<!-- 5 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex" style="width: 50%;">
					<view class="label">是否处于中高风险地区</view>
					<input class="val"  :disabled="UnModifiable" v-model="userInfo.isRiskArea" :value="userInfo.isRiskArea" />
				</view>
				<view class="item flex" style="width: 50%;">
					<view class="label">家中是否有外来人员居住</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.isOutside" :value="userInfo.isOutside" />
				</view>
			</view>
			<!-- 6 -->
			<view class="coloum_item flex flexVc" style="width: 100%;">
				<view class="item flex" style="width: 50%;">
					<view class="label">外来人员是否来自中高风险区</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.riskAreaIsOutside" :value="userInfo.riskAreaIsOutside" />
				</view>
				<view class="item flex" >
					<!-- <view class="label">疫苗接种次数</view>
					<input class="val" :disabled="UnModifiable" v-model="userInfo.vaccineFrequency" :value="userInfo.vaccineFrequency" /> -->
				</view>
			</view>
		</view>
		<!-- 编辑按钮 -->
		<view>
			<view class="btn" @click="Change('change')" v-if="UnModifiable">
				点击修改信息
			</view>
			<view class="btn" @click="Change('save')" v-else>
				保存
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
				userInfo:{},
				// 修改按钮判断
				UnModifiable: true,
				userId:''
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
					let temp = JSON.stringify(that.userInfo)
					console.log(that.userInfo)
					employee.updateEmployee(temp).then((res)=>{
						console.log(res.data)
						if(res.data.code!=200){
							uni.$u.toast("数据修改失败，请重试")
						}else{
							uni.$u.toast("数据修改成功")
						}
					})
					that.UnModifiable = !that.UnModifiable
				}
			},
			// 获取用户信息详情
			getData(){
				let temp =  {userId: this.userId}
				console.log(temp)
				employee.findAll(temp).then((res)=>{
					console.log(res.data)
					if(res.data.code!=200){
						uni.showToast({
							title:"请求数据失败，请重试",
							icon:'none',
							duration:1000
						})
					}else{
						that.userInfo = res.data.data.records[0]
					}
				})
			}
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

				.label {
					width:124rpx;
					font-weight: bold;
				}

				.val {
					width: 60%;
					color: #999;
					font-size: 30rpx;
					margin: 0 auto;
					// border: solid 1px #007AFF;
				}
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
</style>
