"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Clock, BookOpen, Users, MessageCircle, Menu, Play } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AddCoursePopup } from "@/components/add-course-popup"
import { LessonDetailsModal } from "@/components/lesson-details-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const courseStats = [
  { icon: Clock, label: "32 hours", description: "Course Duration" },
  { icon: BookOpen, label: "24 Lessons", description: "Course Chapters" },
  { icon: Users, label: "1.2k Students", description: "Enrolled" },
  { icon: MessageCircle, label: "4.8/5", description: "Course Rating" },
]

export default function LessonPage() {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isAddCoursePopupOpen, setIsAddCoursePopupOpen] = useState(false)
  const [isLessonDetailsModalOpen, setIsLessonDetailsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to UI/UX Design",
      description: "Learn the basics of user interface and user experience design",
      duration: "1:30:00",
      progress: 75,
      image: "/placeholder.svg?height=100&width=200",
      category: "Design",
    },
    {
      id: 2,
      title: "Color Theory in Web Design",
      description: "Understand how to use color effectively in your designs",
      duration: "0:45:00",
      progress: 50,
      image: "/placeholder.svg?height=100&width=200",
      category: "Design",
    },
    {
      id: 3,
      title: "Responsive Design Principles",
      description: "Master the art of creating layouts that work on any device",
      duration: "2:00:00",
      progress: 25,
      image: "/placeholder.svg?height=100&width=200",
      category: "Development",
    },
    {
      id: 4,
      title: "Typography for the Web",
      description: "Learn how to choose and pair fonts for optimal readability",
      duration: "1:00:00",
      progress: 0,
      image: "/placeholder.svg?height=100&width=200",
      category: "Design",
    },
    {
      id: 5,
      title: "JavaScript Fundamentals",
      description: "Get started with the basics of JavaScript programming",
      duration: "3:00:00",
      progress: 10,
      image: "/placeholder.svg?height=100&width=200",
      category: "Development",
    },
    {
      id: 6,
      title: "React.js Essentials",
      description: "Learn the core concepts of React.js for building modern web applications",
      duration: "4:00:00",
      progress: 5,
      image: "/placeholder.svg?height=100&width=200",
      category: "Development",
    },
  ])

  const filteredLessons = lessons
    .filter((lesson) => {
      const matchesSearch =
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || lesson.category.toLowerCase() === filterCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "progress") {
        return b.progress - a.progress
      }
      return 0
    })

  const handleAddCourse = (course: any) => {
    const newLesson = {
      id: lessons.length + 1,
      title: course.title,
      description: course.description,
      duration: "1:00:00", // placeholder
      progress: 0,
      image: course.image ? URL.createObjectURL(course.image) : "/placeholder.svg?height=100&width=200",
      category: course.category || "Uncategorized",
    }
    setLessons([...lessons, newLesson])
  }

  const handleUpdateLesson = (updatedLesson: any) => {
    setLessons(lessons.map((lesson) => (lesson.id === updatedLesson.id ? updatedLesson : lesson)))
  }

  return (
    <ProtectedRoute>
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
          <Header />
          <main className="flex-1 p-4 lg:p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">All courses</h1>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 w-full"
                      placeholder="Search lessons"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="flex-1 sm:flex-none" onClick={() => setIsAddCoursePopupOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {courseStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs sm:text-sm">{stat.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessons.map((lesson) => (
                  <motion.div key={lesson.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setIsLessonDetailsModalOpen(true)
                      }}
                    >
                      <CardHeader className="relative p-0">
                        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                          <img
                            src={lesson.image || "/placeholder.svg"}
                            alt={lesson.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <Button variant="secondary" size="icon" className="absolute right-2 top-2 h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <Badge variant="outline">{lesson.category}</Badge>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">{lesson.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-medium">{lesson.progress}% Complete</span>
                          </div>
                          <Progress value={lesson.progress} className="w-1/2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </main>
        </div>
        <AddCoursePopup
          isOpen={isAddCoursePopupOpen}
          onClose={() => setIsAddCoursePopupOpen(false)}
          onAddCourse={handleAddCourse}
        />
        {selectedLesson && (
          <LessonDetailsModal
            isOpen={isLessonDetailsModalOpen}
            onClose={() => setIsLessonDetailsModalOpen(false)}
            lesson={selectedLesson}
            onUpdateLesson={handleUpdateLesson}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

