const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors');
const iPhone6 = devices['iPhone 6'];

module.exports = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    await page.emulate(iPhone6);
    await page.goto('https://i.y.qq.com/v8/playsong.html?songmid=0003JXVx2PhDxM&ADTAG=myqq&from=myqq&channel=10007100', {
        waitUntil: 'networkidle2',
        timeout: 1000000
    });
    await page.waitFor(3000)
    const url = await page.evaluate(() => {
        let src = document.getElementById('h5audio_media').src.match(/guid=(.+?)&uin/)

        return src[1]
    })
    await browser.close();

    return url
}