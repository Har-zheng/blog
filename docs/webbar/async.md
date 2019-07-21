## async
**js语法迭代还是很快的,es6标准相信还有很不是很熟的时候es7,es8 大家都在开始观摩了**

> 今天分享的是es7中 已经被大家熟知的async await 顾名思义 异步调用的方法

**先简单说下用法 async放在函数的前边,表示是一个异步的函数**
```JavaScript
  async function timeout(){
    return 'hello world!'
  }
timeout()
console.log('我先执行, 异步在后')
```
```javascript
  async function timeout(flag){
  if(flag){
    return 'hello world'
  }else {
    throw 'my god, failure'
  }
}
console.log(timeout(true))
console.log(timeout(false))
console.log(' 我先执行, 异步在后 ')
```
>如果函数内部抛出错误, promise对象有个catch方法进行捕获

```javascript
  timeout(false).catch(err => {
    console.log(err)
})
```

