# `createElement` NO MORE!

Most people know only 2 ways to render HTML using Vanilla JS: by setting the `innerHTML` of the
container element or using `createElement` to create every single HTML element and appending it to
your respective father.

Both approaches are really bad in my opinion, so I was wondering if there's a best way and, guess
what, there is!

This approach uses the `<template>` tag (yes, the same used by the framework VueJS), we need to
make a clone of it, edit this clone and append it to the container. Even it seems a little more
complicated to understand, the code is much more clean.

Let's see examples of those uses:

**`innerHTML` approach**

As you can notice, we create a giant string with all the HTML. This is the easiest way, but it is
also the more difficult to maintain - because we will repeat a lot of code, we don't have the editor
intellisense when working with HTML inside of a string, and we end up mixing responsibilities (our
HTML should contain all the HTML and our JS should handle data).

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

**`createElement` approach**

This one can be even more difficult to maintain, moreover, it is so much verbose and confusing. I
won't talk more, draw your own conclusions:

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

**`<template>` approach**

And here is my favorite one. The concept is similar to the previous, but the key of this technique
is that all the HTML is made on the HTML, but inside a special tag (guess what...) the `template`
tag.

In short, this tag is invisible by default. The only purpose of it is to set all the HTML that will
be used lately by the JS. With the HTML already defined, we only need to make a clone of it, edit
where we need to put the respective data, and append it to the container tag. Each `<template>`
should contain the code for one specific case (think of it as a component).

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

Did you enjoy this new way to render HTML using just Vanilla JS?

**(Corrections and suggestions are welcome =D)**

###### **FOLLOW ME ON SOCIALS:**

LinkedIn: https://www.linkedin.com/in/vinibanaco/

Twitter: [@vinibanaco](https://twitter.com/vinibanaco)

Instagram: [@vinibanaco](https://www.instagram.com/vinibanaco)
