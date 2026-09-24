# GourmetOn - Landing Page de Delivery

Aplicação desenvolvida para o Check-Point 05 da disciplina de Web Development with JS.

O GourmetOn é uma landing page fictícia para um aplicativo de delivery. A página apresenta os benefícios do serviço, consulta pratos de uma API pública, permite filtrar o cardápio e possui um formulário para cadastro de e-mail.

**Aplicação publicada:** https://gourmet-on-web5.vercel.app/

## Funcionalidades

- menu fixo com alteração de fundo durante a rolagem;
- navegação suave entre as seções;
- seção principal com chamada e botões;
- apresentação dos benefícios do aplicativo;
- cardápio carregado pela TheMealDB;
- filtro de pratos por categoria;
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

- `App.jsx`: página, estados, efeitos, filtro por categoria e formulário.
- `components/MealDetails.jsx`: recebe o prato pela prop `meal` e mostra nome, categoria, origem e ingredientes em um modal. A prop `onClose` limpa a seleção quando o modal fecha.
- `services/mealApi.js`: função `getMeals()`, responsável pelo Fetch e pela leitura do JSON.
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

A aplicação chama `getMeals()` dentro de um `useEffect`. O serviço consulta:

```text
https://www.themealdb.com/api/json/v1/1/search.php?s=
```

Essa consulta retorna uma seleção de pratos, não todo o catálogo da TheMealDB. O serviço verifica `response.ok`, lê `response.json()` e retorna `data.meals ?? []`. Os objetos mantêm os campos originais da API.

O estado `pratos` recebe a lista. As categorias são extraídas desses pratos com `map` e `Set`; o filtro usa `filter` no navegador, sem outra requisição. “Todos” mostra todos os pratos recebidos.

Ao clicar em “Ver detalhes”, o objeto é guardado em `pratoSelecionado` e o componente de detalhes aparece sobre o cardápio, mantendo o filtro e a lista ao fundo. Um `for` percorre `strIngredient1` até `strIngredient20` e exibe apenas campos preenchidos. Não há busca por ID porque os detalhes já vieram na primeira resposta.

O modal usa o elemento HTML `dialog`. O `useRef` guarda uma referência ao elemento, e o `useEffect` chama `showModal()` quando o componente aparece. O navegador controla o foco e permite fechar por Esc; o botão “Fechar” chama `close()`. O evento `onClose` limpa o prato selecionado. O fundo fica escurecido e sem rolagem enquanto o modal está aberto; listas longas rolam dentro dele.

Durante a consulta há uma mensagem de carregamento. Em caso de falha, aparece uma mensagem para atualizar a página; uma lista vazia tem sua própria mensagem. A variável `ativo` impede que uma resposta antiga atualize o estado depois da limpeza do efeito. Em desenvolvimento, o `StrictMode` pode executar o efeito novamente.

## Interações demonstrativas

O botão de download mostra um aviso de disponibilidade futura; não existe aplicativo para baixar. O formulário valida o formato do e-mail pelo HTML e mostra confirmação em estado React, sem salvar ou enviar dados. Os links sociais levam às páginas iniciais das plataformas, pois não foram fornecidos perfis oficiais. Essas escolhas mantêm o projeto acadêmico restrito ao front-end.

## Roteiro para apresentar

1. Mostrar as seções da landing page, o menu fixo e o layout no celular.
2. Abrir `mealApi.js`: explicar `async/await`, `fetch`, `response.ok` e JSON.
3. Abrir `App.jsx`: explicar como `useEffect` carrega os pratos e `useState` atualiza a tela.
4. Escolher uma categoria: explicar que `Set` remove categorias repetidas e `filter` seleciona os pratos.
5. Abrir um prato: explicar as props de `MealDetails` e o laço dos ingredientes.
6. Demonstrar o formulário e esclarecer oralmente seu funcionamento apenas no navegador.
7. Mostrar exemplos de classes Tailwind, como `sm:grid-cols-2` e `lg:grid-cols-3`, e explicar o build e o deploy.

## Conferência de entrega

Executar `npm run build`, conferir a página em computador e celular, publicar a versão atualizada e enviar os links do repositório e do deploy no Teams. A URL registrada acima não garante que as últimas alterações locais já estejam publicadas.

## Integrantes

- Daniel Roberto 571746
- Leonardo Ferreira 571311
- Jecky Cossio 572226
- Felipe Bandeira Pedrol 569631

## Referências de interface

O projeto usou como referência visual os projetos TaskNote, Organizador Inteligente e VINILAK. A organização do código foi adaptada para seguir o padrão apresentado nas aulas de React, Vite e Tailwind.