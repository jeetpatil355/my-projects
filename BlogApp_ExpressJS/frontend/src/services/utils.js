const config = {
  serverUrl: 'http://localhost:5000',
}

export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}
