import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Google GenAI Initialization
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for writing a personalized poetry/letter
  app.post("/api/write-poem", async (req, res) => {
    try {
      const { gfName, bfName, situation, style, language } = req.body;
      
      const prompt = `Write a beautiful, touching, and romantic apology letter or sorry poem from "${bfName}" to his angry/upset girlfriend "${gfName}".
The reason she is mad or gussa is: "${situation || "minor misunderstanding"}".
Make it in a "${style || "emotional & soulful"}" style and in "${language || "Hinglish (Hindi written in English alphabets)"}" language. 
Add references to how valuable she is, how she lightens up his world, and ask for her forgiveness sweetly. 
Make it feel deeply genuine, romantic, and touch her heart.
Return only the beautifully formatted lines of the letter/poem. Avoid generic intros or AI conversational filler. Just the direct poem/letter content.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ poem: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate romantic apology." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
