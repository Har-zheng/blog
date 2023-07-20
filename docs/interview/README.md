# javascript
   JavaScript，通常缩写为JS，是一种高级的，解释执行的编程语言。 JavaScript是一门基于原型、函数先行的语言，是一门多范式的语言，它支持面向对象编程，命令式编程，以及函数式编程。 它提供语法来操控文本、数组、日期以及正则表达式等，不支持I/O，比如网络、存储和图形等，但这些都可以由它的宿主环境提供支持。
  
## js继承的几种方式
1. 属性拷贝 (就是将对象的成员复制一份给需要继承的对象)
   ```javascript
      // 创建对象
      var super ={
        name: 'zheng',
        age: 26,
        friends: ['小明','小花','小白'],
        showName: function(){
          alert(this.name)
        }
      }
      // 创建需要继承的子对象
      var subObj = {};
      // 开始拷贝属性(使用for...in...循环)
      for( var i in superObj ){
        subObj[i] = superObj[i];
      }

      console.log(subObj)
      console.log(superObj)
   ```
    *存在的问题*
    > 如果继承过来的成员是引用类型的话,
      那么这个引用类型的成员在父对象和子对象之间是共享的,
      也就是说修改了之后, 父子对象都会受到影响.(属于浅拷贝)

2.原型式继承(借助构造函数的原型对象实现继承)
  ```javascript
  // 创建父 构造函数
    function SuperClass(name){
      this.name = name;
      this.showName = function(){
        alert(this.name);
      }
    }
  // 设置父构造器的原型对象
  SuperClass.protopyte.showName = function(){
    console.log(this.age);
  }

  // 创建子构造函数
  function SubClass(){

  }
  // 设置子构造函数的原型对象实现继承
  SubClass.prototype = SuperClass.prototype;

  var child = new SubClass()
  ```
  *问题*
  > 父构造函数的原型对象和子构造函数的原型对象上的成员有共享问题 <br/>
    只能继承父构造函数的原型对象上的成员, 不能继承父构造函数的实例对象的成员

3.原型链继承(即 子构造函数.prototype = new 父构造函数())
  ```javascript
    // 创建父构造函数
  function SuperClass(){
      this.name = 'liyajie';
      this.age = 25;
      this.showName = function(){
          console.log(this.name);
      }
  }
  // 设置父构造函数的原型
  SuperClass.prototype.friends = ['小名', '小强'];
  SuperClass.prototype.showAge = function(){
      console.log(this.age);
  }
  // 创建子构造函数
  function SubClass(){

  }
  // 实现继承
  SubClass.prototype = new SuperClass();
  // 修改子构造函数的原型的构造器属性
  SubClass.prototype.constructor = SubClass;

  var child = new SubClass();
  console.log(child.name); // liyajie
  console.log(child.age);// 25
  child.showName();// liyajie
  child.showAge();// 25
  console.log(child.friends); // ['小名','小强']

  // 当我们改变friends的时候, 父构造函数的原型对象的也会变化
  child.friends.push('小王');
  console.log(child.friends);["小名", "小强", "小王"]
  var father = new SuperClass();
  console.log(father.friends);["小名", "小强", "小王"]
  ```
*问题:*
  > 不能给父构造函数传递参数，父子构造函数的原型对象之间有共享问题

4.借用构造函数
  > 使用call和apply借用其他构造函数的成员, 可以解决给父构造函数传递参数的问题, 但是获取不到父构造函数原型上的成员.也不存在共享问题
  ```javascript
    // 创建父构造函数
      function Person(name){
        this.name = name;
        this.freinds = ['小王', '小强'];
        this.showName = function(){
          console.log(this.name);
        }
      }

      // 创建子构造函数
      function Student(name){
        // 使用call借用Person的构造函数
        Person.call(this, name);
      }

      // 测试是否有了 Person 的成员
      var stu = new Student('Li');
      stu.showName(); // Li
      console.log(stu.friends); // ['小王','小强']
  ```

5.组合继承(借用构造函数 + 原型式继承)
  ```javascript
    // 创建父构造函数
    function Person(name,age){
        this.name = name;
        this.age = age;
        this.showName = function(){
            console.log(this.name);
        }
    }
    // 设置父构造函数的原型对象
    Person.prototype.showAge = function(){
        console.log(this.age);
    }
    // 创建子构造函数
    function Student(name){
        Person.call(this,name);
    }
    // 设置继承 
    Student.prototype = Person.prototype;
    // constructor 
    Student.prototype.constructor = Student;
  ```
  > 上面代码解决了 父构造函数的属性继承到了子构造函数的实例对象上了,
    并且继承了父构造函数原型对象上的成员 
    解决了给父构造函数传递参数问题

6.借用构造函数 + 深拷贝
  ```javascript
    function Person(name,age){
    this.name = name;
    this.age = age;
    this.showName = function(){
        console.log(this.name);
        }
    }
    Person.prototype.friends = ['小王','小强','小王八'];

    function Student(name,25){
        // 借用构造函数(Person)
        Person.call(this,name,25);
    }
    // 使用深拷贝实现继承
    deepCopy(Student.prototype,Person.prototype);
    Student.prototype.constructor = Student;
  ```
  +  这样就将Person的原型对象上的成员拷贝到了Student的原型上了, 这种方式没有属性共享的问题.


