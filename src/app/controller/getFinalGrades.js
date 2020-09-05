const puppeteer = require("puppeteer");

const getFinalGrades = async (login, password) => {
	const browser = await puppeteer.launch({
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});

	const page = await browser.newPage();

	await page.setRequestInterception(true);
	page.on("request", (req) => {
		const whitelist = ["document", "script", "xhr", "fetch"];
		if (!whitelist.includes(req.resourceType())) {
			return req.abort();
		}
		req.continue();
	});

	await page.goto("https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001", { waitUntil: "networkidle0" });

	await page.focus("#txtLogin");
	await page.keyboard.type(login);

	await page.focus("#txtSenha");
	await page.keyboard.type(password);

	await page.click("#btnOk");

	await page.waitForNavigation({ waitUntil: "networkidle2" });

	await page.click('a[href="/qacademico/alunos/boletim/index.asp"]');

	const table = 'table [width="97%"] > tbody > tr:nth-child(n+3)';
	await page.waitForSelector(table);

	const disciplinas = await page.evaluate(() => {
		let nomeLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:first-child');
		let notaLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+10)');
		let statusLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:last-of-type');
		let faltasLista = document.querySelectorAll('table [width="97%"] > tbody > tr:nth-child(n+3) > td:nth-child(11n+4)');

		let disciplinaDados = [];
		for (let i = 0; i < nomeLista.length; i++) {
			disciplinaDados[i] = {
				nome: nomeLista[i].innerText.split("<")[0].trim(),
				nota: notaLista[i].innerText.trim(),
				status: statusLista[i].innerText.trim(),
				faltas: faltasLista[i].innerText.trim(),
			};
		}
		return disciplinaDados;
	});

	await browser.close();
	return disciplinas;
};

module.exports = getFinalGrades;
