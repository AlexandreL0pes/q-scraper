# q-scraper
Uma ferramenta para realizar o web-scraping dentro da plataforma Q-acadêmico.

![](https://img.shields.io/github/issues/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/forks/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/stars/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/license/AlexandreL0pes/q-scraper)

## Descrição 
Q-scraper é um web-scraper para obter informações contidas na plataforma [Q-Acadêmico](https://academico.ifgoiano.edu.br/), utilizando o protocolo HTTP, retornando um JSON com as informações solicitadas. O objetivo principal desse projeto é possibilitar a obtenção dos dados acadêmicos sem que seja necessário o acesso ao sistema em questão. 
 
## Pré-Requisitos
- Docker 

## Utilização
O serviço ainda não está disponível! :/

## Instalação/Execução

**Configurando o Docker**

### Construindo a imagem
```bash
docker build -t q-scraper .
```
### Executando o container
```bash
$ docker run -p 3000:3000 q-scraper
```
ou 

```bash
$ docker run -p 3000:3000 --mount type=bind,source=path-absoluto-diretorio/q-scraper,target=/app/src q-scraper
```
#### Após a execução dos comandos, o servidor estará disponível em [localhost:3000/](http://localhost:3000/)

## Licença

[MIT](https://opensource.org/licenses/MIT)

