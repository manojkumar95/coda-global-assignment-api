const ApiConstants = {
    DATA_NOT_FOUND: { statusCode: 404, status: "Failed"},
    PRE_CONDITION_FAILED: { statusCode: 412, status: "Failed"},
    BAD_REQUEST: { statusCode: 400, status: "Failed" },
    UNPROCESSABLE_ENTITY: { statusCode: 422, status: "Failed" }
}

module.exports = { ApiConstants };