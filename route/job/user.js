const models = require('./model')
const db = require('./db')
const url = '/job/api'
var arr = [];
arr.forEach(async (i) => {
    await i
})

module.exports = (router) => {
    router.get(url + '/user/list', async (ctx, next) => {
        const { type } = ctx.request.query
        const body = await db.getUserList(type)

        ctx.body = body

    })
    router.post(url + '/user/register', async (ctx, next) => {
        const { user, pwd, type } = ctx.request.body
        console.log(ctx.request.body)
        try {
            const body = await db.registerUser(user, pwd, type)
            if(body.code == 0){
                ctx.cookies.set('userId', body.doc._id)
            }
            ctx.body = body

        } catch (error) {
            ctx.body = error
        }



    })
    router.get(url + '/user/info', async (ctx, next) => {
        const userId = ctx.cookies.get('userId');
        if (!userId) {
            return ctx.body = {
                code: 1
            }
        }
        const body = await db.getUserInfo(userId)

        ctx.body = body
    })
    router.post(url + '/user/login', async (ctx, next) => {
        const { user, pwd } = ctx.request.body
        let body = ''

        try {
            body = await db.userFindOne(user, pwd)
            ctx.cookies.set('userId', body.doc._id)
        } catch (error) {
            body = error
        }
        ctx.body = body
    })
    router.post(url + '/user/update', async (ctx, next) => {
        const userId = ctx.cookies.get('userId')
        if (!userId) {
            return ctx.body = {
                code: 1
            }
        }
        const query = ctx.request.body;
        const body = await db.userUpdate(userId, query)

        ctx.body = body
    })

    router.get(url + '/user/getmsgList', async (ctx, next) => {
        const userId = ctx.cookies.get('userId')
        let body

        try {
            body = await db.getMsgList(userId)
        } catch (error) {
            body = error
        }
        ctx.body = body
    })

    router.post(url + '/user/readmsg', async (ctx, next) => {
        const userId = ctx.cookies.get('userId')
        const { from } = ctx.request.body;
        try {
            const body = await db.readMsg(userId, from)
            ctx.body = body
        } catch (error) {
            ctx.body = error
        }

    })
}