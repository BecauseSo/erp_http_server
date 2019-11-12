const SQLTool = require('./MysqlTool')
const logger = require('log4js').getLogger("role");

class Group{
    constructor({id,name}){
        this.id = id;
        this.name = name;
    }
}

class Role{
    constructor({id,name,url}){
        this.id = id;
        this.name = name;
        this.url = url;
    }
}

class RoleCheck{

    constructor(){
        //初始化
        this.groupRoleShip = {};
        this.groups = [];
        this.roles = [];
        this.rolesGroupRelation = {};
        this.groupFunctionRelation = {};
        let sql = "select * from erpgroup;";
        let _this = this;
        try{
            // let result = await SQLTool.mysqlTool.query(sql);
            SQLTool.mysqlTool.query(sql)
                             .then(result=>{
                                result.forEach(item=>{
                                    let name = item['name'];
                                    console.log(item)
                                    this.groups.push(name);
                                })                                 
                             }).catch(err=>{
                                 logger.error(err);
                             });
            
            sql = "select * from role;";
            // let roleRus = await SQLTool.mysqlTool.query(sql);
            SQLTool.mysqlTool.query(sql)
                             .then(result=>{

                                 result.forEach(item =>{
                                     let name = item['name'];
                                    //  console.log(item)
                                     this.roles.push(name);
                                 });
                             })
                             .catch(err=>{
                                 logger.error(err);
                             });
            this.loadRolesGroupRelation()
                .then(()=>{
                    console.log('.......');
                });
            //select fs.function_id,fs.group_id,g.name,g.display_name,rs.role_id,rs.action,r.name,r.url from erpcasbin.functionrelationship as fs left join erpgroup g on g.id = fs.group_id left join rolerelationship rs on fs.function_id = rs.function_id left join role r on r.id = rs.role_id;
            // let roleRelationSql = "select fs.function_id,fs.group_id,rs.action,r.url from functionrelationship as fs left join erpgroup g on g.id = fs.group_id left join rolerelationship rs on fs.function_id = rs.function_id left join role r on r.id = rs.role_id;"
            // SQLTool.mysqlTool.query(roleRelationSql)
            //                  .then((result)=>{
            //                     result.forEach(item=>{
            //                         let url = item['url'];
            //                         if (url == null){
            //                             return;
            //                         }
            //                         let group_id = item['group_id'];
            //                         let action = item['action'];
            //                         let function_id = item['function_id'];
            //                         let key = url+'_'+group_id;
            //                         console.log(key);
            //                         _this.rolesGroupRelation[key] = action;
                                    
            //                         let gfrKey = group_id +'_'+function_id;
            //                         _this.groupFunctionRelation[gfrKey] = true;

            //                     });
            //                  })
            //                  .catch(err=>{
            //                      logger.error(err);
            //                  })
            
        }catch(err){
            logger.error(err);
        }
    }

    async loadRolesGroupRelation(){
        this.rolesGroupRelation = {};
        this.groupFunctionRelation = {};
        let roleRelationSql = "select fs.function_id,fs.group_id,rs.action,r.url from functionrelationship as fs left join erpgroup g on g.id = fs.group_id left join rolerelationship rs on fs.function_id = rs.function_id left join role r on r.id = rs.role_id;"
        try{
            let result = await SQLTool.mysqlTool.query(roleRelationSql);
            let _this = this;
            result.forEach(item => {
                let url = item['url'];
                if (url == null) {
                    return;
                }
                let group_id = item['group_id'];
                let action = item['action'];
                let function_id = item['function_id'];
                let key = url + '_' + group_id;
                console.log(key);
                _this.rolesGroupRelation[key] = action;
                let gfrKey = group_id + '_' + function_id;
                _this.groupFunctionRelation[gfrKey] = true;
            });
        }catch(error){
            logger.error(error);
        }
        
    }



