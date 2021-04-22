const { generateCheckDigit } = require('./luhn_check_digit');
const { getRandomInt } = require('./randomize');
const { fieldsValidation } = require('./validation');
const card_bins = require('./card_brands_mixed');
const { cvv_and_expiry } = require('../lib/additional_service');

module.exports = {
    generateCardNumber(data) {

        let validation;
        if(!data.user_digits.status) {
            validation = fieldsValidation({card_brand : data.card_brand});
        }
        else {
            validation = fieldsValidation(data);
        }
        const { error } = validation;
        
        if(error) throw new Error(error)

        const { user_digits } = data;
        const { status, position, digits } = user_digits;
        var card_numbers = [];
        var user_account, card_bin, check_digit, valid_card_number, issuer, card_brand_bins, card_brand, cvv_and_expiry_date;


        if (data.user_digits.status && data.user_digits.position === 'startswith') {
            //todo: find a more effective way to identify brand by first 2 to 4 digits
            var first_digits = String(data.user_digits.digits).slice(0,2);
            first_digits = parseInt(first_digits);
            if (first_digits >= 40 && first_digits <= 49) {
                card_brand = 'visa'
            } else if (first_digits === 37 || first_digits === 34) {
                card_brand = 'american express';
            } else if ((first_digits >= 51 && first_digits <= 55) || (first_digits >= 22 && first_digits <= 27)) {
                card_brand = 'mastercard';
            } else if ((first_digits >= 64 && first_digits <= 65) || first_digits === 60 || first_digits === 62)  {
                card_brand = 'discover';
            }
        } else{
            card_brand = !data.card_brand || data.card_brand.length === 0 ? 'visa' : data.card_brand;
        }
        
        if (data.issuer) {
            card_brand_bins = card_bins.filter(bin => bin["BRAND"] === card_brand.toUpperCase() && bin["COMPANY_NAME"].startsWith(data.issuer.toUpperCase()));
            if (card_brand_bins.length === 0) throw new Error("This card brand is not available for this company or company does not exist in our database.")
        } else {
            card_brand_bins = card_bins.filter(bin => bin["BRAND"] === card_brand.toUpperCase());
        
        }
        const issuer_details = card_brand_bins[Math.floor(Math.random()*card_brand_bins.length)];

        issuer = issuer_details["COMPANY_NAME"];
        card_bin = card_brand === "american express" ? Math.trunc(issuer_details["BIN"]/10) : issuer_details["BIN"];

        if (status === true) {
            switch(position) {
                case 'startswith':
                    //card_brand selected by user is irrelevant if they want the card nums to start with a seq of their choosing
                    // card brand returned will depend on the first - fourth digits they selected

                    //issuer = issuer_details["COMPANY_NAME"];

                    card_bin = digits;
                    card_numbers.push(card_bin);

                    user_account = getRandomInt(10000, 99999);
                    card_numbers.push(user_account);

                    check_digit = generateCheckDigit(card_numbers, user_digits);
                    card_numbers.push(check_digit);
                    break;

                case 'endswith':
                    card_bin = Math.trunc(card_bin/10)
                    card_numbers.push(card_bin);

                    card_numbers.push(digits);

                    check_digit = generateCheckDigit(card_numbers, user_digits);
                    card_numbers.splice(1, 0, check_digit);
                    break;

                case 'contains':
                    //to do: allow user specify where they want the sequence to start. 
                    // they can only choose between positions 2,3,4,5,6
                    card_bin = Math.trunc(card_bin/10);
                    card_numbers.push(card_bin);

                    card_numbers.push(digits);

                    check_digit = generateCheckDigit(card_numbers, user_digits);
                    card_numbers.push(check_digit);
                    break;
            }
        } 
         else {
            card_numbers.push(card_bin);

            user_account = getRandomInt(100000000, 999999999);
            card_numbers.push(user_account);

            check_digit = generateCheckDigit(card_numbers, user_digits);
            card_numbers.push(check_digit);

        }
        valid_card_number = card_numbers.join("");

        if (data.expires_in) {
            cvv_and_expiry_date = cvv_and_expiry(data.expires_in);
        } else {
            cvv_and_expiry_date = cvv_and_expiry() 
        }

        
        return {
            valid_card_number: valid_card_number,
            cvv: cvv_and_expiry_date.cvv,
            expiry_date: cvv_and_expiry_date.expiry,
            balance: data.balance ? data.balance : 0,
            issuer: issuer,
            card_brand: card_brand,
        };
    }
}
