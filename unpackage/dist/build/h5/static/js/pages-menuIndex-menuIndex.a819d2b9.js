(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-menuIndex-menuIndex"],{1620:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{ref:"u-grid",staticClass:"u-grid",style:[t.gridStyle]},[t._t("default")],2)},a=[]},"181e":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{col:{type:[String,Number],default:uni.$u.props.grid.col},border:{type:Boolean,default:uni.$u.props.grid.border},align:{type:String,default:uni.$u.props.grid.align}}};e.default=i},"2dda":function(t,e,n){"use strict";n.r(e);var i=n("31a9"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},"31a9":function(t,e,n){"use strict";var i=n("4ea4");n("d81d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("181e")),a={name:"u-grid",mixins:[uni.$u.mpMixin,uni.$u.mixin,r.default],data:function(){return{index:0,width:0}},watch:{parentData:function(){this.children.length&&this.children.map((function(t){"function"==typeof t.updateParentData&&t.updateParentData()}))}},created:function(){this.children=[]},computed:{parentData:function(){return[this.hoverClass,this.col,this.size,this.border]},gridStyle:function(){var t={};switch(this.align){case"left":t.justifyContent="flex-start";break;case"center":t.justifyContent="center";break;case"right":t.justifyContent="flex-end";break;default:t.justifyContent="flex-start"}return uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},methods:{childClick:function(t){this.$emit("click",t)}}};e.default=a},4302:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-grid-item",class:t.classes,style:[t.itemStyle],attrs:{"hover-class":"u-grid-item--hover-class","hover-stay-time":200},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[t._t("default")],2)},a=[]},"4caa":function(t,e,n){var i=n("da79");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("51169798",i,!0,{sourceMap:!1,shadowMode:!1})},"4df3":function(t,e,n){"use strict";var i=n("4caa"),r=n.n(i);r.a},"55e4":function(t,e,n){"use strict";n.r(e);var i=n("4302"),r=n("aeb2");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("8118");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,"597e56b5",null,!1,i["a"],o);e["default"]=c.exports},"5d85":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-597e56b5], uni-scroll-view[data-v-597e56b5], uni-swiper-item[data-v-597e56b5]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-grid-item[data-v-597e56b5]{align-items:center;justify-content:center;position:relative;flex-direction:column;box-sizing:border-box;display:flex}.u-grid-item--hover-class[data-v-597e56b5]{opacity:.5}',""]),t.exports=e},"648e":function(t,e,n){"use strict";n.r(e);var i=n("1620"),r=n("2dda");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("4df3");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,"7e166126",null,!1,i["a"],o);e["default"]=c.exports},"7f92":function(t,e,n){"use strict";var i=n("4ea4");n("4160"),n("fb6a"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i(n("047f"));var r,a={data:function(){return{userInfo:{},swiper_list:["https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190633624-609451251.png","https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190643827-1389417433.png","https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220412190651327-1007330676.png","https://images.weserv.nl/?url=img2022.cnblogs.com/blog/1614106/202204/1614106-20220411163458819-1432720006.png"],function_list:[],branchCode:"",menuList:[]}},methods:{navTo:function(t){this.$Router.push({name:t,params:{branchCode:r.branchCode}})},change:function(t){},click:function(t){console.log("click",t)},getFunction:function(){var t=[{name:"account",title:"人员管理",color:"#7fbdae",path:"account_list"},{name:"volume",title:"体温核酸管理",color:"#85b597",path:"nuclein_manager"},{name:"file-text",title:"早餐台账",color:"#cc7a55",path:"breakfast"},{name:"file-text",title:"中餐台账",color:"#85b597",path:"lunch"},{name:"file-text",title:"晚餐台账",color:"#ab818c",path:"supper"},{name:"home",title:"消杀台账",color:"#85b597",path:"disinfect_record"},{name:"volume",title:"年检报告",color:"#85b597",path:"year_report"},{name:"file-text",title:"泔水上传",color:"#ab818c",path:"swillRecord"},{name:"file-text",title:"超市台账",color:"#ab818c",path:"shop_record"},{name:"volume",title:"校车维保",color:"#85b597",path:"repairRecord"}];r.menuList.forEach((function(e){"01"==e.branchCode.slice(-2)&&r.function_list.push(t[0],t[1]),"02"==e.branchCode.slice(-2)&&r.function_list.push(t[2],t[3],t[4]),"03"==e.branchCode.slice(-2)&&r.function_list.push(t[5]),"04"==e.branchCode.slice(-2)&&r.function_list.push(t[6]),"05"==e.branchCode.slice(-2)&&r.function_list.push(t[7]),"06"==e.branchCode.slice(-2)&&r.function_list.push(t[8]),"07"==e.branchCode.slice(-2)&&r.function_list.push(t[9])}))}},mounted:function(){r=this,r.getFunction()},created:function(){var t=uni.getStorageSync("menuCode"),e=uni.getStorageSync("menuInfo");t?this.branchCode=t:(this.branchCode=this.$Route.query.branchCode,uni.setStorageSync("menuCode",this.branchCode)),e?this.menuList=e:(this.menuList=this.$Route.query.menu,uni.setStorageSync("menuInfo",this.menuList))},beforeDestroy:function(){uni.removeStorage({key:"menuCode"}),uni.removeStorageSync("menuInfo")}};e.default=a},8118:function(t,e,n){"use strict";var i=n("c972"),r=n.n(i);r.a},"8bd9":function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{name:{type:[String,Number,null],default:uni.$u.props.gridItem.name},bgColor:{type:String,default:uni.$u.props.gridItem.bgColor}}};e.default=i},9607:function(t,e,n){"use strict";n.r(e);var i=n("fe1d"),r=n("b352");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("b1e6");var o,u=n("f0c5"),c=Object(u["a"])(r["default"],i["b"],i["c"],!1,null,"ef2c4834",null,!1,i["a"],o);e["default"]=c.exports},a889:function(t,e,n){"use strict";var i=n("4ea4");n("c740"),n("d81d"),n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var r=i(n("1da1")),a=i(n("8bd9")),o={name:"u-grid-item",mixins:[uni.$u.mpMixin,uni.$u.mixin,a.default],data:function(){return{parentData:{col:3,border:!0},classes:[]}},mounted:function(){this.init()},computed:{width:function(){return 100/Number(this.parentData.col)+"%"},itemStyle:function(){var t={background:this.bgColor,width:this.width};return uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},methods:{init:function(){var t=this;uni.$on("$uGridItem",(function(){t.gridItemClasses()})),this.updateParentData(),uni.$emit("$uGridItem"),this.gridItemClasses()},updateParentData:function(){this.getParentData("u-grid")},clickHandler:function(){var t,e=this,n=this.name,i=null===(t=this.parent)||void 0===t?void 0:t.children;i&&null===this.name&&(n=i.findIndex((function(t){return t===e}))),this.parent&&this.parent.childClick(n),this.$emit("click",n)},getItemWidth:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=0,!t.parent){e.next=6;break}return e.next=4,t.getParentWidth();case 4:i=e.sent,n=i/Number(t.parentData.col)+"px";case 6:t.width=n;case 7:case"end":return e.stop()}}),e)})))()},getParentWidth:function(){},gridItemClasses:function(){var t=this;if(this.parentData.border){var e=[];this.parent.children.map((function(n,i){if(t===n){var r=t.parent.children.length;(i+1)%t.parentData.col!==0&&i+1!==r&&e.push("u-border-right");var a=r%t.parentData.col===0?t.parentData.col:r%t.parentData.col;i<r-a&&e.push("u-border-bottom")}})),this.classes=e}}},beforeDestroy:function(){uni.$off("$uGridItem")}};e.default=o},aeb2:function(t,e,n){"use strict";n.r(e);var i=n("a889"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},b1e6:function(t,e,n){"use strict";var i=n("ba61"),r=n.n(i);r.a},b352:function(t,e,n){"use strict";n.r(e);var i=n("7f92"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},ba61:function(t,e,n){var i=n("f2e5");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("10022feb",i,!0,{sourceMap:!1,shadowMode:!1})},c972:function(t,e,n){var i=n("5d85");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("0602ea4c",i,!0,{sourceMap:!1,shadowMode:!1})},da79:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-7e166126], uni-scroll-view[data-v-7e166126], uni-swiper-item[data-v-7e166126]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-grid[data-v-7e166126]{justify-content:center;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center}',""]),t.exports=e},f2e5:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.container[data-v-ef2c4834]{width:100%;min-height:100%;background-color:#f1f4fb;position:relative;padding-bottom:%?64?%}.banner[data-v-ef2c4834]{width:100%;height:%?360?%}.banner uni-image[data-v-ef2c4834]{width:100%;height:100%}.tip[data-v-ef2c4834]{color:#999;padding:%?24?% %?28?% %?12?% %?28?%}.list[data-v-ef2c4834]{padding:%?28?%}.list .list_item[data-v-ef2c4834]{display:flex;align-items:center;align-content:center;justify-content:space-between;width:100%;padding:0 %?18?%;background-color:#fff;height:%?118?%;border-radius:%?18?%;margin-bottom:%?28?%;box-shadow:0 0 %?60?% 0 rgba(43,86,112,.1)}.list .list_item .iconfont[data-v-ef2c4834]{padding-right:%?12?%;font-size:%?42?%}.list .list_item .title[data-v-ef2c4834]{font-size:%?38?%}.list .list_item .more[data-v-ef2c4834]{color:#999}#block_container[data-v-ef2c4834]{padding:%?20?% %?20?%}#title_text[data-v-ef2c4834]{font-weight:700}#detail_title_text[data-v-ef2c4834]{font-weight:700;font-size:%?28?%;padding-top:%?10?%}',""]),t.exports=e},fe1d:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uSwiper:n("9bf4").default,uGrid:n("648e").default,uGridItem:n("55e4").default,uIcon:n("c918").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",[n("u-swiper",{attrs:{list:t.swiper_list,height:"400rpx"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.change.apply(void 0,arguments)},click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}})],1),n("v-uni-view",[n("v-uni-view",{staticClass:"u-demo-block",attrs:{id:"block_container"}},[n("v-uni-text",{staticClass:"block_title",attrs:{id:"title_text"}},[t._v("功能模块")]),n("v-uni-view",[n("u-grid",{attrs:{border:!1,col:"3"}},t._l(t.function_list,(function(e,i){return n("u-grid-item",{key:i,attrs:{customStyle:"padding-top: 10px; padding-bottom: 10px"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.navTo(e.path)}}},[n("u-icon",{attrs:{customStyle:{paddingTop:"20rpx"},name:e.name,size:28,color:e.color}}),n("v-uni-text",{staticClass:"grid-text",attrs:{id:"detail_title_text"}},[t._v(t._s(e.title))])],1)})),1)],1)],1)],1)],1)},a=[]}}]);