/* todo:
1- add cvv
2- add expiry date (allow user choose expiry date)
3- allow user add balance 
4-
*/

const { getRandomInt } = require('./randomize');


const set_date = (year, today = Date.now()) => { 
    today = new Date(Date.now());
    return new Date(today.setFullYear(today.getFullYear() + year));      
};
    
const cvv_and_expiry = (expire_in = 5) => {
    var result = {};
    result.cvv = getRandomInt(100, 999);

    if (expire_in) {
        // user will specify how many years between 1 to 5 years
        // pkg will set expiry from current date
        result.expiry = set_date(expire_in);
    }

    return result;
}

    // fund_card(amount) {
    //     return 
    // }
module.exports = { cvv_and_expiry }