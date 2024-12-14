const users = require('../data/users');
const { AppError } = require('../utils/responseHandler');
const { SUBSCRIPTION_PLANS, MAX_MONTHLY_TRANSACTIONS, MIN_AGE_FOR_CRIME } = require('../config/plans');

const findById = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

const checkTransactionLimit = (user) => {
  if (user.transactionsThisMonth >= MAX_MONTHLY_TRANSACTIONS) {
    throw new AppError('Monthly transaction limit exceeded');
  }
  return true;
};

const checkAgeRestriction = (user, genre) => {
  if (genre === 'Crime' && user.age < MIN_AGE_FOR_CRIME) {
    throw new AppError('Age restriction: Crime books are only available for users 18+');
  }
  return true;
};

const checkBorrowingLimit = (user, itemType) => {
  const plan = SUBSCRIPTION_PLANS[user.plan];
  if (itemType === 'book' && user.borrowedBooks.length >= plan.maxBooks) {
    throw new AppError('Book borrowing limit reached for your plan');
  }
  if (itemType === 'magazine' && user.borrowedMagazines.length >= plan.maxMagazines) {
    throw new AppError('Magazine borrowing limit reached for your plan');
  }
  return true;
};

const updateBorrowedItems = (userId, itemTitle, itemType, isBorrowing = true) => {
  const user = findById(userId);
  const itemList = itemType === 'book' ? 'borrowedBooks' : 'borrowedMagazines';
  
  if (isBorrowing) {
    user[itemList].push(itemTitle);
  } else {
    user[itemList] = user[itemList].filter(item => item !== itemTitle);
  }
  
  user.transactionsThisMonth += 1;
  return user;
};

module.exports = {
  findById,
  checkTransactionLimit,
  checkAgeRestriction,
  checkBorrowingLimit,
  updateBorrowedItems
};
