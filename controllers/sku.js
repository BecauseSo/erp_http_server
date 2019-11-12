const logger = require('log4js').getLogger("sku");
const Joi = require('@hapi/joi');
const fs = require('fs');
const path = require('path')

const SKUManager = require('../service/SKUManager')

var addSkuApply = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        SPU_id:Joi.number().required(),
        SPU_apply_id:Joi.number().required(),
        SKU_code: Joi.string(),
        specification: Joi.string(),
        image: Joi.string(),
        buy_price: Joi.number(),
        product_size:Joi.string(),
        weight: Joi.number(),
        purchasing_cycle: Joi.number(),
        sensitive_information: Joi.string(),
        SKU_remark: Joi.string(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.addSKUApply(obj);
    ctx.response.body = {}
}

var addSPUApply = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        SPU_code: Joi.string(),
        product_name: Joi.string(),
        product_image: Joi.string(),
        video_link: Joi.string(),
        sales: Joi.number(),
        product_link: Joi.string(),
        is_fake: Joi.number(),
        has_battery: Joi.number(),
        is_infringement: Joi.number(),
        has_magnetism: Joi.number(),
        is_liquid: Joi.number(),
        is_powder: Joi.number(),
        area: Joi.string(),
        need_custom_made: Joi.number(),
        individual_package: Joi.number(),
        is_in_stock: Joi.number(),
        start_values: Joi.number(),
        language: Joi.string(),
        freight: Joi.number(),
        plug_type: Joi.string(),
        voltage: Joi.string(),
        create_user_id: Joi.number().required(),
        create_time: Joi.string(),
        SPU_remark: Joi.string(),
        sku_list:Joi.array().allow([])
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.addSPUApply(obj);
    ctx.response.body = {};
}

var modifySPUApply = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        spu_id: Joi.number().required(),
        SPU_code: Joi.string(),
        product_name: Joi.string(),
        product_image: Joi.string(),
        video_link: Joi.string(),
        sales: Joi.number().allow(null),
        product_link: Joi.string().allow(null),
        is_fake: Joi.number().allow(null),
        has_battery: Joi.number().allow(null),
        is_infringement: Joi.number().allow(null),
        has_magnetism: Joi.number().allow(null),
        is_liquid: Joi.number().allow(null),
        is_powder: Joi.number().allow(null),
        area: Joi.string().allow(null),
        need_custom_made: Joi.number().allow(null),
        individual_package: Joi.number().allow(null),
        is_in_stock: Joi.number().allow(null),
        start_values: Joi.number().allow(null),
        language: Joi.string().allow(null),
        freight: Joi.number().allow(null),
        plug_type: Joi.string().allow(null),
        voltage: Joi.string().allow(null),
        create_user_id: Joi.number().allow(null),
        create_time: Joi.string().allow(null),
        SPU_remark: Joi.string().allow(null),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.userModifySPUApply(obj);
    ctx.response.body = {};
}

var modifySkuApply = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        SKU_id: Joi.number().required(),
        SKU_apply_id: Joi.number().required(),
        SPU_id: Joi.number().required(),
        SPU_apply_id: Joi.number().required(),
        SKU_code: Joi.string().required(),
        specification: Joi.string(),
        image: Joi.string().allow(null),
        buy_price: Joi.number(),
        product_size: Joi.string(),
        weight: Joi.number(),
        purchasing_cycle: Joi.number(),
        sensitive_information: Joi.string(),
        SKU_remark: Joi.string(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.modifySkuApply(obj);
    ctx.response.body = {};
}

var managerModifySKUApply = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        SKU_id: Joi.number().required(),
        // SKU_apply_status: Joi.number().required(),
        SKU_apply_id: Joi.number().required(),
        SPU_id: Joi.number().required(),
        SPU_apply_id: Joi.number().required(),
        SKU_code: Joi.string().required(),
        specification: Joi.string(),
        image: Joi.string().allow(null),
        buy_price: Joi.number(),
        product_size: Joi.string(),
        weight: Joi.number(),
        purchasing_cycle: Joi.number(),
        sensitive_information: Joi.string(),
        SKU_remark: Joi.string(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.modifySkuApply(obj);
    ctx.response.body = {};
}

