<template>
	<view class="container">
		<!-- 轮播图 -->
		<view>
			<u-swiper :list="swiper_list" @change="change" @click="click" height="400rpx"></u-swiper>
		</view>
		<!-- tip 员工提示 -->
		<view class="user_title_container">
			<text class="user_title_text">欢迎你，{{userInfo.adminName}}</text>
		</view>
		<!-- 操作栏 -->
		<view class="item-collapse">
			<!-- 第一层折叠面板 -->
			<u-collapse accordion :border="false">
				
				<!-- 商业餐饮管理中心一级 -->
				<u-collapse-item :title="item.branchName" v-for="(item,index) in branchList"
					v-if="item.child.length!=0&&item.child[0].menu==false">
					<u-icon name="grid-fill" size="20" slot="icon" color="#ffaaa5"></u-icon>
					
					<!-- 第二层折叠面板 -->
					<u-collapse accordion :border="false">
						<!-- 食堂超市一级 -->
						<u-collapse-item :title="sonItem.branchName" v-for="(sonItem, sonIndex) in item.child" v-if="sonItem.grandsonBranches.length!=0&&sonItem.grandsonBranches[0].menu==false">
							<u-icon name="grid-fill" size="20" slot="icon" color="#ffd3b6"></u-icon>
							<!-- 最低单位等级 -->
							<u-cell @click="selectMenu(grandsonItem.branchCode,grandsonItem.grandsonBrancheChild)" :title="grandsonItem.branchName"
								icon="grid-fill" iconStyle="color:#a8e6cf" :border="false"
								v-for="(grandsonItem, grandsonIndex) in sonItem.grandsonBranches"></u-cell>
						</u-collapse-item>
						<!-- 食堂超市同级无子级  2222 -->
						<u-cell @click="selectMenu(sonItem.branchCode,sonItem.grandsonBranches)" :title="sonItem.branchName" v-for="(sonItem, sonIndex) in item.child" v-if="sonItem.grandsonBranches[0].menu ==true"
						 icon="grid-fill" iconStyle="color:#ffd3b6" :border="false"></u-cell>
					</u-collapse>
				</u-collapse-item>
				
				<!-- xx管理中心同级无子级     111 -->
				<u-cell @click="selectMenu(item.branchCode,item.child)" :title="item.branchName" v-for="(item,index) in branchList"
					v-if="item.child[0].menu==true" icon="grid-fill" iconStyle="color:#ffaaa5" :border="false"></u-cell>
			</u-collapse>
		</view>

		<!-- 退出登录 -->
		<view id="button_container">
			<u-button class="button" icon="backspace" iconColor="#ffffff" text="退出登录" size="large"
				color="linear-gradient(to right, rgb(6, 228, 148), rgb(81, 161, 255))" shape="circle" @click="loginOut()">
			</u-button>
		</view>
	</view>

</template>

<script>
	import user from '@/http/api/user.js'
	var that
	export default {
		data() {
			return {
				userInfo: {},
				swiper_list: [
					'https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190633624-609451251.png',
					'https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190643827-1389417433.png',
					'https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190651327-1007330676.png',
					'https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220411163458819-1432720006.png'
				],
				branchList: [],
				second_branchList: [],
				show: true
			};
		},
		methods: {
			// 根据用户权限获取对应菜单
			getMenu(params) {
				user.getMenu(params).then((res) => {
					console.log(res.data)
					if (res.data.code != 200) {
						uni.showToast({
							title: '数据请求错误，请检查网络后重试',
							icon: 'none',
							duration: 1000
						})
					} else {
						res.data.data.forEach(item => {
							that.branchList.push(item)
						})
					}
				})
			},
			// 退出登录
			loginOut() {
				this.$Router.replace('/login');
			},
			//轮播图改变时的回调方法
			change(e) {
				// console.log('change', e);
			},
			//轮播图点击事件
			click(e) {
				console.log('click', e);
			},
			selectMenu(branchCode,menu) {
				this.$Router.push({
					name: 'menuIndex',
					params: {
						branchCode: branchCode,
						menu:menu
					}
				})
			},
			/* 退出登录的弹窗方法 */
			outLoginModal(next){
				uni.showModal({
					title: '提示',
					content: '是否退出登录',
					success: function (res) {
						if (res.confirm) {
							uni.clearStorageSync('user_info');
							next()
						} else if (res.cancel) {
							// console.log('用户点击取消');
						}
					}
				})
			}
		},
		mounted() {
			that = this;
			let userInfo = uni.getStorageSync('userInfo')
			let branchCode = uni.getStorageSync('branchCode')
			let params = {}
			if (branchCode != '') {
				params.branchCode = branchCode
			}
			that.getMenu(params)
			that.userInfo = userInfo
		},
		beforeRouteLeave(to,from,next) {
			if(to.name == "login"){
				that.outLoginModal(next)
			}else{
				next()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: 100%;
		background-color: #f1f4fb;
		position: relative;
		padding-bottom: 64rpx;
	}

	.banner {
		width: 100%;
		height: 360rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.tip {
		color: #999;
		padding: 24rpx 28rpx 12rpx 28rpx;
	}

	.list {
		padding: 28rpx;

		.list_item {
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: space-between;
			width: 100%;
			padding: 0 18rpx;
			background-color: #ffffff;
			height: 118rpx;
			border-radius: 18rpx;
			margin-bottom: 28rpx;
			box-shadow: 0 0 60rpx 0 rgba(43, 86, 112, 0.1);

			.iconfont {
				padding-right: 12rpx;
				font-size: 42rpx;
			}

			.title {
				font-size: 38rpx;
				// font-weight: 700;
			}

			.more {
				color: #999;
			}
		}
	}

	.loginOut {
		margin: 0 auto;
		width: 420rpx;
		height: 100rpx;
		border-radius: 58rpx;
		background-color: #ffffff;
		font-size: 38rpx;

		.iconfont {
			padding-right: 8rpx;
			font-size: 42rpx;
		}
	}

	.user_title_container {
		padding: 12rpx 28rpx 12rpx 28rpx;
	}

	.user_title_text {
		font-size: 14px;
		color: #8f9ca2;
	}

	#block_container {
		padding: 20rpx 20rpx;
	}

	#title_text {
		font-weight: bold;
	}

	#detail_title_text {
		font-weight: bold;
		font-size: 28rpx;
		padding-top: 10rpx;
	}

	.button {
		width: 250rpx;
	}

	#button_container {
		margin: 80rpx auto
	}

	.u-collapse-item__content {
		height: auto !important;
	}
</style>
