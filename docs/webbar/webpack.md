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
## webpack 可以进行0配置
- 打包工具 -> 输出后的结果(js模块)
- 打包(支持我们js的模块化)
## 手动配置webpack
-  默认配置文件的  webpack.config.js

- 新的运行命令 npx webpack  进行打包

##  启动本地服务   启动项目
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

##  解析css模块
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
## 抽离css样式的 loader 插件  yarn add mini-css-extract-plugin -D

## 浏览器加前缀  postcss-loader  autoprefixer
- 配置文件 postcss.config.js
## 压缩css js 
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
## babel-loader @babel/core @babel/preset-env

## @babel/plugin-proposal-class-properties  一个类的es7语法支持

## 内置的api 高级语法 例如gen*  primose函数  @babel/plugin-transform-runtime开发依赖  && 上线依赖 @babel/runtime

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
## 实例上的高级语法 未被解析  使用 @babel/polyfill 

##  js 检验 eslint 
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
## 三方依赖 jQuery  
> // export-loader 暴露全局 的 loader 内联loader
// pre 前面执行的loader normal 普通的loader 内联loader 后置 postloader
- 全局的暴露  import $ from 'expose-loader?$!jquery'
- 二 配置文件中

1 expose-loader 暴露到window
2 ProvidePlugin 给每个模块提供一个$
3 引入不打包的方式

## 图片引入的几种方式
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
### html-withimg-loader -D  html内的图片解决方式  注: 暂未解决

## url-laoder

## 增加 cdn 的引入  选项中 配置 publicPath: 'http://www.zhztest.club'

## 12 打包多页
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
##  配置 soure-map
``` javascript
    // 主要  定位错误
  // 1) 源码映射  会单独生成一个 sourcemap 文件 出错了 会表示  列和行  大 和 全
  // 2) 不会产生单独的文件 但可以显示行和列
  // devtool: 'source-map', // 增加映射文件 可以帮我们调试源码文件
  //  devtool: 'eval-source-map',不会产生单独的文件 但是可以显示行和列

  // 3)   不会产生列 但是是一个单独的映射文件 产生后保留起来 用来后面的调试 
  // devtool: 'cheap-module-source-map',
  // 4 ) 不会产生文件 集成在打包后的文件中 不会产生列
  // devtool: 'cheap-module-eval-source-map',

  devtool: 'cheap-module-eval-source-map',
```
## watch的用法
- 实时监测打包文件的变化
```javascript
    watch: true,
    watchOptions: { // 监控的选项
    poll: 1000, // 每秒 问我 1000次
    aggregateTimeout: 500, // 防抖 输入代码检测
    ignored: /node_modules/ // 不需要进行监控那个文件
  },
```
## webpack小插件应用
- 1 cleanWebpackPlugin
- 2 copyWebpackPlugin 
- 3 bannerPlugin (webpack)内置
```javascript
    plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'home.html',
    }),
    new CopyWebpackPlugin([
      {from: './doc', to:'./'}
    ]),
    new webpack.BannerPlugin('make 2019 by zhz')
  ]
```
## webpack 跨域问题
```javascript
  // 第一种
    devServer: { 
    proxy: { // 重写的方式 把请求代理到服务器
      '/api': {
        target: 'http://localhost:3000', // 配置代理
        pathRewrite: { '/api':''}
      }
    }
     // 2 单纯模拟数据
    before(app){ // 提供的方法
      app.get('/user', (req, res) => {
        res.json({name: 'zhz-before'})
      })
    }
    
  },
  //server.js // 3 安装 中间件  webpack-dev-middleware
  // express
  let express = require('express')

  let app = express();
  let webpack = require('webpack')
  // 中间件
  let middle = require('webpack-dev-middleware');

  let config = require('./webpack.config.js')
  let compiler = webpack(config)

  app.use(middle(compiler))

  app.get('/user', (req, res) => {
    res.json({name: 'zhz'})
  })

  app.listen(3000)
  
```
## resolve 属性的配置 
```javascript
    resolve: { // 解析 第三包 common
    modules:[path.resolve('node_modules')],
    alias: {// 别名 vue vue.runtime
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    },
    mainFields: ['style', 'main'], 
    // mainFiles 入口文件的名字
    //如果导入文件时未带后缀 为导入的文件配置默认选项
    extensions: ['.js', '.css', '.json', '.vue']
  },
```
## 定义环境变量

