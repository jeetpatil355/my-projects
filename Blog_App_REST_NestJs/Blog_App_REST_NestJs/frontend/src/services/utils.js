const config = {
  serverUrl: 'http://localhost:3000',
}

export function createUrl(path) {
  return `${config.serverUrl}/${path}`
}