## es6

1. let、const、var 的区别
> 1.let/const 定义的变量不会出现变量提升，而 var 定义的变量会提升。<br/>
> 2.相同作用域中，let 和 const 不允许重复声明，var 允许重复声明。<br/>
> 3.const 声明变量时必须设置初始值<br/>
> 4.const 声明一个只读的常量，这个常量不可改变。<br/>


+ 推荐观看阮一峰
[ECMAScript 6 入门](http://es6.ruanyifeng.com/ "ECMAScript 6 入门")

后期一点点更新

## 闭包
> 闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。--MDN

> 通俗讲,闭包是一个函数，是有权访问另外一个函数作用域中的变量的函数。内部函数将能够访问到外部函数作用域中的变量，即使外部函数已经执行完毕。

```js
function outer() {
 let a = '1'
 let inner = function () {
 console.info(a)
 }
 return inner // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
 }
outer()
```

### 案例使用
>在函数式编程中，闭包经常用于偏函数应用和柯里化
* ajax请求的成功回调
* 事件绑定的回调方法
* setTimeout的延时回调
* 函数内部返回另一个匿名函数
* 构造函数的私有属性
* 计算缓存
* 函数节流、防抖
```js
// 事件绑定的回调方法
let countClicked = 0;
myButton.addEventListener('click', function handleClick() {
    countClicked++;
    myText.innerText = `You clicked ${countClicked} times`;
});
// 回调
function foo(message, time) {
    setTimeout(function callback() {
        console.log(message); // Hello, World!
    }, 1000);
}
foo('Hello, World!', 1000);
//闭包经典问题for循环中的函数
//如何保存循环中的i值  i 这个变量是被共享的。当循环结束之后，i是最后的结束值,用闭包的思路是让i在每次迭代的时候，都产生一个私有的作用域
var arr = [];
for(var i = 0; i< 5; i++){
    arr[i] = (function(i){
        return function(){
            return i;
        }
    })(i)
}

arr[0](); // 0

```
### 缺点
*  内存泄露问题  如注意会造成内存堆积占用 需要 el = null 可进行清空
*  this指向问题  闭包函数在windows环境下 this指向window

## 原型链


## call,apply,bind 相同和区别,以及手写实现
### 相同
> call， apply， bind作用是改变运行时函数上下文this指向(改变函数执行时的上下文)。
  同时都是Function.prototype的方法，返回值是当前调用方法的返回值，若方法无返回值则返回undefined

* 三个方法第一个参数都是this要指向的对象,如果未指定这个参数或者undefind和null 则this 默认指向执行当前环境window,或者global对象
### 区别
1 call 接受传参 列表形式传参, 使用时直接调用函数
```js
foo.call(obj,参数1, 参数2, ...)
```
2 apply 接受传参 数组形式传参, 使用时直接调用函数
```js
foo.apply(obj, [参数1,参数2])
```
3 bind 接受传参 列表形式传参,返回包装后的新函数 使用时需要手写()调用
```js
const thatBind = foo.bind(obj,参数1,参数2)
thatBind() 
```
### 手写实现
1 call 
```js
Function.prototype.myCall = function (context){
    const ctx = context || window  // 无参数时需要默认指向window
    ctx.fun = this  // this当前调用者的方法
    //将伪数组转成数组
    const args = Array.from(arguments).slice(1)
    //调用新建的函数 同时传参修改this指向
    const res = arguments.length >1?ctx.func(...args): ctx.fun()
    //防止全局污染
    delete ctx.fun
    return res
}
// 测试使用
let obj = { name: 'zhz' }
let funCall = function (){ console.log(this)}
funCall.myCall(obj, 123, 798)
```
2 apply  跟call基本类似  传承方式不同
```js
Function.prototype.myApply = function (context){
    // 无参数时需要默认指向window
    const ctx = context || window
    // this当前调用者的方法
    ctx.fun = this
    //调用新建的函数 同时传参修改this指向
    const res = arguments[1]> 1?ctx.fun(...arguments[1]): ctx.fun()
    //防止全局污染
    delete ctx.fun
    return res
}
// 测试使用
let obj = { name: 'zhz' }
let funApply = function (x, y){ console.log(this, x, y)}
funApply.myApply(obj, [123, 798])
```
3 bind  需要返回函数方式
```js
Function.prototype.myBind = function (context){
    // 对context进行深拷贝, 防止返回函数后在未执行期间,context被修改或污染
    const ctx = JSON.parse(JSON.stringify(context)) || window  // 无参数时需要默认指向window
    ctx.fun = this  // this当前调用者的方法
    //将伪数组转成数组
    const args = Array.from(arguments).slice(1)
    return function () {
        // bind 方法需要合并两次执行函数的参数
        const Allargs = args.concat(Array.from(arguments))
        return Allargs.length > 0? ctx.fun(...Allargs):ctx.fun()
    }
}
// 测试使用
let obj = { name: 'zhz' }
let funBind = function (x, y){ console.log(this, x, y)}
const bindRun =  funBind.myBind(obj, 123, 798)
bindRun()
```

## 