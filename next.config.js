const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'Develop_user',
        mongodb_password: 'Develop_pass',
        mongodb_cluster: 'cluster0',
        mongodb_database: 'clothing-store',
      },
      reactStrictMode: true,
    };
  }

  return {
    reactStrictMode: true,
  };
};
