export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('staging'),
    DOMAIN: JSON.stringify('https://insee-admin-client.wash-up.vn')
  }
}
