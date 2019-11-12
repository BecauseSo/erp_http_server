const logger = require('log4js').getLogger("index");
const Joi = require('@hapi/joi');
// var fs = require('fs');

const ShopManager = require('../service/ShopManager')

var allShop = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        page: Joi.number().required(),
        order: Joi.object().keys({
            prop: Joi.string(),
            type: Joi.number()
        }).allow(null),
        search: Joi.string().allow(null)
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    
    let res = await ShopManager.sm.allShops(obj);
    ctx.response.body = res;

}

var addShop = async (ctx,next) => {
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        domain: Joi.string().required(),
        backstage: Joi.string().allow(''),
        backstage_username: Joi.string().allow(''),
        backstage_password: Joi.string().allow(''),
        email_password: Joi.string().allow(''),
        receipt_paypal: Joi.string().allow(''),
        receipt_credit_card: Joi.string().allow(''),
        deduction: Joi.string().allow(''),
        customer_service_email: Joi.string().allow(''),
        shop_api: Joi.string().allow(''),
        company_id: Joi.number().allow(null),
        shop_remark: Joi.string().allow(''),
        authorization_erp: Joi.string().allow('')
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ShopManager.sm.addShop(obj);
    ctx.response.body = {};
}

var deleteShop = async (ctx,next) => {
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        shop_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ShopManager.sm.deleteShop(obj.shop_id);
    ctx.response.body = {};
}

var modifyShop = async (ctx,next) => {
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required(),
        domain: Joi.string().required(),
        backstage: Joi.string().allow(''),
        backstage_username: Joi.string().allow(''),
        backstage_password: Joi.string().allow(''),
        email_password: Joi.string().allow(''),
        receipt_paypal: Joi.string().allow(''),
        receipt_credit_card: Joi.string().allow(''),
        deduction: Joi.string().allow(''),
        customer_service_email: Joi.string().allow(''),
        shop_api: Joi.string().allow(''),
        company_id: Joi.number().allow(null),
        shop_remark: Joi.string().allow(''),
        authorization_erp: Joi.string().allow('')
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await ShopManager.sm.modifyShop(obj)
    ctx.response.body = {};
}

var userAllShop = async (ctx,next) => {
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().allow(null),
        page: Joi.number().required(),
        order: Joi.object().keys({
            prop: Joi.string(),
            type: Joi.number()
        }).allow(null),
        search: Joi.string().allow(null)
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await ShopManager.sm.shopsForUser(obj)
    ctx.response.body = res;
}

var searchShop = async(ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        search: Joi.string().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await ShopManager.sm.searchShop(obj.search);
    ctx.response.body = res;
}


module.exports = {

    "POST /shop/all":allShop,
    "POST /shop/add":addShop,
    "POST /shop/modify":modifyShop,
    "POST /shop/delete":deleteShop,

    "POST /shop/search": searchShop,
    
    "POST /user/shop/all":userAllShop,


}