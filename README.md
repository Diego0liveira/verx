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
