const Joi = require('joi');

// Validation schemas
const authSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).required(),
    role: Joi.string().valid('admin', 'employee').default('employee'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const expenseSchemas = {
  create: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().min(5).max(500).required(),
    category: Joi.string().valid('billboard', 'influencer', 'email', 'other').required(),
    receipt: Joi.string().required(),
  }),

  updateStatus: Joi.object({
    status: Joi.string().valid('pending', 'approved', 'rejected').required(),
    comment: Joi.string().max(500).optional(),
  }),
};

const campaignSchemas = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    platform: Joi.string().valid('meta', 'google', 'billboard', 'influencer', 'email').required(),
    budget: Joi.number().positive().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
    targetAudience: Joi.object({
      age: Joi.object({
        min: Joi.number().min(13).max(65),
        max: Joi.number().min(13).max(65),
      }).optional(),
      location: Joi.array().items(Joi.string()).optional(),
      interests: Joi.array().items(Joi.string()).optional(),
    }).optional(),
  }),
};

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(detail => detail.message),
      });
    }
    next();
  };
};

// Validate params
const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: 'Invalid parameters',
        details: error.details.map(detail => detail.message),
      });
    }
    next();
  };
};

module.exports = {
  authSchemas,
  expenseSchemas,
  campaignSchemas,
  validate,
  validateParams,
}; 