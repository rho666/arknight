// 引用http模块，http是内置模块，用于创建服务器
const http = require('http');
// 引用router模块，处理事件
const router = require('./router')

// 创建服务器方法
const server = http.createServer();

// 监听端口，启动服务器
server.listen(7777,()=>{
  console.log("请访问 127.0.0.1:7777");
})

// 传入server数据将去router处理
router.bind(server);