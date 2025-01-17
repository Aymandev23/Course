"use client"

import { Bell, Mail } from 'lucide-react'
import { motion } from "framer-motion"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white p-4">
      <div className="relative w-full max-w-[500px]">
        <Input
          type="search"
          placeholder="Search your course..."
          className="w-full rounded-full bg-gray-50 pl-12"
        />
        <svg
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <div className="flex items-center gap-4 ml-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="icon" variant="ghost" className="hidden sm:flex">
            <Mail className="h-5 w-5" />
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="icon" variant="ghost">
            <Bell className="h-5 w-5" />
          </Button>
        </motion.div>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline">Jason Ranti</span>
        </motion.div>
      </div>
    </header>
  )
}

