const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");
const config = require('../config');

const puppeteer = require("puppeteer");


// Home Page
router.get("/", (_, res, __) => {
  res.send(
    `Esse é um documento PDF que pode ser impresso!!!
    <p>
    <a href="/generate-pdf?url=http://localhost:3000">Clique para imprimir a página!`
    );
});

// Download PDF Route
router.get("/generate-pdf", async (req, res, __) => {
  let result = await saveToPdf(req.query.url);
  res.attachment(`q-scraper.pdf`);
  res.contentType("application/pdf");
  res.send(result);
});

// Scrapp a page
router.get("/scraper", async (req, res, __) => {

  // Browser actions & buffer creator
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"] // SEE BELOW WARNING!!!
  });
  const page = await browser.newPage();
  // await page.goto(url);
  await page.goto('https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001', {waitUntil: 'networkidle2'});
  
  let html = await page.content();
  
  await browser.close();
  
  let json = {
    first_name : 'Mais',
    last_name : 'Teste',
    age : '20',
    nationality : 'Brazilian'
  }
  
  res.json(json);
  await browser.close();    

});

// Login 
router.get("/login", async (req, res, __) => {

  // Browser actions & buffer creator
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"] // SEE BELOW WARNING!!!
  });
  
  const page = await browser.newPage();
    
  await page.goto('https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001', {waitUntil: 'networkidle2'});
  

  await page.focus('#txtLogin');
  await page.keyboard.type(config.login);

  await page.focus('#txtSenha');
  await page.keyboard.type(config.password);

  await page.click('#btnOk');

  await page.waitForNavigation({waitUntil:'networkidle2'});

  await page.click('a[href="/qacademico/alunos/boletim/index.asp"]');

  const table = 'table [width="97%"] > tbody > tr:nth-child(n+3)';
  await page.waitForSelector(table);

  const disciplinas = await page.evaluate(() => {

    let nomeLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:first-child');
    let notaLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+10)');
    let statusLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:last-of-type')
    let faltasLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+4)')

    let disciplinaDados = [];
    for (let i = 0; i < nomeLista.length; i++) {
      disciplinaDados[i] = {
        nome: nomeLista[i].innerText.split('<')[0].trim(),
        nota: notaLista[i].innerText.trim(),
        status: statusLista[i].innerText.trim(),
        faltas: faltasLista[i].innerText.trim()
      };
      
    }
    return disciplinaDados; 
  });

  res.json(disciplinas);

  await browser.close();

});

module.exports = router;
