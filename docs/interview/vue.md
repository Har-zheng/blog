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





