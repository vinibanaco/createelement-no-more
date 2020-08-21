# `createElement` NO MORE!

A maioria das pessoas conhece apenas 2 jeitos de renderizar HTML usando JS Vanilla: definindo o
`innerHTML` do elemento container, ou usando o `createElement` para criar cada um dos elementos HTML
e adicioná-lo ao seu respectivo elemento pai.

Ambas as formas são bem ruins na minha opinião, por isso eu estava me perguntando se existia uma
forma melhor de fazer isso e, adivinha, existe!

Esse método usa a tag `<template>` (sim, a mesma usada pelo framework VueJS). Nela nós precisamos
fazer o clone de um template, editar esse clone e adicioná-lo ao elemento container. Mesmo que isso
se pareça um pouco mais complicado de entender, o código gerado é muito mais limpo.

Vamos ver alguns exemplos:

**Método do `innerHTML`**

Como você pode notar, nós criamos uma _string_ gigante com todo o HTML. Esse é o modo jeito fácil,
mas é também o mais difícil de manter - porque vamos acabar repetindo um monte de código, não
teremos o _intellisense_ do nosso editor com o HTML dentro de uma _string_, e nós acabamos
misturando as responsabilidades (nosso arquivo HTML deveria conter todo o HTML e o nosso JS deveria
lidar com os dados apenas).

```js
posts.forEach((post) => {
  const postElement = `
    <li class="post">
      <section>
        <header class="post__header">
          <h1 class="post__title">${post.title}</h1>
        </header>

        <main>
          <p class="post__body">${post.body}</p>
        </main>

        <footer class="post__footer">
          <span>${post.author.name}</span>
          <span>${post.updatedAt}</span>
        </footer>
      </section>
    </li>
  `;
  postList.innerHTML += postElement;
});
```

**Método do `createElement`**

Essa maneira consegue ser ainda mais difícil de manter, além do mais, é muito mais verbosa e confusa
(apesar de ser um jeito mais "JavaScript" de fazer as coisas). Eu não vou falar mais, tire suas
próprias conclusões:

```js
posts.forEach((post) => {
  const titleElement = document.createElement('h1');
  titleElement.classList = ['post__title'];
  titleElement.textContent = post.title;

  const headerElement = document.createElement('header');
  headerElement.classList = ['post__header'];
  headerElement.appendChild(titleElement);

  // You understood...

  postListElement.appendChild(postElement);
});
```

**Método do `<template>`**

E aqui está o meu favorito. O conceito desse método é similar ao do anterior, porém o diferencial
dessa técnica é que o HTML é feito inteiramente no arquivo HTML, mas ele fica dentro de uma tag
especial (adivinhe...), a tag `<template>`.

Em resumo, essa tag é invisível por padrão. Seu único propósito é definir todo o HTML que será usado
posteriormente pelo JS dentro dela. Com o HTML já definido, nós só precisamos fazer um clone dele,
editar para inserir os respectivos dados, e adicioná-lo ao elemento container. Cada tag `<template>`
deve conter o código para um caso específico apenas (pense nela como se fosse um componente).

```js
// index.html
<template id="post-template">
  <li class="post">
    <section>
      <header class="post__header">
        <h1 id="post-title" class="post__title"></h1>
      </header>

      <main>
        <p id="post-body" class="post__body"></p>
      </main>

      <footer class="post__footer">
        <span id="post-author-name"></span>
        <span id="post-last-update"></span>
      </footer>
    </section>
  </li>
</template>;

// script.js
const postsList = document.querySelector('#post-list');

posts.forEach((post) => {
  // instantiate the template
  const template = document.querySelector('#post-template');

  const title = template.content.querySelector('#post-title');
  const body = template.content.querySelector('#post-body');
  const authorName = template.content.querySelector('#post-author-name');
  const lastUpdate = template.content.querySelector('#post-last-update');

  // set content for the instance
  title.textContent = post.title;
  body.textContent = post.body;
  authorName.textContent = post.author.name;
  lastUpdate.textContent = `Last updated at: ${new Date(
    post.updatedAt,
  ).toLocaleString()}`;

  // clone the instance and append it to desired element
  const postClone = document.importNode(template.content, true);
  postsList.appendChild(postClone);
});
```

E aí? Gostou desse novo jeito de renderizar HTML usando apenas JS Vanilla?

**(Correções e sugestões são bem-vindas =D)**

###### **ME SIGA NAS REDES SOCIAIS:**

LinkedIn: https://www.linkedin.com/in/vinibanaco/

Twitter: [@vinibanaco](https://twitter.com/vinibanaco)

Instagram: [@vinibanaco](https://www.instagram.com/vinibanaco)
