<template>
	<view class="container">
		<!-- 轮播图 -->
		<view>
			<u-swiper :list="swiper_list" @change="change" @click="click" height="400rpx"></u-swiper>
		</view>
		<!-- 操作栏 -->
		<view>
			<view class="u-demo-block" id="block_container">
				<text class="block_title" id="title_text">功能模块</text>
				<view>
					<!-- 宫格展示 -->
					<u-grid :border="false" col="3">
						<u-grid-item v-for="(listItem,listIndex) in function_list" :key="listIndex" customStyle="padding-top: 10px; padding-bottom: 10px" @click="navTo(listItem.path)">
							<!-- 宫格图标 -->
							<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="28" :color="listItem.color"></u-icon>
							<!-- 宫格文本 -->
							<text class="grid-text" id="detail_title_text">{{listItem.title}}</text>
						</u-grid-item>
					</u-grid>
				</view>
				<u-empty id="empty" text="暂无数据" marginTop="120" v-if="menuList.length == 0"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	var that
	import user from '@/http/api/user.js'
	export default {
		data() {
			return {
				userInfo: {},
				swiper_list: [
					// 'http://nobug.love/logistic/image/1.png',
					// 'http://nobug.love/logistic/image/2.png',
					// 'http://nobug.love/logistic/image/3.png',
					// 'http://nobug.love/logistic/image/4.png'
					'http://nobug.love/logistic/image/5.jpg',
					'http://nobug.love/logistic/image/6.jpg'
				],
				function_list: [],
				branchCode: "",
				menuList:[]
			};
		},
		methods: {
			// 跳转
			navTo(path) {
				this.$Router.push({ name: path, params: { branchCode: that.branchCode }}) 
			},
			//轮播图改变时的回调方法
			change(e) {
				// console.log('change', e);
			},
			//轮播图点击事件
			click(e) {
				// console.log('click', e);
			},
			getFunction() {
				// 功能列表
				let list = [{
						name: 'account',
						title: '人员管理',
						color: '#7fbdae',
						path: 'account_list'
					},
					{
						name: 'star',
						title: '体温核酸管理',
						color: '#85b597',
						path: 'nuclein_manager'
					},
					{
						name: 'file-text',
						title: '早餐台账',
						color: '#cc7a55',
						path: 'breakfast'
					},
					{
						name: 'file-text',
						title: '中餐台账',
						color: '#85b597',
						path: 'lunch'
					},
					{
						name: 'file-text',
						title: '晚餐台账',
						color: '#ab818c',
						path: 'supper'
					},
					{
						name: 'calendar',
						title: '消杀台账',
						color: '#85b597',
						path: 'disinfect_record'
					},
					{
						name: 'coupon',
						title: '迎检报告',
						color: '#85b597',
						path: 'year_report'
					},
					{
						name: 'trash',
						title: '泔水上传',
						color: '#ab818c',
						path: 'swillRecord'
					},
					{
						name: 'order',
						title: '超市台账',
						color: '#ab818c',
						path: 'shop_record'
					},
					{
						name: 'car',
						title: '校车维保',
						color: '#85b597',
						path: 'repairRecord'
					},
				];
				// 根据登录用户所拥有的权限 显示对应菜单
				that.menuList.forEach(item=>{
					// 人员核酸
					if(!item.disabled){
						if(item.branchName=="人员管理"){
							that.function_list.push(list[0],list[1])
						}
						// 早中晚餐
						if(item.branchName=="早中晚餐信息"){
							that.function_list.push(list[2],list[3],list[4])
						}
						// 消杀
						if(item.branchName=="消杀信息"){
							that.function_list.push(list[5])
						}
						// 年检
						if(item.branchName=="迎检记录"){
							that.function_list.push(list[6])
						}
						// 泔水
						if(item.branchName=="泔水信息"){
							that.function_list.push(list[7])
						}
						// 超市台账
						if(item.branchName=="台账信息"){
							that.function_list.push(list[8])
						}
						// 校车维保
						if(item.branchName=="校车维保"){
							that.function_list.push(list[9])
						}
					}
				})
			}
		},
		mounted() {
			that = this;
			that.getFunction();
		},
		created() {
			const tempCode = uni.getStorageSync('menuCode')
			const tempMenu = uni.getStorageSync('menuInfo')
			if(tempCode){
				this.branchCode = tempCode
			}else{
				this.branchCode = this.$Route.query.branchCode
				uni.setStorageSync('menuCode', this.branchCode)
				
			}
			if(tempMenu){
				this.menuList = tempMenu
			}else{
				this.menuList = this.$Route.query.menu
				uni.setStorageSync('menuInfo',this.menuList)
			}
		},
		beforeDestroy() {
			uni.removeStorage({
				key:'menuCode'
			})
			uni.removeStorageSync('menuInfo')
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
</style>
