const express = require("express");
const redis = require("./redisConfig");

const app = express();

// Middleware para interpretar JSON no corpo da requisição
app.use(express.json());

app.post("/atualizar-localizacao", async (req, res) => {
  const { entregadorId, latitude, longitude } = req.body;

  if (!entregadorId || !latitude || !longitude) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  const data = {
    entregadorId,
    latitude,
    longitude,
    timestamp: Date.now(),
  };

  // Publicar no canal Redis
  redis.publish("localizacoes", JSON.stringify(data));

  // Adicionar ao Stream para histórico
  await redis.xadd(
    "historico:localizacoes",
    "*",
    "entregadorId",
    entregadorId,
    "latitude",
    latitude,
    "longitude",
    longitude,
    "timestamp",
    Date.now()
  );

  res.json({ status: "Localização atualizada com sucesso" });
});

app.listen(3000, () => console.log("API rodando em http://localhost:3000"));