```javascript
// 内置
new webpack.DefinePlugin({
      DEV: JSON.stringify('production'),
      FLAG: 'true',
      EXPRESSION: 1+1
    }),
```
## 区分不同的环境
- 文件区分开
- base 通用配置
- wepack.dev.js 开发
- webpack.prod.js 生产环境
> 通过webpack-merge插件  区别环境之间打包

```javascript
let { smart } = require('webpack-merge')
let base = require('./webpack.base.js')
module.exports =smart(base,{
  mode: 'production' 
})
```
## noParse  优化相关
- 可以忽略一些打包项
```javascript
 module: {
    noParse: /jquery/, //  不去解析jquery中的依赖库
```
## lgnorePlugin 
- exclude 排除   include 包含
- moment 时间插件  github 
```javascript
  exclude: /node_modules/,
  include: path.resolve('src'),
```
- webpack 内置插件
```javascript
  new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  // 对象的写法
  new webpack.IgnorePlugin(
    {
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }
  );
```
## dllPlugin  动态链接库
```javascript
  output: {
    filename: '[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: 'ab',  // 打包后  赋这个变量
    libraryTarget: 'commonjs'  //  以什么样的模式 commonjs var this.....
  }
  // webpack.config.react.js 
    let path = require('path');
    let webpack = require('webpack')
    module.exports = {
      mode: 'development',
      entry: {
        react: ['react', 'react-dom']
      },
      output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]',  
        // libraryTarget: 'commonjs'  
      },
      plugins: [
        new webpack.DllPlugin({ // name == library
          name: '_dll_[name]',
          path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
      ]
    }

  // webpack.config.js 
  // 这就是提取插件固定的部分  不需要频繁打包出来
  new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
```
## 模块 happypack 可以使用多线程打包
```javascript
 noParse: /jquery/, //  不去解析jquery中的依赖库
    rules: [
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: /node_modules/,
        include: path.resolve('src'),
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
      }
    ]

    // 
  plugins: [
    new Happypack({
      id: 'css',
      loader: ['style-loader', 'css-loader']
    }),
    new Happypack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }),
```
## webpack 自带优化
-  three-shaking 把没用到的代码 删除掉
- // scope-hosting 作用域提升 webpack 自动省略 可以简化的代码
## 抽离公共代码
```javascript
  optimization: {
    // 分割代码块
    splitChunks: {
      cacheGroups: {
        //公用模块抽离
        common: {
          chunks: 'initial',
          minSize: 0, //大于0个字节
          minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
        },
        //第三方库抽离
        vendor: {
          priority: 1, //权重
          test: /node_modules/,
          chunks: 'initial',
          minSize: 0, //大于0个字节
          minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
        }
      }
    }
  },
```
## 懒加载 注释:  import语法已经支持

## 热更新
```javascript
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.NamedModulesPlugin(), //打印更新的模块路径
    new webpack.HotModuleReplacementPlugin() //热更新插件
  ]
  //  使用
  if(module.hot){
  module.hot.accept('./source.js', ()=>{
    let str = require('./source')
    console.log(str)
  })
}
```

## tapable介绍
> Webpack 核心模块 tapable 解析（转）

<a>原文出自：https://www.pandashen.com</a>

- 前言
- Webpack 是一个现代 JavaScript 应用程序的静态模块打包器，是对前端项目实现自动化和优化必不可少的工具，Webpack 的 loader（加载器）和 plugin（插件）是由 Webpack 开发者和社区开发者共同贡献的，而目前又没有比较系统的开发文档，想写加载器和插件必须要懂 Webpack 的原理，即看懂 Webpack 的源码，tapable 则是 Webpack 依赖的核心库，可以说不懂 tapable 就看不懂 Webpack 源码，所以本篇会对 tapable 提供的类进行解析和模拟。

## 实现loader
```javascript
    resolveLoader: {
    modules: ['node_models', path.resolve(__dirname, 'loaders')]

    // 别名
    // alias: {
    //   loader1:  path.resolve(__dirname, 'loader', 'loader1.js')
    // }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'loader1'
      }
    ]
  }
```
## 配置多个loader
```javascript
  modules: ['node_modeles', path.resolve(__dirname, 'loaders')],
    // modules: ['node_modeles', path.resolve(__dirname, 'banner')],
    // alias: {
    //   loader1:  path.resolve(__dirname, 'loader', 'loader1.js')
    // }
```


