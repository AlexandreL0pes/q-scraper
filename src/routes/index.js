const express = require("express");
const router = express.Router();
const getFinalGrades = require("../app/controller/getFinalGrades");
const grades = require("../app/controller/getGrades");

// Home Page
router.get("/", (_, res, __) => {
	res.send({ msg: "ok" });
});

// Boletim
router.post("/boletim", async (req, res, __) => {
	let login = req.query.login || "";
	let password = req.query.password || "";

	let finalGrades = await grades.getFinalGrades(login, password);

	res.status(finalGrades.status || 200).send(finalGrades.msg || finalGrades);
});

router.post("/diarios", async (req, res, __) => {
	let login = req.query.login || "";
	let password = req.query.password || "";

	let parcialGrades = await grades.getGrades(login, password);

	res.status(parcialGrades.status || 200).send(parcialGrades.msg || parcialGrades);
});

module.exports = router;
