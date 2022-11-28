import {createCard} from './modules/createCard.mjs';
import {defaultQuery} from './modules/defaultQuery.mjs';

document.addEventListener('DOMContentLoaded', () => {
  async function queryResource(query) {
    const url = `https://api.quotable.io/search/quotes?query=${query}&fields=content`;
    const response = await fetch(url);
    const {results} = await response.json();
    return results;
  }

  const getRandomArrayItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const autoFillField = (input, value) => {
    if (input && value) {
      input.value = value;
    }
  };

  async function displayQuotes(query) {
    // fill the input field with the query
    const searchField = document.getElementById('search-field');
    autoFillField(searchField, query);

    // get the quotes
    const quotes = await queryResource(query);
    quotes.forEach((quote) => {
      // create card based on it number of tags
      const card = createCard(quote.tags.length);

      // display each quote, author, and tags in the card
      const quoteElement = card.querySelector('.quote');
      quoteElement.textContent = quote.content;
      const authorElement = card.querySelector('.author');
      authorElement.textContent = quote.author;
      const tagsWrapper = card.querySelector('.tags-wrapper');

      // get the tags in the card
      const tags = tagsWrapper.querySelectorAll('.tags');
      tags.forEach((tag, index) => {
        tag.textContent = quote.tags[index];
      });

      // append the card to the container
      document.querySelector('#cards-wrapper').appendChild(card);
    });
  }


  // const searchQuotes = () => {
  //   // clear the cards-wrapper
  //   document.querySelector('#cards-wrapper').innerHTML = '';
  //
  //   const getQuoteButton = document.querySelector('#search-button');
  //   getQuoteButton.addEventListener('click', () => {
  //     const query = document.querySelector('#search-field').value;
  //     displayQuotes(query);
  //   });
  // };

  //searchQuotes();

  // Attach an event listener to the `button`
  //getQuoteButton?.addEventListener('click', displayQuotes);

  // function colorize(components) {
  //   components.forEach(function (section) {
  //     section.style.backgroundColor = getRandomColor();
  //     section.style.color = getContrastYIQ(getRandomColor());
  //   });
  // }

  // const createCardComponents = (count) => {
  //   const components = [];
  //   for (let i = 0; i < count; i += 1) {
  //     components.push(createCard());
  //   }
  //   return components;
  // };

  // function displayQuotes(promise) {
  //   //
  // }

  // const getQuoteTag = () => {
  //   const tags = document.querySelectorAll('.tags');
  //   let quoteTag = '';
  //   tags.forEach((tag) => {
  //     tag.addEventListener('click', (event) => {
  //       quoteTag = event.target.innerHTML;
  //     });
  //   });
  //   console.log(quoteTag);
  // };

  // function searchQuotesByTagName(tagValue) {
  //   //
  // }

  // load the page with quotes
  //displayQuotes();
  //colorize(document.querySelectorAll('section')); // experiment and delete it

  // call the searchQuotesByTagName function
  //searchQuotesByTagName(getQuoteTag());
  //getQuoteTag();
  displayQuotes(getRandomArrayItem(defaultQuery));
});
