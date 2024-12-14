const magazines = require('../data/magazines');
const { AppError } = require('../utils/responseHandler');

const findByTitle = (title) => {
  const magazine = magazines.find(m => m.title === title);
  if (!magazine) {
    throw new AppError('Magazine not found', 404);
  }
  return magazine;
};

const checkAvailability = (magazine) => {
  if (!magazine.available) {
    throw new AppError('Magazine is not available');
  }
  return true;
};

const updateAvailability = (title, available) => {
  const magazine = findByTitle(title);
  magazine.available = available;
  return magazine;
};

module.exports = {
  findByTitle,
  checkAvailability,
  updateAvailability
};