    //验证用户是否能使用url
    async checkRoleForAccount(account_id,url){
        if (account_id == null || url == null) {
            return false;
        }
        let sql = "SELECT group_id FROM grouprelationship where user_id = ?;";
        try{
            let res = await SQLTool.mysqlTool.query(sql,[account_id]);
            let tmpList = [];
            for(let i = 0;i < res.length;i++){
                let group_id = res[i]['group_id'];
                let tmpKey = url+'_'+group_id;
                tmpList.push(tmpKey);
            }
            let _this = this;
            let result = tmpList.filter(item=>{
                if (_this.rolesGroupRelation[item] == null){
                    return false;
                }
                return true;
            });

            if (result.length > 0){
                return true;
            }
            return false;

        }catch(err){
            logger.error(err);
            throw new Error("Server error");
        }

    }

    async checkRole(group_id,url) {
        if (group_id == null || url == null){
            return false;
        }
        let sql = "select * from rolerelationship as rs left join role as r on rs.role_id = r.id where rs.group_id = 1 and r.url = '?';"
        try{
            let result = await SQLTool.mysqlTool.query(sql,[group_id,url])
            if (result.length > 0){
                return true;
            }
        }catch(err){
            logger.error(err);
            return false;
        }
        return false;
    }

    async allFunctionForUser(user_id){
        if(user_id == null){
            logger.error('user id is nil');
            throw new Error('Server error');
        }
        let sql = "select gs.group_id,g.group_display_name,fs.function_id,f.function_name,f.function_description from grouprelationship as gs left join erpgroup g on gs.group_id = g.id left join functionrelationship fs on g.id = fs.group_id left join function f on fs.function_id = f.id where gs.user_id = ?;"
        try{
            let res = await SQLTool.mysqlTool.query(sql,[user_id]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    //获取所有用户组
    async allGroups(){

        let sql = "select * from erpgroup";
        try{
            let res = SQLTool.mysqlTool.query(sql);
            return res;
        }catch(err){
            logger.error(err);
            throw new Error("Server Error");
        }

    }

    //添加用户组
    async addGroup(name,display_name){
        if (name == null){  
            return;
        }
        if (this.groups.includes(name)){
            let message = name + ' 已经存在';
            throw new Error(message)
        }
        let sql = "insert into erpgroup (name,display_name) values (?,?)";
        try{
            await SQLTool.mysqlTool.query(sql,[name,display_name]);
            this.groups.push(name);
        }catch(err){
            logger.error(err);
            throw new Error("Server Error");
        }
    }

    //删除用户组
    async deleteGroup(group_id){
        if (group_id == null){
            return;
        }
        let sql = "delete g,gs,rs from erpgroup g left join grouprelationship gs on g.id = gs.group_id left join functionrelationship rs on g.id = rs.group_id where g.id = ?;"
        try{
            await SQLTool.mysqlTool.query(sql,[group_id]);
        }catch(err){
            logger.error(err);
            throw new Error("Server Error");
        }
    }

    //修改用户组属性
    async modifyGroup({id,name}){
        if (id == null || name == null){
            return;
        }
        let sql = "update erpgroup set name = ? where id = ?";
        try{
            await SQLTool.mysqlTool.query(sql,[id,name]);
        }catch(err){
            logger.error(err);
            throw new Error("Server Error");
        }
    }

    //添加url权限
    async addRole({name,url}){
        if(url == null || name == null){
            return;
        }
        if (this.roles.includes(name)){
            let message = name + ' 已经存在';
            throw new Error(message)
        }
    }

    async allFunction(){
        let sql = "select * from function";
        try{
            let res = await SQLTool.mysqlTool.query(sql);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    //角色组的所有功能
    async functionsForGroup(group_id){
        if (group_id == null){
            logger.error('group id is nil');
            throw new Error('Server error');
        }
        let sql = "SELECT fs.group_id,fs.function_id,f.function_name,f.function_description FROM erpcasbin.functionrelationship as fs left join function f on f.id = fs.function_id where fs.group_id = ?;"
        try{
            let res = await SQLTool.mysqlTool.query(sql,[group_id]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    //用户组添加功能权限
    async groupAddFuntion(group_id,function_id){
        let tmpKey = group_id + "_" + function_id;
        let cached = this.groupFunctionRelation[tmpKey];
        if (cached == true){
            let message = '已经有此权限';
            throw new Error(message)
        }

        let sql = "insert into functionrelationship (group_id,function_id) values (?,?);";
        try{
            await SQLTool.mysqlTool.query(sql, [group_id, function_id]);
            await this.loadRolesGroupRelation();
            return;
        }catch(error){
            logger.error(err);
            throw new Error("Server Error");
        }
    }

    //用户组删除功能权限
    async groupDeleteFunction(group_id,function_id){
        if (group_id == null || function_id == null){
            logger.error('group id or function id is nil');
            throw new Error('Server error');
        }
        let sql = "delete from functionrelationship where group_id = ? and function_id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[group_id,function_id]);
            await this.loadRolesGroupRelation();
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    //查询用户所有的用户组
    async groupsForUser(account_id){
        if (account_id == null || account_id.length == 0){
            return null;
        }
        let sql = "SELECT gs.group_id,g.name,g.group_display_name FROM erpcasbin.grouprelationship as gs left join erpgroup g on g.id = gs.group_id where gs.user_id = ?;";
        try{
            let res = await SQLTool.mysqlTool.query(sql,[account_id]);
            return res;
        }catch(error){
            logger.error(error);
            return null
        }
    }

    //用户添加用户组
    async addGroupRelationship(tmpl){
        if (tmpl == null){
            logger.error('user id or group id is nil');
            throw new Error('Server error');
        }
        if (tmpl.length == 0){
            return;
        }
        let s = '';
        let tmpP = []
        for (let i = 0; i < tmpl.length;i++){
            let item = tmpl[i];
            tmpP.push(item.user_id);
            tmpP.push(item.group_id);
            if (i == 0){
                s = "(?,?)";
            }else{
                s = s+",(?,?)";
            }
        }

        let sql = "insert into grouprelationship (user_id,group_id) values" + s + ";";
        try{
            await SQLTool.mysqlTool.query(sql,tmpP);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    //用户删除用户组
    async deleteGroupRelationship(tmpl){
        if (tmpl == null) {
            logger.error('user id or group id is nil');
            throw new Error('Server error');
        }

        if (tmpl.length == 0){
            return;
        }
        let s = '';
        let tmpP = []
        for (let i = 0; i < tmpl.length; i++) {
            let item = tmpl[i];
            tmpP.push(item.user_id);
            tmpP.push(item.group_id);
            if (i == 0) {
                s = "(?,?)";
            } else {
                s = s + ",(?,?)";
            }
        }
        let sql = "delete from grouprelationship where (user_id, group_id) in (" + s +");";
        try {
            await SQLTool.mysqlTool.query(sql, tmpP);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    //功能删除url
    async deleteRoleRelationship(function_id,role_id){
        if (function_id == null || role_id == null || function_id.length == 0 || role_id.length == 0){
            logger.error('group id or role id is nil');
            throw new Error('Server error');
        }
        let sql = 'delete from rolerelationship where function_id = ? and role_id = ?;';
        try{
            await SQLTool.mysqlTool.query(sql, [function_id,role_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    //功能添加url
    async addRoleRelationship(function_id,role_id){

    }

    //修改功能url权限
    async modifyRoleRelationship({id,function_id,role_id,action}){

    }
    
    //删除url权限
    deleteRole({ role_id }) {

    }
    //修改url权限
    modifyRole({ id, name, url }) {

    }

}
  
const roleChecker = new RoleCheck();

module.exports = {
    roleChecker
}