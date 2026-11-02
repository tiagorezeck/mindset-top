import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Mindset Coach endpoint
app.post("/api/gemini/coach", async (req, res) => {
  try {
    const { message, scores, history } = req.body;

    const systemInstruction = `Você é o COMET AI Coach, um especialista em psicologia do desenvolvimento, neuroplasticidade e mentalidade de crescimento (baseado nas pesquisas de Carol Dweck e nos 4 instrumentos integrados de avaliação).
O usuário acabou de concluir o diagnóstico de Mindset.
Aqui estão os dados de pontuação do usuário:
- Média Geral: ${scores?.overallAverage || 0} / 5.00
- Classificação: ${scores?.classification || "Não informado"}
- Dimensões / Aspectos: ${JSON.stringify(scores?.dimensions || {})}

Seu objetivo é fornecer orientação empática, científica, encorajadora e altamente prática. Ajude o usuário a refletir sobre seus pontos fortes, planejar o desenvolvimento nas áreas de atenção e propor micro-hábitos diários para cultivar um mindset de crescimento altamente resiliente. Seja cordial, direto, em português do Brasil, utilizando uma linguagem inspiradora e profissional.`;

    const contents = [
      ...(history || []),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "Olá! Como posso ajudar você a desenvolver ainda mais o seu potencial hoje?" });
  } catch (error: any) {
    console.error("Gemini Coach Error:", error);
    res.status(500).json({ error: error.message || "Erro ao processar resposta do Coach de IA." });
  }
});

// Vite middleware integration for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`COMET server running on http://localhost:${port}`);
  });
}

startServer();
