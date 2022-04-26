<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./static/css/global.scss";
	
	/* uview组件样式库  */
	@import "@/uni_modules/uview-ui/index.scss";	
	
	/* 字体图标 */
	@import "./static/css/iconfont.scss";
	
	page {
		background-color: #f1f4fb;
		padding-bottom: 64rpx;
	}
	.ins>.u-button__text{
		font-size: 15px !important;
	}
	.priceInput>.u-input__content>.u-input__content__field-wrapper>.u-input__content__field-wrapper__field{
		font-size: 28rpx !important;
	}
</style>