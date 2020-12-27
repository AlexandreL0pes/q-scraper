# Q-scraper
Uma ferramenta para realizar o web-scraping dentro da plataforma Q-acadêmico.

![](https://img.shields.io/github/issues/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/forks/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/stars/AlexandreL0pes/q-scraper)
![](https://img.shields.io/github/license/AlexandreL0pes/q-scraper)

## Descrição 
Q-scraper é um web-scraper para obter informações contidas na plataforma [Q-Acadêmico](https://academico.ifgoiano.edu.br/), utilizando o protocolo HTTP, retornando um JSON com as informações solicitadas. O objetivo principal desse projeto é possibilitar a obtenção dos dados acadêmicos sem que seja necessário o acesso ao sistema em questão. 

![Q-Scraper - Demo ](https://raw.githubusercontent.com/AlexandreL0pes/q-scraper/master/docs/demo.gif)
## Pré-Requisitos
- Docker 
- Docker-compose

## Utilização
O serviço ainda não está disponível! :/

## Instalação/Execução

**Configurando o Docker**

### Construindo a imagem
```bash
$ docker-compose build
```
### Executando o container
```bash
$ docker-compose up -d 
```
#### Após a execução dos comandos, o servidor estará disponível em [localhost:3000/](http://localhost:3000/)

## ENDPOINTS 
Endpoint       | Descrição
-------------- | -----------------------------
POST /grades   | Retorna uma coleção com as notas obtidas em atividades/provas. 
POST /scores    | Retorna uma coleção com as notas finais obtidas ao final do semestre.
POST /learning_materials  | Retorna uma coleção com todos os materiais de aula disponibilizados pelas disciplinas.
<br>

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=q-scraper&uri=https%3A%2F%2Fgithub.com%2FAlexandreL0pes%2Fq-scraper%2Fblob%2Fmaster%2Fdocs%2Fapi_requests.json)

<br>

### __POST /grades__

### 1. Parâmetros
Nome | Obrigatório | Descrição | Exemplo 
----- | ------------ |--------- | -------------
Matrícula | Obrigatório | Conjunto de números utilizado como identificação do estudante na instituição. | 2014103202030000
Senha | Obrigatório | Coleção de caracteres de segurança para utilização do Q-Acadêmico. | 1SenhaT0talmenteS3gura

  ### 2. Resposta
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

### __POST /scores__

### 1. Parâmetros

Nome      | Condição     | Descrição | Exemplo 
--------- | ------------ |---------- | ------
Matrícula | Obrigatório  | Conjunto de números utilizado como identificação do estudante na instituição. | 2014103202030000
Senha     | Obrigatório  | Coleção de caracteres de segurança para utilização do Q-Acadêmico. | 1SenhaT0talmenteS3gura


  ### 2. Resposta
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

### __POST /learning_materials__

### 1. Parâmetros

Nome      | Condição     | Descrição | Exemplo 
--------- | ------------ |---------- | ------
Matrícula | Obrigatório  | Conjunto de números utilizado como identificação do estudante na instituição. | 2014103202030000
Senha     | Obrigatório  | Coleção de caracteres de segurança para utilização do Q-Acadêmico. | 1SenhaT0talmenteS3gura


  ### 2. Resposta
~~~json 
[
    {
    "subject": "Trabalho de Conclusão I",
    "documents": [
      {
        "date": "17/02/2020",
        "link": "https://academico.ifgoiano.edu.br/cefetweb-uploads/MATERIAIS_AULAS/341005-NORMAS-DE-TC-DOS-CURSOS-DE-GRADUAO-DO-IF-GOIANO-CERES---Aprovado-via-Ordem-de-Servio-66-2019-e-para-publicao.pdf",
        "title": "Regulamento de TC"
      }
    ]
  }
]
~~~
## Licença

[MIT](https://opensource.org/licenses/MIT)

