### 手写js 函数实现
#### 手写 instanceof方法
```js
    function  myInstanceOf(left, right){
        let proto = Object.getPrototypeOf(left)
        let  prototype = right.prototype
        while(true){
            if(!proto) return false
            if(prototype === proto)  return true
            proto = Object.getPrototypeOf(proto)
        }
    }
```
###   实现一个new
```js
    function objectFactory(){
        let newObject = null;
        let constructor = Array.prototype.shift.call(arguments)
        let result = null
        // 判断是否是一个函数
        if(typeof constructor !== 'function'){
            console.log('trype error')
            return
        }
        // 新建一个空对象, 对象的原型为构造函数的 ptototype
        newOBject = Object.create(constructor.protype)
        // 将this 指向新建对象  并执行函数
        result = constructor.apply(newOBject, arguments)
        // 判断返回对象
        let flag = result && (typeof result=== 'object' || typeof result=== 'function' )
        return flag? result:newOBject
    }
```
### 手写promise
```js
    
```
### 手写防抖
```js
    function debounce(fn, wait){
        let timer = null;
        return function(){
            let context = this,args = arguments
            // 如果此时存在定时器的话取消之前的定时器
            if(timer){
                clearTimeout(timer)
                timer = null
            }
            //设置定时器, 执行传值的函数  和默认参数
            timer = setTimeout(()=>{
                fn.apply(context, args)
            }, wait)
        }
    }
```

### 手写节流
```js
    function throttle(fn, delay){
        let curTime = Date.now()
        return function(){
            let nowTime = Date.now()
            let context = this
            let args =  arguments 
            // 如果函数生成时时间和当前时间相减大于等于  传入的需要节流时间  执行函数
            if(nowTime- curTime >=delay){
                curTime = Date.now()
               return fn.apply(context,args)
            }
        }
    }
```
### 手写类型判断函数
```js
    function getType(value){
        if(value === null){
            return null + ''
        }
        if(typeof value == 'object'){
            let valueClass = Object.prototype.toString.call(value)
            let type =  valueCalss.split('')[1].split('') 
            type.pop()
            return type.join('').toLowerCase()
        }else{
            return typeof value
        }
        
    }

```


### 