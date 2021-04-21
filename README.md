# Generate payment card

https://img.shields.io/npm/v/generate-payment-card?style=plastic

🚀 Getting started
Install the package from npm using `npm install generate-payment-card`.

:toolbox: Basic usage
```javascript
var { generate } = require('generate-payment-card')
var payment_card_details = generate({
    "card_brand": "american express",
    "user_digits": {
        "status": true,
        "digits": 2345678991,
        "position": "endswith"
    }
})

/* outputs: 
{
    "valid_card_number": "376182345678991",
    "issuing_organisation": "AMERICAN EXPRESS",
    "card_brand": "american express"
}
*/
```

The generator takes in one argument which is a json payload containing a card_brand (string) and user_digits (object).
- card_brand: This is the card brand that the user would like to generate a payment card from. Currently this package is only able to generate mastercard, visa, American Express and Discover cards.
- user_digits: The user can specify a sequence of not more or less than ten digits which they want to be a part of the payment card number. They can also specify where they want this sequence to be placed by setting `position` to either `startswith`, `contains` or `endswith`.