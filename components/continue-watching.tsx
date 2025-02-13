"use client"

import { Heart, MoreVertical } from "lucide-react"
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ContinueWatchingProps {
  title: string
  image: string
  category: string
  mentor: {
    name: string
    avatar: string
  }
}

export function ContinueWatchingCard({ title, image, category, mentor }: ContinueWatchingProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Card className="group overflow-hidden">
        <CardHeader className="relative  space-y-0 p-2">
          <div className="absolute right-2 pt-2 px-2 top-2 z-10 flex gap-2">
            <Button variant="secondary" size="icon" className="h-8 w-8 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" className="h-8 w-8 backdrop-blur-sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="rounded bg-[#7C5CFC]/10 px-2 py-1 text-xs font-medium text-[#7C5CFC]">{category}</div>
          </div>
          <h3 className="line-clamp-1 text-sm font-semibold">{title}</h3>
          <div className="mt-4 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={mentor.avatar} />
              <AvatarFallback>{mentor.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{mentor.name}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

