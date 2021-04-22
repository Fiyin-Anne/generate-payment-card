const { validateLuhn } = require('./luhn_checker')
const { generateCardNumber } = require('../lib/generate');

var expect = require('chai').expect;

describe('GENERATE PAYMENT CARD', function () {

	it('<with specified digits> Should generate a valid payment card number', function (){

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
		expect(card_number_details).to.have.property('cvv');
		expect(card_number_details).to.have.property('balance');
		expect(card_number_details).to.have.property('expiry_date');
	});

	it('<with specified expiry date> Should generate a valid payment card number', function (){

		var test_params = {
            "card_brand": "american express",
            "user_digits": {
                "status": true,
                "digits": 2345678991,
                "position": "endswith"
            },
			"expires_in": 3
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number);

		var verify_year = new Date(card_number_details.expiry_date).getFullYear() - new Date(Date.now()).getFullYear();

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(verify_year).to.equal(test_params.expires_in);
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	it('<without specified digits> Should generate a valid payment card number', function (){

		var test_params = {
            "card_brand": "american express",
            "user_digits": {
                "status": false,
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


	it('<no card brand specified> Should generate a valid visa payment card number', function (){

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

	it('<position == "startswith"> Should generate a valid payment card number w/o specified card brand', function (){

		var test_params = {
			"card_brand": "mastercard",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "startswith"
            }
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.card_brand).to.not.equal('mastercard');
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	it('<position == "startswith"> Should generate a valid payment card number w/o specified card brand', function (){

		var test_params = {
			"card_brand": "visa",
            "user_digits": {
                "status": true,
                "digits": 5145678991,
                "position": "startswith"
            }
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.card_brand).to.not.equal('visa');
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	it('<card brand from specific specific issuer> Should generate a valid payment card number', function (){

		var test_params = {
			"card_brand": "visa",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "contains"
            },
			"issuer": "bank of america"
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.card_brand).to.equal('visa');
		expect(card_number_details.issuer).to.be.a('string').and.satisfy(msg => msg.startsWith('BANK OF AMERICA'));
		expect(card_number_details).to.have.property('valid_card_number');
		expect(card_number_details).to.have.property('issuer');
		expect(card_number_details).to.have.property('card_brand');
	});

	it('<balance specified> Should generate a valid payment card number', function (){

		var test_params = {
			"card_brand": "visa",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "contains"
            },
			"issuer": "bank of america",
			"balance": 200000,
		};

        var card_number_details = generateCardNumber(test_params);
        var validation = validateLuhn(card_number_details.valid_card_number)

		expect(validation).to.equal(`${card_number_details.valid_card_number} is a valid payment card number`);
		expect(card_number_details.balance).to.equal(test_params.balance);
	});

	it('<card brand not available for specific issuer> Should return error', function (){

		var test_params = {
			"card_brand": "mastercard",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "startswith"
            },
			"issuer": "access bank"
		};

		expect(() => { generateCardNumber(test_params); }).to.throw("This card brand is not available for this company or company does not exist in our database.");
	
	});

	it('<with specified expiry date greaterr than 5> Should throw error', function (){

		var test_params = {
            "card_brand": "american express",
            "user_digits": {
                "status": true,
                "digits": 2345678991,
                "position": "endswith"
            },
			"expires_in": 10
		};

		expect(() => { generateCardNumber(test_params); }).to.throw("Expiry year must be between 1 and 5.");
	
	});

	it('<balance specified greater than 5million> Should throw error', function (){

		var test_params = {
			"card_brand": "visa",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "contains"
            },
			"issuer": "bank of america",
			"balance": 200000000,
		};

        expect(() => { generateCardNumber(test_params); }).to.throw("Balance must be between 10000 and 5000000.");
	
	});

	it('<balance specified greater than 5million> Should throw error', function (){

		var test_params = {
			"card_brand": "visa",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "contains"
            },
			"issuer": "bank of america",
			"balance": 2000,
		};

        expect(() => { generateCardNumber(test_params); }).to.throw("Balance must be between 10000 and 5000000.");
	
	});

	it('<card brand not supported> Should throw error', function (){

		var test_params = {
			"card_brand": "Maestro",
            "user_digits": {
                "status": true,
                "digits": 3745678991,
                "position": "contains"
            },
			"issuer": "bank of america",
			"balance": 2000,
		};

        expect(() => { generateCardNumber(test_params); }).to.throw("card brand is not currently supported. [available: 'visa', 'mastercard', 'discover', 'american express'].")
	
	});
	


})