const logger = require('log4js').getLogger("apart");
const Joi = require('@hapi/joi');
// var fs = require('fs');

const MySqlTool = require('../tools/MysqlTool')
const RoleTool = require('../tools/Role_tool')
const UserManager = require('../service/UserManager')
const ApartManager = require('../service/ApartmentManager')

var getAllApart = async (ctx,next)=>{
    let res = await ApartManager.am.getAllApart();
    ctx.response.body = res;
}

var addApart = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        parent_id: Joi.number().required(),
        name: Joi.string().required(),
        des: Joi.string().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ApartManager.am.addApart(obj.name,obj.parent_id,obj.des);
    ctx.response.body = {};
}

var deleteApart = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        list: Joi.array().items(
            Joi.object().keys({
                id: Joi.number().required()
            })
        )
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ApartManager.am.deleteApart(obj.list)
    ctx.response.body = {};
}

var apartAddUser = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
        apart_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ApartManager.am.apartAddUser(obj.apart_id,obj.user_id);
    ctx.response.body = {};
}

var apartDeleteUser = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
        apart_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ApartManager.am.apartDeleteUser(obj.apart_id, obj.user_id);
    ctx.response.body = {};
}


module.exports = {

    'POST /apart/all':getAllApart,//获取所有部门数据
    'POST /apart/add':addApart,//添加部门
    'POST /apart/delete':deleteApart,//移除部门

    'POST /apart/adduser':apartAddUser,//添加员工到部门
    'POST /apart/deleteuser':apartDeleteUser//部门删除员工

}