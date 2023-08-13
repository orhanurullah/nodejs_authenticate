const validate = (validation) => (req, res, next) => {
    const { value, error } = validation.validate(req.body);

    if(error){
        const errorMessage = error.details?.map(detail => detail.message).join(", ");
        res.status(400).json({
            error:errorMessage
        });
    }
    Object.assign(req, value);
    return next();
}

module.exports = validate;