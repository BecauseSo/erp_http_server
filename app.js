const log4js = require('log4js');
log4js.configure('./log4js.json');

const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
// const koa_jwt = require('koa-jwt')
// const verToken = require('./tools/Role_tool');
// const sign_tool = require('./tools/sign_tool');
// const md5 = require('md5-node')
const koaBody = require('koa-body');

const RoleTool = require('./tools/Role_tool')

const app = new Koa();
const removeEmpty = (obj) => {
    Object.keys(obj).forEach(key => {
        if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
        else if (obj[key] == null) delete obj[key];
    });
    return obj;
};

app.use(require('koa-static')(__dirname + '/controllers/public'))

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
        log4js.getLogger('HTTP').error(err.stack);
    }
});

// parse request body:
// app.use(bodyParser({
//     enableTypes: ['json', 'form', 'text']
// }));

app.use(koaBody({
    multipart: true,
    json:true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));

//验证签名
// app.use(async (ctx, next) => {
//     let sign = ctx.headers.sign;
//     let timestamp = ctx.header.timestamp;
//     let currentTime = Date.now();
//     if ((currentTime - timestamp * 1000) > 60 * 1000) {
//         let err = new Error("Request expired");
//         err.statusCode = 400;
//         throw err;
//     }
//     let originStr = JSON.stringify(ctx.request.body);
//     if (ctx.method == "GET") {
//         originStr = ctx.querystring;
//     }

//     if (ctx.path == "/v1/user/simulate/item/add") {
//         await next();
//         return;
//     }

//     // originStr = crypto.createHash('md5').update(originStr).digest("hex");
//     if (sign == undefined || originStr == undefined || timestamp == undefined) {
//         let err = new Error("no sign");
//         err.statusCode = 400;
//         throw err;
//     }
//     originStr = originStr + timestamp;
//     let res = await sign_tool.checkSign(sign, originStr);
//     if (res == false) {
//         console.log(originStr);
//         console.log(sign);
//         let err = new Error("sign error");
//         err.statusCode = 400;
//         throw err;
//     } else {
//         await next();
//     }
// });

/*

 'POST /v1/product/list': latestlist,
    'POST /v1/product/kline': kline,
    'POST /v1/product/detail': detailForCoinOfMarket,
    'POST /v1/product/markets': marketForFromSymbol,
    'POST /v1/product/hotsuggest': hotSuggest,
    'POST /v1/product/list/refresh': refreshList,
    'POST /v1/product/exchange/coinsinfo': exchangeCoinsInfo,
    'POST /v1/product/exchange/coin': exchangeCoin,
    'POST /v1/product/search': search,
    'POST /v1/user/favor': favor,
    'GET /v1/product/news': news,
    'GET /v1/product/news/check':newsCheck,

    'GET /app/test':test,
    'GET /app/testnew':testnew

*/

//验证用户
// app.use(koa_jwt({
//     secret: verToken.TokenSignKey
// }).unless({
//     path: ['/v1/user/fetchtoken',
//         '/v1/product/list',
//         '/v1/product/kline',
//         '/v1/product/detail',
//         '/v1/product/markets',
//         '/v1/product/hotsuggest',
//         '/v1/product/list/refresh',
//         '/v1/product/exchange/coinsinfo',
//         '/v1/product/exchange/coin',
//         '/v1/product/search',
//         '/v1/product/news',
//         '/v1/product/news/check',
//         '/v1/user/signup',
//         '/v1/user/token/fetch',
//         '/v1/user/login',
//         '/app/test',
//         '/app/testnew']
// }));

// app.use(async (ctx, next) => {
//     var token = ctx.headers.authorization;
//     if (token == undefined) {
//         await next();
//     } else {
//         verToken.verToken(token).then((data) => {
//             //这一步是为了把解析出来的用户信息存入全局state中，这样在其他任一中间价都可以获取到state中的值
//             ctx.state = {
//                 data: data
//             };
//         })
//         await next();
//     }
// });

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , user_id');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

//验证权限
app.use(async (ctx, next) => {
    if (ctx.method == 'GET'){
        await next();
        return
    }
    let request = ctx.request;
    let path = request.path;
    if (path == '/user/login') {
        await next();
        return
    }
    let user_id = request.headers.user_id;
    if (user_id == null) {
        let error = new Error("Permission denied")
        error.statusCode = 401;
        throw error;
    }
    let res = await RoleTool.roleChecker.checkRoleForAccount(user_id, path);
    if (res == true) {
        await next();
        return;
    }
    let error = new Error("Permission denied")
    error.statusCode = 401;
    throw error;
});

app.use(require('koa-log4').koaLogger(log4js.getLogger('HTTP')));

// app.use(async (ctx, next) => {
//     removeEmpty(ctx.request.body);
//     await next();
// });

// add controllers:
app.use(controller());


app.listen(8112);
console.log('app started at port 8112...');