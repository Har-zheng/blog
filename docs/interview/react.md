## React18有哪些更新？
### setState自动批处理
1 在react17中，只有react事件会进行批处理，原生js事件、promise，setTimeout、setInterval不会
react18，将所有事件都进行批处理，即多次setState会被合并为1次执行，提高了性能，在数据层，将多个状态更新合并成一次处理（在视图层，将多次渲染合并成一次渲染）

2 引入了新的root API，支持new concurrent renderer(并发模式的渲染)

3 去掉了对IE浏览器的支持，react18引入的新特性全部基于现代浏览器，如需支持需要退回到react17版本

4 flushSync

5 react组件返回值更新
* 在react17中，返回空组件只能返回null，显式返回undefined会报错
* 在react18中，支持null和undefined返回

6  strict mode更新
当你使用严格模式时，React会对每个组件返回两次渲染，以便你观察一些意想不到的结果,在react17中去掉了一次渲染的控制台日志，以便让日志容易阅读。react18取消了这个限制，第二次渲染会以浅灰色出现在控制台日志

7 支持useId
在服务器和客户端生成相同的唯一一个id，避免hydrating的不兼容

8 useSyncExternalStore
用于解决外部数据撕裂问题

9 useInsertionEffect
这个hooks只建议在css in js库中使用，这个hooks执行时机在DOM生成之后，useLayoutEffect执行之前，它的工作原理大致与useLayoutEffect相同，此时无法访问DOM节点的引用，一般用于提前注入脚本

10 Concurrent Mode
> 并发模式不是一个功能，而是一个底层设计。
它可以帮助应用保持响应，根据用户的设备性能和网速进行调整，它通过渲染可中断来修复阻塞渲染机制。在concurrent模式中，React可以同时更新多个状态
区别就是使同步不可中断更新变成了异步可中断更新
useDeferredValue和startTransition用来标记一次非紧急更新

### React的设计思想
* 组件化
> 每个组件都符合开放-封闭原则，封闭是针对渲染工作流来说的，指的是组件内部的状态都由自身维护，只处理内部的渲染逻辑。开放是针对组件通信来说的，指的是不同组件可以通过props（单项数据流）进行数据交互
* 数据驱动视图
> UI=f(data)

通过上面这个公式得出，如果要渲染界面，不应该直接操作DOM，而是通过修改数据(state或prop)，数据驱动视图更新

* 虚拟dom
* 由浏览器的渲染流水线可知，DOM操作是一个昂贵的操作，很耗性能，因此产生了虚拟DOM。虚拟DOM是对真实DOM的映射，React通过新旧虚拟DOM对比，得到需要更新的部分，实现数据的增量更新

### JSX是什么，它和JS有什么区别
> jsx 是react的语法糖 它允许在html和js中,但不能被浏览器直接识别 需要webpack, babel 之类的编译工具转换成js执行

* 区别
1 JS可以被打包工具直接编译，不需要额外转换，jsx需要通过babel编译，它是React.createElement的语法糖，使用jsx等价于React.createElement 
2 jsx是js的语法扩展，允许在html中写JS；JS是原生写法，需要通过script标签引入

### React自定义组件首字母要大写
> jsx通过babel转义时，调用了React.createElement函数，它接收三个参数，分别是type元素类型，props元素属性，children子元素。
* jsx通过babel转义时，调用了React.createElement函数，它接收三个参数，分别是type元素类型，props元素属性，children子元素
* 从jsx到真实DOM需要经历jsx->虚拟DOM->真实DOM。如果组件首字母为小写，它会被当成字符串进行传递，在创建虚拟DOM的时候，就会把它当成一个html标签，而html没有app这个标签，就会报错。组件首字母为大写，它会当成一个变量进行传递，React知道它是个自定义组件就不会报错了

###  React组件为什么不能返回多个元素
1 React组件最后会编译为render函数，函数的返回值只能是1个，如果不用单独的根节点包裹，就会并列返回多个值，这在js中是不允许的
2 react的虚拟DOM是一个树状结构，树的根节点只能是1个，如果有多个根节点，无法确认是在哪棵树上进行更新

### React组件怎样可以返回多个组件
* 使用HOC（高阶函数）
* 使用React.Fragment,可以让你将元素列表加到一个分组中，而且不会创建额外的节点（类似vue的template)
* 使用数组返回

### React中元素和组件的区别
* react组件有类组件、函数组件
* react元素是通过jsx创建的

### render相关
* 类组件 render 函数返回 JSX
* 函数直接组件 return 出 JSX
* 在 React 中, 我们会通过 babel 将我们会编写的 jsx 转化成我们熟悉的 js 格式, 这里会用到一个 babel 中 react 的预设 @babel/preset-react

* React 17 不再需要引入在组件中显式地引入 React  在 React 中, 我们会通过 babel 将我们会编写的 jsx 转化成我们熟悉的 js 格式, 这里会用到一个 babel 中 react 的预设 @babel/preset-react 同时编译工具(react 的预设 @babel/preset-react), 针对 jsx 不但会帮我们进行编译, 还会帮我们手动引入所需要的包

* 渲染流程 state 或者 props 更新, 会触发 render, 当然这里也有例外(props 可通过 shouldComponentUpdate、memo 进行控制, 并且在 useState 中如果设置了相同的 state 也不会触发 render)
每次 render 时, 整个 UI 都将以 虚拟 DOM 的形式进行呈现
使用 diif 算法, 计算新旧 虚拟 DOM 对象之间的差异
计算完成, 将只更新实际更改的真实 DOM 节点

## React 事件机制
### 原生事件和 React 事件监听方法:
* React 事件通过 JSX 方式绑定的事件, 比如 onClick={() => this.handle()}
* 原生事件使用 addEventListener
### 合成事件
* 如下代码 e 就是所谓的合成事件, 它并不是原生的一个 事件对象, 而是 React 根据 W3C 规范定义出来的一个合成事件, 所以使用合成事件对象我们就不需要担心浏览器的兼容性问题了, 同时如果我们想要访问原生的事件对象, 可通过 nativeEvent 属性来获取
* 
### 事件注册机制
* 通过 事件委托 的方式, 将所有事件都绑定在了 document 来进行统一处理
* 每次绑定都会将事件处理函数, 存储起来