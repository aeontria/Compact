module.exports = {
    apps: [
      {
        name: 'frontend',
        script: 'node_modules/.bin/next',
        args: 'start',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
          PORT: 3028
        },
      },
    ],
  };