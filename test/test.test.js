const { validateLuhn } = require('./luhn_checker')
const { generateCardNumber } = require('../lib/generate');

var expect = require('chai').expect;

describe('GENERATE PAYMENT CARD', function () {


	//Basic usage
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
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuing_organisation');
		expect(card_number_details).to.have.property('card_brand');
	});

})