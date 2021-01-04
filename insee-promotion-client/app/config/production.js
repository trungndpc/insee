export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    DOMAIN: JSON.stringify('https://insee-client.wash-up.vn')
  }
}
