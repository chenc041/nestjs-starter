// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

module.exports = {
  apps: [
    {
      name: pkg.name || 'nestjs-demo',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      instances: -1,
    },
  ],
};
