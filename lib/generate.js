const { generateCheckDigit } = require('./luhn_check_digit');
const { getRandomInt } = require('./randomize');
const { fieldsValidation } = require('./validation');
const card_bins = require('./card_brands_mixed');

module.exports = {
    generateCardNumber(data) {

        let validation ;
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
        var user_account, card_bin, check_digit, valid_card_number, issuer, card_brand_bins, card_brand;


        // const card_brand_variety = {
        //     "american express": [34, 37],
        //     "visa": [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        //     "discover": [601, 622, 644, 645, 646, 647, 648, 649, 65],
        //     "mastercard": [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
        // };

        // if (data.user_digits.status && data.user_digits.position === 'startswith') {
        //     //
        //     if (String(data.user_digits.digits).startsWith('6')) {
        //         // slice the first 
        //     }

        // }
        card_brand = !data.card_brand || data.card_brand.length === 0 ? 'visa' : data.card_brand;

        if (data.issuer) {
            card_brand_bins = card_bins.filter(bin => bin["BRAND"] === card_brand.toUpperCase() && bin["COMPANY_NAME"] === data.issuer.toUpperCase());
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

                    issuer = issuer_details["COMPANY_NAME"];

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
        
        return {
            valid_card_number: valid_card_number,
            issuer: issuer,
            card_brand: card_brand
        };
    }
}
