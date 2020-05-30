/*
* @Author: Marte
* @Date:   2019-10-13 16:25:16
* @Last Modified by:   Marte
* @Last Modified time: 2019-10-13 16:34:58
*/
var mysql = require('mysql');
var config = require('./defaultConfig').default;
//创建线程池
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config['database'].PORT
});
//统一连接数据库的方法
let allServices = {
    query: function (sql,values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql,values, (err, rows) => {
                         if (err) {
                            reject(err)
                        } else {
                            resolve(rows);
                        }
                        connection.release()
                    })
                }
            })
        })
    }
}
 //读取所有 users 表数据，测试数据链接
let getAllUsers = function(){
    let _sql = `select * from users;`
    return allServices.query(_sql);
}
module.exports = {
    getAllUsers
    
}
