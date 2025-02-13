"use client"

import { motion } from "framer-motion"
import { ChevronRight, Menu } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CourseProgress } from "@/components/course-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSlider } from "@/components/animated-slider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { PerformanceChart } from "@/components/performance-chart"
import { RecommendedCourses } from "@/components/recommended-courses"
import { UpcomingEvents } from "@/components/upcoming-events"

const courses = [
  {
    title: "UI/UX Design",
    progress: 65,
    category: "Design",
    icon: "🎨",
  },
  {
    title: "Frontend Development",
    progress: 40,
    category: "Development",
    icon: "💻",
  },
  {
    title: "Data Science Fundamentals",
    progress: 25,
    category: "Data Science",
    icon: "📊",
  },
]

const continueWatching = [
  {
    title: "Advanced React Patterns",
    image: "/placeholder.svg?height=400&width=600",
    category: "Development",
    mentor: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
    },
  },
  {
    title: "UX Research Techniques",
    image: "/placeholder.svg?height=400&width=600",
    category: "Design",
    mentor: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
    },
  },
  {
    title: "Machine Learning Basics",
    image: "/placeholder.svg?height=400&width=600",
    category: "Data Science",
    mentor: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
    },
  },
]

export function MainContent() {
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
        <Header />
        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <WelcomeMessage />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, i) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CourseProgress {...course} />
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatedSlider items={continueWatching} />
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <RecommendedCourses />
              <UpcomingEvents />
            </div>

            <PerformanceChart />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

function WelcomeMessage() {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back, Jason!</CardTitle>
        <CardDescription className="text-purple-100">You're making great progress. Keep it up!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold">75%</div>
            <div className="text-sm">
              <div>Overall Progress</div>
              <div className="text-purple-200">15% increase from last week</div>
            </div>
          </div>
          <Button variant="secondary" className="text-purple-900">
            View Detailed Stats
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

