# ES6
> ECMAScript6 是新的一代JS语言标准(2015年6月正式发布)
### let,const
#### let
* 不存在变量提升
* 暂时性死区
* let 不允许重复声明
#### cont
* const声明一个只读的常量。一旦声明，常量的值就不能改变。

### ES6 对String 字符串类型做的常用升级优化
* 字符串模板``  更直观优雅
* 新增includes方法
### 对Array数组的优化
* 数组解构赋值
* 扩展运算符
* Array.from() 用于将两类对象转为真正的数组类似数组的对象和可遍历（iterable）的对象
* Array.of()方法用于将一组值，转换为数组。
* 实例方法：copyWithin()
* 实例方法：find()，findIndex()，findLast()，findLastIndex()
* fill方法使用给定值，填充一个数组。
* 实例方法：entries()，keys() 和 values()
* includes()
* 实例方法：flat()，flatMap() 用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

### 对象的新增方法
* Object.is() 用来比较两个值是否严格相等
* Object.assign()
* Object.getOwnPropertyDescriptors()
* __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
* Object.keys()，Object.values()，Object.entries()
* Object.fromEntries() 用于将一个键值对数组转为对象。
* Object.hasOwn()

### 运算符的扩展
* 指数运算符 2**3 8
> 2**3 8
* 链判断运算符 
> message?.body?.user?.firstName || 'default';

> iterator.return?.()

* Null 判断运算符 ES2020
> response.settings.showSplashScreen ?? true

* 逻辑赋值运算符 ES2021 
```js
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```
  
 