const axios = require('axios')
const host = '/music/api'
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
        
        ctx.body = 'http://dl.stream.qqmusic.qq.com/C400||.m4a?guid=2351310198&vkey=47A7CFF75842C895CA2ED5D4F62B19363F450B835D323353D5153A8A1EAB5B04979535088A8EAADAB6B7B0BACAC938EF7687AE491B4E4E23&uin=6097&fromtag=38'
    })

    
}