'use strict';

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
