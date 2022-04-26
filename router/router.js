// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(to)
	if(to.meta.requireAuth = true){
		// token验证
		next();
	}else{
		next();
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	// console.log(to)
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}