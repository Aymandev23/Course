import { useState } from "react"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LessonDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  lesson: any
  onUpdateLesson: (updatedLesson: any) => void
}

export function LessonDetailsModal({ isOpen, onClose, lesson, onUpdateLesson }: LessonDetailsModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real application, this would control video playback
  }

  const handleRestart = () => {
    setCurrentTime(0)
    setIsPlaying(true)
    // In a real application, this would restart the video
  }

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(event.target.value)
    setCurrentTime(newTime)
    // In a real application, this would seek the video to the new time
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{lesson.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="aspect-video bg-gray-200 rounded-lg relative">
            <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button size="lg" className="rounded-full" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="outline" size="icon" onClick={handleRestart}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  {formatTime(currentTime)} / {lesson.duration}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={currentTime}
              onChange={handleProgressChange}
              className="w-full"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Lesson Description</h3>
            <p className="text-sm text-gray-600">{lesson.description}</p>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Your Progress</h3>
            <Progress value={lesson.progress} className="w-full" />
            <p className="text-sm text-gray-600 mt-2">{lesson.progress}% complete</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

