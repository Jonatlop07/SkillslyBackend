export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['local.app.env'];
    default:
      return 'local.app.env';
  }
}
