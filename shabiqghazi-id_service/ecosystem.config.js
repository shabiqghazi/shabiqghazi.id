module.exports = {
  apps: [
    {
      name: "shabiqghazi-service",
      script: "npm",
      args: "start",
      cwd: "/root/shabiqghazi_website/shabiqghazi-id_service", // ← Ganti dengan path kamu
      instances: 1,
      exec_mode: "fork",

      max_memory_restart: "512M",

      env: {
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=512",
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
