const SQLTool = require('../tools/MysqlTool')
const logger = require('log4js').getLogger("CompanyAndAccountManager");

const PageSize = 10;

class CompanyAndAccountManager{

    constructor(){

    }

    async allCompany(params){

        if (params == null){
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null){
            if (order.prop == 'account_count'){

            } else if (order.prop == "unlimit_count"){

            }else{
                if (order.type == 0) {
                    type_str = ' DESC';
                } else {
                    type_str = ' ASC';
                }
                order_str = 'order by ' + order.prop;
            }
        }else{
            type_str = ' desc';
            order_str = ' order by id ';
        }
        
        let sql = "select * from company "+order_str + type_str + "  limit ?,?;";
        let all_sql = 'SELECT COUNT(*) FROM company;';
        
        try{
            let res = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select * from company where company_name like ? or agent like ? " + order_str + type_str + " limit ?,?;";
                all_sql = 'SELECT COUNT(*) FROM company where company_name like ? or agent like ?;';
                let s = '%' + searchStr + '%';
                res = await SQLTool.mysqlTool.query(sql, [s, s, (page - 1) * PageSize, PageSize])
                totalCount = await SQLTool.mysqlTool.query(all_sql,[s,s]);
            }else{
                res = await SQLTool.mysqlTool.query(sql, [(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql);
            }
            
            totalCount = totalCount[0]['COUNT(*)'];
            // res.total_page = 
            // res.current_page = page;

            let return_res = {
                total_page: Math.ceil(totalCount / PageSize) ,
                current_page: page,
                res:res
            }

            let l = res.length;

            for (let i = 0;i<l;i++){
                let company_id = res[i].id;
                let company_account = await this.companyAccountForCompany(company_id); 
                let unlimit_count = 0;
                company_account.forEach(element => {
                    if (element.isunlock == '是'){
                        unlimit_count++;
                    }
                });
                res[i]['account_count'] = company_account.length;
                res[i]['unlimit_count'] = unlimit_count;
                let user_id = res[i].belong_to;
                let userInfo = await this.userInfoWithId(user_id);
                res[i]['belong_to'] = userInfo;
            }
            if (order == null){
                return return_res;
            }
            if (order.prop == 'account_count') {
                res.sort(function(a,b){
                    if (order.type == 0){
                        return b.account_count - a.account_count;
                    }
                    return a.account_count - b.account_count;
                });
            }
            if (order.prop == "unlimit_count") {
                res.sort(function (a, b) {
                    if (order.type == 0) {
                        return b.unlimit_count - a.unlimit_count;
                    }
                    return a.unlimit_count - b.unlimit_count;
                });
            }
            return return_res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userInfoWithId(user_id){
        if (user_id == null){
            return null;
        }
        let sql = 'select * from user where id = ?;';
        try {
            let res = await SQLTool.mysqlTool.query(sql, [user_id]);
            if (res.length > 0){
                return res[0];    
            }
            return null;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async companyAccountForCompany(company_id){
        if (company_id == null){
            return [];
        }
        let sql = 'select * from companyaccount where company_id = ?;'
        try{
            let res = await SQLTool.mysqlTool.query(sql,[company_id]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async personAccountForCompany(company_id){
        if (company_id == null) {
            return [];
        }
        let sql = 'select * from personaccount where company_id = ?;'
        try {
            let res = await SQLTool.mysqlTool.query(sql, [company_id]);
            return res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addCompany(company){
        if (company == null){
            logger.error('company is nil');
            throw new Error("Server error");
        }
        let sql = "insert into company (agent,company_name,business_license_image,ad_connect_name,ad_connect_email,time_zone,BM,account_status,logout_time,BMAPI,company_remark,fanslink) values (?,?,?,?,?,?,?,?,?,?,?,?);";
        try{

            await SQLTool.mysqlTool.query(sql,[company.agent,company.company_name,company.business_license_image,company.ad_connect_name,company.ad_connect_email,company.time_zone,company.BM,company.account_status,company.logout_time,company.BMAPI,company.company_remark,company.fans]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deleteCompany(company_id){
        if(company_id == null){
            logger.error('company is nil');
            throw new Error('Server error');
        }
        //删除与company关联的personaccount
        //删除与company关联的companyaccount
        //删除与company关联的shop
        //删除company
        let sql = "delete from company where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[company_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async modifyCompany(company){
        if (company == null){
            logger.error('company is nil');
            throw new Error('Server error');
        }
        if (company.id == null){
            logger.error('company id is nil');
            throw new Error('Server error');
        }
        let sql = "update company set agent=?,company_name=?,business_license_image=?,ad_connect_name=?,ad_connect_email=?,time_zone=?,BM=?,account_status=?,logout_time=?,BMAPI=?,company_remark=?,fanslink=? where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql, [company.agent, company.company_name, company.business_license_image,company.ad_connect_name, company.ad_connect_email, company.time_zone, company.BM, company.account_status, company.logout_time, company.BMAPI, company.company_remark, company.fans,company.id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async companySearch(searchStr){
        if (searchStr==null|| searchStr.length == 0){
            return [];
        }
        searchStr = searchStr.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        let sql = "select * from company where company_name like ?;";
        try{
            let s = '%'+searchStr+'%';
            let res = await SQLTool.mysqlTool.query(sql,[s]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async allCompanyAccount(params){
        if (params == null) {
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null) {
            if (order.prop == 'account_count') {

            } else if (order.prop == "unlimit_count") {

            } else {
                if (order.type == 0) {
                    type_str = ' DESC';
                } else {
                    type_str = ' ASC';
                }
                order_str = 'order by ' + order.prop;
            }
        } else {
            type_str = ' desc';
            order_str = ' order by ca.id ';
        }
        let sql = "select c.*,s.*,ca.* from companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id " + order_str + type_str +" limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id";

        try{
            let res = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select c.*,s.*,ca.* from companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where c.company_name like ? or s.domain like ? or ca.companyaccount_remark like ? " + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where c.company_name like ? or s.domain like ? or ca.companyaccount_remark like ?;";
                let s = '%' + searchStr + '%';
                res = await SQLTool.mysqlTool.query(sql, [s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[s,s,s]);
            }else{
                res = await SQLTool.mysqlTool.query(sql, [(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let return_res = {
                current_page:page,
                total_page: Math.ceil(totalCount / PageSize),
                res:res
            }
            return return_res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }

    }

    async allPersonAccount(params){
        if (params == null) {
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null) {
            if (order.prop == 'account_count') {

            } else if (order.prop == "unlimit_count") {

            } else {
                if (order.type == 0) {
                    type_str = ' DESC';
                } else {
                    type_str = ' ASC';
                }
                order_str = 'order by ' + order.prop;
            }
        } else {
            type_str = ' desc';
            order_str = ' order by pa.id ';
        }
        let sql = "select c.*,pa.* from personaccount pa left join company c on pa.company_id = c.id "+ order_str+type_str+" limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM personaccount pa left join company c on pa.company_id = c.id;"

        try {
            let res = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select c.*,pa.* from personaccount pa left join company c on pa.company_id = c.id where pa.person_username like ? or pa.Rdolp like ? or pa.Rdo_username like ? or c.company_name like ? " + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM personaccount pa left join company c on pa.company_id = c.id where pa.person_username like ? or pa.Rdolp like ? or pa.Rdo_username like ? or c.company_name like ?;"
                let s = '%' + searchStr + '%';
                res = await SQLTool.mysqlTool.query(sql, [s, s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[s,s,s,s]);
            }else{
                res = await SQLTool.mysqlTool.query(sql, [(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let return_res = {
                current_page:page,
                total_page: Math.ceil(totalCount / PageSize),
                res:res
            }
            return return_res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addCompanyAccount(companyAccount){
        if (companyAccount == null){
            logger.error('company account is nil');
            throw new Error('Server error');
        }
        let sql = "insert into companyaccount (company_account_id,shop_id,company_id,isunlock,status,companyaccount_remark,user_id) values (?,?,?,?,?,?,?);";
        try{
            await SQLTool.mysqlTool.query(sql, [companyAccount.company_account_id, companyAccount.shop_id, companyAccount.company_id, companyAccount.isunlock, companyAccount.status, companyAccount.companyaccount_remark,companyAccount.user_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addPersonAccount(personAccount){
        if (personAccount == null) {
            logger.error('person account is nil');
            throw new Error('Server error');
        }
        let sql = "insert into personaccount (person_username,person_password,cookies,Rdolp,Rdo_username,Rdo_password,Rdo_port,first_login_time,type,company_id,belongto,person_status,person_remark) values (?,?,?,?,?,?,?,?,?,?,?,?,?);";
        try{
            await SQLTool.mysqlTool.query(sql, [personAccount.person_username, personAccount.person_password, personAccount.cookies, personAccount.Rdolp, personAccount.Rdo_username, personAccount.Rdo_password, personAccount.Rdo_port, personAccount.first_login_time, personAccount.type, personAccount.company_id, personAccount.belongto, personAccount.person_status, personAccount.person_remark]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deleteCompanyAccount(company_account_id){
        if (company_account_id == null || company_account_id.length == 0){
            logger.error('company_account_id is nil');
            throw new Error('Server error');
        }
        let sql = "delete from companyaccount where id =?;";
        try{
            await SQLTool.mysqlTool.query(sql,[company_account_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deletePersonAccount(person_account_id){
        if (person_account_id == null || person_account_id.length == 0) {
            logger.error('company_account_id is nil');
            throw new Error('Server error');
        }
        let sql = "delete from personaccount where id =?;";
        try {
            await SQLTool.mysqlTool.query(sql, [person_account_id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async modifyCompanyAccount(companyAccount){
        if (companyAccount == null){
            logger.error('company account is nil');
            throw new Error('Server error');
        }
        let sql = "update companyaccount set company_account_id=?,shop_id=?,company_id=?,isunlock=?,status=?,companyaccount_remark=?,user_id=? where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[companyAccount.company_account_id,companyAccount.shop_id,companyAccount.company_id,companyAccount.isunlock,companyAccount.status,companyAccount.companyaccount_remark,companyAccount.user_id,companyAccount.id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async modifyPersonAccount(personAccount){
        if (personAccount == null) {
            logger.error('person account is nil');
            throw new Error('Server error');
        }
        let sql = "update personaccount set person_username=?,person_password=?,cookies=?,Rdolp=?,Rdo_username=?,Rdo_password=?,Rdo_port=?,first_login_time=?,type=?,company_id=?,belongto=?,person_status=?,person_remark=? where id = ?";
        try {
            await SQLTool.mysqlTool.query(sql, [personAccount.person_username, personAccount.person_password, personAccount.cookies, personAccount.Rdolp, personAccount.Rdo_username, personAccount.Rdo_password, personAccount.Rdo_port, personAccount.first_login_time, personAccount.type, personAccount.company_id, personAccount.belongto, personAccount.person_status, personAccount.person_remark,personAccount.id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userAllCompanyAccount(params){
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
            if (order.prop == 'account_count') {

            } else if (order.prop == "unlimit_count") {

            } else {
                if (order.type == 0) {
                    type_str = ' DESC';
                } else {
                    type_str = ' ASC';
                }
                order_str = 'order by ' + order.prop;
            }
        } else {
            type_str = ' desc';
            order_str = ' order by ca.id ';
        }

        let sql = "select c.*,s.*,ca.* from companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where ca.user_id = ? " + order_str + type_str + " limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where ca.user_id = ? ";

        try {
            let res = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select c.*,s.*,ca.* from companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where ca.user_id = ? and ( c.company_name like ? or s.domain like ? or ca.companyaccount_remark like ?) " + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM companyaccount ca left join company c on ca.company_id = c.id left join shop s on ca.shop_id = s.id where ca.user_id = ? and ( c.company_name like ? or s.domain like ? or ca.companyaccount_remark like ?);";
                let s = '%' + searchStr + '%';
                res = await SQLTool.mysqlTool.query(sql, [user_id,s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql, [user_id,s, s, s]);
            } else {
                res = await SQLTool.mysqlTool.query(sql, [user_id,(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql,[user_id]);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let return_res = {
                current_page: page,
                total_page: Math.ceil(totalCount / PageSize),
                res: res
            }
            return return_res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userAllPersonAccount(params){
        // if (user_id == null || user_id.length == 0) {
        //     logger.error('user id is nil');
        //     throw new Error('Server error');
        // }
        // let sql = "select * from personaccount where belongto = ?;";
        // try {
        //     let res = await SQLTool.mysqlTool.query(sql, [user_id]);
        //     return res;
        // } catch (error) {
        //     logger.error(error);
        //     throw new Error('Server error');
        // }

        if (params == null) {
            logger.error('params is nil');
            throw new Error('Server error');
        }
        let user_id = params.user_id;
        let page = params.page;
        let order = params.order;
        let type_str = ''
        let order_str = ''
        if (order != null) {
            if (order.prop == 'account_count') {

            } else if (order.prop == "unlimit_count") {

            } else {
                if (order.type == 0) {
                    type_str = ' DESC';
                } else {
                    type_str = ' ASC';
                }
                order_str = 'order by ' + order.prop;
            }
        } else {
            type_str = ' desc';
            order_str = ' order by pa.id ';
        }
        let sql = "select c.*,pa.* from personaccount pa left join company c on pa.company_id = c.id where pa.belongto = ? " + order_str + type_str + " limit ?,?;";
        let all_sql = "SELECT COUNT(*) FROM personaccount pa left join company c on pa.company_id = c.id where pa.belongto = ?;"

        try {
            let res = [];
            let totalCount = 0;
            if (params.search != null && params.search.length > 0) {
                let searchStr = params.search.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
                sql = "select c.*,pa.* from personaccount pa left join company c on pa.company_id = c.id where pa.belongto = ? and (pa.person_username like ? or pa.Rdolp like ? or pa.Rdo_username like ? or c.company_name like ?) " + order_str + type_str + " limit ?,?;";
                all_sql = "SELECT COUNT(*) FROM personaccount pa left join company c on pa.company_id = c.id where pa.belongto = ? and (pa.person_username like ? or pa.Rdolp like ? or pa.Rdo_username like ? or c.company_name like ?);"
                let s = '%' + searchStr + '%';
                res = await SQLTool.mysqlTool.query(sql, [user_id,s, s, s, s, (page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql, [user_id,s, s, s, s]);
            } else {
                res = await SQLTool.mysqlTool.query(sql, [user_id,(page - 1) * PageSize, PageSize]);
                totalCount = await SQLTool.mysqlTool.query(all_sql, [user_id]);
            }
            totalCount = totalCount[0]['COUNT(*)'];
            let return_res = {
                current_page: page,
                total_page: Math.ceil(totalCount / PageSize),
                res: res
            }
            return return_res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }

    }

}

const cam = new CompanyAndAccountManager();

module.exports = {
    cam
}
