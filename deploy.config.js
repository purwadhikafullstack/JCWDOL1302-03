module.exports = {
    apps: [
      {
        name: 'jcwdol130203-web',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2707,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwdol130203.purwadhikabootcamp.com/apps/web',
      },
      {
        name: 'jcwdol130203-api',
        script: 'npm',
        args: 'run serve',
        env: {
          PORT: 2807,
          NODE_ENV: 'production',
        },
        cwd: '/var/www/html/jcwdol130203.purwadhikabootcamp.com/apps/api',
      },
    ],
}
