
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('professional');
  const [niche, setNiche] = useState('fitness');
  const [calendar, setCalendar] = useState([]);

  const submit = async () => {
    const res = await axios.post('http://localhost:8000/analyze', { url, tone, niche });
    setCalendar(res.data.content_calendar);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">The Social Network</h1>
      <input className="border p-2 w-full mb-2" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter website or social link" />
      <input className="border p-2 w-full mb-2" value={tone} onChange={e => setTone(e.target.value)} placeholder="Tone (e.g., fun, luxury)" />
      <input className="border p-2 w-full mb-2" value={niche} onChange={e => setNiche(e.target.value)} placeholder="Niche (e.g., fitness, fashion)" />
      <button className="bg-blue-600 text-white px-4 py-2" onClick={submit}>Generate Calendar</button>
      <ul className="mt-4">
        {calendar.map((item, i) => (
          <li key={i} className="border-b py-2">Day {item.day}: {item.post}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
