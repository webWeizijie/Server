
const utils = require('utility')

function md5Pwd(pwd) {
    const salt = 'job_3544x8yza6!@#IUHJH~~';
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = {
    md5Pwd
}