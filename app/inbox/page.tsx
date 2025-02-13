"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Star, Trash2, Archive, ChevronDown, MoreHorizontal, Menu, Plus, RefreshCcw } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NewMessagePopup } from "@/components/new-message-popup"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the Message type
interface Message {
  id: number
  sender: string
  avatar: string
  subject: string
  preview: string
  date: string
  isStarred: boolean
  isRead: boolean
  category: string
}

// Initial messages data
const initialMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    avatar: "/placeholder.svg",
    subject: "Course Update: New UI/UX Design Lessons Available",
    preview: "We've just added new lessons to the UI/UX Design course. Check them out!",
    date: "10:30 AM",
    isStarred: false,
    isRead: false,
    category: "Updates",
  },
  {
    id: 2,
    sender: "Jane Smith",
    avatar: "/placeholder.svg",
    subject: "Reminder: Upcoming Live Session on Frontend Development",
    preview: "Don't forget about our live coding session tomorrow at 2 PM. Be sure to bring your questions!",
    date: "Yesterday",
    isStarred: true,
    isRead: true,
    category: "Reminders",
  },
  {
    id: 3,
    sender: "Course Support",
    avatar: "/placeholder.svg",
    subject: "Your Recent Course Progress",
    preview: "Great job on completing the JavaScript Basics module! Here's what's next on your learning path.",
    date: "2 days ago",
    isStarred: false,
    isRead: true,
    category: "Progress",
  },
  {
    id: 4,
    sender: "Alex Johnson",
    avatar: "/placeholder.svg",
    subject: "Feedback on Your Latest Project",
    preview: "I've reviewed your project submission. Here are some thoughts and suggestions for improvement.",
    date: "3 days ago",
    isStarred: false,
    isRead: true,
    category: "Feedback",
  },
  {
    id: 5,
    sender: "Career Services",
    avatar: "/placeholder.svg",
    subject: "New Job Opportunities for Coursue Graduates",
    preview: "Check out these exciting job openings that match your skill set and course completion.",
    date: "1 week ago",
    isStarred: true,
    isRead: true,
    category: "Opportunities",
  },
]

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessages, setSelectedMessages] = useState<number[]>([])
  const [isNewMessagePopupOpen, setIsNewMessagePopupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const toggleMessageSelection = (id: number) => {
    setSelectedMessages((prev) => (prev.includes(id) ? prev.filter((messageId) => messageId !== id) : [...prev, id]))
  }

  const handleAddMessage = (newMessage: Message) => {
    setMessages([newMessage, ...messages])
  }

  const toggleStar = (id: number) => {
    setMessages(
      messages.map((message) => (message.id === id ? { ...message, isStarred: !message.isStarred } : message)),
    )
  }

  const markAsRead = (id: number) => {
    setMessages(messages.map((message) => (message.id === id ? { ...message, isRead: true } : message)))
  }

  const deleteMessages = () => {
    setMessages(messages.filter((message) => !selectedMessages.includes(message.id)))
    setSelectedMessages([])
  }

  const archiveMessages = () => {
    // In a real application, you would move these to an archive
    // For now, we'll just mark them as read
    setMessages(
      messages.map((message) => (selectedMessages.includes(message.id) ? { ...message, isRead: true } : message)),
    )
    setSelectedMessages([])
  }

  // Filter and search messages
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || message.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Simulating new message arrival
  useEffect(() => {
    const timer = setInterval(() => {
      const newMessage: Message = {
        id: Date.now(),
        sender: "System",
        avatar: "/placeholder.svg",
        subject: "New Notification",
        preview: "You have a new notification regarding your course.",
        date: new Date().toLocaleTimeString(),
        isStarred: false,
        isRead: false,
        category: "Notifications",
      }
      setMessages((prev) => [newMessage, ...prev])
    }, 30000) // New message every 30 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-50 lg:flex-row">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-auto">
        {" "}
        {/* Updated main content div */}
        <Header />
        <main className="flex-1 p-4 lg:p-8">
          {" "}
          {/* Updated <main> tag */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Inbox</h1>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    className="pl-10 w-full"
                    placeholder="Search messages"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Updates">Updates</SelectItem>
                      <SelectItem value="Reminders">Reminders</SelectItem>
                      <SelectItem value="Progress">Progress</SelectItem>
                      <SelectItem value="Feedback">Feedback</SelectItem>
                      <SelectItem value="Opportunities">Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="flex-1 sm:flex-none" onClick={() => setIsNewMessagePopupOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Message
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <Checkbox
                    checked={selectedMessages.length === filteredMessages.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMessages(filteredMessages.map((m) => m.id))
                      } else {
                        setSelectedMessages([])
                      }
                    }}
                  />
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Select
                  </Button>
                  <div className="hidden sm:block h-6 w-px bg-gray-300" />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={archiveMessages}>
                          <Archive className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Archive selected</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="hidden sm:inline-flex" onClick={deleteMessages}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete selected</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-500">{filteredMessages.length} messages</span>
                  <Button variant="ghost" size="icon" onClick={() => setMessages(initialMessages)}>
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-0">
                {filteredMessages.map((message) => (
                  <motion.li
                    key={message.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 ${
                      !message.isRead ? "bg-blue-50" : ""
                    } ${selectedMessages.includes(message.id) ? "bg-blue-100" : ""}`}
                    onClick={() => markAsRead(message.id)}
                  >
                    <Checkbox
                      checked={selectedMessages.includes(message.id)}
                      onCheckedChange={() => toggleMessageSelection(message.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="mr-3 sm:mr-4"
                    />
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-semibold truncate ${!message.isRead ? "text-blue-600" : ""}`}>
                          {message.sender}
                        </p>
                        <span className="text-xs text-gray-500 ml-2">{message.date}</span>
                      </div>
                      <p className={`text-sm truncate ${!message.isRead ? "font-semibold" : ""}`}>{message.subject}</p>
                      <p className="text-xs text-gray-500 truncate hidden sm:block">{message.preview}</p>
                    </div>
                    <div className="ml-2 sm:ml-4 flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {message.category}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={message.isStarred ? "text-yellow-400" : ""}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStar(message.id)
                        }}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </main>
      </div>
      <NewMessagePopup
        isOpen={isNewMessagePopupOpen}
        onClose={() => setIsNewMessagePopupOpen(false)}
        onSendMessage={handleAddMessage}
      />
    </div>
  )
}

