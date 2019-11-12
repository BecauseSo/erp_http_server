const SQLTool = require('../tools/MysqlTool')
const logger = require('log4js').getLogger("ShopManager");

const PageSize = 10;

class ShopManager{
    constructor(){

    }
    
    async allShops(params){
        if (params == null) {
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null) {
            if (order.type == 0) {
                type_str = ' DESC';
            } else {
                type_str = ' ASC';
            }
            order_str = 'order by ' + order.prop;
        } else {
            type_str = ' desc';
            order_str = ' order by id ';
        }

        let sql = "select s.*,ca.user_id from shop s left join companyaccount ca on ca.shop_id = s.id " + order_str + type_str + " limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM shop;"
        try{
            let result = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select s.*,ca.user_id from shop s left join companyaccount ca on ca.shop_id = s.id where s.domain like ? or s.company_id like ? or s.shop_remark like ?" + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM shop where domain like ? or company_id like ? or shop_remark like ?;"
                let s = '%' + searchStr + '%';
                result = await SQLTool.mysqlTool.query(sql, [s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[s,s,s]);
            }else{
                result = await SQLTool.mysqlTool.query(sql, [(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let return_res = {
                current_page:page,
                total_page: Math.ceil(totalCount / PageSize),
                res:result
            }
            
            return return_res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addShop(shop){
        if (shop == null){
            logger.error('shop is nil');
            throw new Error('Server error');
        }
        /*
  id
domain
backstage
backstage_username
backstage_password
email_password
receipt_paypal
receipt_credit_card
deduction
customer_service_email
shop_api
authorization_erp
company_id
shop_remark

        */
        let sql = "insert into shop (domain,backstage,backstage_username,backstage_password,email_password,receipt_paypal,receipt_credit_card,deduction,customer_service_email,shop_api,authorization_erp,company_id,shop_remark) values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        try{
            await SQLTool.mysqlTool.query(sql, [shop.domain, shop.backstage, shop.backstage_username, shop.backstage_password, shop.email_password, shop.receipt_paypal, shop.receipt_credit_card, shop.deduction, shop.customer_service_email, shop.shop_api, shop.authorization_erp, shop.company_id, shop.shop_remark]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    async deleteShop(shop_id){
        if (shop_id == null){
            logger.error('shop id is nil');
            throw new Error('Server error');
        }
        let sql = "delete from shop where id = ?";
        try{
            await SQLTool.mysqlTool.query(sql,[shop_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async modifyShop(shop){
        if (shop == null){
            logger.error('shop is nil');
            throw new Error('Server error');
        }
        if (shop.id == null){
            logger.error('shop id is null');
            throw new Error('Server error');
        }
        let sql = "update shop set domain=?,backstage=?,backstage_username=?,backstage_password=?,email_password=?,receipt_paypal=?,receipt_credit_card=?,deduction=?,customer_service_email=?,shop_api=?,authorization_erp=?,company_id=?,shop_remark=? where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[shop.domain,shop.backstage,shop.backstage_username,shop.backstage_password,shop.email_password,shop.receipt_paypal,shop.receipt_credit_card,shop.deduction,shop.customer_service_email,shop.shop_api,shop.authorization_erp,shop.company_id,shop.shop_remark,shop.id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async shopsForUser(params){
        if (params == null){
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let user_id = params.user_id;

        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null) {
            if (order.type == 0) {
                type_str = ' DESC';
            } else {
                type_str = ' ASC';
            }
            order_str = 'order by ' + order.prop;
        } else {
            type_str = ' desc';
            order_str = ' order by id ';
        }

        let sql = "SELECT s.* FROM companyaccount ca left join shop s on ca.shop_id = s.id where ca.user_id = ? "+ order_str + type_str + " limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM companyaccount ca left join shop s on ca.shop_id = s.id where ca.user_id = ?;"

        try{
            let result = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "SELECT s.* FROM companyaccount ca left join shop s on ca.shop_id = s.id where ca.user_id = ? and (s.domain like ? or s.company_id like ? or s.shop_remark like ?)" + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM companyaccount ca left join shop s on ca.shop_id = s.id where ca.user_id = ? and (s.domain like ? or s.company_id like ? or s.shop_remark like ?);";
                let s = '%' + searchStr + '%';
                result = await SQLTool.mysqlTool.query(sql, [user_id, s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[user_id,s,s,s]);
            }else{
                result = await SQLTool.mysqlTool.query(sql, [user_id, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[user_id]);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let res = {
                current_page:page,
                total_page: Math.ceil(totalCount / PageSize),
                res:result
            }
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async searchShop(searchStr){
        if (searchStr == null || searchStr.length == 0){
            return []
        }
        searchStr = searchStr.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        let sql = ["select * from shop where domain like ","'%",searchStr,"%';"].join("");
        try{
            let res = await SQLTool.mysqlTool.query(sql,[searchStr]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }


}

const sm = new ShopManager();

module.exports = {
    sm
}