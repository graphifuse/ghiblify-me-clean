// app/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [form, setForm] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // placeholder: integrate with EmailJS or API call
    console.log('Form submitted:', form);
    alert('Your Ghibli-style caricature is on the way!');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-emerald-700">✨ Ghiblify-me ✨</h1>
        <p className="text-lg text-gray-700 mb-6">
          Transform yourself into a whimsical Ghibli-style caricature! Just enter your body measurements below and let the magic begin.
        </p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4">
        <input
          type="text"
          name="height"
          placeholder="Height (cm)"
          value={form.height}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          name="weight"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Non-binary</option>
          <option value="prefer_not_say">Prefer not to say</option>
        </select>

        <Button className="w-full" onClick={handleSubmit}>
          Generate My Ghibli Caricature 🎨
        </Button>
      </div>
    </main>
  );
}
