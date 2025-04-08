'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const replicateResponse = await axios.post('/api/generate', formData);
      const image = replicateResponse.data.image;
      setImageUrl(image);

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_email: formData.email,
          image_url: image,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      alert('Ghibli-style image emailed to you! ✨');
    } catch (err) {
      console.error(err);
      alert('Something went wrong 😢');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Ghiblify-me ✨</h1>
      <p className="mb-6 text-lg text-gray-600">
        Enter your details below to receive a custom Ghibli-style image!
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="height"
          placeholder="Height (e.g., 5'9\")"
          required
          value={formData.height}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight (e.g., 150 lbs)"
          required
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="gender"
          required
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Generating...' : 'Ghiblify Me'}
        </button>
      </form>

      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Ghibli Image:</h2>
          <img src={imageUrl} alt="Generated Ghibli Style" className="rounded shadow-md" />
        </div>
      )}
    </main>
  );
}
