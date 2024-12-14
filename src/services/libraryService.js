const bookService = require('./bookService');
const magazineService = require('./magazineService');
const userService = require('./userService');

const borrowItem = async (userId, itemType, title) => {
  const user = userService.findById(userId);
  userService.checkTransactionLimit(user);
  userService.checkBorrowingLimit(user, itemType);

  if (itemType === 'book') {
    const book = bookService.findByTitle(title);
    userService.checkAgeRestriction(user, book.genre);
    bookService.checkAvailability(book);
    bookService.updateAvailability(title, false);
  } else if (itemType === 'magazine') {
    const magazine = magazineService.findByTitle(title);
    magazineService.checkAvailability(magazine);
    magazineService.updateAvailability(title, false);
  } else {
    throw new Error(`Invalid item type: ${itemType}`);
  }

  return userService.updateBorrowedItems(userId, title, itemType, true);
};

const returnItems = async (userId, items) => {
  const user = userService.findById(userId);
  userService.checkTransactionLimit(user);

  for (const title of items) {
    const isBook = user.borrowedBooks.includes(title);
    const isMagazine = user.borrowedMagazines.includes(title);

    if (isBook) {
      bookService.updateAvailability(title, true);
      userService.updateBorrowedItems(userId, title, 'book', false);
    } else if (isMagazine) {
      magazineService.updateAvailability(title, true);
      userService.updateBorrowedItems(userId, title, 'magazine', false);
    } else {
      throw new Error(`Item not found in user's borrowed items: ${title}`);
    }
  }

  return true;
};

module.exports = {
  borrowItem,
  returnItems
};
