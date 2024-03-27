const config = {
  serverUrl: 'http://localhost:4000',
}

export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}
