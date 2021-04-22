# Generate payment card
This package generates a valid payment card number. A payment card can either be a credit, debit or otherwise.

[![npm version](https://badge.fury.io/js/generate-payment-card.svg)](https://badge.fury.io/js/generate-payment-card) [![Coverage Status](https://coveralls.io/repos/github/Fiyin-Anne/generate-payment-card/badge.svg)](https://coveralls.io/github/Fiyin-Anne/generate-payment-card) [![Node.js CI](https://github.com/Fiyin-Anne/generate-payment-card/actions/workflows/node.js.yml/badge.svg)](https://github.com/Fiyin-Anne/generate-payment-card/actions/workflows/node.js.yml)


### 🚀 Getting started
Install the package from npm.

`npm install generate-payment-card`.

### 🧰 Basic usage
```javascript
var generatePaymentCard = require('generate-payment-card')
var payment_card_details = generatePaymentCard.generate({
    "card_brand": "american express",
    "user_digits": {
        "status": true,
        "digits": 2345678991,
        "position": "endswith"
    }
})

console.log(payment_card_details)
/* outputs: 
{
    "valid_card_number": "376182345678991",
    "issuing_organisation": "AMERICAN EXPRESS",
    "card_brand": "american express"
}
*/
```

### Request payload

The `generate` function takes in one argument which is an object containing a card_brand (string), user_digits (object) and `issuer` (string).
- `card_brand`: This is the card brand that the user would like to generate a payment card from. Currently, this package is only able to generate Mastercard, Visa, American Express and Discover cards.
- `user_digits`: The user can specify a sequence of not more or less than ten digits which they want to be a part of the payment card number. They can also specify where they want this sequence to be placed by setting `position` to `startswith`, `contains` or `endswith`. This object accepts three keys:
    - `status`: which shows if the user will be specifying their own sequence of digits. This key's property can either be `true`, `false`, 'yes`, or `no`.
    - `digits`: This is the sequence of 10 digits that the user provides.
    - `position`: This indicates where the user wants the digits to be placed in the the generated card numbers.
- `issuer`: This is the specific organization that the user wants the card to be generated from.

### Response payload

Once a payment card number has been generated successfully, it reyurn an object consisting of the following:

- `valid_card_number`: This is the valid card number created.
- `cvv`: This is the card verification value usually found at the back of a payment card. Here, it is generated randomly.
- `expiry_date`: The user can pass their prefered length of years between 1 and 5 after which the card should expire. The default value is 5.
- `balance`: The user can also pass their prefered balance amount between ten thousand and five million. The default value is 0.
- `issuer`: This is the specific organization that the card was generated from.
- `card_brand`: This refers to the brand of the payment card, either `Visa`, `Mastercard`, `Discover`, `American Express` for now.