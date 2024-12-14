const books = require('../data/books');
const { AppError } = require('../utils/responseHandler');

const findByTitle = (title) => {
  const book = books.find(b => b.title === title);
  if (!book) {
    throw new AppError('Book not found', 404);
  }
  return book;
};

const checkAvailability = (book) => {
  if (!book.available) {
    throw new AppError('Book is not available');
  }
  return true;
};

const updateAvailability = (title, available) => {
  const book = findByTitle(title);
  book.available = available;
  return book;
};

module.exports = {
  findByTitle,
  checkAvailability,
  updateAvailability
};
