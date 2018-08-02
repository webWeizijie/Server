const models = require('./model')
const User = models.getModel('user');
const Chat = models.getModel('chat');
const md5Pwd = require('./utils').md5Pwd
const promisify = require('util').promisify

const userFindOne = (user, pwd) => {
    return new Promise((res, rej) => {
        let body = {}
        User.findOne({
            user
        }, function (err, doc) {
            if (!doc) {
                body = {
                    code: 1,
                    msg: '没有此用户'
                }
            } else {
                if (md5Pwd(pwd) === doc.pwd) {
                    doc.pwd = 0
                    body = {
                        code: 0,
                        doc
                    }
                } else {
                    body = {
                        code: 1,
                        msg: '密码错误'
                    }
                }
            }
            res(body)


        })
    })
}

const getMsgList = (userId) => {
    return new Promise((res, rej) => {
        User.find({}, function (e, userdoc) {
            let users = {}
            userdoc.forEach((v) => {
                users[v.id] = { name: v.user, avatar: v.avatar }
            })
            Chat.find({ '$or': [{ from: userId }, { to: userId }] }, function (err, doc) {
                if (!err) {
                    res({ code: 0, msgs: doc, users })
                } else {
                    res({ code: 1, msgs: err })
                }

            })
        })
    })
}

const getUserInfo = (userId) => {
    return new Promise((res, rej) => {
        User.findOne({
            _id: userId
        }, function (err, doc) {
            if (!doc) {
                res({ code: 1 })
            } else {
                doc.pwd = 0;
                res({ code: 0, doc })
            }
        })
    })
}

const getUserList = (type) => {
    return new Promise((res, rej) => {
        User.find({
            type
        }, function (err, doc) {

            if (err) {
                res({
                    code: 1,
                    msg: 'error'
                })
            } else {
                res({
                    doc,
                    code: 0
                })
            }
        })
    })
}

const registerUser = (user, pwd, type) => {
    return new Promise((resolve, reject) => {
        let body
        User.findOne({
            user: user
        }, function (err, doc) {

            if (doc) {
                resolve({
                    code: 1,
                    msg: '用户名重复'
                })

                return
            } else {
                User.create({
                    user,
                    pwd: md5Pwd(pwd),
                    type
                }, function (e, doc) {
                    if (e) {
                        body = {
                            code: 1,
                            msg: '后端出错了'
                        }
                    } else {
                        body = {
                            code: 0,
                            doc
                        }
                    }

                    body ? resolve(body) : reject({ code: 1, msgs: 'error' })

                })
            }

        })
    })

}

const userUpdate = (userId, body) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(userId, body, function (err, doc) {
            if (err) {
                resolve({ code: 1, msgs: err })
            } else {
                const data = Object.assign({}, {
                    user: doc.user,
                    type: doc.type
                }, body)

                resolve({
                    code: 0,
                    data
                })
            }

        })
    })

}

const readMsg = (userId, from) => {
    return new Promise((resolve, reject) => {
        Chat.update({ from, to: userId }, { '$set': { read: true } }, { 'multi': true }, function (err, doc) {
            if (!err) {
                resolve({ code: 0, num: doc.nModified })
            } else {
                resolve({ code: 1, msg: '修改失败' })
            }

        })
    })
}
module.exports = {
    userFindOne,
    getMsgList,
    getUserInfo,
    getUserList,
    registerUser,
    userUpdate,
    readMsg
}
