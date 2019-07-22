# webpack4那点事
###  本地安装
    npm install --save-dev webpack
    npm install --save-dev webpack@<version>
###  不推荐 全局安装
    npm install -g webpack
###  预热 熟悉 common.js AMD  模块化 方案

###  打包JS
    webpack  app.js  <打包后的js Name>
    webpack --config  webpack.conf.js
## Babel
+ es6/es7 Babel 为了使一些浏览器做到兼容 需要进行编译到es5语法
```javascript 
    Babel
    Babel-presets
    Babel-publu
    Bable-loader
    webpack4.28 版本的 es6/es7
    npm install -D babel-loader babel/core babel/preset-env webpack
    Bable Presrt 规范的一个总结
    cle
    通过 targets 指定一些目标
    can I use
    这部分配置还挺复杂,各个环境的差别化
    这个暂过 回头在找错 处理
 
    Babel Presets  打包的规范语法的版本  babel已经集成好的插件集 es2015 es2016 
    cnpm install babel-polyfill babel-runtime --save
    Babel Polyfill  针对函数和 方法  垫片  语法转义 
    Babel Runtime Transform  局部垫片  为框架准备的
    cnpm install babel-plugin-transform-runtime --save-dev
    typrsript-loader 
    安装
    npm i typescipt ts-loader --save-dev
    cnpm i typescipt awesome-typescript-loader --save-dev
    配置
    tsconfig.jso
```
### babel-loader的配置 使用
```javascript
module.exports = {
entry: { // 入口
    app: './app.js'
},
output: { // 
    filename: '[name].[hash:8].js'
},
mode:"development",
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        
                        ['@babel/preset-env',{
                            targets: ['> 1%', 'last 2 versions']
                    }]
                ]
                }
            }
        }
        ]
}
}
```
+  ues 可以说是单独的loader 还可以是接受对性
+  Presets targrts 可以指定node  或者浏览器版本
+  browserslist    can I use  浏览器的支持
###  babel polyfill Babel Runtime Transform
      函数和方法 能够处理  Genterator set
      Map Array.from Array.prototype.includes
      babel polyfill  全局垫片 为应用准备
      Babel Runtime Transform 局部垫片  为开发框架准备 例如(vue, react)
` npm install babel-polyfill babel-runtime --save`
`  npm install babel-polyfill babel-transform-runtime --save-dev `
## Typescript
+ js的超集
+ 来自微软
#### typesript-loader   安装
` npm i typesript typesript-loader --save-dev `
` npm i typesript awesome-typesript-loader --save-dev  //更快`
` npm i ts-loader `
` lodash  同时使用  js`
#### 配置  tsconfig
    配置选项 
    常用选项
    声明文件:  能够检测错误报告
    ` @types/lodash `
    ` @typrs/vue `
    Typings  
    ` npm install  Typings`
    ` typing install lodash`

## 提取公用代码
+ webpack4打包多页面应用过程中的提取公共代码部分。相比于webpack3，4.0版本用optimization.splitChunks配置替换了3.0版本的CommonsChunkPlugin插件。在使用和配置上，更加方便和清晰。
+ 减少代码的冗余
+ 提高加载速度
+ CommonsChunkPlugin
+ webpack.optimize.CommonsChunkPlugin
###### 配置 plugins:
+ options.name 名称 提取的  
+ filename 表示公用代码的打包名
+ minChunks 位数字是 提取的条件  可以为特殊值 或函数
+ options.chunks 提取公共代码的范围
+ chidren
```javascript
let webpack = require('webpack')
let path = require('path')
module.exports = {
    // 多页面应用
    entry: {
        'pageA': './src/pageA.js',
        'pageB': './src/pageB.js',
        'vendor': ['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'), //当前运行下//制定一个目录下
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minSize: 1,
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: 10
                }
            }
        }
    },
}
```
---
## 代码分割和懒加载
    两种方式实现
    webpack methodes
    ES 2015Loader spec
####  webpack4打包单页应用过程中的代码分割和代码懒加载。不同于多页面应用的提取公共代码，单页面的代码分割和懒加载不是通过webpack配置来实现的，而是通过webpack的写法和内置函数实现的。
    目前: 
    特点: 优化加载.
    分离业务代码 和 第三方依赖
    分离业务代码和业务公共代码和第三方依赖
    分离首次加载和访问后加载的代码
    动态import 
## 处理css style-loader和css-loader
+ style-loader
+ style-loader/url
+ style-loader/useable
+ 配置项 options  
+  (insertAt) 插入位置  
+ insertInto  (插入到dom)
+ singleton (是否只使用一个style标签)
+ transform (转化, 浏览器环境下, 插入页面前)

```javascript
const path = require('path')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```
```javascript
    
const path = require('path')
module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
        rules: [
            {
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertInto: '#app',
                            singleton: true, 
                            transform: './css.transform.js'
                        }
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}
```
#### css-loader
+ options 配置项
+ alias (解析的别名)
+ importloader( @import )
+ Minimize( 是否压缩 )
+ modules ( 启用css-modules )
> :local :global compose compose ... from path
##### alias
名称|类型|默认值|描述
--|:--:|--:|--:|
alias|{Object}|{}|创建别名更容易导入一些模块

