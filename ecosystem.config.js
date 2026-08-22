module.exports = {
  apps: [
    {
      name: "vardhman",
      script: "npm",
      args: "start",
      cwd: "/root/vardhman",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
