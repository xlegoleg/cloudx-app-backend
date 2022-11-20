export const parseAuthToken = (token: string): { login: string; password: string } => {
  const [login, password] = Buffer.from(token, 'base64').toString().split(':')
  return { login, password }
}