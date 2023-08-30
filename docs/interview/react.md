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

## react生命周期
* componentWillMount:在渲染之前执行，用于根组件中的 App 级配置。
* componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
* componentWillReceiveProps：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
* shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在 state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
* componentWillUpdate：在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行。
* componentDidUpdate：它主要用于更新DOM以响应props或state更改。
* componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。

## React Hooks 优点
> Hooks是 React 16.8 中的新添加内容。它们允许在不编写类的情况下使用state和其他 React 特性。使用 Hooks，可以从组件中提取有状态逻辑，这样就可以独立地测试和重用它。Hooks 允许咱们在不改变组件层次结构的情况下重用有状态逻辑，这样在许多组件之间或与社区共享 Hooks 变得很容易

> hooks解决了什么问题？ 函数组件中可以使用类组件中的特性问题
* 组件之间的状态和逻辑复用
* 复杂组件变得难以理解
* 难以理解的 class
### Hooks api
* useState
* useEffect
* useRef
* useContext
* useMemo
* useCallback

## React 中的StrictMode(严格模式)是什么
React 的StrictMode是一种辅助组件，可以帮助咱们编写更好的 react 组件，可以使用<StrictMode />包装一组组件，并且可以帮咱们以下检查：

验证内部组件是否遵循某些推荐做法，如果没有，会在控制台给出警告。
验证是否使用的已经废弃的方法，如果有，会在控制台给出警告。
通过识别潜在的风险预防一些副作用

## 类方法需要绑定到类实例
> 在js中，this值会根据当前上下文的变化，在React类组件方法中，开发人员通常希望this引用罪案的当前实例，因此有必要将这些方法绑定到实例

## 受控组件和非受控组件区别是啥
> 受控组件是 React 控制中的组件，并且是表单数据真实的唯一来源。

> 非受控组件是由 DOM 处理表单数据的地方，而不是在 React 组件中。

> 尽管非受控组件通常更易于实现，因为只需使用refs即可从 DOM 中获取值，但通常建议优先选择受控制的组件，而不是非受控制的组件。

这样做的主要原因是受控组件支持即时字段验证，允许有条件地禁用/启用按钮，强制输入格式

## 什么是 React Fiber
> Fiber 是 React 16 中新的协调引擎或重新实现核心算法。它的主要目标是支持虚拟DOM的增量渲染。React Fiber 的目标是提高其在动画、布局、手势、暂停、中止或重用等方面的适用性，并为不同类型的更新分配优先级，以及新的并发原语。

React Fiber 的目标是增强其在动画、布局和手势等领域的适用性。它的主要特性是增量渲染:能够将渲染工作分割成块，并将其分散到多个帧中。

## 如何避免组件的重新渲染
* React.memo():这可以防止不必要地重新渲染函数组件
* PureComponent:这可以防止不必要地重新渲染类组件

## 什么是纯函数
> 纯函数是不依赖并且不会在其作用域之外修改变量状态的函数。本质上，纯函数始终在给定相同参数的情况下返回相同结果

## React与Vue的异同
### 相同点 
* 使用虚拟 DOM
* 提供响应式和组件化的视图组件
* 将注意力集中保持在核心库，而将其他功能如路由、全局状态管理交给相关的库
### 不同点
* 视图更新
>在react中，当某个组件的状态发生变化的时候，会以该组件为根，重新渲染整个组件树，如果要避免不必要的子组件重渲染，我们需要在所有可能的地方使用 PureComponent 或者是 shouldComponentUpdate 方法。

> 在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以vue能精确知晓哪个组件确实需要被重渲染。Vue的特点可以让开发者不再考虑此类优化，从而更好地专注于应用本身
* HTML 和 CSS
> 在 react 中，everything is JavaScript，不仅是 html 可以用 jsx 表示，连 css 也有 js 的解决方案。Vue 的整体思想是拥抱经典的 Web 技术，并在其上进行扩展。使用 html，css 和 js 来构建模板。
在这个方面我觉得 vue 是在适应开发者，而 react 想要改变开发者。
同时，在组件作用域内的 css 上，react 是使用的 css-in-js 的解决方案或者是 css modules。而 vue 使用 scoped 来控制 css
* 规模
* vue 的路由管理和状态管理由官方维护，而 react 则是把这些问题交给社区，创建了一个更为分散的生态系统，因此react的生态系统相对于 vue 更加繁荣。
### 原生渲染
* 由于两者都是使用的虚拟 dom 技术，因此都可以构建原生的安卓或者 ios 应用，例如 react-native 和 weex

## React fiber 架构的理解
> fiber 之前的 react存在的问题：由于 js 引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行的时候，另一个线程只能挂起等待。<br>
如果 js 线程长时间占用了主线程，那么我们渲染层面的更新就不得不长时间的等待，界面长时间不更新，会导致页面响应变慢，用户可能会感觉卡顿。<br>
这也正是 react15 所面临的问题，当 react 在渲染组件时，从开始到渲染完成整个过程是一气呵成的，无法中断。<br>
如果组件较大，那么 js 线程会一直执行，然后等到整棵 vDOM 树计算完成后，才会交给渲染线程，这就有可能出现卡顿的现象

> react fiber架构:<br>
fiber 把渲染更新过程拆分为多个子任务，其中优先级高的先执行，并且每次只做其中的一小部分，做在完成一部分任务之后，将控制权交回给浏览器，让浏览器有时间进行页面的渲染。等浏览器忙完之后有剩余时间，再继续之前 React 未完成的任务，是一种合作式调度。
<br>上述实现的方式是window.requestIdleCallback() 方法，该方法在浏览器空闲时段内调用排队的函数
会导致多次调用某些生命周期钩子
<br>react把更新分为两个阶段
reconciliation
<br>这个阶段的更新是可以被打断的，主要涉及的生命周期：
<br>componentWillMount
<br>componentWillReceiveProps
<br>shouldComponentUpdate
<br>componentWillUpdate
<br>commit
<br>这个阶段的更新是不能被打断的
<br>componentDidUpdate
<br>componentDidMount
<br>componentWillUnmount

### 状态管理器 Mobx Redux

### usecallback usememo
> 　`useCallback`的主要目的是用于缓存回调函数，避免在每次渲染时都创建新的回调函数实例。它接受一个回调函数和依赖项数组，并返回一个记忆化后的回调函数。当依赖项发生变化时，会重新创建新的回调函数实例;当依赖项没有变化时，会复用上一次记忆化的回调函数。这对于将回调函数作为prop传递给子组件或传递给`useEffect`等副作用函数时特别有用，可以避免不必要的子组件重渲染或副作用的重复执行。

> `useMemo`的主要目的是用于缓存计算结果，避免在每次渲染时都重复计算。它接受一个计算函数和依赖项数组，并返回一个记忆化后的值。当依赖项发生变化时，会重新计算新的值;当依赖项没有变化时，会复用上一次记忆化的值。这对于计算开销较大的操作或昂贵的函数调用特别有用，可以减少不必要的计算开销。


