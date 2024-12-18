"use client"
import React from 'react'
import { useState } from 'react'
import Search from './Search'
import RegisterHeat from './RegisterHeat'
import RegisterService from './RegisterService'


const Principal = () => {
  const [activeTab, setActiveTab] = useState('registerHeat')
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-8">Dattle Management System</h1>
      <div className="mb-6">
        <button
          onClick={() => setActiveTab('registerHeat')}
          className={`px-4 py-2 mr-2 ${activeTab === 'registerHeat' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Register Heat
        </button>
        <button
          onClick={() => setActiveTab('registerService')}
          className={`px-4 py-2 mr-2 ${activeTab === 'registerService' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Register Service
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 ${activeTab === 'search' ? 'bg-black text-white' : 'bg-gray-200'}`}
        >
          Search
        </button>
      </div>
      <div className="border border-gray-300 p-6">
        {activeTab === 'registerHeat' && <RegisterHeat />}
        {activeTab === 'registerService' && <RegisterService />}
        {activeTab === 'search' && <Search />}
      </div>
    </div>
  )

}
export default Principal


