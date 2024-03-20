# Brain Agriculture API

Esta é uma API desenvolvida utilizando o framework Adonis.js na versão 6 e PostgreSQL como banco de dados. O objetivo desta API é gerenciar o cadastro de produtores rurais e suas respectivas fazendas, além de fornecer um dashboard com informações relevantes sobre esses cadastros.

## Funcionalidades Principais

- Cadastro, edição e exclusão de produtores rurais.
- Validação de CPF e CNPJ.
- Controle de áreas da fazenda (total, agricultável e de vegetação).
- Registro de culturas plantadas em cada fazenda.
- Dashboard com estatísticas sobre os produtores e suas fazendas.

## Pré-requisitos

- Node.js
- PostgreSQL
- Adonis.js v6

## Instalação

1. Clone este repositório:

```sh
git clone https://github.com/Diego0liveira/verx.git
```

2. Clone este repositório:

```sh
cd api-adonis
npm install
```

3. Configure o arquivo .env com as informações do seu banco de dados PostgreSQL:

```sh
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=brain_agriculture
```

4. Execute as migrações para criar a estrutura do banco de dados:

```sh
node ace migration:run
```

5. Inicie o servidor:

```sh
npm run start
```

## Testes Automatizados
A API possui testes automatizados implementados com Japa. Para executar os testes, utilize o seguinte comando:

```sh
npm run test
```

## Uso
A API estará disponível em http://localhost:3333. Você pode utilizar ferramentas como o Postman ou o Insomnia para interagir com os endpoints disponíveis. Consulte a documentação da API para obter informações detalhadas sobre como usar cada endpoint.


## Documentação da API

### Endpoints Disponíveis:
- GET /producer => Lista todos os produtores rurais.
- POST /producer => Cria um novo produtor rural.
- POST /producer/search => Pesquisa produtores rurais por critérios específicos.
- PUT /producer/:id => Atualiza as informações de um produtor rural específico.
- GET /producer/:id => Retorna os detalhes de um produtor rural específico.
- DELETE /producer/:id => Exclui um produtor rural específico.
- GET /producer/farms-quantity => Retorna o total de fazendas cadastradas.
- GET /producer/farms-area => Retorna a área total de todas as fazendas cadastradas.
- GET /producer/farms-state => Retorna o total de fazendas agrupadas por estado.
- GET /producer/farms-area-culture => Retorna a área agrícola plantada agrupada por cultura.
- GET /producer/farms-area-use => Retorna a área utilizada para agricultura e vegetação em todas as fazendas.
- GET /location-state => Lista todos os estados disponíveis.
- GET /location-city => Lista todas as cidades disponíveis.
- GET /location-city/:id => Retorna os detalhes de uma cidade específica.
- GET /planted-crops => Lista todas as culturas plantadas disponíveis.



## Contratos de API
Aqui estão os contratos de API para os diferentes endpoints disponíveis:

### Produtores (Producer)
#### 1. PDC001 - Criar Produtor
- Método: POST
- Rota: /producer
- Descrição: Cria um novo produtor rural com os detalhes fornecidos.
- Corpo da Solicitação:

```sh
{
  "document": "26896644000101",
  "producerName": "João da Silva",
  "farmName": "Fazenda Esperança",
  "totalArea": 100,
  "arableArea": 80,
  "vegetationArea": 10,
  "locationCityId": 1,
  "plantedCrops": [1, 2]
}
```

####  2. PDC002 - Atualizar Produtor
- Método: PUT
- Rota: /producer/{{idProducer}}
- Descrição: Atualiza as informações de um produtor rural específico.
- Corpo da Solicitação:

```sh
{
  "document": "26896644000101",
  "producerName": "João da Silva Editado",
  "farmName": "Fazenda Esperança Editado",
  "totalArea": 100,
  "arableArea": 80,
  "vegetationArea": 20,
  "locationCityId": 1,
  "plantedCrops": [1, 2]
}
```

####  3. PDC003 - Excluir Produtor
- Método: DELETE
- Rota: /producer/{{idProducer}}
- Descrição: Exclui um produtor rural específico.

####  4. PDC004 - Obter Produtor por ID
- Método: GET
- Rota: /producer/{{idProducer}}
- Descrição: Obtém os detalhes de um produtor rural específico.

####  5. PDC005 - Pesquisar Produtores
- Método: POST
- Rota: /producer/search
- Descrição: Pesquisa produtores rurais com base nos critérios fornecidos.
- Corpo da Solicitação:

```sh
{
    "page": 1,
    "limit": 5,
    "producerName": null,
    "farmName": null,
    "locationCities": [],
    "plantedCrops": [],
    "initialDate": null,
    "finalDate": null
}
```

####  6. PDC006 - Encontrar Todos os Produtores
- Método: GET
- Rota: /producer
Descrição: Lista todos os produtores rurais.


### Dashboard

