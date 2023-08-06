# node 的单元测试
# 代码的覆盖率 持续集成

### 常见全局变量
* __filename: 返回正在执行脚本文件的绝对路径
* __durname: 返回正在执行脚本所在目录
* timer类函数: 执行顺序与事件循环间的关系
* process: 提供与当前进程互动的接口
* require: 实现模块的加载
* module , exports:处理模块的导出

### path 模块常用API
* bassename() 获取路径中基础名称
* dirname() 获取路径中目录名称
* extname()获取路径中扩展名称
* isAbsolute() 获取路径是否为绝对路径
* join() 拼接多个路径片段
* rsolve() 返回绝对路径
* pasre() 解析路径
* format() 序列化路径
* normalize() 规范化路径

