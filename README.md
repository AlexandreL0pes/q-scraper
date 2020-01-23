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

## Métodos 

Endpoint       | Descrição
-------------- | -----------------------------
POST /diarios  | Retorna uma coleção com as notas obtidas em atividades/provas. 
POST /boletim  | Retorna uma coleção com as notas finais obtidas ao final do semestre.

 ### __POST /diarios__
  1. ### Parâmetros
        Nome | Obrigatório | Descrição | Exemplo 
        ----- | ------------ |--------- | -------------
        Matrícula | Obrigatório | Conjunto de números utilizado como identificação do estudante na instituição. | 2014103202030000
        Senha | Obrigatório | Coleção de caracteres de segurança para utilização do Q-Acadêmico. | 1SenhaT0talmenteS3gura

  2. ### Resposta
        ~~~json 
        [
            {
                "nome": "Programação para Dispositivos Móveis",
                "avaliacao": [
                    {
                        "descricao": "Nota Semestral",
                        "peso": "1",
                        "notaMaxima": "10",
                        "notaObtida": "10"
                    }
                ]
            },
            {
                "nome": "Segurança e Auditoria da Informação",
                "avaliacao": [
                    {
                        "descricao": "Atividades - ameaças",
                        "peso": "1",
                        "notaMaxima": "2.5",
                        "notaObtida": "2.5"
                    },
                    {
                        "descricao": "Tipos de ameaças",
                        "peso": "1",
                        "notaMaxima": "5",
                        "notaObtida": "5"
                    }
                ]
            }
        ]
        ~~~

  ### __POST /boletim__

   1.  **Parâmetros**

        Nome      | Condição     | Descrição | Exemplo 
        --------- | ------------ |---------- | ------
        Matrícula | Obrigatório  | Conjunto de números utilizado como identificação do estudante na instituição. | 2014103202030000
        Senha     | Obrigatório  | Coleção de caracteres de segurança para utilização do Q-Acadêmico. | 1SenhaT0talmenteS3gura


  2. **Resposta**
        ~~~json 
        [
            {
                "nome": "Teste de Software",
                "nota": "10,0",
                "status": "Aprovado",
                "faltas": "4"
            },
            {
                "nome": "Programação para Dispositivos Móveis",
                "nota": "10,0",
                "status": "Aprovado",
                "faltas": "4"
            }
        ]
        ~~~

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

