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

### 对象的新增方法&扩展
* Object.is() 用来比较两个值是否严格相等
* Object.assign()
* Object.getOwnPropertyDescriptors()
* __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()
* Object.keys()，Object.values()，Object.entries()
* Object.fromEntries() 用于将一个键值对数组转为对象。
* Object.hasOwn()
* 解构赋值
* 扩展运算符

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
### Set和Map数据结构
> ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
#### 去重示例
> [...new Set(array)]
### Set 实例的属性和方法
* Set.prototype.constructor：构造函数，默认就是Set函数
* Set.prototype.size：返回Set实例的成员总数。
* Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
* Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功
* Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
* Set.prototype.clear()：清除所有成员，没有返回值。
### 遍历操作
* Set.prototype.keys()：返回键名的遍历器
* Set.prototype.values()：返回键值的遍历器
* Set.prototype.entries()：返回键值对的遍历器
* Set.prototype.forEach()：使用回调函数遍历每个成员

### WeakSet
> WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

### Map
> 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
* Map构造函数接受数组作为参数
```js
// 示例
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

// 也可接收数组方式
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
// 实际上面代码执行的操作
const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```
* Map.prototype.keys()：返回键名的遍历器。
* Map.prototype.values()：返回键值的遍历器。
* Map.prototype.entries()：返回所有成员的遍历器。
* Map.prototype.forEach()：遍历 Map 的所有成员。

### WeakMap 的语法
> get()、set()、has()、delete()

## Proxy
> Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

### get()
>get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
### set()
> set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

! 严格模式下，set代理返回false或者undefined，都会报错

### apply()
> apply方法拦截函数的调用、call和apply操作。
apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

### has() 
> has()方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。

### construct()
> construct()方法用于拦截new命令
```js
const p = new Proxy(function () {}, {
  construct: function(target, args) {
    console.log('called: ' + args.join(', '));
    return { value: args[0] * 10 };
  }
});

(new p(1)).value
// "called: 1"
// 10
```

### deleteProperty()
> deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

## Promise
> Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）

> 一旦状态改变，就不会再变，任何时候都可以得到这个结果

* 优点: 可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。
* 缺点: 1 无法取消Promise一旦新建它就会立即执行，无法中 2 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部 3 当处于pending状态时，无法得知目前进展到哪一个阶段

### .then 
> then方法是定义在原型对象Promise.prototype上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。
> then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
### Promise.prototype.catch()
> romise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
### Promise.prototype.finally()
> finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的
### Promise.all()
> Promise.all(['P1','P2'])方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
*  作用: 等待所有Promise实例执行完成后执行 .catch








  
 