(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-dinner_service-lunch-lunch"],{1033:function(t,e,n){"use strict";var i=n("4ea4");n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var a,r=i(n("1da1")),o=i(n("da40")),u={data:function(){return{fileList1:[],fileList2:[],date:Number(new Date),flag:!0,branchCode:"",todayDate:""}},mounted:function(){a=this,a.getTodayDate(),a.getData()},created:function(){var t=uni.getStorageSync("menuCode");t?this.branchCode=t:(this.branchCode=this.$Route.query.branchCode,uni.setStorageSync("menuCode",this.branchCode))},methods:{navTo:function(){this.$Router.push({name:"addRecord",params:{category:"中餐"}})},getTodayDate:function(){var t=uni.$u.timeFormat,e=t(a.date,"yyyy-mm-dd");a.todayDate=e},getData:function(){return(0,r.default)(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e={branchCode:a.branchCode,category:"中餐",toDay:a.todayDate},o.default.getMealsRecord(e).then((function(t){if(200!=t.data.code)uni.$u.toast("数据请求错误，请重试");else{var e=t.data.data.records;if(6==e.length){for(var n=0;n<3;n++)a.fileList1.push(e[n].picture);for(var i=3;i<6;i++)a.fileList2.push(e[i].picture);a.flag=!1}else if(3==e.length)for(n=0;n<3;n++)a.fileList1.push(e[n].picture)}}));case 2:case"end":return t.stop()}}),t)})))()},imageClick:function(t,e){1==t?uni.previewImage({current:e,urls:a.fileList1,fail:function(t){uni.$u.toast(t)}}):uni.previewImage({current:e,urls:a.fileList2,fail:function(t){uni.$u.toast(t)}})}}};e.default=u},1639:function(t,e,n){"use strict";n.r(e);var i=n("1033"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"2c69":function(t,e,n){var i=n("5ba7");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("563f2631",i,!0,{sourceMap:!1,shadowMode:!1})},"5ba7":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.upload_box[data-v-0687ff00]{margin-top:%?18?%;background-color:#fff;padding:%?24?%;height:%?280?%}.upload_box .header[data-v-0687ff00]{font-size:14px;line-height:%?56?%;color:#8f9ca2}.btn[data-v-0687ff00]{width:%?320?%;height:%?72?%;background-color:#28c6c4;color:#fff;line-height:%?72?%;text-align:center;border-radius:%?18?%;margin:0 auto;margin-top:%?36?%;font-size:%?30?%}.point_container[data-v-0687ff00]{background-color:#fff;height:%?80?%;padding:%?43?% %?30?%}.image_container[data-v-0687ff00]{display:flex;flex-direction:row}',""]),t.exports=e},6507:function(t,e,n){"use strict";var i=n("2c69"),a=n.n(i);a.a},"6f2f":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"upload_box"},[i("v-uni-view",{staticClass:"header"},[t._v("第一次图片")]),i("v-uni-view",{staticClass:"image_container"},[t._l(t.fileList1,(function(e,n){return i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.imageClick(1,n)}}},[i("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","margin-left":"10rpx"},attrs:{mode:"aspectFill",src:e}})],1)})),0==t.fileList1.length?i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","margin-left":"10rpx"},attrs:{mode:"aspectFill",src:n("b48c")}})],1):t._e()],2)],1),i("v-uni-view",{staticClass:"upload_box"},[i("v-uni-view",{staticClass:"header"},[t._v("第二次图片")]),i("v-uni-view",{staticClass:"image_container"},[t._l(t.fileList2,(function(e,n){return i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.imageClick(2,n)}}},[i("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","margin-left":"10rpx"},attrs:{mode:"aspectFill",src:e}})],1)})),0==t.fileList2.length?i("v-uni-view",[i("v-uni-image",{staticStyle:{width:"160rpx",height:"160rpx","margin-left":"10rpx"},attrs:{mode:"aspectFill",src:n("b48c")}})],1):t._e()],2)],1),t.flag?i("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navTo.apply(void 0,arguments)}}},[t._v("增加台账")]):i("v-uni-view",{staticStyle:{"text-align":"center","margin-top":"20rpx","font-weight":"bold"}},[i("v-uni-text",[t._v("今日已添加完成")])],1)],1)},r=[]},aeb6:function(t,e,n){"use strict";n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i="http://101.33.249.154:8089",a={get:function(t,e){return uni.showLoading({title:"加载中..."}),new Promise((function(n,a){uni.request({url:i+t,method:"GET",data:e,header:{token:uni.getStorageSync("token")},success:function(t){200!=t.data.code&&uni.hideLoading(),uni.hideLoading(),n(t)},fail:function(t){uni.hideLoading(),a(t)}})}))},post:function(t,e){return uni.showLoading({title:"加载中..."}),new Promise((function(n,a){uni.request({url:i+t,method:"POST",data:e,header:{token:uni.getStorageSync("token")},success:function(t){200!=t.data.code&&uni.hideLoading(),uni.hideLoading(),n(t)},fail:function(t){console.log(t),uni.hideLoading(),a(t)}})}))},put:function(t,e){return new Promise((function(n,a){uni.request({url:i+t,method:"PUT",data:e,header:{"content-type":" application/json; charset=utf-8",token:uni.getStorageSync("token")},success:function(t){t.data.code,n(t)},fail:function(t){a(t)}})}))},delete:function(t,e){return new Promise((function(n,a){uni.request({url:i+t,method:"DELETE",data:e,header:{"content-type":" application/json; charset=utf-8",token:uni.getStorageSync("token")},success:function(t){t.data.code,n(t)},fail:function(t){a(t)}})}))}},r=a;e.default=r},b48c:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABbCAMAAAAr6AmrAAAATlBMVEXT1NbZ2t3c3eDf4OLh4+Tj5efn6erq6u3r7O7s7fDu7/Hv8PPx8vTy8/Xz9ffz9fb09fj09fb09ff19ff19vj19vf29vj8/P3+/v7///9w4adfAAAAF3RFWHRTb2Z0d2FyZQBQaG90b0RlbW9uIDguNMuzdh8AAAMoaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJyB4OnhtcHRrPSdJbWFnZTo6RXhpZlRvb2wgMTEuOTAnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZXhpZj0naHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8nPgogIDxleGlmOlBpeGVsWERpbWVuc2lvbj45MTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjkxPC9leGlmOlBpeGVsWURpbWVuc2lvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6dGlmZj0naHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8nPgogIDx0aWZmOkltYWdlTGVuZ3RoPjkxPC90aWZmOkltYWdlTGVuZ3RoPgogIDx0aWZmOkltYWdlV2lkdGg+OTE8L3RpZmY6SW1hZ2VXaWR0aD4KICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgPHRpZmY6WFJlc29sdXRpb24+OTYvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj45Ni8xPC90aWZmOllSZXNvbHV0aW9uPgogPC9yZGY6RGVzY3JpcHRpb24+CjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz6vFV+zAAABJklEQVR42u3U2W6DMBSE4WGJAw50GXfL+79oMWqdNI3qobKlNjr/lS/g48hgQPKOhQpMvbwdj2ClwtMrHlm0e6aei88dTqvi9hle3ub/tQPJWnbEq9msaoeKNh8q2gwV7Zpzm02arWS22Upm/2Xbz9zQJnuHnhvaZE/AQD3FdqkWfVozm2LjWsKNwiUE3LfK2YwdZi7NnrGy9h5txFt0U0HbOXLqPr6Rw7JwM0u9y8hjHXdtAJqRQpI9NsCeqblfn5RNsH0H9F+pEfFhuQR7h8YzlUbPb7hgc+TgLhoo7Lhikx0u6iik2Z9zpxMq/bI0e0k+jWb/1KaLy9uTSwGndf7QC7bH1TxzCfbkzio8968z22wls81WMttsJbPNVjLbbCWzb8d+B27vNtjK1bLEAAAAAElFTkSuQmCC"},ce3f:function(t,e,n){"use strict";n.r(e);var i=n("6f2f"),a=n("1639");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("6507");var o,u=n("f0c5"),c=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"0687ff00",null,!1,i["a"],o);e["default"]=c.exports},da40:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("aeb6")),r={addMealsRecord:function(t){return a.default.post("/mealRecord/addMeal",t)},getMealsRecord:function(t){return a.default.get("/mealRecord/findAllMeal",t)},getCommodity:function(t){return a.default.get("/dictionary/findAllDict",t)},updateSwill:function(t){return a.default.post("/swill/addSwill",t)}},o=r;e.default=o}}]);