function createSuccess(data){
    return {status: "success", data}
}

function createError(data){
    return {status: "error", data}
}

module.exports = {
    createSuccess,
    createError,
}