export default {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
    DOMAIN: JSON.stringify('http://admin-nt.insee.udev.com.vn')
  }
}
