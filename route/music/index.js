const axios = require('axios')
const host = '/music/api'
const puppeteer = require('./puppeteer')

let key = ''
puppeteer().then((res) => {
    key = res
})
setInterval(() => {
    puppeteer().then((res) => {
        key = res
    })
}, 10 * 60 * 60 * 1000)
module.exports = (router, app) => {
    router.get(host + '/getDiscList', async (ctx, next) => {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

        const body = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: ctx.request.query
        })

        ctx.body = body.data
    })

    router.get(host + '/lyric', async (ctx, next) => {
        var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';

        const body = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: ctx.request.query
        })

        ctx.body = body.data

    })

    router.get(host + '/disc', async (ctx, next) => {
        var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

        const body = await axios.get(url, {
            headers: {
                referer: 'https://c.y.qq.com/',
                host: 'c.y.qq.com'
            },
            params: ctx.request.query
        })

        ctx.body = body.data
    })

    router.get(host + '/songUrl', async (ctx, next) => {
        ctx.body = `http://dl.stream.qqmusic.qq.com/C400||.m4a?guid=${key}&uin=0&fromtag=38`
    })


}