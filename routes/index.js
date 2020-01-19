const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");
const getFinalGrades = require("../controller/getFinalGrades");

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
router.post("/boletim", async (req, res, __) => {
  let login = req.query.login || '';
  let password = req.query.password || '';

  let grades = await getFinalGrades(login, password);

  res.json(grades);
});

module.exports = router;
