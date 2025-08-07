export async function POST(req) {
  const { prompt } = await req.json();
  console.log(prompt);
  const response = await fetch(
    "https://myhealthopenaiservice.openai.azure.com/openai/deployments/healthOpenAIModel/chat/completions?api-version=2025-01-01-preview",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.AZURE_OPENAI_API_KEY,
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful medical assistant." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  return Response.json({ content: data.choices[0].message.content });
}
// ////////////
