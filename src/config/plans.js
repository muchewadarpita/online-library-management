const SUBSCRIPTION_PLANS = {
  SILVER: {
    maxBooks: 2,
    maxMagazines: 0
  },
  GOLD: {
    maxBooks: 3,
    maxMagazines: 1
  },
  PLATINUM: {
    maxBooks: 4,
    maxMagazines: 2
  }
};

const MAX_MONTHLY_TRANSACTIONS = 10;
const MIN_AGE_FOR_CRIME = 18;

module.exports = {
  SUBSCRIPTION_PLANS,
  MAX_MONTHLY_TRANSACTIONS,
  MIN_AGE_FOR_CRIME
};