const puppeteer = require('puppeteer');
const Browser = require('../scraper/browser');
const { login } = require('../scraper/scrap');

module.exports = {
  async findAll(username, password) {
    try {
      const browser = await Browser();

      const page = await login(browser.page, username, password);

      await page.click('a[href="/qacademico/alunos/boletim/index.asp"]');

      const table = 'table [width="97%"] > tbody > tr:nth-child(n+3)';
      await page.waitForSelector(table);

      const subjects = await page.evaluate(() => {
        let name = document.querySelectorAll(
          'table [width="97%"] > tbody > tr:nth-child(n+3) > td:first-child',
        );

        let score = document.querySelectorAll(
          'table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+10)',
        );

        let status = document.querySelectorAll(
          'table [width="97%"] > tbody > tr:nth-child(n+3) > td:last-of-type',
        );

        let absence = document.querySelectorAll(
          'table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+4)',
        );

        let subjects_info = [];

        for (let index = 0; index < name.length; index++) {
          subjects_info.push({
            name: name[index].innerText.split('<')[0].trim(),
            score: score[index].innerText.trim(),
            status: status[index].innerText.trim(),
            absence: absence[index].innerText.trim(),
          });
        }

        return subjects_info;
      });

      await browser.close();
      return subjects;
    } catch (e) {
      console.error(`Failed in get get grades \n ${e}`);
      throw new Error('Failed in get grades');
    }
  },
};
