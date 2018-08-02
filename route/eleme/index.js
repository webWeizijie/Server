const url = '/eleme/api'
const mock = require('./data.json')

module.exports = (router, app) => {
    router.get(url + '/seller', function (ctx, next) {
        ctx.body = {
            errno: 0,
            data: mock.seller
        };
    });

    router.get(url + '/goods', function (ctx, next) {
        ctx.body = {
            errno: 0,
            data: mock.goods
        };
    });

    router.get(url + '/ratings', function (ctx, next) {
        ctx.body = {
            errno: 0,
            data: mock.ratings
        };
    });
}