## webpack 中的插件
```javascript
// DonePlugin
class DonePlugin {
  apply(compiler){
    compiler.hooks.done.tap('DonePlugin',(stats)=>{
      console.log('编译完成');
      
    })
  }
}
module.exports =DonePlugin

// AsyncPlugin
class AsyncPlugin{
  apply(compiler){
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compliation,cb) => {
      setTimeout(() => {
        console.log('文件发射出来 等一下');
        cb()
      }, 1000)
    })
  }
}
module.exports = AsyncPlugin


// webpack.config,js
let path = require('path')
let DonePlugin = require('./plugins/DonePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin')
let HtmlWebpackplugin = require(' html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry : './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new DonePlugin(),
    new AsyncPlugin()
  ]
}
```
## 文件列表插件
```javascript
module.exports = {
  mode: 'development',
  entry : './src/index.js',
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
     new FileLisrtPlugin({
       filename: 'list.md'
     })
  ]
}
```
## 内联webpack插件
```javascript
// 把外联的标签 变成内联的标签
const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin {
  constructor({match}) {
    this.reg = match //正则
  }
  processTag(tag, compilation) { //处理某一个biaoqian
    let newTag,url;
    console.log(this.reg)
    console.log(this.reg.test)
    if(tag.tagName === 'link' && this.reg.test(tag.attributes.href)){
     newTag = {
       tagName: 'style',
       attributes: {type: 'text/css'}
     }
     url = tag.attributes.href
    }
    if(tag.tagName === 'script' && this.reg.test(tag.attributes.src)){
      newTag = {
        tagName: 'script',
        attributes: {type: 'application/javascript'}
      }
      url = tag.attributes.src
     }
     if(url){
       newTag.innerHTML = compilation.assets[url].source(); // 文件的内容 放到innner 属性上
       delete compilation.assets[url]
       return newTag
      }
    return tag;
  }
  processTags(data, compilation) { //处理引入标签的数据
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach(headTag => {
      headTags.push(this.processTag(headTag, compilation))
    });
    data.bodyTags.forEach(bodyTag => {
      bodyTags.push(this.processTag(bodyTag, compilation))
    });
    return { ...data, headTags, bodyTags }
  }
  apply(compiler) {
    // 要通过 webpack plugin来实现这个功能
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin',
        (data, cb) => {
          data = this.processTags(data, compilation)
          cb(null, data);
        })
    })
  }
}
module.exports = InlineSourcePlugin
```
## 打包后自动发布
```javascript
let UploadPlugin = require('./plugins/UploadPlugin')
module.exports = {
  mode: 'development',
  entry : './src/index.js',
  module: {
    rules: [
      {test: /\.css$/ ,use: [MiniCssExtractPlugin.loader, 'css-loader']}
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://pw9gmzl9j.bkt.clouddn.com/'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'min.css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
     new FileLisrtPlugin({
       filename: 'list.md'
     }),
     new UploadPlugin({
       bucket: 'zhzwebpack',
       domain: 'pw9gmzl9j.bkt.clouddn.com',
       accessKey: 'saqHWhPQUDfuj7kEeMsM6Ab0avlnIqzBNreqVVCt',
       secretKey: '3bM-wkA30V37W1gI4pjTyiRAuMB65V4Vla_ZnCMN',
     })
  ]
}
// UploadPlugin
let path = require('path')
let qiniu = require('qiniu')

class UploadPlugin {
  // constructor
  constructor(options) {
    let { bucket = '', domain = "", accessKey = '', secretKey = '' } = options
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    this.uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra()
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tapPromise('UploadPlugin', (compiation) => {
      let assets = compiation.assets;
      let promises = []
      Object.keys(assets).forEach(filename => {
        promises.push(this.uploade(filename))
      })
      return Promise.all(promises)
    })
  }
  uploade(filename) {
    return new Promise((resolve, reject) => {
      let readFile = path.resolve(__dirname, '../dist', filename)
      this.formUploader.putFile(this.uploadToken, filename, readFile, this.putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
    })
  }
}
module.exports = UploadPlugin
```

