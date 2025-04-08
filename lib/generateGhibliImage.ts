export async function generateGhibliImage(prompt: string): Promise<string> {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45e...", // replace with actual version
      input: { prompt: prompt }
    })
  });

  const prediction = await response.json();
  return prediction.output?.[0] || "";
}