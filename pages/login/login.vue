<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header"></view>
			<view class="title_container"><text class="info_title">后勤管理后台登录</text></view>

			<!-- 主体表单 -->
			<view class="main">
				<u--input placeholder="用户名" prefixIcon="account-fill" prefixIconStyle="font-size: 22px;color: #909399"
					v-model="userInfo.adminNumber" id="form_input"></u--input>
				<u--input placeholder="密码" prefixIcon="lock-fill" prefixIconStyle="font-size: 22px;color: #909399"
					v-model="userInfo.password" type="password" id="form_input"></u--input>
			</view>

			<!-- 登录按钮 -->
			<view class="button-item">
				<u-button class="button" text="登录" size="normal"
					color="linear-gradient(to right, rgb(6, 228, 148), rgb(81, 161, 255))" @click="startLogin">
				</u-button>
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<text @click="findPasswordShow = !findPasswordShow">找回密码</text>
			</view>

			<!-- 找回密码弹窗 -->
			<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :mode="popupData.mode"
				:show="findPasswordShow" :round="popupData.round" :overlay="popupData.overlay"
				:borderRadius="popupData.borderRadius" :closeable="popupData.closeable"
				:closeOnClickOverlay="popupData.closeOnClickOverlay" @close="close">
				<!-- 弹窗主体 -->
				<view class="u-popup-slot" style="height: 600rpx;">
					<!-- 标题 -->
					<view class="title_info">找回密码</view>
					<view class="main">
						<!-- 用户名 -->
						<u--input placeholder="用户名" prefixIcon="account-fill"
							prefixIconStyle="font-size: 22px;color: #909399" v-model="findInfo.adminNumber"
							id="form_input">
						</u--input>
						<!-- 手机号 -->
						<u--input placeholder="绑定手机号" prefixIcon="phone-fill"
							prefixIconStyle="font-size: 22px;color: #909399" v-model="findInfo.phone"
							id="form_input">
						</u--input>
						<!-- 新密码 -->
						<u--input placeholder="新密码" prefixIcon="lock-fill" type="password"
							prefixIconStyle="font-size: 22px;color: #909399" v-model="findInfo.password"
							id="form_input">
						</u--input>
					</view>
					<!-- 找回密码按钮-->
					<view class="button-item">
						<u-button class="button" text="找回密码" size="normal" style="margin-top: 10rpx;"
							@click="findPassword()"
							color="linear-gradient(to right, rgb(6, 228, 148), rgb(81, 161, 255))">
						</u-button>
						<view class="close_icon_contain">
							<u-icon name="close-circle" size="30" color="#909399"
								@click="findPasswordShow = !findPasswordShow"></u-icon>
						</view>
					</view>
				</view>
			</u-popup>

		</view>
	</view>
</template>

<script>
	import user from '@/http/api/user.js'
	var that;
	export default {
		data() {
			return {
				//logo图片 base64
				userInfo: {
					adminNumber: "",
					password: ""
				},
				findInfo: {
					adminNumber: "",
					password: "",
					phone:""
				},
				popupData: {
					overlay: true,
					mode: 'center',
					round: 10,
					closeOnClickOverlay: true
				},
				findPasswordShow: false,
				tips: ''
			};
		},
		mounted() {
			that = this;
		},
		methods: {
			// 登录
			async startLogin() {
				if (!this.userInfo.adminNumber) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					})
				} else if (!this.userInfo.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					})
				} else {
					user.login(that.userInfo).then(res=>{
						if(res.data.code == 200){
							let token = res.data.data.token
							let userInfo = res.data.data.data
							// 01 02
							let branchCode = res.data.data.data.branchCode
							uni.setStorageSync('token', token)
							uni.setStorageSync('userInfo', userInfo)
							uni.setStorageSync('branchCode', branchCode)
							that.$Router.push('/')
						}else{
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								duration:1000
							})
						}
					})
				}
			},
			close() {
				this.findPasswordShow = false;
			},
			// 密码找回
			findPassword() {
				if (!this.findInfo.adminNumber) {
					uni.$u.toast('请输入找回账号的用户名')
				} else if (!this.findInfo.phone) {
					uni.$u.toast('请输入绑定手机号')
				} else if(!this.findInfo.password){
					uni.$u.toast('请输入新密码')
				}else {
					uni.showLoading({
						title: '请求中'
					})
					let params = JSON.stringify(that.findInfo)
					user.findPassword(params).then(res=>{
						if(res.data.code!=200){
							uni.$u.toast(msg)
						}else{
							uni.hideLoading()
							uni.$u.toast('密码修改成功，请重新登录')
							setTimeout(()=>{
								this.$router.go()
							},500)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("./css/main.css");

	.info_title {
		color: #303133;
		font-size: 50rpx;
		font-weight: bold;
		text-align: left;
		margin: 0 auto;
	}

	.title_container {
		width: 100%;
		text-align: center;
	}

	#form_input {
		margin: 10rpx auto;
	}

	.button {
		width: 250rpx;
	}

	.button-item {
		margin-top: 20rpx;
	}

	#radio {
		margin: 0 auto;
		margin-top: 15rpx;
	}

	.u-popup-slot {
		width: 600rpx;
		height: 620rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title_info {
		color: #303133;
		font-size: 40rpx;
		font-weight: bold;
		text-align: left;
		margin: 0 auto;
		position: absolute;
		top: 5%;
	}

	.close_icon_contain {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		bottom: 2%;
		transform: translate(-50%);
		left: 50%;
	}
</style>
