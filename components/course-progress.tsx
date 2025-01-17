"use client"

import { motion } from "framer-motion"
import { MoreVertical } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseProgressProps {
  title: string
  progress: number
  category: string
  icon: string
}

export function CourseProgress({
  title,
  progress,
  category,
  icon,
}: CourseProgressProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="group relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#7C5CFC] to-[#9179FF] opacity-0 transition-opacity group-hover:opacity-10"
        />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#7C5CFC]/10 p-2">
              <span className="text-lg text-[#7C5CFC]">{icon}</span>
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <div className="text-xs text-gray-500">
                {progress}% completed
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs font-medium text-[#7C5CFC]">
                {category}
              </div>
            </div>
          </div>
          <Button className="w-full mt-4" variant="outline">Continue Learning</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