####  1. DSB001 - Obter Quantidade de Fazendas
- Método: GET
- Rota: /producer/farms-quantity
- Descrição: Retorna a quantidade total de fazendas cadastradas.
- Exemplo de Resposta:

```sh
{
    "total_farms": "8"
}
```

####  2. DSB002 - Obter Área Total
- Método: GET
- Rota: /producer/farms-area
- Descrição: Retorna a área total de todas as fazendas cadastradas.
- Exemplo de Resposta:

```sh
{
    "total_area": "15200.00"
}
```

####  3. DSB003 - Obter por Estado
- Método: GET
- Rota: /producer/farms-state
- Descrição: Retorna a quantidade de fazendas agrupadas por estado.
- Exemplo de Resposta:

```sh
[
    {
        "location_state_id": "1",
        "full_name": "São Paulo",
        "count": "3"
    },
    {
        "location_state_id": "9",
        "full_name": "Ceará",
        "count": "2"
    },
    {
        "location_state_id": "5",
        "full_name": "Paraná",
        "count": "2"
    },
    {
        "location_state_id": "7",
        "full_name": "Santa Catarina",
        "count": "1"
    }
]
```

####  4. DSB004 - Obter por Cultura
- Método: GET
- Rota: /producer/farms-area-culture
- Descrição: Retorna a área agrícola plantada agrupada por cultura.
- Exemplo de Resposta:

```sh
[
    {
        "planted_crops_id": "6",
        "name": "Trigo",
        "total": "1"
    },
    {
        "planted_crops_id": "3",
        "name": "Algodão",
        "total": "2"
    },
    {
        "planted_crops_id": "5",
        "name": "Cana-de-açúcar",
        "total": "3"
    },
    {
        "planted_crops_id": "4",
        "name": "Café",
        "total": "2"
    },
    {
        "planted_crops_id": "8",
        "name": "Feijão",
        "total": "1"
    },
    {
        "planted_crops_id": "2",
        "name": "Milho",
        "total": "3"
    },
    {
        "planted_crops_id": "1",
        "name": "Soja",
        "total": "4"
    }
]
```

####  5. DSB005 - Obter Uso de Área
- Método: GET
- Rota: /producer/farms-area-use
- Descrição: Retorna a área utilizada para agricultura e vegetação em todas as fazendas.
- Exemplo de Resposta:

```sh
{
    "arable_area": "7600.00",
    "vegetation_area": "7600.00"
}
```


### Cidade (City)

####  1. CT001 - Encontrar Cidades por Estado
- Método: GET
- Rota: /location-city/{{idState}}
- Descrição: Lista todas as cidades disponíveis em um estado específico.
- Exemplo de Resposta:

```sh
[
    {
        "id": "1",
        "name": "São Paulo",
        "locationStateId": "1",
        "locationState": {
            "id": "1",
            "fullName": "São Paulo",
            "shortName": "SP"
        }
    },
    {
        "id": "2",
        "name": "Campinas",
        "locationStateId": "1",
        "locationState": {
            "id": "1",
            "fullName": "São Paulo",
            "shortName": "SP"
        }
    }
]
```

####  2. CT002 - Encontrar Todas as Cidades
- Método: GET
- Rota: /location-city
- Descrição: Lista todas as cidades disponíveis.
- Exemplo de Resposta:

```sh
[
    {
        "id": "10",
        "name": "Goiânia",
        "locationStateId": "9"
    },
    {
        "id": "9",
        "name": "Fortaleza",
        "locationStateId": "8"
    },
    {
        "id": "8",
        "name": "Brasília",
        "locationStateId": "7"
    },
]
```


### Estado (State)

####  1. PDC005 - Encontrar Todos os Estados
- Método: GET
- Rota: /location-state
- Descrição: Lista todos os estados disponíveis.
- Exemplo de Resposta:

```sh
[
    {
        "id": "9",
        "fullName": "Ceará",
        "shortName": "CE"
    },
    {
        "id": "8",
        "fullName": "Goiás",
        "shortName": "GO"
    },
    {
        "id": "7",
        "fullName": "Santa Catarina",
        "shortName": "SC"
    },
]
```


### Culturas Plantadas (Planted Crops)

####  1. PC001 - Encontrar Todas as Culturas Plantadas
- Método: GET
- Rota: /planted-crops
- Descrição: Lista todas as culturas plantadas disponíveis.
- Exemplo de Resposta:

```sh
[
    {
        "id": "10",
        "name": "Batata",
        "createdAt": "2024-03-20T04:03:49.567+00:00",
        "updatedAt": "2024-03-20T04:03:49.567+00:00"
    },
    {
        "id": "9",
        "name": "Tomate",
        "createdAt": "2024-03-20T04:03:49.567+00:00",
        "updatedAt": "2024-03-20T04:03:49.567+00:00"
    },
    {
        "id": "8",
        "name": "Feijão",
        "createdAt": "2024-03-20T04:03:49.567+00:00",
        "updatedAt": "2024-03-20T04:03:49.567+00:00"
    },
]
```