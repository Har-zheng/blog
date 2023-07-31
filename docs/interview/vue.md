# vue 常问面试题
## v-model  与from表单 :model区别 
> v-model数据是vue中的双向数据绑定例如在from 表单的 select  input中使用
>:model是v-bind:model的简写。:model是用子组件用来引用父组件中数据的。
## vue生命周期
> vue实例有一个完整的生命周期, 从开始的创建,编译模板,挂在Dom=> 渲染,更新 -> 渲染,卸载 等一系列过程
* beforeCreated
* created
* beforeMounted
* mounted
* befordUpdatd
* updated
* actived
* deactivated
* beforeDestory
* destoryed
## vue数据传递过程
1 父子传值
```jsx
//父组件
<template>
    <child :data="data"></child>
</template>
// 子组件
<template>
    <div>{{ data }}</div>
</template>
<script>
    props: ['data']
</script>
```
2 子传父
```jsx
//父组件
<template>
    <child @childChange="change"></child>
</template>
<script>
method:{
    change(){

    }
}
</script>

// 子组件
<template>
    <div>{{ data }}</div>
</template>
<script>
method:{
   changeHandle(){
    this.$emit('childChange', '参数')
   }
}
</script>
```
3 兄弟组件传值
```js
// event-bus.js
import Vue from 'vue'
export const EventBus = new Vue()
//组件1 
import { EventBus } from "event-bus.js";
method: {
    sendData(){
        EventBus.$emit('changeBus', '参数哦')
    }
}
// 组件2
import { EventBus } from "event-bus.js";
mounted() {
    EventBus.$on('changeBus', (msg)=> {
        //接受参数哦
        this.msg = msg
    })
}
// 在vue组件卸载时
EventBus.$off('aMsg', {})
```
4 $parent / $children与 ref / $refs

5 依赖注入（provide / inject）
```jsx
// 祖先组件
data() {
  return {
    obj:{name:'dax1'},
  }
}
provide(){
  return{
    username:this.obj	// 此处provide一个对象
  }
}
// 后代组件
export default {
    inject: ['username']    
}
```

6 $attrs / $listeners

7 vuex
## 父组件/子组件 在一起时生命周期顺序
> 父组件beforeCreated-> 父组件Created-> 子组件beforeCreated-> 子组件Created-> 子组件beforeMount -> 子组件mounted-> 父组件mounted
### 子组件更新过程
>  父组件beforeUpdate-> 子组件beforeUpdate -> 子组件update-> 父组件update

### 销毁过程
>  父组件beforeDestory-> 子组件beforeDestory -> 子组件Destory -> 父组件Destory

## vue中的路由模式
1 hash 模式
* hashchange事件进行监听

2 history

* 利用h5新增的pushstate和replacestate将地址直接压入历史记录栈中，通过popstate进行监听实现页面跳转的。

3 abstract (新)

* 该种模式支持js运行环境，比如在nodejs中。当识别不到window的api的时候就会强制进入该种模式
## vuex
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一容器，它包含着你的应用中大部分的状态 ( state )。

1 Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

2 改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。
### 模块
* State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
* Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
* Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
* Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
* Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中。

## SSR
> 服务端生成好的html 返回到客户端

* 优点
1 更利于seo 搜索

2 首屏渲染更高效

* 缺点
1 更多的开发条件限制 ( beforCreate 和 created 两个钩子函数) 
2 增加服务器负载

## vue 实现双向数据绑定
* 实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。
* 实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。
* 实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。
实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

## Proxy 与 Object.defineProperty 优劣对比
### Proxy 优势
* Proxy 可以直接监听对象而非属性；
* Proxy 可以直接监听数组的变化；
* Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
* Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
* Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
### Object.defineProperty 的优势
* 兼容性好

## vue中的节点Key
> key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和  oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较

## vue项目中的一些优化
### 代码层面的优化
* v-if 和 v-show 区分使用场景
* computed 和 watch  区分使用场景
* v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
* 长列表性能优化
* 事件的销毁
* 图片资源懒加载
* 路由懒加载
* 第三方插件的按需引入
* 优化无限列表性能
* 服务端渲染 SSR or 预渲染
* 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

### Webpack 层面的优化
* Webpack 对图片进行压缩
* 减少 ES6 转为 ES5 的冗余代码
* 提取公共代码
* 模板预编译
* 提取组件的 CSS
* 优化 SourceMap
* 构建结果输出分析
* Vue 项目的编译优化

### 基础的 Web 技术的优化
* 开启 gzip 压缩
* 浏览器缓存
* CDN 的使用
* 使用 Chrome Performance 查找性能瓶颈

## 虚拟 DOM 的优缺点
* 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限
* 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率
* 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。
### 缺点
无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

## 虚拟dom实现原理
* 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
* diff 算法 — 比较两棵虚拟 DOM 树的差异；
* pach 算法 — 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。



