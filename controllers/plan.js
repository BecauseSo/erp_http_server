const logger = require('log4js').getLogger("sku");
const Joi = require('@hapi/joi');
const fs = require('fs');
const path = require('path')

const PlanManager = require('../service/PlanManager')

var addPlan = async (ctx,next)=>{
    let obj = ctx.request.body;
    let schema = Joi.object().keys({
        sku_id: Joi.number().required(),
        sales_7_days: Joi.number(),
        sales_1_day: Joi.number(),
        add_count: Joi.number(),
        prepare_days: Joi.number(),
        operation_remark:Joi.string(),
        apply_user_id:Joi.number(),
        apply_time:Joi.string(),
    });
    let check = schema.validate(obj);
    if (check.error) {
        logger.error(check.error);
        throw check.error;
    }
}

var modifyPlan = async (ctx,next) => {

}

var planInReviewing = async (ctx,next) => {

}

var planReviewed = async (ctx,next) => {

}

var planRejected = async (ctx,next) => {

}


module.exports = {

    "POST /plan/review/add":addPlan,
    "POST /plan/modify":modifyPlan,

    "POST /plan/reviewing":planInReviewing,
    "POST /plan/reviewd":planReviewed,
    "POST /plan/reject":planRejected,
}


