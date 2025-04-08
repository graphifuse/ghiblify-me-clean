// app/page.tsx
"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    const name = form.get("name") as string;

    try {
      const replicateRes = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `Ghibli-style portrait of ${name}` }),
      });

      const { imageUrl } = await replicateRes.json();

      await emailjs.send(
        "your_service_id",
        "your_template_id",
        {
          to_email: email,
          user_name: name,
          image_url: imageUrl,
        },
        "your_public_key"
      );

      alert("Your Ghibli-style portrait has been emailed! ✨");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Ghiblify-me ✨</h1>
      <p className="mb-6">Turn your measurements into a custom Ghibli-style portrait.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          required
        />
        {/* Add other measurement fields as needed */}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate & Send Image"}
        </button>
      </form>
    </main>
  );
}
