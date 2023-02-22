const { getRandomInt } = require('./randomize');

const set_date = (expires_in) => {
// since expires_in is guaranteeed to be a date at this point, perhaps we can return an object with
// month/year format to cater for UI logic and Date format to cater for backend logic

//   return {
//     full_date: expires_in,
//     date_month: `${expires_in
//       .getMonth()
//       .toString()
//       .padStart(2, '0')}/${expires_in
//       .getFullYear()
//       .toString()
//       .padStart(2, '0')}`,
//   };

  return expires_in;
};

const cvv_and_expiry = (expires_in) => {
  var result = {};
  result.cvv = getRandomInt(100, 999);
  result.expiry = expires_in // moved expiration logic to validation layer
  // set_date(expires_in); 

  return result;
};

// fund_card(amount) {
//     return
// }
module.exports = { cvv_and_expiry };
