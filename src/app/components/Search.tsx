import { useState } from 'react'

export default function Search() {
  const [cowId, setCowId] = useState('')
  const [searchType, setSearchType] = useState('all')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    setSearchResults([
      'Event 1: Heat detected on 2023-05-01',
      'Event 2: Service performed on 2023-05-15',
      'Event 3: Heat detected on 2023-06-10',
    ])
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Search Events</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="cowId" className="block mb-1">Cow ID:</label>
          <input
            type="text"
            id="cowId"
            value={cowId}
            onChange={(e) => setCowId(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Search Type:</label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2"
          >
            <option value="all">All Events</option>
            <option value="heat">Heat Events</option>
            <option value="service">Service Events</option>
          </select>
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Search Results:</h3>
          <ul className="list-disc pl-5">
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

