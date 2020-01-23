const express = require("express");
const router = express.Router();
const saveToPdf = require("../controller/safeToPdf");
const getFinalGrades = require("../controller/getFinalGrades");
const grades = require("../controller/getGrades");

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

  let finalGrades = await grades.getFinalGrades(login, password);

  res.status(finalGrades.status || 200).send(finalGrades.msg || finalGrades);
});

router.post("/diarios", async (req, res, __) => {
  let login = req.query.login || '';
  let password = req.query.password || '';
    
  let parcialGrades =  await grades.getGrades(login, password);

  res.status(parcialGrades.status || 200).send(parcialGrades.msg || parcialGrades);

});


module.exports = router;
