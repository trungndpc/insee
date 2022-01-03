module.exports = {
  __DEV__: true,
  'process.env': {
    NODE_ENV: JSON.stringify('development'),
    DOMAIN: JSON.stringify('https://nhathau.insee.com.vn')
    // DOMAIN: JSON.stringify('https://dev-nhathau.insee.udev.com.vn')
  }
};
