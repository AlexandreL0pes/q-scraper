const puppeteer = require('puppeteer');

const Browser = require('../scraper/browser');
const { login } = require('../scraper/scrap');

module.exports = {
  async findAll(username, password) {
    try {
      const browser = await Browser();

      const page = await login(browser.page, username, password);

      await page.click(
        'a[href="https://academico.ifgoiano.edu.br/qacademico/index.asp?t=2071"]',
      );

      await page.waitForSelector(
        'table[width="90%"][height="42"][cellpadding="2"]',
      );

      const scores_info = await page.evaluate(() => {
        const headerTable = document.querySelectorAll(
          'table[width="90%"][height="42"][cellpadding="2"] > tbody > tr:not(.conteudoTexto)[bgcolor="#FFFFFF"], table[width="90%"][height="42"][cellpadding="2"] > tbody > tr:not(.conteudoTexto)[bgcolor="#e6e7e8"]',
        );

        const scores = [];

        for (let index = 0; index < headerTable.length; index++) {
          const nextElement = headerTable[index].nextElementSibling;
          const name = headerTable[index]
            .querySelector('td[class="conteudoTexto"]')
            .innerText.split('-')[2]
            .split('(')[0]
            .trim();

          const descriptions = nextElement.querySelectorAll(
            'td > table > tbody > tr:nth-child(n+2) > td:nth-child(2)',
          );

          const weights = nextElement.querySelectorAll(
            'td > table > tbody > tr:nth-child(n+2) > td:nth-child(3)',
          );

          const max_scores = nextElement.querySelectorAll(
            'td > table > tbody > tr:nth-child(n+2) > td:nth-child(4)',
          );

          const scores_obtained = nextElement.querySelectorAll(
            'td > table > tbody > tr:nth-child(n+2) > td:nth-child(5)',
          );

          console.log(typeof descriptions);
          const school_test = [];

          for (let j = 0; j < descriptions.length; j++) {
            school_test.push({
              description: descriptions[j].innerText.split('Prova:')[1].trim(),
              weights: weights[j].innerText.split(':')[1].trim() || '',
              max_score: max_scores[j].innerText.split(':')[1].trim() || '',
              score_obtained:
                scores_obtained[j].innerText.split(':')[1].trim() || '',
            });
          }

          scores.push({
            name: name,
            school_test: school_test,
          });
        }

        return scores;
      });

      await browser.close();
      return scores_info;
    } catch (e) {
      console.error(`Failed in get get grades \n ${e}`);
      throw new Error('Failed in get grades');
    }
  },
};
