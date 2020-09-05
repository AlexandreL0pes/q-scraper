const puppeteer = require("puppeteer");

/**
 *  Obtem as notas parciais 
 * 
 * @param {string} username 
 * @param {string} password 
 */
const getGrades = async (username, password) => {

    const [browser, page] = await pageInit();


    try {
        let resultLogin = await login(page, username, password);

        if (resultLogin.status == 400) return resultLogin;

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
    } catch (error) {
        console.error(error);
        return { status: 500, msg: 'Internal Server Error' };
    }


};


/**
 * Obtem as notas finais 
 * 
 * @param {string} username 
 * @param {string} password 
 */
const getFinalGrades = async (username, password) => {

    const [browser, page] = await pageInit();

    try {
        
        let resultLogin = await login(page, username, password);

        if (resultLogin.status == 400) return resultLogin;


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

        await browser.close();
        return disciplinas;

    } catch (error) {
        console.error(error);
        return { status: 500, msg: 'Internal Server Error' };
    }
};

/**
 * Inicia o navegador e a página
 */

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

/**
 * Efetua o login no Q-Acadêmico 
 */
/**
 * 
 * @param {Page} page 
 * @param {string} username 
 * @param {string} password 
 */
const login = async (page, username, password) => {
    await page.goto('https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001', { waitUntil: 'networkidle0' });

    await page.focus('#txtLogin');
    await page.keyboard.type(username);

    await page.focus('#txtSenha');
    await page.keyboard.type(password);

    await page.click('#btnOk');

    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    try {
        await page.waitForSelector('a[href="/qacademico/alunos/boletim/index.asp"]');
    } catch (error) {
        console.error("Element not Found: ", error);
        return { status: 400, msg: 'Login Failed' };
    }
    return true;
};

/**
 * Exporta as funções para serem utilizadas em outros arquivos do app
 */

module.exports = {getGrades, getFinalGrades};