export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('staging'),
    DOMAIN: JSON.stringify('http://dev-admin-nhathau.insee.udev.com.vn')
  }
}
