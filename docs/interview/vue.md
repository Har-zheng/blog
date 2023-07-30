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





