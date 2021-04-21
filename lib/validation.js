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

        user_check_digit: Joi.number().integer().min(1).max(9).messages({
                "number.base": "digit should be a number.",
                "number.unsafe": "selected digit must be between 1 and 9",
                "number.min": "selected digit must be between 1 and 9",
                "number.max": "selected digit must be between 1 and 9",
            }),
    }).messages({
        "object.unknown": "You have used an invalid key."
    });
    return fieldsSchema.validate(fields);
}

module.exports = { fieldsValidation };
