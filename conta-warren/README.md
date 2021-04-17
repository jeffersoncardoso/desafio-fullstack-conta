# conta-warren

## Sobre o projeto
- Single page application para gerenciamento de contas, criada para o desafio fullstack para entrevista da Warren

## Tecnologias utilizadas
- Vue CLI - Componentes e estrutura da aplicação
- Jest - Biblioteca para construção de testes
- Vue Test Utils - Biblioteca para auxiliar em testes de componentes Vue
- Bootstrap - Framework frontend para facilitar construção do deploy
- Axios - Biblioteca para realizar requisições HTTP

## Executar o projeto
- Instalar dependências
```
npm install
```
- Iniciar servidor
```
npm run dev
```

## Arquitetura do projeto
- Arquitetura baseada no Vue, utilizando componentes pequenos e independentes
- As views se localizam na pasta /src/views
- Os componentes se localizam na pasta /src/componentes
- Os componentes wrappers de elementos básicos do html (botões, inputs, etc.) estão na pasta /src/componentes/elements

## Executar testes unitários
```
npm run test:unit
```

## Funcionalidades
- Tela inicial
- Cadastro de conta clicando no botão +
- Tela de Cadastro da Conta
- Depositar dinheiro
- Pagar dinheiro
- Resgatar dinheiro
- Gerar extrato no ícone de documento
