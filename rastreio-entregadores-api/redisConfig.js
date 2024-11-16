const Redis = require("ioredis");

// Conexão com Redis no localhost ou Docker (ajuste conforme necessário)
const redis = new Redis({
  host: "127.0.0.1", // Para Docker, use 'host.docker.internal' se necessário
  port: 6379,
});

module.exports = redis;
