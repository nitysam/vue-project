# vue-rabbit-demo

This template should help get you started developing with Vue 3 in Vite.

## 项目配置
npm i

## 项目启动
npm run dev

## 功能实现

### 放大镜效果实现
 - 获取当前鼠标在盒子中的相对位置(useMouseInElement),控制滑块跟随鼠标移动(left/top)

## 用户登录
### 持久化用户数据
 - Pinia的存储是基于内存的，刷新就丢失，为了保持登录状态就要做到刷新不丢失，使用localStorage进行数据持久化
 - 实现：在设置state的时候将数据同步给localStorage，在获取state数据时从locaStorage中取出,使用了piniaPluginPersistedstate插件实现.
### 登录和非登录模板适配
 - 使用token适配多模板显示，根据是否有token来判断
  
### token失效问题处理
 - 在axios响应拦截器中进行处理，当返回401时跳转到login页面
## 购物车功能实现
 - 单选功能：不使用v-model，而是使用原始的:model-value,@change,保持数据单向流动
 - 全选功能：通过.every()方法判断是否为全部选中

## 待优化问题
 - 购物车模块，列表数量可以为0或负数 
 - 详情页退出登录时路由导航错误 （已修复）
 - 登录验证待完善
 - cartStore和userStore耦合性太强了，在userStore中增加两个数组分别存储登录和注销的回调函数