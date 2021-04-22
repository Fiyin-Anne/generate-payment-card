const Joi = require('joi');

const fieldsValidation = (fields) => {
    const fieldsSchema = Joi.object({
        card_brand: Joi.string().valid('visa', 'mastercard', 'discover', 'american express').messages({
            "any.required": "card brand is required.",
            "string.base": "card brand should be a string",
            "any.only": "card brand is not currently supported. [available: 'visa', 'mastercard', 'discover', 'american express']."
        }),
        
        user_digits: Joi.object().keys({
            status: Joi.boolean().required().messages({
                "any.required": "status is required.", 
                "boolean.base": "status should be true, false, yes or no.",
            }),
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

        expires_in: Joi.number().integer().min(1).max(5).messages({
            "number.base": "digits should be a number.",
            "number.unsafe": "Expiry year must be a single digit.",
            "number.min": "Expiry year must be between 1 and 5.",
            "number.max": "Expiry year must be between 1 and 5.",
        }),

        balance: Joi.number().integer().min(10000).max(5000000).messages({
            "number.base": "Balance should be a number.",
            "number.unsafe": "Balance must be between 10000 and 5000000.",
            "number.min": "Balance must be between 10000 and 5000000.",
            "number.max": "Balance must be between 10000 and 5000000."
        }),

    }).messages({
        "object.unknown": "You have used an invalid key."
    });
    return fieldsSchema.validate(fields);
}

module.exports = { fieldsValidation };
