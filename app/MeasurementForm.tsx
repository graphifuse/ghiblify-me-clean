
"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function MeasurementForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    waist: "",
    hip: "",
    inseam: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePrompt = (data: any) => {
    return `Create a Ghibli-style cute caricature of a person with the following body features: 
    Waist: ${data.waist} inches, Hip: ${data.hip} inches, Inseam: ${data.inseam} inches. 
    They should look cheerful, cozy, and animated like a Studio Ghibli character.`;
  };

  const generateImageURL = (data: any) => {
    const fileSafeName = `${data.name.toLowerCase().replace(/\s+/g, "_")}_ghibli.png`;
    return `https://ghiblify-me.vercel.app/generated/${fileSafeName}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = generatePrompt(formData);
    const image_url = generateImageURL(formData);

    emailjs.send(
      "your_service_id",
      "your_template_id",
      {
        name: formData.name,
        email: formData.email,
        waist: formData.waist,
        hip: formData.hip,
        inseam: formData.inseam,
        prompt: prompt,
        image_url: image_url,
      },
      "your_public_key"
    ).then(() => {
      alert("Submitted! Check your email for the Ghibli prompt and image link.");
    }).catch((error) => {
      console.error("EmailJS error:", error);
      alert("Failed to send email.");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-pink-600 text-center mb-2">Get Ghibli-fied!</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />

      <input
        type="number"
        name="waist"
        placeholder="Waist (in inches)"
        value={formData.waist}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />

      <input
        type="number"
        name="hip"
        placeholder="Hip (in inches)"
        value={formData.hip}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />

      <input
        type="number"
        name="inseam"
        placeholder="Inseam (in inches)"
        value={formData.inseam}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg"
        required
      />

      <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
        Submit
      </button>
    </form>
  );
}
