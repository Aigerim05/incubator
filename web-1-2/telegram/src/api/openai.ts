import axios from "axios";

const VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;


export async function sendMessageToGPT4(messages: {role: string, content: string}[]) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages,
      max_tokens: 512,
      temperature: 0.7
    },
    {
      headers: {
        "Authorization": `Bearer ${VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );
  return res.data.choices[0].message.content.trim();
}
