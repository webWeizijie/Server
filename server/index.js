
const Koa = require('koa');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const musicRoute = require('../route/music/index')
const elemeRoute = require('../route/eleme')
//const jobRoute = require('../route/job/index')
//const resgisetSocket = require('../route/job/socket')
const path = require('path')
const static = require('koa-static')
const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(static(path.join(__dirname, '../src/')));
// jobRoute(router, app) //job路由页面
musicRoute(router,app)//歌曲路由页面
elemeRoute(router,app)

app.use(router.routes()).use(router.allowedMethods())

const server = require('http').createServer(app.callback());
// const io = require('socket.io')(server);
// resgisetSocket(io)

server.listen(9000);