1. 已知： 图片放在 /static 目录下；
2. 已知：不确认css文件放在哪里（因为模块化，方便移动，所以可1.能更改模块的目录结构）；
3. 需求：我想要确保我的css文件必然能引用到这个图片，即使更改1.模块的文件路径，也不影响（不需要我二次去修改）；
4. 行动：那么添加 css-loader 的属性，设置如下：alias: 1. {'@': __dirname + '/static/'} ;
5. 行动：在css文件里，图片如下引用 background: url1.(~@/logo.png)；
6. 结果：我就可以确保必然css文件必然能引用到这个图片了；
7. 注意： @ 前要加 ~ 让 webpack 识别（~ 是 webpack 负责识1.别，认为是根目录，而 @ 是 css-loader 负责）；
```javascript
    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            singleton: true, 
                            transform: './css.transform.js'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // minimize: true,
                            modules: true,
                            //  定位到打包的位置
                            localIdentName: '[path][name]_[local]_[hash:base64:5]' 
                        }
                    }
                ]
            }
        ]
    }
```
---
## 配置less/sass
> 安装: npm install less-loader less --save-dev 
> npm install sass-loader node-sass --save-dev

### webpack4.0 day01
### webpack 可以进行0配置
- 打包工具 -> 输出后的结果(js模块)
- 打包(支持我们js的模块化)
### 手动配置webpack
-  默认配置文件的  webpack.config.js

- 新的运行命令 bpx webpack  进行打包

###  启动本地服务   启动项目
- 内置服务插件 安装: yarn add webpack-dev-server -D
```javascript 
  // 开启devserver
  devServer: { //  开发环境  服务的配置
    port: 3000,
    progress: true, // 打开压缩进度条
    contentBase: './dist',  // 服务进程  指定启动文件夹
    compress: true //  ... 压缩
  },
```
- 启动指定的html  htmlwebpackPlugin 
- 配置  Plugins: [ // 数组  放着所有的webpack插件]
- css loader

###  解析css模块
- module  模块的处理  一般是针对打包文件内部的如js文件 css 文件
```javascript
  module: { // 模块
    // loader
    rules: [ // 规则 css-loader 解析 @import这种语法
      // style-loader 他是把css 插入header标签中
      // loader 的特点 希望单一
      // loader 用法字符串只用一个loader
      // 多个loader需要 []
      // loader的顺序  默认从右边向左执行 从上到下 顺序按照一定的规则
      // loader 还可以写成对象方式
      {
        // 可以处理less
        test: /\.css$/, use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          }, 'css-loader']
      },
      {
        // 可以处理less   || sass styles  ->  node-sass sass-loader styles
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            }
          },
          'css-loader', /// 解析@import 语法  或者路径
          'less-loader' // 把less->处理成css文件
        ]
      }
    ]
  }
```
### 抽离css样式的 loader 插件  yarn add mini-css-extract-plugin -D

### 浏览器加前缀  postcss-loader  autoprefixer
- 配置文件 postcss.config.js
### 压缩css js 
- optimize-css-assets-webpack-plugin 
- terser-webpack-plugin
```javascript
    optimization:{ //优化项
    // minimizer
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCss({})
    ],
  },
```
### babel-loader @babel/core @babel/preset-env

### @babel/plugin-proposal-class-properties  一个类的es7语法支持

### 内置的api 高级语法 例如gen*  primose函数  @babel/plugin-transform-runtime开发依赖  && 上线依赖 @babel/runtime

```javascript
  {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // 用bable-loader  需要 把es6 转es5
            presets:[
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              "@babel/plugin-transform-runtime",
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
```
### 实例上的高级语法 未被解析  使用 @babel/polyfill 

###  js 检验 eslint 
```javascript
   {  // loader 默认 是从右向左 从上到下
      test: /\.js$/,
      use: {
        loader: 'eslint-loader',
        options: {
          enforce: 'pre' // previous  post
        }
      },
    },
```
### 三方依赖 jQuery  
> // export-loader 暴露全局 的 loader 内联loader
// pre 前面执行的loader normal 普通的loader 内联loader 后置 postloader
- 全局的暴露  import $ from 'expose-loader?$!jquery'
- 二 配置文件中

1 expose-loader 暴露到window
2 ProvidePlugin 给每个模块提供一个$
3 引入不打包的方式

### 图片引入的几种方式
>// webpack 打包我们的图片
// 1 在js中创建图片来引入
 // file-loader 默认会在内部生成一张图片 到build目录下
 // 把生成的图片名字返回回来
import './index.css'
import favicon from './favicon.ico' // 把图片引入 返回的结果是一个新的图片地址

let image = new Image();
console.log(favicon)
image.src = favicon ;  // 就是普通的字符串
document.body.appendChild(image)

// 2  在css引入 background('url)
// 3 <img src=""/>
#### html-withimg-loader -D  html内的图片解决方式  注: 暂未解决
### url-laoder
### 增加 cdn 的引入  选项中 配置 publicPath: 'http://www.zhztest.club'

### 12 打包多页
> chunks: ['home']
```javascript
  module.exports = {
  // 多入口
  mode: 'development', // 模式 默认两种模式 production development
  entry: {
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // [name] home, other 
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'other.html',
      chunks: ['other', 'home']
    })
  ]
}
```



















