import { useState } from 'react'

export default function RegisterService() {
  const [cowId, setCowId] = useState('')
  const [bullId, setBullId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [observation, setObservation] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Service registered:', { cowId, bullId, dateTime, observation })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Register Service</h2>
      <div>
        <label htmlFor="cowId" className="block mb-1">Cow ID:</label>
        <input
          type="text"
          id="cowId"
          value={cowId}
          onChange={(e) => setCowId(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="bullId" className="block mb-1">Bull ID:</label>
        <input
          type="text"
          id="bullId"
          value={bullId}
          onChange={(e) => setBullId(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="dateTime" className="block mb-1">Date and Time:</label>
        <input
          type="datetime-local"
          id="dateTime"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="observation" className="block mb-1">Observation:</label>
        <textarea
          id="observation"
          value={observation}
          onChange={(e) => setObservation(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 h-24"
        />
      </div>
      <button type="submit" className="bg-black text-white px-4 py-2">Save</button>
    </form>
  )
}

