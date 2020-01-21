const puppeteer = require("puppeteer");


const getGrades = async (login, password) => {

    const [browser, page] = await pageInit();

    await page.goto('https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001', { waitUntil: 'networkidle0' });

    await page.focus('#txtLogin');
    await page.keyboard.type(login);

    await page.focus('#txtSenha');
    await page.keyboard.type(password);

    await page.click('#btnOk');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    await page.click('a[href="https://academico.ifgoiano.edu.br/qacademico/index.asp?t=2071"]');

 
    await page.waitForSelector('table[width="90%"][height="42"][cellpadding="2"]');
    
    const notaSemestral = await page.evaluate(() => {

        let primeiraLinha = document.querySelectorAll('table[width="90%"][height="42"][cellpadding="2"] > tbody > tr:not(.conteudoTexto)[bgcolor="#FFFFFF"], table[width="90%"][height="42"][cellpadding="2"] > tbody > tr:not(.conteudoTexto)[bgcolor="#e6e7e8"] ');

        let notas = [];

        for (let i = 0; i < primeiraLinha.length; i++) {
            let proximoElemento = primeiraLinha[i].nextElementSibling;
            let nome = primeiraLinha[i].querySelector('td[class="conteudoTexto"]').innerText.split('-')[2].split('(')[0].trim();
            let descricao = proximoElemento.querySelectorAll('td > table > tbody > tr:nth-child(n+2) > td:nth-child(2)');
            let peso = proximoElemento.querySelectorAll('td > table > tbody > tr:nth-child(n+2) > td:nth-child(3)');
            let notaMaxima = proximoElemento.querySelectorAll('td > table > tbody > tr:nth-child(n+2) > td:nth-child(4)');
            let notaObtida = proximoElemento.querySelectorAll('td > table > tbody > tr:nth-child(n+2) > td:nth-child(5)');

            let avaliacao = [];
            for (let j = 0; j < descricao.length; j++) {
                avaliacao.push({
                    descricao: descricao[j].innerText.split('Prova:')[1].trim(),
                    peso: (peso[j].innerText.split(':')[1].trim() || ''),
                    notaMaxima: (notaMaxima[j].innerText.split(':')[1].trim() || ''),
                    notaObtida: (notaObtida[j].innerText.split(':')[1].trim() || ''),
                });
            }

            notas.push({
                nome: nome,
                avaliacao: avaliacao
            });
        }
        return notas;
    });

    await browser.close();
    return notaSemestral;
};

const pageInit = async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', req => {
        const whitelist = ['document', 'script', 'xhr', 'fetch'];
        if (!whitelist.includes(req.resourceType())) {
            return req.abort();
        }
        req.continue();
    });

    return [browser, page];
};

module.exports = getGrades;