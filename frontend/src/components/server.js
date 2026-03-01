//
//  server.js
//  
//
//  Created by Shu Hanchen on 1/3/26.
//
// server.js
import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const app = express();
app.use(bodyParser.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/breakdown', async (req, res) => {
  try {
    const { task, timeLimitMinutes } = req.body;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are an elementary school teacher. Given a task, break it into 3–7 short, concrete steps a child can follow.'
        },
        {
          role: 'user',
          content: `Task: "${task}". Time limit (minutes): ${timeLimitMinutes}. Return ONLY a JSON array of steps, where each step is a short sentence.`
        }
      ],
      response_format: { type: 'json_object' } // optional if you want strict JSON
    });

    const raw = completion.choices[0].message.content;

    // Expect something like: { "steps": ["...", "..."] }
    let steps;
    try {
      const parsed = JSON.parse(raw);
      steps = parsed.steps || [];
    } catch {
      // Fallback: if model returned a plain JSON array
      steps = JSON.parse(raw);
    }

    res.json({ steps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate breakdown.' });
  }
});

app.listen(3001, () => {
  console.log('AI breakdown server running on http://localhost:3001');
});

