const login = async (page, username, password) => {
  try {
    await page.goto(
      'https://academico.ifgoiano.edu.br/qacademico/index.asp?t=1001',
      { waitUntil: 'networkidle0' },
    );

    await page.focus('#txtLogin');
    await page.keyboard.type(username);

    await page.focus('#txtSenha');
    await page.keyboard.type(password);

    await page.click('#btnOk');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    return page;
  } catch (e) {
    console.error(`Failed in login, verify your credentials \n ${e}`);
    throw new Error('Failed in login, verify your credentials');
  }
};

module.exports = { login };
