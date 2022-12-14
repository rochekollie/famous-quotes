import {getContrastYIQ, getRandomColor} from './modules/beautify.mjs';
import {createCard} from './modules/createCard.mjs';
import {defaultQuery} from './modules/defaultQuery.mjs';

document.addEventListener('DOMContentLoaded', () => {
  async function queryResource(query) {
    const url = `https://api.quotable.io/search/quotes?query=${query}&fields=content`;
    const response = await fetch(url);
    const {results} = await response.json();
    return results;
  }

  /**
   * Returns a random element from an array
   * @param {Array} array - The array to pick a random element from
   * @returns {*} - A random element from the array
   * @example getRandomElement([1, 2, 3]) // 2
   */
  const getRandomArrayItem = (array) => array[Math.floor(Math.random() * array.length)];

  /**
   * Returns the value of a specified HTMLElement
   * @param {HTMLElement} element - The element to get the value from
   * @returns {string} The value of the element
   */
  const getHTMLElementValue = (element) => {
    // check if the element is an input
    if (element.tagName === 'INPUT') {
      const {value} = element;
      return value;
    } else {
      return element.textContent;
    }
  };

  const fillInput = (input, value) => {
    if (input && value) {
      input.value = value;
    }
  };

  async function displayQuotes(query) {
    // fill the input field with the query
    const searchField = document.getElementById('search-field');
    fillInput(searchField, query);

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
      document.querySelector('#cards-wrapper')?.appendChild(card);
      colorize(card);
    });
  }

  const searchQuotes = () => {
    let query = document.querySelector('#search-field').value;
    if (query) {
      document.querySelector('#cards-wrapper').innerHTML = '';
      fillInput(document.querySelector('#search-field-field'), query);
      displayQuotes(query);
      updateTitle();
    } else {
      document.querySelector('#no-query').style.display = 'block';
    }
  };

  // get search-field and search-field button
  const searchField = document.querySelector('#search-field');
  const getQuoteButton = document.querySelector('#search-button');

  // Attach an event listener to the `button`
  getQuoteButton?.addEventListener('click', searchQuotes);
  searchField?.addEventListener('keyup', searchQuotes);

  // Attach an event listener to when the user presses the `Enter` key
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      searchQuotes;
    }
  });

  /**
   *
   */
  const updateTitle = () => {
    document.title = '';
    const query = getHTMLElementValue(searchField);
    // change the first letter to uppercase
    const queryCapitalized = query.charAt(0).toUpperCase() + query.slice(1);
    document.title = `Famous Quotes - ${queryCapitalized}`;
  };

  function colorize() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(function (section) {
      section.style.backgroundColor = getRandomColor();
      section.style.color = getContrastYIQ(getRandomColor());
    });
  }

  // hide and show the #no-query element
  const hideNoQuery = () => {
    const searchField = document.querySelector('#search-field');
    const noQuery = document.querySelector('#no-query');
    if (searchField.value === '') {
      noQuery.style.display = 'none';
    } else {
      noQuery.style.display = 'block';
    }
  };


  //TODO: allows the user to search-field a quote based an ide
  const searchQuotesByTagName = () => {
    const tags = document.querySelectorAll('.tags');
    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        const query = tag.textContent;
        displayQuotes(query);
      });
    });
  };

  // Attach an event listener to the `tags`
  // const tags = document.querySelectorAll('.tags');
  // tags?.addEventListener('click', searchQuotesByTagName);

  // load the page with quotes
  hideNoQuery();
  displayQuotes(getRandomArrayItem(defaultQuery));
  searchQuotesByTagName()
  updateTitle();

});
