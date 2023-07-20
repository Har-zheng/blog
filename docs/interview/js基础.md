## 关于原型链

    1, 创建对象的几种方法
        (1) 字面量方式
        let o = {name: 'zhz'}
        let o1 = new Object({name: '124'})
        (2) 通过构造函数
        let M = function(){this.name = 'zhz'}
        let M2 = new M()
        (3) 通过Obeject.create方法
        let P = {name: 'zhz'}
        let P2 = Obeject.create(P)

    2, 原型, 构造函数, 实例,原型链
    instanceof的原理
    new运算符

>谈一谈闭包

>继承

