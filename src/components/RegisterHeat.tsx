import { useState } from 'react'

export default function RegisterHeat() {
  const [animalId, setAnimalId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [observation, setObservation] = useState('')

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ animalId, dateTime, observation })
      })
      if(!response.ok){
        throw new Error(`Error in request: ${response.status}`)
      }
      const result = await response.json()
      console.log('Server response:', result)
      }
    catch (error) {
      console.error('Error submitting form:', error)
    }
    console.log('Heat registered:', { animalId, dateTime, observation })
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Register Heat</h2>
      <div>
        <label htmlFor="animalId" className="block mb-1">Animal ID:</label>
        <input
          type="text"
          id="animalId"
          value={animalId}
          onChange={(e) => setAnimalId(e.target.value)}
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

