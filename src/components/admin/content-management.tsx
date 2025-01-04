"use client";
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2 } from 'lucide-react'

interface Content {
  id: number
  title: string
  type: string
  status: string
}

export function ContentManagement() {
  const [content, setContent] = useState<Content[]>([
    { id: 1, title: 'Heat Event', type: 'Event', status: 'Published' },
    { id: 2, title: 'New Animal', type: 'Animal', status: 'Draft' },
    { id: 3, title: 'Vaccination', type: 'Event', status: 'Published' },
  ])

  const [newContent, setNewContent] = useState({ title: '', type: '', status: '' })
  const [editingContent, setEditingContent] = useState<Content | null>(null)

  const handleAddContent = () => {
    setContent([...content, { ...newContent, id: content.length + 1 }])
    setNewContent({ title: '', type: '', status: '' })
  }

  const handleEditContent = (item: Content) => {
    setEditingContent(item)
  }

  const handleUpdateContent = () => {
    if (editingContent) {
      setContent(content.map(item => item.id === editingContent.id ? editingContent : item))
      setEditingContent(null)
    }
  }

  const handleDeleteContent = (id: number) => {
    setContent(content.filter(item => item.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Content Management</h2>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Add Content</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Title"
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            />
            <Input
              placeholder="Type"
              value={newContent.type}
              onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
            />
            <Input
              placeholder="Status"
              value={newContent.status}
              onChange={(e) => setNewContent({ ...newContent, status: e.target.value })}
            />
            <Button onClick={handleAddContent}>Add Content</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEditContent(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteContent(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingContent && (
        <Dialog open={!!editingContent} onOpenChange={() => setEditingContent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Title"
                value={editingContent.title}
                onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
              />
              <Input
                placeholder="Type"
                value={editingContent.type}
                onChange={(e) => setEditingContent({ ...editingContent, type: e.target.value })}
              />
              <Input
                placeholder="Status"
                value={editingContent.status}
                onChange={(e) => setEditingContent({ ...editingContent, status: e.target.value })}
              />
              <Button onClick={handleUpdateContent}>Update Content</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

