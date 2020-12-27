const Browser = require('../scraper/browser');
const {login} = require('../scraper/scrap');


module.exports = {
  async show(username, password) {
    const browser = await Browser();

    const page = await login(browser.page, username, password);

    const name = await page.evaluate(() => {
      return document.querySelector('td.barraRodape:nth-child(3)').innerText;
    })

    await page.click('a[href="https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1024"]');
    await page.waitForSelector('span.dado_cabecalho:nth-child(1)');
    const course = await page.evaluate(() => {
      const full_name = document.querySelector('span.dado_cabecalho:nth-child(1)').innerText;
      let name = full_name.split('em ').pop();
      name = name.split(' -').shift();
      return name;
    });
    return {name, course};
  }
};
