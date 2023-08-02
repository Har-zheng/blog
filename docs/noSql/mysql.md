## mysql 学习笔记
### 链接方式
* TCP
* 长连接
* 同步

### 操作
* show global variable
 like ''
* SELECT * FROM  `user_innodb
` where name = '青山' 
### 词法解析 语法解析

* EXOLAIN  模拟执行

### 存储引擎
1 table  a 
速度 快 持久化-RAM

2 table b
历史数据的存储:压缩 不支持修改

3 table c 
读写并发 数据一致性要求高

![Alt text](image-1.png)




### 更新数据的过程
1,
disk-buffer pool- Server

2 server 修改  data = '修改'
3 记录 undo log
4 记录 redo log
5 buffer pool
6 commit
### undo log
> 撤销日志 回滚日志
### redo log
> 事务日志
* 记录数据页的改动, 属于物理日志
* 大小固定, 前面的内容会被覆盖
* 在 innoDB存储引擎层实现
* 用于崩溃恢复
### binlog
* 记录DDl和DML的语句,属于逻辑日志
* Server 层实现, 可以被所有存储引擎
* 没有固定大小限制  内容可以追加
* 用于数据恢复和主从复制

### canal 阿里
![Alt text](image.png)

> 用文字或者图片描述一
条查询语句 (select) 的执行流程
> B + Tree有哪些特性 这些特性在索引中带来哪些优势?

### 数据库索引到底是什么?
> 数据库索引, 是数据库管理系统(DBMS) 中一个排序的数据结构,以协助快速查询, 更新数据表中的实时数据
