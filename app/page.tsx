"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, ChevronRight, Clock, Menu } from 'lucide-react'

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { CourseProgress } from "@/components/course-progress"
import { ContinueWatchingCard } from "@/components/continue-watching"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    image: "/course.jpg",
    category: "Development",
    mentor: {
      name: "Jane Smith",
      avatar: "/avatar.svg",
    },
  },
  {
    title: "UX Research Techniques",
    image: "/course.jpg",
    category: "Design",
    mentor: {
      name: "Alex Johnson",
      avatar: "/avatar.svg",
    },
  },
  {
    title: "Machine Learning Basics",
    image: "/course.jpg",
    category: "Data Science",
    mentor: {
      name: "Maria Garcia",
      avatar: "/avatar.svg",
    },
  },
  {
    title: "Introduction to Python",
    image: "/course.jpg",
    category: "Development",
    mentor: {
      name: "John Doe",
      avatar: "/avatar.svg",
    },
  },
  {
    title: "Advanced Node.js Concepts",
    image: "/course.jpg",
    category: "Development",
    mentor: {
      name: "Rita Wilson",
      avatar: "/avatar.svg",
    },
  },
  {
    title: "UI/UX Design Principles",
    image: "/course.jpg",
    category: "Design",
    mentor: {
      name: "Maria Garcia",
      avatar: "/avatar.svg",
    },
  },
]

export default function Home() {
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
        <CardDescription className="text-purple-100">
          You're making great progress. Keep it up!
        </CardDescription>
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

