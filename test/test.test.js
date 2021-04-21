const { validateLuhn } = require('./luhn_checker')
const { generateCardNumber } = require('../lib/generate');

var expect = require('chai').expect;

describe('GENERATE PAYMENT CARD', function () {

	it('Should generate a valid payment card number', function (){

		var test_params = {
            "card_brand": "american express",
            "user_digits": {
                "status": true,
                "digits": 2345678991,
                "position": "endswith"
            }
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.card_brand).to.equal('american express');
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	it('<no card brand specified> Should generate a valid payment card number', function (){

		var test_params = {
            "user_digits": {
                "status": true,
                "digits": 2345678991,
                "position": "endswith"
            }
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.card_brand).to.equal('visa');
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	// it('<user_digits.position == "startswith"> Should generate a valid payment card number w/o specified card brand', function (){

	// 	var test_params = {
	// 		"card_brand": "mastercard",
    //         "user_digits": {
    //             "status": true,
    //             "digits": 2345678991,
    //             "position": "startswith"
    //         }
	// 	};

    //     var card_number_details = generateCardNumber(test_params);
    //     var validation = validateLuhn(card_number_details.valid_card_number)

	// 	expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
	// 	expect(card_number_details.card_brand).to.not.equal('mastercard');
	// 	expect(card_number_details).to.have.property('valid_card_number');
	// 	expect(card_number_details).to.have.property('issuer');
	// 	expect(card_number_details).to.have.property('card_brand');
	// });

})