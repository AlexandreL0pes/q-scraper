const puppeteer = require('puppeteer');

const Browser = require('../scraper/browser');
const { login } = require('../scraper/scrap');
const { findAll } = require('./Score');

module.exports = {
  async findAll(username, password) {
    try {
      const browser = await Browser();

      const page = await login(browser.page, username, password);

      
      await page.click('body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(6) > tbody:nth-child(1) > tr:nth-child(15) > td:nth-child(3) > a:nth-child(1)');

      // TODO: List materials from another YEAR
      // await page.waitForSelector('body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4)');
      // await page.select('#ANO_PERIODO', '2020_1')
      // await page.click('.botao')

      await page.waitForSelector('body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4)');      

      await page.click(
        'body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2) > table:nth-child(4)',
      );

      await page.waitForSelector('#layer_aguardar');

      const documents_info = await page.evaluate(() => {
        
        const documentTable = document.querySelectorAll(
          'table tr.rotulo[bgcolor="#E6E7E8"]',
        );
        
        const documents_info = [];

        for (let index = 0; index < documentTable.length; index++) {
          const subject = documentTable[index]
            .querySelector('td:nth-child(2)')
            .innerText.split('-')[2]
            .split('(')[0]
            .trim();

          let d = documentTable[index].nextElementSibling;

          const documents = [];
          while (d.classList.contains('conteudoTexto')) {
            const date = d.querySelector('td:nth-child(1)');
            const link = d.querySelector('td:nth-child(2) a');
            documents.push({
              date: date.innerText,
              link: link.href,
              title: link.innerText,
            });
            
            d = d.nextElementSibling;
            if (!d) break;
          }

          documents_info.push({subject, documents: documents});
        }
        return documents_info;
      });

      await browser.close();
      return documents_info;
    } catch (error) {
      console.error(error);
      throw new Error('Failed in get documents');

    }
  },
};
