const Joi = require('joi');

const fieldsValidation = (fields) => {
    const fieldsSchema = Joi.object({
        card_brand: Joi.string().valid('visa', 'mastercard', 'discover', 'american express').messages({
            "any.required": "card brand is required.",
            "string.base": "card brand should be a string",
            "any.only": "card brand is not currently supported. [available: 'visa', 'mastercard', 'discover', 'american express']."
        }),
        
        user_digits: Joi.object().keys({
            status: Joi.boolean().default(false), // make status optional -- default to false for now
            digits: Joi.number().integer().min(1000000000).max(9999999999).required().messages({
                "any.required": "user_digits is required.",
                "number.base": "digits should be a number.",
                "number.unsafe": "selected digits must be a sequence of ten digits",
                "number.min": "selected digits must be a sequence of ten digits",
                "number.max": "selected digits must be a sequence of ten digits",
            }),
            position: Joi.required().valid('startswith', 'contains', 'endswith').messages({
                "any.required": "position is required.",
                "any.only": "position is invalid [valid: 'startswith', 'contains', 'endswith']."
            })
        }).messages({
            "any.required": "user_digits is required.",
            "object.base": "user_digits should be an object.",
        }),

        issuer: Joi.string().messages({
            "string.base": "issuer should be a string."
        }),
        expires_in: Joi
                    .date()
                    .greater(Date.now())
                    .less(
                        new Date(Date.now())
                        .setYear(new Date(Date.now())
                        .getFullYear() + 5)
                    ).
                    default(
                        new Date(
                            new Date(Date.now())
                            .setFullYear(new Date(Date.now())
                            .getFullYear() + 5)
                        )
                    ).messages({ 
                        "date.unsafe": "Expiry  year range must be between 1 - 5",
                        "date.greater": "Expiry year range must be greater than today's date",
                        "date.less": "Expiry year range must be less than 5 years"
                    }),  // convert expires_in to be an instance of date so users can set custom expiry date/month -- limited to 5 years

        balance: Joi.number().integer().min(10000).max(5000000).default(0).messages({
            // "number.base": "Balance should be a number.",
            "number.unsafe": "Balance must be between 10000 and 5000000.",
            "number.min": "Balance must be between 10000 and 5000000.",
            "number.max": "Balance must be between 10000 and 5000000."
        }),

    }).messages({
        "object.unknown": "You have used an invalid key."
    });
    return fieldsSchema.validate(fields, { abortEarly: false }); // add in abort early to let users know exact fields they are missing
}

module.exports = { fieldsValidation };
