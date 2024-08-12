const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req);
    formattedErrors = {} // retrieved concise error messages
    //check if errors exist
    if (Object.keys(errors.errors).length === 0){
        next()
    }
    else{
        errors.errors.map((error) => {
            formattedErrors[error.path] = error.msg;
        });

        res.status(400).json(formattedErrors);
    }
}

module.exports = validate;
