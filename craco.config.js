const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#5470FF',
              'secondary-color': '#D9D9D9',
              'info-color': '#67BCFA',
              'danger-color': '#FF2500',
              'black-color': '#000000',
              'white-color': '#ffffff',
              'border-radius-base': '6px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
