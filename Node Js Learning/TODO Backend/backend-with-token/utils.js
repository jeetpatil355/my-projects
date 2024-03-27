function createSuccess(data) {
  return { status: 'success', data }
}

function createError(error) {
  return { status: 'error', error }
}

module.exports = {
  createError,
  createSuccess,
}
