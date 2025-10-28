const { createClient } = require('redis');

console.log('Attempting to connect to Redis...');

// Cria o cliente usando a URL do arquivo .env ou um valor padrão local.
const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

// Adiciona um listener para erros, para que a aplicação não quebre.
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Função anônima auto-executável (IIFE) para conectar ao Redis.
(async () => {
  try {
    await redisClient.connect();
    console.log('Successfully connected to Redis!');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

module.exports = redisClient;