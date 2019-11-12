const casbin = require('casbin');
const SequelizeAdapter = require('casbin-sequelize-adapter');

async function myFunction() {
    // Initialize a Sequelize adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".    
    // ORM should not create databases automatically.  
    const a = await SequelizeAdapter.newAdapter({
        username: 'root',
        password: 'yuxiao1129933675',
        database: 'erpcasbin',
        dialect: 'mysql'
    });

    const e = await casbin.newEnforcer('src/erp_model.conf', a);

    // Check the permission.
    e.enforce('alice', 'data1', 'read');

    // Modify the policy.
    // await e.addPolicy(...);
    // await e.removePolicy(...);

    // Save the policy back to DB.
    await e.savePolicy();
}

myFunction();