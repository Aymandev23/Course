import { useState } from 'react'
import { motion } from "framer-motion"
import { X, Calendar, Clock } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task: any
  onUpdateTask: (updatedTask: any) => void
}

export function TaskDetailsModal({ isOpen, onClose, task, onUpdateTask }: TaskDetailsModalProps) {
  const [editedTask, setEditedTask] = useState(task)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateTask(editedTask)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <DatePicker
              date={editedTask.dueDate ? new Date(editedTask.dueDate) : undefined}
              setDate={(date) => setEditedTask({ ...editedTask, dueDate: date?.toISOString().split('T')[0] })}
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={editedTask.status}
              onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={editedTask.priority}
              onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input
              id="course"
              value={editedTask.course}
              onChange={(e) => setEditedTask({ ...editedTask, course: e.target.value })}
              required
            />
          </div>
          <Button type="submit">Update Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

