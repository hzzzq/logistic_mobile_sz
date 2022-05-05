# lyyTable

#### 介绍
uni-app基于uni-table的数据展示表格

## <font color=red>声明</font>

### __<font color=blue>为防止样式错乱，请务必在添加表头时为所有行都添加`with`宽度，具体要求见下方说明。</font>__

#### <font color=red>本插件纯粹因个人爱好及自己工作需求而制作，自觉功能尚可，所以分享出来希望能够帮助有需要的人，觉得可用，你就用，用不来就换别的，插件市场那么多，大可不必一棵树上吊死。</font>

#### <font color=red>本插件无盈利目的，又没有什么乱七八糟的许可协议，源代码清楚地写在插件文件里，你自己想怎么改就怎么改，有问题你好好问我好好答，不好好问懒得理你，身为一个前端，连基础的css和F12都不会吗？</font>

#### <font color=red>插件说明就下面这些，看不懂就参考示例，示例也看不懂就换个插件吧，我这个不适合你。</font>

#### <font color=red>此插件最初目的为展示数据，因此没有过多的修改数据的功能（如编辑删除内容、全选多选等），此类操作后续也不会添加，仅添加方便获取行数据的行点击功能。</font>

#### <font color=red>言尽于此，好自为之</font>
## 1、使用说明
1、点击<span class="banner"><a class="btn btn-hx-import hmt-btn-hx-import" onclick="download_plugin(1, 0)" href="javascript:void(0)">
使用 HBuilderX 导入插件</a></span>  
2、引入`uni-table`、`uni-load-more`  
3、在自己的项目中添加、配置`<lyy-table></lyy-table>`组件标签

## 2、文件说明

lyy-table  
├─ css  
│└─ iconfont.css 字体图标（排序的向上和向下三角）  
├─ lyy-table.vue 插件主文件  
├─ lyy-progress.vue 进度条插件，可以单独使用，具体参数看源码  
└─test.vue 示例

## 3、属性说明
| 属性 | 类型 | 默认值 | 说明 |
|---|---|---|---|
|height|String|100vh(非H5) calc(100vh - 44px - env(safe-area-inset-top))(H5)|表格高度<font color=red>(百分比请用vh,不要用%)</font>|
|loading|Boolean|false|显示加载|
|loadMore|String|more|上拉加载文字，参考uni-load-more|
|showLoadMore|Boolean|false|是否显示上拉加载组件|
|headerFixed|Boolean|false|固定表头|
|~~<font color=#a0a0a0>firstColumnFixed</font>~~|~~<font color=#a0a0a0>Boolean</font>~~|~~<font color=#a0a0a0>false</font>~~|~~<font color=#a0a0a0>固定首列</font> <font color=red>ver1.3.3弃用</font>~~|
|columnFixed|Number|0|固定列数 <font color=red>ver1.3.3新增</font>|
|sortWays|Array|['none', 'asc', 'desc']|排序方式|
|emptyString|String|-|数据为空时的占位符|
|headers|Array|[]|表头|
|contents|Array|[]|表格数据|
|totalRow|Array|[]|合计列|
|@rowClick|Function|-|行点击事件，回传参数为行数据|
|@onPullup|Function|-|上拉加载事件|


## 4、参数说明

表头参数 headers

|参数|类型|必填|说明|
|---|---|---|---|
|label|String|是|表头文字|
|key|String|是|绑定值|
|width|String|是|列宽，带单位，百分比类（rpx、upx、vw）固定之类（px、em）|
|sort|Boolean|否|是否启用排序|
|hidden|Boolean|否|是否隐藏|
|format|Object|否|格式化参数|

格式化参数 format

|参数|类型|说明|
|---|---|---|
|type|String|格式化类型，可选值有：string 字符型、html html标签型、compute 计算型、progress 进度条|
|keys|Array|绑定值列表|
|template|String、Function|格式化模板，key用{下标}表示，如{0}，{1}|

 具体应用参考示例
