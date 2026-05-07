const express = require('express');
const auth = require('../middleware/auth');
const Groq = require('groq-sdk');

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const crisisKeywords = ['suicide', 'die', 'hurt', 'kill', 'end my life'];

router.post('/', auth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "I didn't quite catch that. Could you say it again?" });
    }

    const lowerMessage = message.toLowerCase();

    // Safety First: Check for crisis keywords
    const hasCrisisKeyword = crisisKeywords.some(keyword => lowerMessage.includes(keyword));

    if (hasCrisisKeyword) {
      return res.status(200).json({
        reply: "It sounds like you are going through a very difficult time. I am an AI and cannot provide the help you need. Please reach out to emergency services or call a crisis helpline immediately (e.g., 112 for emergency services in India, or AASRA Helpline: +91-22-27546669). You are not alone."
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a calming mindfulness companion for the Calmify app. You are NOT a therapist. Keep responses under 3 sentences. Focus on grounding techniques, empathy, and breathing. If a user seems in distress, gently suggest they seek professional help."
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.1-8b-instant", // Using a fast, standard Groq model
    });

    const replyText = chatCompletion.choices[0]?.message?.content || "I'm here for you.";

    res.status(200).json({ reply: replyText });

  } catch (error) {
    console.error("Chat generation error:", error);
    res.status(500).json({ reply: "I'm having a little trouble connecting right now. Let's take a deep breath and try again in a moment." });
  }
});

module.exports = router;
