"use client";
import React, { useState, useEffect } from "react";

const RegisterDiseaseComponent = () => {
  const [formData, setFormData] = useState({
    animalId: "",
    name: "",
    observation: "",
  });

  const [commonDiseases, setCommonDiseases] = useState([]);

  // Fetch the list of common diseases
  useEffect(() => {
    const fetchCommonDiseases = async () => {
      try {
        const response = await fetch("/api/diseases/common-diseases", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch common diseases");
        }
        const data = await response.json();
        setCommonDiseases(data);
      } catch (error) {
        console.error("Error fetching common diseases:", error);
        alert("Failed to load common diseases");
      }
    };

    fetchCommonDiseases();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an event for the animal
      const eventResponse = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "DISEASE",
          animalId: formData.animalId,
          description: formData.observation,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      if (!eventResponse.ok) {
        const errorData = await eventResponse.json();
        throw new Error("Failed to create event");
      }

      const eventData = await eventResponse.json();
      const eventId = eventData.id;

      // Save the disease record linked to the event
      const diseaseData = {
        name: formData.name,
        observation: formData.observation,
        eventId,
      };

      const diseaseResponse = await fetch("/api/diseases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseaseData),
      });

      if (!diseaseResponse.ok) {
        throw new Error("Failed to save disease data");
      }

      setFormData({
        animalId: "",
        name: "",
        observation: "",
      });

      alert("Disease data saved successfully!");
    } catch (error) {
      console.error(error);
      alert(`An error occurred while saving the data: ${error.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md justify-center items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register Disease</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="animalId" className="block mb-1">
            Animal ID:
          </label>
          <input
            type="text"
            id="animalId"
            value={formData.animalId}
            onChange={(e) =>
              setFormData({ ...formData, animalId: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block mb-1">
            Disease:
          </label>
          <select
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2"
            required
          >
            <option value=""> Select a Disease </option>
            {commonDiseases.map((disease) => (
              <option key={disease.id} value={disease.name}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="observation" className="block mb-1">
            Observation:
          </label>
          <input
            type="text"
            id="observation"
            value={formData.observation}
            onChange={(e) =>
              setFormData({ ...formData, observation: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Register Disease
        </button>
      </form>
    </div>
  );
};

export default RegisterDiseaseComponent;

