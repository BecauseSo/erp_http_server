const logger = require('log4js').getLogger("apart");
const Joi = require('@hapi/joi');
const fs = require('fs');
const path = require('path')
const CompanyAndAccountManager = require('../service/CompanyAndAccountManager')

var allCompany = async (ctx,next) => {

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        page: Joi.number().required(),
        order:Joi.object().keys({
            prop:Joi.string(),
            type:Joi.number()
        }).allow(null),
        search:Joi.string().allow(null)
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await CompanyAndAccountManager.cam.allCompany(obj);
    ctx.response.body = res;
}

var addCompany = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        agent: Joi.string().required(),
        company_name: Joi.string().allow(''),
        business_license_image: Joi.string().allow(''),
        ad_connect_name: Joi.string().allow(''),
        ad_connect_email: Joi.string().allow(''),
        time_zone: Joi.string().allow(''),
        BM: Joi.string().allow(''),
        account_status: Joi.number(),
        logout_time: Joi.string().allow(''),
        BMAPI: Joi.string().allow(''),
        company_remark: Joi.string().allow(''),
        fans: Joi.string().allow('')
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.addCompany(obj);
    ctx.response.body = {}
}

var deleteCompany = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.deleteCompany(obj.id);
    ctx.response.body = {};
}

var modifyCompany = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required(),
        agent: Joi.string().required(),
        company_name: Joi.string().allow(''),
        business_license_image: Joi.string().allow(''),
        ad_connect_name: Joi.string().allow(''),
        ad_connect_email: Joi.string().allow(''),
        time_zone: Joi.string().allow(''),
        BM: Joi.string().allow(''),
        account_status: Joi.number(),
        logout_time: Joi.string().allow(''),
        BMAPI: Joi.string().allow(''),
        company_remark: Joi.string().allow(''),
        fans: Joi.string().allow('')
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.modifyCompany(obj);
    ctx.response.body = {};
}

var uploadCompanyLicense = async (ctx,next)=>{
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let currentTime = new Date().getTime();
    let r = file.name.split('.');
    let newFileName = currentTime.toString();
    if (r.length > 0){
        let extent = r[r.length - 1];
        newFileName = newFileName + '.' + extent;
    }
    let url = "http://localhost:8112/license/"+newFileName;
    let filePath = path.join(__dirname, 'public/license') + `/${newFileName}`;
    if (fs.existsSync(filePath)) {
        logger.error(newFileName + ' is exists');
        throw new Error('Server error');
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    ctx.response.body = {url:url};
}

var searchCompany = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        search: Joi.string().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await CompanyAndAccountManager.cam.companySearch(obj.search);
    ctx.response.body = res;

}

var allCompanyAccount = async (ctx,next) =>{
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
    let res = await CompanyAndAccountManager.cam.allCompanyAccount(obj);
    ctx.response.body = res;
}

var allPersonAccount = async (ctx,next)=>{
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
    let res = await CompanyAndAccountManager.cam.allPersonAccount(obj);
    ctx.response.body = res;
}

var addCompanyAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        company_account_id: Joi.string().required(),
        shop_id: Joi.number().allow(null),
        company_id: Joi.number().allow(null),
        isunlock: Joi.string().allow(''),
        status: Joi.number().allow(null),
        companyaccount_remark: Joi.string().allow(''),
        user_id: Joi.number().allow(null)
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.addCompanyAccount(obj);
    ctx.response.body = {};
}

var addPersonAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        person_username: Joi.string().required(),
        person_password: Joi.string().allow(''),
        cookies: Joi.string().allow(''),
        Rdolp: Joi.string().allow(''),
        Rdo_username: Joi.string().allow(''),
        Rdo_password: Joi.string().allow(''),
        Rdo_port: Joi.number(),
        first_login_time: Joi.string().allow(''),
        type: Joi.number().allow(null),
        company_id: Joi.number().allow(null),
        belongto: Joi.number().allow(null),
        person_status: Joi.number().allow(null),
        person_remark: Joi.string().allow(''),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.addPersonAccount(obj);
    ctx.response.body = {};
}

var deleteCompanyAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.deleteCompanyAccount(obj.id);
    ctx.response.body = {};
}

var deletePersonAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required()
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.deletePersonAccount(obj.id);
    ctx.response.body = {};
}

var modifyCompanyAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id:Joi.number().required(),
        company_account_id: Joi.string().required(),
        shop_id: Joi.number().allow(null),
        company_id: Joi.number().allow(null),
        isunlock: Joi.string().allow(''),
        status: Joi.number().allow(null),
        companyaccount_remark: Joi.string().allow(''),
        user_id: Joi.number().allow(null)
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.modifyCompanyAccount(obj);
    ctx.response.body = {};
}

var modifyPersonAccount = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id:Joi.number().required(),
        person_username: Joi.string().required(),
        person_password: Joi.string().allow(''),
        cookies: Joi.string().allow(''),
        Rdolp: Joi.string().allow(''),
        Rdo_username: Joi.string().allow(''),
        Rdo_password: Joi.string().allow(''),
        Rdo_port: Joi.number().allow(null),
        first_login_time: Joi.string().allow(''),
        type: Joi.number().allow(null),
        company_id: Joi.number().allow(null),
        belongto: Joi.number().allow(null),
        person_status: Joi.number().allow(null),
        person_remark: Joi.string().allow(''),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await CompanyAndAccountManager.cam.modifyPersonAccount(obj);
    ctx.response.body = {};
}

var userAllCompanyAccount = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
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
    let res = await CompanyAndAccountManager.cam.userAllCompanyAccount(obj);
    ctx.response.body = res;
}

var userAllPersonAccount = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number().required(),
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
    let res = await CompanyAndAccountManager.cam.userAllPersonAccount(obj);
    ctx.response.body = res;
}


module.exports = {

    "POST /company/all":allCompany,
    "POST /company/add":addCompany,
    "POST /company/delete":deleteCompany,
    "POST /company/modify":modifyCompany,
    "POST /company/license/upload":uploadCompanyLicense,

    "POST /company/search":searchCompany,

    "POST /account/company/all":allCompanyAccount,
    "POST /account/person/all":allPersonAccount,
    "POST /account/company/add":addCompanyAccount,
    "POST /account/person/add":addPersonAccount,
    "POST /account/company/delete":deleteCompanyAccount,
    "POST /account/person/delete":deletePersonAccount,
    "POST /account/company/modify":modifyCompanyAccount,
    "POST /account/person/modify":modifyPersonAccount,

    "POST /user/account/company/all":userAllCompanyAccount,
    "POST /user/account/person/all":userAllPersonAccount,

}