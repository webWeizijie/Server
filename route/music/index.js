const axios = require('axios')
const host = '/music/api'
//document.getElementsByTagName('audio')[0].src.match(/vkey=.+?&/)[0].replace(/vkey=|&/g,'')
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
        
        ctx.body = 'http://dl.stream.qqmusic.qq.com/C400||.m4a?guid=2351310198&vkey=D834FC13EC288BA0B43B08909F2CC7EDB9D2717DFD5574A654A3F1E211E0596C6811ADACA82E76D5EA09B172B06F49A488423568E4B4BEC2&uin=6097&fromtag=38'
    })

    
}