export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    // DOMAIN: JSON.stringify('https://insee-client.wash-up.vn')
    DOMAIN: JSON.stringify('https://insee-promotion.herokuapp.com')
    // DOMAIN: JSON.stringify('http://localhost:8080')

    
  }
}
