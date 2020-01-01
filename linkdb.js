// 引用mysql模块
const mysql = require('mysql');

// 创建连接数据
const connection = mysql.createConnection({
  user: 'root',
  host: '127.0.0.1',
  password: '123456',
  database: 'Arknight',
});

// 打开连接
connection.connect();

module.exports = {
  wh: '',
  where(wh) {
    this.wh = wh;
    return this;
  },
  // 添加数据
  add(data,callback) {
    let key = '';
    let val = '';
    for (item in data){
      key += item+',';
      val += "'"+data[item]+"',";
    }
    key = '('+key.slice(0,key.length-1)+')';
    val = '('+val.slice(0,val.length-1)+')';
    let sql = 'insert into product '+key+' values '+val;
    connection.query(sql,(err,data)=>{
      if(!err){
        callback(data.affectedRows);
      }
    })
  },
  // 删除数据
  delete(callback) {
    if(this.wh === ''){
      console.log('请传入id');
    }else{
      let sql = 'delete from product where '+this.wh;
      connection.query(sql,(err,data)=>{
        callback(data.affectedRows)
      });
    }
    this.wh = '';
  },
  // 修改表单
  update(post_data,callback) {
    if(this.wh === ''){
      console.log("请传入id");
    }else{
      let data = '';
      for (item in post_data){
        data += item+"='"+post_data[item]+"',";
      }
      data = data.slice(0,data.length-1);  // 切割字符串slice(start,end)返回一个数组
      let sql = 'update product set '+ data+ '  where '+this.wh;
      connection.query(sql,(err,data)=>{
        if(err){
          console.log(err);
        }else{
          callback(data.changedRows)
        }
      })
    }
    this.wh='';
  },
  // 查询表单
  select(callback) {
    if(this.wh === ''){
      let sql = 'select * from product';
      connection.query(sql,(err,data)=>{
        if(!err){
          callback(data)
        }
      })
    }else{
      let sql = 'select * from product where '+this.wh;
      connection.query(sql,(err,data)=>{
        if(!err){
          callback(data)
        }
      })
      this.wh = '';
    }
  }
}