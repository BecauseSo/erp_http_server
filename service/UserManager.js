const SQLTool = require('../tools/MysqlTool')
const logger = require('log4js').getLogger("UserManager");
const RoleTool = require('../tools/Role_tool')

class UserManager{
    constructor(){

    }

    async getUserInfoForID(user_id){

    }

    async allUsers(){
        let sql = "SELECT u.id,u.user_name,u.status,u.phone_number,u.email,gs.group_id,g.group_name,g.group_display_name,apartship.apart_id,ap.apart_name,ap.apart_description FROM erpcasbin.user u left join grouprelationship gs on u.id = gs.user_id left join erpgroup g on g.id = gs.group_id left join apartmentrelationship apartship on apartship.user_id = u.id left join apartment ap on apartship.apart_id = ap.id;";
        try {
            let res = await SQLTool.mysqlTool.query(sql);
            let dic = {};
            let result_list = [];
            for (let i = 0; i < res.length; i++) {
                let item = res[i];
                console.log(item);
                let userItem = dic[item.id];
                if (userItem == null){
                    userItem = {
                        id:item.id,
                        name: item.user_name,
                        phone_number:item.phone_number,
                        email:item.email,
                        apart:{},
                        apart_list:[],
                        status:item.status,
                        roles:{},
                        role_list:[]
                    }
                    dic[item.id] = userItem;
                    if (item.apart_id != null){
                        let apartItem = { id: item.apart_id, name: item.apart_name };
                        userItem.apart[item.apart_id] = apartItem;
                        userItem.apart_list.push(apartItem);
                    }
                    if (item.group_id != null){
                        let groupItem = { id: item.group_id, name: item.group_name, display_name: item.group_display_name };
                        userItem.roles[item.group_id] = groupItem;
                        userItem.role_list.push(groupItem);
                    }
                    continue;
                }
                if (item.apart_id != null) {
                    let tmpApart = userItem.apart[item.apart_id];
                    if (tmpApart == null) {
                        let apartItem = { id: item.apart_id, name: item.apart_name };
                        userItem.apart[item.apart_id] = apartItem;
                        userItem.apart_list.push(apartItem);
                    }
                }
                if (item.group_id != null) {
                    let tmpRole = userItem.roles[item.group_id];
                    if (tmpRole == null){
                        let functionItem = { id: item.group_id, name: item.group_name, display_name: item.group_display_name };
                        userItem.roles[item.group_id] = functionItem;
                        userItem.role_list.push(functionItem);
                    }
                }
            }
            for (let key in dic){
                let item = dic[key];
                result_list.push(item);
            }
            console.log(result_list);
            return result_list;
        } catch (error) {
            logger.error(error);
            throw new Error("Server Error");
        }
    }

    async addUser(user){
        if (user.name == null || user.name.length == 0 || user.password == null || user.password.length == 0){
            throw new Error('User name or password is null');
        }
        let sql = "insert into user (user_name,password,phone_number,email) values (?,?,?,?);";
        try{
            await SQLTool.mysqlTool.query(sql,[user.name,user.password,user.phone_number,user.email]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    async deleteUser(user_id){
        if(user_id == null){
            throw new Error('user id is nil');
        }
        let sql = 'update user set status = ? where id = ?;';
        try{
            await SQLTool.mysqlTool.query(sql,[1,user_id]);
        }catch(error){
            throw new Error('Server error');
        }
    }

    async modifyUser(id, name, email, phone_number){
        if (id == null || name == null){
            logger.error('id or name is nil');
            throw new Error("Server error");
        }
        let sql = "update user set user_name = ?,email = ?,phone_number = ? where id = ?";
        try {
            await SQLTool.mysqlTool.query(sql, [name,email,phone_number,id]);
        } catch (error) {
            throw new Error('Server error');
        }


    }

    async searchUser(searchStr){
        if (searchStr == null || searchStr.length == 0) {
            return [];
        }
        searchStr = searchStr.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        let sql = "select * from user where user_name like ?;";
        try {
            let s = '%' + searchStr + '%';
            let res = await SQLTool.mysqlTool.query(sql, [s]);
            return res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }


}

const um = new UserManager();

module.exports = {
    um
}
