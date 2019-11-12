const SQLTool = require('../tools/MysqlTool')
const logger = require('log4js').getLogger("ApartmentManager");


// class Apart{
//     constructor(id,parent_id,name,des){
//         this.id = null,
//         this.parent_id = null,
//         this.name = name;
//         this.des = des;

//     }
// }

class ApartManager{

    constructor(){
    }

    async getAllApart(){
        let sql = 'select * from apartment';
        try{
            let res = await SQLTool.mysqlTool.query(sql);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addApart(name,parent_id,des){
        if (name == null || parent_id == null){
            logger.error('apart name or parent id is nil');
            throw new Error('Server error');
        }
        let sql = 'insert into apartment (apart_name,parent_id,apart_description) values (?,?,?)';
        try{
            await SQLTool.mysqlTool.query(sql,[name,parent_id,des]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deleteApart(arr){
        if (arr == null || arr.length == 0){
            return;
        }
        let s = '';
        let l = arr.length;
        let tmpArr = [];
        for (let i = 0;i<l;i++){
            let item = arr[i];
            tmpArr.push(item.id);
            if (i == 0){
                s = '?';
                continue;    
            }
            s = s + ',?';
        }
        let sql = "delete from apartment where id in (" + s + ")";
        try{
            await SQLTool.mysqlTool.query(sql,tmpArr);
            sql = "delete from apartmentrelationship where apart_id in (" + s +")";

            await SQLTool.mysqlTool.query(sql,tmpArr);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async apartAddUser(apart_id,user_id){
        if (apart_id == null || user_id == null){
            logger.error('apart id or user id is nil');
            throw new Error('Server error');
        }
        let sql = 'insert into apartmentrelationship (user_id,apart_id) values (?,?);';
        try{
            await SQLTool.mysqlTool.query(sql,[user_id,apart_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async apartAddUsers(list){
        if (list == null || list.length == 0){
            return;
        }
        let s = '';
        let tmpP = []
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            tmpP.push(item.user_id);
            tmpP.push(item.apart_id);
            if (i == 0) {
                s = "(?,?)";
            } else {
                s = s + ",(?,?)";
            }
        }
        let sql = "insert into apartmentrelationship (user_id,apart_id) values" + s + ";";
        try{
            await SQLTool.mysqlTool.query(sql, tmpP);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async apartDeleteUser(apart_id,user_id){
        if (apart_id == null || user_id == null) {
            logger.error('apart id or user id is nil');
            throw new Error('Server error');
        }
        let sql = "delete from apartmentrelationship where user_id = ? and apart_id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[user_id,apart_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    async apartDeleteUsers(tmpl){
        if (tmpl == null) {
            logger.error('user id or group id is nil');
            throw new Error('Server error');
        }

        if (tmpl.length == 0) {
            return;
        }
        let s = '';
        let tmpP = []
        for (let i = 0; i < tmpl.length; i++) {
            let item = tmpl[i];
            tmpP.push(item.user_id);
            tmpP.push(item.apart_id);
            if (i == 0) {
                s = "(?,?)";
            } else {
                s = s + ",(?,?)";
            }
        }
        let sql = "delete from apartmentrelationship where (user_id, apart_id) in (" + s + ");";
        try {
            await SQLTool.mysqlTool.query(sql, tmpP);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }


}

const am = new ApartManager();

module.exports = {
    am
}
