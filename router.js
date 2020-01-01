const url = require('url');
// 引用fs模板操作文件
const fs = require('fs')
// 引用处理数据的模块
const methodsModule = require('./methodsModule');


module.exports.bind = function(server){
  server.on('request',(req,res)=>{
    const Url = url.parse(req.url);
    const methods = req.method;
    if(methods === 'GET'){
      if(Url.pathname === '/'){
        // 使用模块的方法，处理请求
        methodsModule.getAll(req,res);
      }else if(Url.pathname === '/detailed'){
        // 使用模块的方法，处理请求
        methodsModule.getone(req,res);
      }else if(Url.pathname === '/update'){
        // 使用模块的方法，处理请求
        methodsModule.update_get(req,res);
      }else if(Url.pathname === '/delete'){
         // 使用模块的方法，处理请求
        methodsModule.delete_get(req,res);
      }else if(Url.pathname === '/adduser'){
        methodsModule.add_get(req,res);
      }else{
        // 请求静态资源，根目录拼接路径，请求什么给什么
        fs.readFile('.'+Url.pathname,(err,data)=>{
          // 响应请求的资源
          res.end(data);
        })
      }
    }else if(methods === 'POST'){
      if(Url.pathname === '/update'){
        methodsModule.update_post(req,res);
      }else if(Url.pathname === '/adduser'){
        methodsModule.add_post(req,res);
      }
    }
  })
}