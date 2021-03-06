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
>1.let/const 定义的变量不会出现变量提升，而 var 定义的变量会提升。<br/>
2.相同作用域中，let 和 const 不允许重复声明，var 允许重复声明。<br/>
3.const 声明变量时必须设置初始值<br/>
4.const 声明一个只读的常量，这个常量不可改变。<br/>


+ 推荐观看阮一峰
[ECMAScript 6 入门](http://es6.ruanyifeng.com/ "ECMAScript 6 入门")

    后期一点点更新