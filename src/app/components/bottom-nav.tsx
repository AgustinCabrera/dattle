"use client"

import { Info, MessageSquare, Search, User } from 'lucide-react'
import { Button } from './ui/button'


export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="flex justify-around p-2">
        <Button variant="ghost" size="icon" aria-label="Information">
          <Info className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Messages">
          <MessageSquare className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="w-6 h-6" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Profile">
          <User className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}

