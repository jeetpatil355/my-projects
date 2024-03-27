function createError(error) {
  return { status: 'error', error }
}

function createSuccess(data) {
  return { status: 'success', data }
}

module.exports = {
  createError,
  createSuccess,
}
