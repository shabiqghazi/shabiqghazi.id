module.exports = {
  apps: [
    {
      name: "shabiqghazi-id",
      script: "./.output/server/index.mjs",
      cwd: "/root/shabiqghazi_website/shabiqghazi-id", // ← Ganti dengan path kamu
      instances: 1,
      exec_mode: "fork",

      max_memory_restart: "1536M",

      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 3000,
        NODE_OPTIONS: "--max-old-space-size=1024",
      },

      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
