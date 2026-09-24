# GourmetOn - Landing Page de Delivery

Aplicação desenvolvida para o Check-Point 05 da disciplina de Web Development with JS.

O GourmetOn é uma landing page fictícia para um aplicativo de delivery. A página apresenta os benefícios do serviço, consulta pratos de uma API pública, permite filtrar o cardápio e possui um formulário para cadastro de e-mail.

## Deploy

**Aplicação publicada:** https://gourmet-on-web5.vercel.app/

Para publicar uma nova versão, importe o repositório na Vercel e confira:

- Framework Preset: `Vite`.
- Build Command: `npm run build`.
- Output Directory: `dist`.

Não é necessário um arquivo `vercel.json`: a página usa navegação por âncoras, e os detalhes são exibidos por estado React, sem rotas adicionais. A configuração padrão de Vite na Vercel atende ao projeto.

## Funcionalidades

- menu fixo com alteração de fundo durante a rolagem;
- navegação suave entre as seções;
- seção principal com chamada e botões;
- apresentação dos benefícios do aplicativo;
- cardápio carregado pela TheMealDB;
- até cinco pratos de cada categoria, com filtro por categoria;
- detalhes com nome, categoria, origem e todos os ingredientes informados pela API;
- mensagem de carregamento;
- tratamento de erro da API;
- depoimentos de clientes;
- formulário de contato;
- botão de download com aviso de disponibilidade;
- rodapé com contato, links sociais e termos de uso;
- layout responsivo para celular, tablet e computador.

## Tecnologias usadas

- React
- Vite
- Tailwind CSS
- JavaScript
- Fetch API
- TheMealDB
- Vercel

## Estrutura do projeto

```text
public/
  favicon.svg
  gourmet-hero.png
src/
  components/
    MealDetails.jsx
  services/
    mealApi.js
  App.jsx
  index.css
  main.jsx
index.html
package.json
vite.config.js
```

O código usa dois componentes e um serviço:

- `App.jsx`: página, estados, efeitos, grupos de pratos, filtro por categoria e formulário.
- `components/MealDetails.jsx`: recebe o prato pela prop `meal` e mostra nome, categoria, origem e ingredientes em um modal. A prop `onClose` limpa a seleção quando o modal fecha.
- `services/mealApi.js`: funções que buscam categorias, pratos de cada categoria e detalhes por ID.
- `main.jsx`: inicia o React.
- `index.css`: importa Tailwind e define os estilos globais.

Os comentários separam estados, efeitos, funções e interface. Não há hook personalizado, roteador, backend, banco de dados ou autenticação.

## Como executar

Pré-requisitos: Node.js e npm.

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Consumo da API

A aplicação chama `getMealsGroupedByCategory(5)` dentro de um `useEffect`. Primeiro, o serviço consulta as categorias:

```text
https://www.themealdb.com/api/json/v1/1/list.php?c=list
```

Depois, para cada categoria, busca os pratos na rota `filter.php?c=`, guarda os cinco primeiros com `slice(0, 5)` e monta os grupos exibidos no cardápio. As consultas das categorias são executadas em paralelo com `Promise.all`.

O estado `pratosPorCategoria` recebe os grupos. O filtro continua sendo feito no navegador: “Todos” mostra todos os grupos, enquanto outra opção mostra somente a categoria escolhida.

A busca por categoria retorna apenas dados resumidos. Por isso, ao clicar em “Ver detalhes”, `getMealById()` consulta `lookup.php?i=` e guarda o objeto completo em `pratoSelecionado`. O componente de detalhes aparece sobre o cardápio, mantendo o filtro e a lista ao fundo. Um `for` percorre `strIngredient1` até `strIngredient20` e exibe apenas campos preenchidos.

O modal usa o elemento HTML `dialog`. O `useRef` guarda uma referência ao elemento, e o `useEffect` chama `showModal()` quando o componente aparece. O navegador controla o foco e permite fechar por Esc; o botão “Fechar” chama `close()`. O evento `onClose` limpa o prato selecionado. O fundo fica escurecido e sem rolagem enquanto o modal está aberto; listas longas rolam dentro dele.

Durante a consulta há uma mensagem de carregamento. Em caso de falha, aparece uma mensagem para atualizar a página; uma lista vazia tem sua própria mensagem. A variável `ativo` impede que uma resposta antiga atualize o estado depois da limpeza do efeito. Em desenvolvimento, o `StrictMode` pode executar o efeito novamente.

## Interações demonstrativas

O botão de download mostra um aviso de disponibilidade futura; não existe aplicativo para baixar. O formulário valida o formato do e-mail pelo HTML e mostra confirmação em estado React, sem salvar ou enviar dados. Os links sociais levam às páginas iniciais das plataformas, pois não foram fornecidos perfis oficiais. Essas escolhas mantêm o projeto acadêmico restrito ao front-end.

## Roteiro para apresentar

1. Mostrar as seções da landing page, o menu fixo e o layout no celular.
2. Abrir `mealApi.js`: explicar `async/await`, `fetch`, `response.ok` e JSON.
3. Abrir `App.jsx`: explicar como `useEffect` carrega os pratos e `useState` atualiza a tela.
4. Escolher uma categoria: explicar como o filtro seleciona o grupo e como `slice` limita cada categoria a cinco pratos.
5. Abrir um prato: explicar a busca dos detalhes por ID, as props de `MealDetails` e o laço dos ingredientes.
6. Demonstrar o formulário e esclarecer oralmente seu funcionamento apenas no navegador.
7. Mostrar exemplos de classes Tailwind, como `sm:grid-cols-2` e `lg:grid-cols-3`, e explicar o build e o deploy.

## Conferência de entrega

Executar `npm run build`, conferir a página em computador e celular, publicar a versão atualizada e enviar os links do repositório e do deploy no Teams. A URL registrada acima não garante que as últimas alterações locais já estejam publicadas.

## Integrantes

- Daniel Roberto
- Leonardo Ferreira
- Jecky Cossio
- Felipe Bandeira Pedrol


## Referências de interface

O projeto usou como referência visual os projetos TaskNote, Organizador Inteligente e VINILAK. A organização do código foi adaptada para seguir o padrão apresentado nas aulas de React, Vite e Tailwind.
