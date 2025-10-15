module.exports = {
  apps: [
    {
      name: "shabiqghazi-id",
      script: ".output/server/index.mjs",
      exec_mode: "fork", // jangan cluster
      instances: 1,
      node_args: "--max-old-space-size=256", // limit 256MB heap
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "shabiqghazi-service",
      script: "dist/server.js",
      exec_mode: "fork",
      instances: 1,
      node_args: "--max-old-space-size=256",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
