const SQLTool = require('../tools/MysqlTool')
const logger = require('log4js').getLogger("SKUManager");

PageSize = 10;

class SKUManager{

    constructor(){

    }

    async skuItemsWithPage(page){
        if (page == null){
            page = 0;
        }
        let sql = "select * from SPUTotal sput left join SPUApply spua on sput.id = spua.SPU_total_id;";
        try{
            let res = await SQLTool.mysqlTool.query(sql);
            let l = res.length;
            for (let i = 0; i < l; i++) {
                let spu_item = res[i];
                let sku_list = await this.skuForSPU(spu_item.id);
                spu_item['sku_list'] = sku_list;
            }
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async applySKUItemsWithPage(page){
        if (page == null) {
            page = 0;
        }
        let sql = "select * from SPUTotal sput left join SPUApply spua on sput.id = spua.SPU_total_id where spua.apply_status = 1;"
        try{
            let res = await SQLTool.mysqlTool.query(sql);
            let l = res.length;
            for (let i = 0; i < l; i++) {
                let spu_item = res[i];
                let sku_list = await this.skuForSPU(spu_item.id);
                spu_item['sku_list'] = sku_list;
            }
            return res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addSPUApply(spu){
        if (spu == null) {
            ogger.error("spu is nil");
            throw new Error('Server error');
        }
        let sql = "insert into SPUTotal (SPU_code,product_name,product_image,video_link,sales,product_link,is_fake,has_battery,is_infringement,has_magnetism,is_liquid,is_powder,area,need_custom_made,individual_package,is_in_stock,start_values,language,freight,plug_type,voltage,create_user_id,create_time,SPU_remark) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        try {
            let res = await SQLTool.mysqlTool.query(sql, [spu.SPU_code, spu.product_name, spu.product_image, spu.video_link, spu.sales, spu.product_link, spu.is_fake, spu.has_battery, spu.is_infringement, spu.has_magnetism, spu.is_liquid, spu.is_powder, spu.area, spu.need_custom_made, spu.individual_package, spu.is_in_stock, spu.start_values, spu.language, spu.freight, spu.plug_type, spu.voltage, spu.create_user_id, spu.create_time, spu.SPU_remark]);
            //add to spu apply
            let spu_id = res.insertId;
            let apply_sql = "insert into SPUApply (SPU_total_id,apply_user_id,apply_time,apply_status) values (?,?,?,?);";
            let apply_res = await SQLTool.mysqlTool.query(apply_sql, [spu_id, spu.create_user_id, spu.create_time,1]);
            let spu_apply_id = apply_res.insertId;
            let l = spu.sku_list.length;
            for (let i = 0;i<l;i++){
                let sku = spu.sku_list[i];
                sku.SPU_id = spu_id;
                sku.SPU_apply_id = spu_apply_id;
                await this.addSKUApply(sku);
            }
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async addSKUApply(sku){
        if (sku == null ){
            logger.error("sku is nil");
            throw new Error('Server error');
        }
        //add to sku total
        //add to sku apply
        let sql = "insert into SKUTotal (SPU_id,SKU_code,specification,image,buy_price,product_size,weight,purchasing_cycle,sensitive_information,SKU_remark) values (?,?,?,?,?,?,?,?,?,?);";
        try{
            await SQLTool.mysqlTool.query(sql, [sku.SPU_id, sku.SKU_code, sku.specification, sku.image, sku.buy_price, sku.product_size, sku.weight, sku.purchasing_cycle, sku.sensitive_information, sku.SKU_remark]);
            let apply_sql = "insert into SKUApply (SPU_apply_id,SKU_code) values (?,?);";
            await SQLTool.mysqlTool.query(apply_sql, [sku.SPU_apply_id, sku.SKU_code]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }


    async SKUForUser(user_id){
        if (user_id == null) {
            logger.error("user id is nil");
            throw new Error('Server error');
        }
        let sql = "select * from SPUTotal sput left join SPUApply spua on sput.id = spua.SPU_total_id where create_user_id = ?;"
        try{
            let res = await SQLTool.mysqlTool.query(sql,[user_id]);
            let l = res.length;
            for (let i = 0;i < l;i++){
                let spu_item = res[i];
                let sku_list = await this.skuForSPU(spu_item.id);
                spu_item['sku_list'] = sku_list;
            }
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async skuForSPU(spu_id){
        if (spu_id == null){
            return []
        }
        let sql = "select * from SKUTotal skut left join SKUApply skua on skua.SKU_code = skut.SKU_code where skut.SPU_id = ?";
        try{
            let res = await SQLTool.mysqlTool.query(sql,[spu_id]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userSearchApplySKU(user_id, searchStr){
        if (user_id == null){
            logger.error("user id is nil");
            throw new Error('Server error');
        }
        if (searchStr == null || searchStr.length == 0){
            return [];
        }
        searchStr = searchStr.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        let sql = "select * from SPUTotal t left join SPUApply a on t.id = a.SPU_total_id  where t.product_name like ? or t.SPU_code like ? and a.apply_status = ? and a.apply_user_id = ?;"
        try{
            let s = '%' + searchStr + '%';
            let res = await SQLTool.mysqlTool.query(sql,[s,s,1,user_id]);
            return res;
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userSearchSKU(searchStr){
        if (searchStr == null || searchStr.length == 0){
            return [];
        }
        searchStr = searchStr.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        let sql = "select * from SKUTotal skut left join SPUTotal sput on sput.id = skut.SPU_id where skut.SKU_code like ? or skut.id like ?;";
        try{
            let s = '%' + searchStr + '%';
            let res = await SQLTool.mysqlTool.query(sql,[s,s]);
            return res;
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async modifySkuApply(sku){
        if (sku == null){
            logger.error("sku is nil");
            throw new Error('Server error');
        }
        let sql = "update SKUTotal set SPU_id = ?,SKU_code = ?,specification = ?,image = ?,buy_price = ?,product_size = ?,weight = ?,purchasing_cycle = ?,sensitive_information = ?,SKU_remark = ? where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql, [sku.SPU_id, sku.SKU_code, sku.specification, sku.image, sku.buy_price, sku.product_size, sku.weight, sku.purchasing_cycle, sku.sensitive_information, sku.SKU_remark,sku.SKU_id]);
            let apply_sql = "update SKUApply set SPU_apply_id = ?,SKU_code = ? where idSKUApply = ?;";
            await SQLTool.mysqlTool.query(apply_sql, [sku.SPU_apply_id, sku.SKU_code, sku.SKU_apply_id]);
        }catch(error){
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async userModifySPUApply(spu){
        if (spu == null) {
            logger.error("spu is nil");
            throw new Error('Server error');
        }
        let sql = "update SPUTotal set SPU_code=?,product_name=?,product_image=?,video_link=?,sales=?,product_link=?,is_fake=?,has_battery=?,is_infringement=?,has_magnetism=?,is_liquid=?,is_powder=?,area=?,need_custom_made=?,individual_package=?,is_in_stock=?,start_values=?,language=?,freight=?,plug_type=?,voltage=?,SPU_remark=? where id = ?;";
        try {
            await SQLTool.mysqlTool.query(sql, [spu.SPU_code, spu.product_name, spu.product_image, spu.video_link, spu.sales, spu.product_link, spu.is_fake, spu.has_battery, spu.is_infringement, spu.has_magnetism, spu.is_liquid, spu.is_powder, spu.area, spu.need_custom_made, spu.individual_package, spu.is_in_stock, spu.start_values, spu.language, spu.freight, spu.plug_type, spu.voltage, spu.SPU_remark, spu.spu_id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async managerModifySKUApply(sku){
        await this.modifySkuApply(sku);
        let sql = "update SKUApply set SKU_apply_status = ? where idSKUApply = ?;";
        try{
            await SQLTool.mysqlTool.query(sql, [sku.SKU_apply_status, sku.SKU_apply_id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async managerModifySPUApply(spu){
        if (spu == null){
            logger.error("spu is nil");
            throw new Error('Server error');
        }
        let sql = "update SPUTotal set SPU_code=?,product_name=?,product_image=?,video_link=?,sales=?,product_link=?,is_fake=?,has_battery=?,is_infringement=?,has_magnetism=?,is_liquid=?,is_powder=?,area=?,need_custom_made=?,individual_package=?,is_in_stock=?,start_values=?,language=?,freight=?,plug_type=?,voltage=?,create_time=?,SPU_remark=? where id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql, [spu.SPU_code, spu.product_name, spu.product_image, spu.video_link, spu.sales, spu.product_link, spu.is_fake, spu.has_battery, spu.is_infringement, spu.has_magnetism, spu.is_liquid, spu.is_powder, spu.area, spu.need_custom_made, spu.individual_package, spu.is_in_stock, spu.start_values, spu.language, spu.freight, spu.plug_type, spu.voltage, spu.create_time, spu.SPU_remark, spu.SPU_id]);
            let apply_sql = "update SPUApply set apply_status = ? where idSPUApply = ?;";
            await SQLTool.mysqlTool.query(apply_sql, [spu.apply_status, spu.SPU_apply_id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deleteSPUFromTotal(id){
        if(id == null){
            logger.error("spu is nil");
            throw new Error('Server error');
        }
        let sql = "delete sput,spua,skut,skua from SPUTotal sput left join SPUApply spua on spua.SPU_total_id = sput.id left join SKUTotal skut on skut.SPU_id = sput.id left join SKUApply skua on skua.SPU_apply_id = spua.idSPUApply where sput.id = ?;";
        try{
            await SQLTool.mysqlTool.query(sql,[id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

    async deleteSKUFromTotal(id){
        if (id == null) {
            logger.error("spu is nil");
            throw new Error('Server error');
        }
        let sql = "delete skut,skua from SKUTotal skut left join SKUApply skua on skut.SKU_code = skua.SKU_code where skut.id = ?;";
        try {
            await SQLTool.mysqlTool.query(sql, [id]);
        } catch (error) {
            logger.error(error);
            throw new Error('Server error');
        }
    }

}

const skum = new SKUManager();

module.exports = {
    skum
}



