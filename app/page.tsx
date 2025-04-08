'use client';

import { useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    alert('Form submitted! 🎨 (Plug in your EmailJS or image logic)');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-white flex flex-col items-center justify-center px-6 py-12">
      <section className="text-center max-w-2xl mb-12">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">✨ Ghiblify-me ✨</h1>
        <p className="text-lg text-gray-700">
          Turn your body measurements into a magical Studio Ghibli-style caricature. Enter your measurements and let the transformation begin!
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
      >
        {['height', 'weight', 'chest', 'waist', 'hips'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize text-gray-700" htmlFor={field}>
              {field} (cm)
            </label>
            <input
              id={field}
              name={field}
              type="number"
              value={(formData as any)[field]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Generate my Ghibli character ✨
        </button>
      </form>
    </main>
  );
}
