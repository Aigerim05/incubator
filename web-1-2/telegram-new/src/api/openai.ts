export async function fetchOpenAIChat(messages: { role: "user" | "assistant"; content: string }[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error("OpenAI API key not set in .env");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages,
      max_tokens: 256,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error("OpenAI API error");
  const data = await res.json();
  return data.choices[0].message.content.trim();
}
