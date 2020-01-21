const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");
const getFinalGrades = require("../controller/getFinalGrades");
const getGrades = require("../controller/getGrades");

const puppeteer = require("puppeteer");


// Home Page
router.get("/", (_, res, __) => {
  res.send(
    `Esse é um documento PDF que pode ser impresso!!!
    <p>
    <a href="/generate-pdf?url=http://localhost:3000">Clique para imprimir a página!`
    );
});


// Boletim  
router.post("/boletim", async (req, res, __) => {
  let login = req.query.login || '';
  let password = req.query.password || '';

  let finalGrades = await getFinalGrades(login, password);

  res.json(finalGrades);
});

router.post("/diarios", async (req, res, __) => {
  let login = req.query.login || '';
  let password = req.query.password || '';
    
  let grades =  await getGrades(login, password);

  res.send(grades);
  // res.json({login, password});

});


module.exports = router;
