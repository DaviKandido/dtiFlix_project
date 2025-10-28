const ApiError = require('../utils/errorHandler.util');

function validateSchema(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issues = result.error.issues;
      const errors = {};

      for (const issue of issues) {
        const field = issue.path[0];
        const message = issue.message;

        if (typeof field === 'string') {
          if (!errors[field]) {
            errors[field] = message;
          }
        }
      }
      return next(new ApiError(400, 'Parâmetros inválidos', errors));
    }
    next();
  };
}

module.exports = validateSchema;
