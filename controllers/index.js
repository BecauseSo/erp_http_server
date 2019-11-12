const logger = require('log4js').getLogger("index");
const Joi = require('@hapi/joi');
// var fs = require('fs');

const MySqlTool = require('../tools/MysqlTool')
const RoleTool = require('../tools/Role_tool')
const UserManager = require('../service/UserManager')
const ApartManager = require('../service/ApartmentManager')

var login = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable username or password.");
    }

    let username = obj.email;
    let password = obj.password;
    let sql = 'select * from user where email = ? and password = ? and status = 0';
    try{
        let result = await MySqlTool.mysqlTool.query(sql,[username,password]);
        if (result == null || result.length == 0){
            logger.error("No user with name " + username);
            let err = new Error(username + '不存在或是已被移除');
            err.statusCode = 405;
            throw err
        }
        let userobj = result[0];
        userobj.token = 'user_token';
        ctx.response.body = userobj;
    }catch(err){
        if (err.statusCode == 405){
            throw err;
        }
        logger.error(err);
        throw new Error("Server error");
    }
};

var userInfo = async (ctx,next)=>{
    // let obj = ctx.request.body;
    // let schema = Joi.object().keys({
    //     user_id: Joi.number().required(),
    // });
    // let check = schema.validate(obj);
    // if (check.error) {
    //     logger.error(check.error);
    //     throw new Error("Unavailable username or password.");
    // }
};


var allGroups = async (ctx,next)=>{
    let allgroup = await RoleTool.roleChecker.allGroups()
    ctx.response.body = allgroup;
}

var allRoles = async (ctx,next)=>{
    let allRoles = await RoleTool.roleChecker.allRoles()
    ctx.response.body = allRoles;
}



var addRole = async (ctx,next)=>{
    
   

}

var functionsForGroup = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await RoleTool.roleChecker.functionsForGroup(obj.group_id);
    ctx.response.body = res;
}

var groupAddFunction = async (ctx,next) => {
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_id: Joi.number().required(),
        function_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await RoleTool.roleChecker.groupAddFuntion(obj.group_id,obj.function_id);
    ctx.response.body = {}
}

var groupDeleteFunction = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_id: Joi.number().required(),
        function_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await RoleTool.roleChecker.groupDeleteFunction(obj.group_id, obj.function_id);
    ctx.response.body = {};
}

var addGroup = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_name: Joi.string().required(),
        display_name:Joi.string().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable name.");
    }
    let name = obj.group_name;
    await RoleTool.roleChecker.addGroup(name,obj.display_name);
    ctx.response.body = {};
}

var deleteGroup = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable name.");
    }
    await RoleTool.roleChecker.deleteGroup(obj.group_id);
    ctx.response.body = {};
}

var userForGroup = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        group_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    let result = await RoleTool.roleChecker.allUserForGroup(obj.group_id);
    ctx.response.body = result;
}

var allGroupsForUser = async (ctx,next)=>{

}

var addNewUser= async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        password: Joi.string().required(),
        phone_number: Joi.string().required(),
        email: Joi.string().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable user");
    }
    await UserManager.um.addUser(obj);
    ctx.response.body = {};

}

var deleteUser = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    await UserManager.um.deleteUser(obj.user_id);
    ctx.response.body = {};
}

var allusers = async (ctx,next)=>{
    let res = await UserManager.um.allUsers();
    ctx.response.body = res;
}

var allFunctionForUser = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    let res = await RoleTool.roleChecker.allFunctionForUser(obj.user_id);
    ctx.response.body = res;


}

var groupRelationshipAdd = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        addlist: Joi.array().items(
            Joi.object().keys({
                group_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        ),
        deletelist: Joi.array().items(
            Joi.object().keys({
                group_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        )
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    await RoleTool.roleChecker.addGroupRelationship(obj.addlist);
    await RoleTool.roleChecker.deleteGroupRelationship(obj.deletelist);
    ctx.response.body = {}
}

var groupRelationshipDelete = async (ctx,next)=>{
    
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        list: Joi.array().items(
            Joi.object().keys({
                group_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        )
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    await RoleTool.roleChecker.deleteGroupRelationship(obj.list);
    ctx.response.body = {}
}

var allFunction  = async (ctx,next)=>{
    let res = await RoleTool.roleChecker.allFunction();
    ctx.response.body = res;
}

var modifyUser = async(ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        groupaddlist: Joi.array().items(
            Joi.object().keys({
                group_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        ),
        groupdeletelist: Joi.array().items(
            Joi.object().keys({
                group_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        ),
        apartaddlist: Joi.array().items(
            Joi.object().keys({
                apart_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        ),
        apartdeletelist: Joi.array().items(
            Joi.object().keys({
                apart_id: Joi.number().required(),
                user_id: Joi.number().required(),
            })
        )
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw new Error("Unavailable group.");
    }
    await UserManager.um.modifyUser(obj.id,obj.name,obj.email,obj.phone_number);
    await RoleTool.roleChecker.addGroupRelationship(obj.groupaddlist);
    await RoleTool.roleChecker.deleteGroupRelationship(obj.groupdeletelist);
    await ApartManager.am.apartAddUsers(obj.apartaddlist);
    await ApartManager.am.apartDeleteUsers(obj.apartdeletelist);
    ctx.response.body = {}

}

var searchUser = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        search: Joi.string().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await UserManager.um.searchUser(obj.search);
    ctx.response.body = res;
}

module.exports = {

    'POST /user/login':login,//用户登录
    'POST /user/info':userInfo,//获取用户信息

    'POST /user/group/all': allGroupsForUser,//用户的所有角色组
    'POST /user/add': addNewUser,//添加新用户
    'POST /user/delete':deleteUser,//删除用户
    'POST /user/all': allusers,//所有用户
    'POST /user/function/all':allFunctionForUser,//用户的功能权限
    'POST /user/modify':modifyUser,
    'POST /user/search':searchUser,

    'POST /role/add':addRole,//

    'POST /group/all':allGroups,//所有角色组
    'POST /group/add':addGroup,//添加角色组
    'POST /group/delete':deleteGroup,//删除用户组
    'POST /group/users': userForGroup,//角色组中的所有用户

    'POST /group/function/all': functionsForGroup,//角色组的所有权限
    'POST /group/function/add': groupAddFunction,//角色组添加功能权限
    'POST /group/function/delete':groupDeleteFunction,//角色组删除功能权限
    
    'POST /group/relationship/add': groupRelationshipAdd,//用户添加到角色组
    'POST /group/relationship/delete': groupRelationshipDelete,//用户从用户组删除

    'POST /function/all':allFunction//所有功能

}