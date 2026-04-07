⌨️ Keyboards Collection - Frontend Wisdom & Persistence
<p align="center">
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" alt="Vue 3" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

📝 Descrição do Projeto
O Keyboards Collection é o gerenciador de desejos do ecossistema TechKeyboards. Esta aplicação permite que usuários organizem sua futura coleção de teclados mecânicos de forma inteligente. Originalmente concebido para uma estrutura Fullstack, o projeto foi migrado para uma arquitetura Client-Side First, utilizando a reatividade do Vue 3 integrada à persistência de dados via LocalStorage.

Este projeto atua em total sincronia com o TechKeyboards Showcase, recebendo dados em tempo real através da API de eventos do navegador.

✨ Funcionalidades Principais
Persistência Offline: Utilização da LocalStorage API para garantir que os dados permaneçam salvos mesmo após o fechamento do navegador.

Sincronização entre Abas: Recebe gatilhos de inserção de dados vindos diretamente do catálogo externo.

Interface Industrial: Design baseado em Glassmorphism, mantendo a paleta Dark & Red do portfólio principal.

Gestão de Estado: Atualização reativa para marcação de itens adquiridos e remoção com feedback visual.

🎨 Identidade Visual
Logo: Helvetica (Foco no minimalismo).

Títulos: League Gothic (Impacto visual).

Corpo: Montserrat (Conforto na leitura).

Cores: Dark Mode (#050505) e Destaque em Vermelho (#CC0000).

🛠️ Modos de Interação (Para Desenvolvedores)
A aplicação foi desenhada para ser manipulada tanto pela interface quanto via código, provando sua arquitetura desacoplada:

1. Via Catálogo Principal
O site TechKeyboards Showcase funciona como uma API de entrada, injetando novos teclados na lista através de disparos de eventos de armazenamento.

2. Via Console (Direct Injection)
Você pode testar a reatividade do sistema injetando objetos diretamente no LocalStorage através do Console (F12):

JavaScript
let wishlist = JSON.parse(localStorage.getItem('minha_colecao')) || [];
wishlist.push({ 
    id: Date.now(), 
    titulo: "Teclado Injetado via Console", 
    descricao: "Teste de persistência direta", 
    comprado: false 
});
localStorage.setItem('minha_colecao', JSON.stringify(wishlist));
// Recarregue a página para ver a mágica do Vue!
🚀 Como Executar
O projeto utiliza uma arquitetura Serverless no lado do cliente. Para rodar localmente:

Entre na pasta do projeto:

Bash
$ cd keyboards-collection
Instale as dependências:

Bash
$ npm install
Inicie o servidor de desenvolvimento:

Bash
$ npm run dev


🔗 Deploy e Contato
Deploy: Hospedado automaticamente via GitHub Actions no GitHub Pages.
LinkedIn: linkedin.com/in/devcarlosandre
GitHub: github.com/techcarlosandre
Portfólio: Acesse meu trabalho
