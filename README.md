# 说明

赣医后勤管理系统手机版


## 技术栈

uniapp  + vue-router(uniapp插件：uni-simple-router) 
插件地址：[](https://hhyang.cn/v2/)



# 项目布局

```
.
├── http                                        // 请求相关
│   ├── request.js							    // axios封装 
│   ├── api									    // 具体请求
│   │   ├── bus.js							    // 校车相关请求
│   │   ├── disinfect.js					    // 消杀相关请求 
│   │   ├── employee.js						    // 员工相关请求 
│   │   ├── market.js						    // 超市相关请求 
│   │   ├── meal.js							    // 早中晚餐相关请求 
│   │   ├── user.js							    // 管理员相关请求 
│   │   ├── yearReport.js					    // 迎检记录相关请求 
├── pages                                       // 页面组件
│   ├── account_management                      // 人员管理组件
│   │   ├── index.vue                           // 人员管理首页
│   │   ├── details.vue                         // 人员管理详情页
│   │   │   ├── addUser.vue                     // 添加人员组件
│   ├── dinner_service                          // 早中晚餐相关组件
│   │   ├── breakfast.vue                       // 早餐组件
│   │   ├── lunch.vue                           // 午餐组件
│   │   ├── supper.vue                          // 晚餐组件
│   │   ├── addRecord.vue                       // 餐饮记录添加组件
│   ├── disinfect_record                        // 消杀记录相关组件
│   │   ├── index.vue                           // 消杀组件
│   ├── history_record                          // 历史记录相关组件
│   │   ├── history_record.vue                  // 历史记录首页
│   │   │   ├── history_detail.vue              // 历史记录详情页
│   ├── index                          			// 首页组件
│   │   ├── index.vue                           // 首页
│   ├── login                          			// 登录组件
│   │   ├── login.vue                           // 登录页
│   │   ├── main.css                            // 登录相关css
│   ├── menuIndex                          		// 功能页面组件
│   │   ├── menuIndex.vue                       // 功能页面
│   ├── nuclein_manager                         // 体温核酸组件
│   │   ├── nuclein_manager.vue                 // 体温核酸管理首页
│   │   │   ├── nuclein_record.vue              // 核酸记录页
│   │   │   ├── temperature_record.vue          // 体温记录页
│   ├── repair_record                           // 维保组件
│   │   ├── repair_record.vue                   // 维保记录
│   ├── shop_record                             // 超市组件
│   │   ├── index.vue                           // 超市台账
│   ├── swill_record                            // 泔水组件
│   │   ├── swill_record.vue                    // 泔水记录
│   ├── year_report                             // 迎检组件
│   │   ├── index.vue                           // 迎检记录
├── router                                      // 路由相关
├── static                                      // 静态文件
.
```

# License

**---**
