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
 - 实现：在设置state的时候将数据同步给localStorage，在获取state数据时从locaStorage中取出
### 登录和非登录模板适配
 - 使用token适配多模板显示，根据是否有token来判断