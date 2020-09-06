const puppeteer = require('puppeteer');

const browser = async config => {
  const defaultViewport = {
    deviceScaleFactor: 1,
    hasTouch: false,
    height: 1024,
    isLandscape: false,
    isMobile: false,
    width: 1280,
  };
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    ignoreHTTPSErrors: true,
    slowMo: 0,
    args: [
      '--disable-notifications',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  await page.setViewport(defaultViewport);

  await page.setRequestInterception(true);
  page.on('request', req => {
    const whitelist = ['document', 'script', 'xhr', 'fetch'];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }
    req.continue();
  });

  return {
    page: page,
    close: async () => await browser.close(),
  };
};

module.exports = browser;
