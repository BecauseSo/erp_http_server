const mysql = require('mysql')
const MYSQLCONFIG = require('./mysql_config')

const pool = mysql.createPool(MYSQLCONFIG)

const query = function(sql,val){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,connection){
            if (err){
                reject(err);
            }else{
                connection.query(sql,val,(error,fields)=>{
                    if (error){
                        reject(error);
                    }else{
                        resolve(fields);
                    }
                    connection.release();
                });
            }
        });
    });
}


class MysqlTool {

    constructor() {
        this.host = '127.0.0.1';
        this.user = 'root';
        this.password = 'yuxiao1129933675';
        this.database = 'erpcasbin';
        this.port = 3306;
        this.pool = null;
    }

    connect(host = '', user = '', password = '', database = '', port = '') {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.port = port;
        let mysqlconfig = {
            user: this.user,
            password: this.password,
            database: this.database,
            host: this.host,
            port: this.port
        };
        try {
            this.pool = mysql.createPool(mysqlconfig);
        } catch (error) {
            console.log(error);
        }

    }

    query(sql, val) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    connection.query(sql, val, (error, fields) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(fields);
                        }
                        connection.release();
                    });
                }
            });
        });
    }
}

const mysqlTool = new MysqlTool();
mysqlTool.connect(host = '39.99.140.176', user = 'root', password = 'yuxiao1129933675', database ='erpcasbin',port=3306);

module.exports = {
    mysqlTool
}
