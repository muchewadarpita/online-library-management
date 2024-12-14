const libraryService = require('../services/libraryService');
const { handleResponse, handleError } = require('../utils/responseHandler');

const borrowItem = async (req, res) => {
  try {
    const { userId, itemType, title } = req.body;
    await libraryService.borrowItem(userId, itemType, title);
    return handleResponse(res, 200, 'Item borrowed successfully');
  } catch (error) {
    return handleError(res, error);
  }
};

const returnItems = async (req, res) => {
  try {
    const { userId, items } = req.body;
    await libraryService.returnItems(userId, items);
    return handleResponse(res, 200, 'Items returned successfully');
  } catch (error) {
    return handleError(res, error);
  }
};

module.exports = {
  borrowItem,
  returnItems
};
