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

interface CourseCardProps {
  title: string
  description: string
  image: string
  progress: number
  category: string
  mentor: {
    name: string
    avatar: string
  }
}

export function CourseCard({
  title,
  description,
  image,
  progress,
  category,
  mentor,
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card>
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {category}
            </div>
            <div className="text-xs text-muted-foreground">
              {progress}% watched
            </div>
          </div>
          <CardTitle className="mt-2 line-clamp-1">{title}</CardTitle>
          <CardDescription className="mt-1 line-clamp-2">
            {description}
          </CardDescription>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="text-sm font-medium">{mentor.name}</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