var managerModifySPUApply = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        apply_status: Joi.number().required(),
        SPU_apply_id: Joi.number().required(),
        SPU_id: Joi.number().required(),
        SPU_code: Joi.string().allow(null),
        product_name: Joi.string().allow(null),
        product_image: Joi.string().allow(null),
        video_link: Joi.string().allow(null),
        sales: Joi.number().allow(null),
        product_link: Joi.string().allow(null),
        is_fake: Joi.number().allow(null),
        has_battery: Joi.number().allow(null),
        is_infringement: Joi.number().allow(null),
        has_magnetism: Joi.number().allow(null),
        is_liquid: Joi.number().allow(null),
        is_powder: Joi.number().allow(null),
        area: Joi.string().allow(null),
        need_custom_made: Joi.number().allow(null),
        individual_package: Joi.number().allow(null),
        is_in_stock: Joi.number().allow(null),
        start_values: Joi.number().allow(null),
        language: Joi.string().allow(null),
        freight: Joi.number().allow(null),
        plug_type: Joi.string().allow(null),
        voltage: Joi.string().allow(null),
        create_user_id: Joi.number().allow(null),
        create_time: Joi.string().allow(null),
        SPU_remark: Joi.string().allow(null),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.managerModifySPUApply(obj);
    ctx.response.body = {};
}

var deleteSKUFromTotal = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.deleteSKUFromTotal(obj.id);
    ctx.response.body = {};
}

var deleteSPUFromTotal = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    await SKUManager.skum.deleteSPUFromTotal(obj.id);
    ctx.response.body = {};
}

var modifySKUTotal = async (ctx,next)=>{

}

var uploadSKUProductImage = async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let currentTime = new Date().getTime();
    let r = file.name.split('.');
    let newFileName = currentTime.toString();
    if (r.length > 0) {
        let extent = r[r.length - 1];
        newFileName = newFileName + '.' + extent;
    }
    let url = "http://localhost:8112/spu/product/image/" + newFileName;
    let filePath = path.join(__dirname, 'public/spu/product/image') + `/${newFileName}`;
    if (fs.existsSync(filePath)) {
        logger.error(newFileName + ' is exists');
        throw new Error('Server error');
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);

    ctx.response.body = { url: url };
}

var allSKU = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        page: Joi.number(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let page = obj.page == null ? 0 : obj.page;
    let res = await SKUManager.skum.skuItemsWithPage(page);
    ctx.response.body = res;
}

var allApplySKU = async (ctx,next) =>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        page: Joi.number(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let page = obj.page == null ? 0 : obj.page;
    let res = await SKUManager.skum.applySKUItemsWithPage(page);
    ctx.response.body = res;
}

var allSKUOfSPU = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        spu_id: Joi.number().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await SKUManager.skum.skuForSPU(obj.spu_id);
    ctx.response.body = res;

}

var userAllSKU = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await SKUManager.skum.SKUForUser(obj.user_id);
    ctx.response.body = res;

}

var userSearchApplySKU = async (ctx,next)=>{

    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        user_id: Joi.number(),
        search:Joi.string(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await SKUManager.skum.userSearchApplySKU(obj.user_id,obj.search);
    ctx.response.body = res;

}

var allSKUSales = async (ctx,next)=>{

}

var allSPUSales = async (ctx,next)=>{

}

var userSearchSKU = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        search: Joi.string().required(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
    let res = await SKUManager.skum.userSearchSKU(obj.search);
    ctx.response.body = res;
}

module.exports = {

    "POST /sku/apply/add":addSkuApply,//添加sku申请
    "POST /spu/apply/add":addSPUApply,//添加spu申请
    "POST /sku/apply/user/modify":modifySkuApply,//员工修改sku申请
    "POST /spu/apply/user/modify":modifySPUApply,//员工修改spu申请

    "POST /sku/apply/manager/modify": managerModifySKUApply,//管理员修改sku申请
    "POST /spu/apply/manager/modify": managerModifySPUApply,//管理员修改spu申请

    "POST /sku/total/delete":deleteSKUFromTotal,//删除sku(from total table)
    "POST /spu/total/delete": deleteSPUFromTotal,
    "POST /sku/product/image/upload":uploadSKUProductImage,

    "POST /sku/manager/all":allSKU,
    "POST /sku/manager/allapply":allApplySKU,

    "POST /spu/sku/all":allSKUOfSPU,
    "POST /sku/user/all":userAllSKU,
    "POST /spu/user/apply/search":userSearchApplySKU,

    "POST /sku/sale/all":allSKUSales,
    "POST /spu/sale/all":allSPUSales,

    "POST /sku/search":userSearchSKU,

}