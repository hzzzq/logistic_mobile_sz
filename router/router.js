// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});

let token

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	uni.getStorage({
		key: 'token',
		success: function (res) {
			token = res.data
		},
		fail(err) {
			token = err.data
		}
	});
	if(to.meta.requireAuth){
		if(token==''){
			next({
				path:'/pages/login/login',
				NAVTYPE:'replaceAll'
			})
			window.alert("请先登录");
		}else{
			next()
		}
	}else{
		next()
	}
})
// 全局路由后置守卫
router.afterEach((to, from) => {
	// console.log(to)
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}