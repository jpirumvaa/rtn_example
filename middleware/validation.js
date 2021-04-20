var Joi= require('@hapi/joi');

const checkCompleteData = (req, res, next) => {
    const schema = Joi.object({
        PROVINCE: Joi.string()
            .trim()
            .required()
            .messages({
                'string.required': 'Please, select your province',
                'string.empty': 'Please, select your province'
            }),
        DISTRICT: Joi.string()
            .trim()
            .required()
            .messages({
                'string.required': 'Please, select your district',
                'string.empty': 'Please, select your district'
            }),
        SECTOR: Joi.string()
            .trim()
            .required()
            .messages({
                'string.required': 'Please, select your sector',
                'string.empty': 'Please, select your sector'
            }),
        CELL: Joi.string()
            .trim()
            .required()
            .messages({
                'string.required': 'Please, select your cell',
                'string.empty': 'Please, select your cell'
            }),
        VILLAGE: Joi.string()
            .trim()
            .required()
            .messages({
                'string.required': 'Please, select your village',
                'string.empty': 'Please, select your village'
            }),
        
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    return next();
};
module.exports= checkCompleteData;