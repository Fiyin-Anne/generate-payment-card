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
    "valid_card_number": "374692345678991"
    "cvv": 591
    "expiry_date": Fri Apr 24 2026 17:44:00 GMT+0100 (West Africa Standard Time)
    "balance: 0
    "issuer": "AMERICAN EXPRESS"
    "card_brand": "american express"
}
*/
```
_P.S: If testing with the exact values used above, output for some of the properties may differ slightly due to time difference and randomization used in creation some of the values._

### Request payload

The `generate` function takes in one argument which is an object. This can contain a couple of properties including a `card_brand` (string), `user_digits` (object) and `issuer` (string). 

The only required property is `user_digits`. This allows the user to specify a sequence of strictly ten digits which they want to be a part of the payment card number. They can also specify where they want this sequence to be placed by setting `position` to `startswith`, `contains`, or `endswith`. The `user_digits` value consists of three properties:
- `status`: which shows if the user will be specifying their own sequence of digits. This key's property can either be `true`, `false`, `yes`, or `no`. If set to `false`, and no other property is provided, a visa payment card will be created and the other fields will have default values. Also, if it is set to false, every other property in the `user_digits` object will be disregarded.
- `digits`: This is the sequence of 10 digits that the user provides.
- `position`: This indicates where the user wants the digits to be placed in the the generated card numbers. If the value is `startswith` and the user also passes a `card_brand` value, the digits will be prioritised over the value. 

### Response payload

Once a payment card number has been generated successfully, it returns an object consisting of the following:

- `valid_card_number`: This is the valid card number created.
- `cvv`: This is the card verification value usually found at the back of a payment card. Here, it is generated randomly.
- `expiry_date`: The user can pass their prefered length of years between 1 and 5 after which the card should expire. The default value is 5.
- `balance`: The user can also pass their prefered balance amount between ten thousand and five million. The default value is 0.
- `issuer`: This is the specific organization that the card was generated from.
- `card_brand`: This refers to the brand of the payment card. Currently, this package is only able to generate Mastercard, Visa, American Express and Discover cards.


### Sample requests
1. Sending a payload without specifying card_brand:
```javascript
{
    "user_digits": {
        "status": true,
        "digits": 2345678991,
        "position": "endswith"
    }
}
```

**Output:**
```javascript
{
    "valid_card_number": "4381392345678991"
    "cvv": 604
    "expiry_date": Fri Apr 24 2026 16:31:11 GMT+0100 (West Africa Standard Time)
    "balance": 0
    "issuer": "UNICREDIT BANK SERBIA JSC BELGRAD"
    "card_brand": "visa"
}
```
If no card brand is passed, the default is `Visa`.

2. Sending a payload with card_brand:
```javascript
{
    "user_digits": {
        "status": true,
        "digits": 2345678991,
        "position": "endswith"
    }
}
```

**Output:**
```javascript
{
    "valid_card_number": "6011322345678991",
    "cvv": 993,
    "expiry_date": Fri Apr 24 2026 17:58:01 GMT+0100 (West Africa Standard Time),
    "balance": 0,
    "issuer": "BANK OF AMERICA",
    "card_brand": "discover"
}
```

### Error messages
Each key in the object parameter goes through a `joi` validator before a payment card number can be created. Errors could also arise due to other limitations.

### Sample invalid request
1. The database being used in this package is limited so there is a limit to the number of issuers supported.

```javascript
{
    "card_brand": "mastercard",
    "user_digits": {
        "status": true,
        "digits": 3745678991,
        "position": "startswith"
    },
    "issuer": "access bank"
};
```

Outputs:
`Error: This card brand is not available for this company or company does not exist in our database.`

2. Expiry date higher than 5 years
```javascript
{
    "card_brand": "american express",
    "user_digits": {
        "status": true,
        "digits": 2345678991,
        "position": "endswith"
    },
    "expires_in": 10
}
```
Outputs: `Error: ValidationError: Expiry year must be between 1 and 5.`

3. Balance higher than 5million
```javascript
{
    "card_brand": "visa",
    "user_digits": {
        "status": true,
        "digits": 3745678991,
        "position": "contains"
    },
    "issuer": "bank of america",
    "balance": 200000000,
};
```
Outputs: `Error: ValidationError: Balance must be between 10000 and 5000000.`

4. Card brand not `Visa`, `Mastercard`, `American Express` or `Discover`.
```js
{
    "card_brand": "Maestro",
    "user_digits": {
        "status": true,
        "digits": 3745678991,
        "position": "contains"
    },
    "issuer": "bank of america",
    "balance": 2000,
};
```
Outputs: `Error: ValidationError: card brand is not currently supported. [available: 'visa', 'mastercard', 'discover', 'american express'].
`