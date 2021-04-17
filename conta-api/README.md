# conta-api

## Sobre o projeto
- API REST para gerenciamento de contas, criada para o desafio fullstack para entrevista da Warren
- Deve ser consumida pelo SPA conta-warren

## Tecnologias utilizadas
- Node - Servidor para execução do código
- TypeScript - Linguagem utilizada pelas classes do projeto, a configuração se encontra no arquivo tsconfig.json
- Express - Framework minimalista para construção de projetos Web (a API roda em cima dele)
- Mongoose - Biblioteca para se conectar com o MongoDB
- MongoDB Memory Server - Servidor MongoDB embutido para utilização em testes e demonstrações
- Jest - Criação de testes unitários, integração e e2e
- Node Cron - Execução de processos assincronos agendados

## Executar o projeto
- A aplicação já está pronta para utilizar o MongoDB Memory Server como banco , para um banco real altere a variável DATABASE_URL .env:
- A porta padrão está no .env como 3000 na variável PORT

- Instalar dependências
```
npm install
```
- Iniciar servidor
```
npm run dev
```

## Arquitetura do projeto
### A Arquitetura construida utiliza diversos conceitos de DDD e isto está refletido em toda estrutura da aplicação:
- Centralizar a regra de negócio em classes de domínio, não dependentes de nenhum framework ou infraestrutura externa (banco de dados).
- Também foram utilizados alguns padrões de projeto conhecidos:
- Repository: para abstrair o mongoDB, realizando mapeamento para entidades de negócio e centralizando a persistência dos dados.
- Command: o fluxo das operações da conta (depósito, pagamento, etc.) foram centralizadas em commands, permitindo o crescimento e simplificando a manutenção se crescer.
- Strategy: para a implementação da regra de cálculo para rendimento, cada "estratégia" seria uma forma de render a conta diferente.
- Com essa arquitetura foi possível obter uma cobertura de testes próxima a 100% utilizando testes unitários para o domínio e testes e2e para a API

## Executar testes
```
npm run test:unit
npm run test:integration
npm run test:e2e
Todos: npm run test 
```

## Rotas
```
:id = Identificador da conta
:receiver = Identificador da conta de destino

get('/accounts')
get('/account/new?user=<Nome do usuário da conta>')
get('/account/:id/deposit?value=<Valor>')
get('/account/:id/withdraw?value<Valor>')
get('/account/:id/payment/to/:receiver?value=<Valor>')
get('/account/:id/transactions)
get('/account/:id/balance)
get('/account/:id/accountsForPayment)
  
```

## Funcionalidade de Rendimento
- Para calcular rendimentos para as contas foi criada a classe [CdbStrategy](conta-api/src/domain/entities/Account/Profit/CdbStrategy.ts) que simula um CDB que rende 0,5%
- Para ativar o calculo automático foi criada uma estrutura básica de cron que deve ser ativada no arquivo .env setando a variável CRON_PROFIT = 1
