"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


const RegisterAnimalComponents = () => {
  const [formData, setFormData] = useState({
    tag: "",
    breed: "",
    birthDate: ""
  });
  const router = useRouter();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const animalResponse = await fetch('/api/animals',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: formData.tag,
          breed: formData.breed,
          birthDate: new Date().toISOString().slice(0, 10)
        })
      })
      if(!animalResponse.ok){
        throw new Error('Animal tag already exists in the database'); 
      }
      setFormData({
        tag: '',
        breed: '',
        birthDate: ''
      })
      alert("Disease data saved successfully!");
      
    } catch (error) {
      console.error('Error registering animal:', error)
      alert(`An error occurred while saving the data: ${error.message}`);
    }
  }

  return (
    <div  className="container mx-auto py-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Register Animal</h1>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="animalTag" className="text-sm font-medium">
                Animal Tag:
              </label>
              <Input
                id="animalTag"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                placeholder="Enter animal tag"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="breed" className="text-sm font-medium">
                Breed:
              </label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) =>
                  setFormData({ ...formData, breed: e.target.value })
                }
                placeholder="Enter animal breed"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-medium">
                Birth Date:
              </label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                placeholder="Enter animal birth date"
                required
              />
            </div>
            <Button type="submit">Register Animal</Button>
          </form>
          <Button onClick={() => router.push('/animals')}>Back</Button>
        </CardContent>
      </Card>
      
      
    </div>
  )
}

export default RegisterAnimalComponents