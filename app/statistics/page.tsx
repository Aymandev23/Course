"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, Users, BookOpen, TrendingUp, ArrowUpRight, ArrowDownRight, Menu } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Placeholder function for chart data
const getChartData = () => {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000) + 500)
}

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Students",
    value: "1,234",
    change: "+12.5%",
    icon: Users,
    trend: "up",
  },
  {
    title: "Courses Offered",
    value: "42",
    change: "+2.4%",
    icon: BookOpen,
    trend: "up",
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "-3.2%",
    icon: TrendingUp,
    trend: "down",
  },
]

const topCourses = [
  { name: "UI/UX Design Masterclass", students: 456, revenue: 22800 },
  { name: "Full-Stack Web Development", students: 389, revenue: 19450 },
  { name: "Data Science Fundamentals", students: 321, revenue: 16050 },
  { name: "Mobile App Development with React Native", students: 287, revenue: 14350 },
]

const revenueBreakdown = [
  { category: "Course Sales", amount: 32500, percentage: 65 },
  { category: "Subscriptions", amount: 12500, percentage: 25 },
  { category: "Workshops", amount: 3750, percentage: 7.5 },
  { category: "Other", amount: 1250, percentage: 2.5 },
]

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const chartData = getChartData()

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
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Statistics</h1>
              <Tabs value={timeRange} onValueChange={setTimeRange}>
                <TabsList>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                  <TabsTrigger value="3m">3m</TabsTrigger>
                  <TabsTrigger value="1y">1y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {stat.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    {/* Replace this div with an actual chart component */}
                    <div className="flex h-full items-end gap-2">
                      {chartData.map((value, index) => (
                        <div
                          key={index}
                          className="bg-primary"
                          style={{
                            height: `${(value / Math.max(...chartData)) * 100}%`,
                            width: `${100 / chartData.length}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                  <CardDescription>Based on enrollment and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCourses.map((course, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.students} students</p>
                        </div>
                        <div className="text-sm font-medium">${course.revenue.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue sources and their contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">{item.category}</p>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">${item.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Key metrics for user activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium">Daily Active Users</p>
                      <p className="text-2xl font-bold">2,345</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avg. Session Duration</p>
                      <p className="text-2xl font-bold">18m 32s</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Retention Rate</p>
                    <div className="flex items-center">
                      <div className="flex-1">
                        <Progress value={72} className="h-2" />
                      </div>
                      <span className="ml-4 text-sm font-medium">72%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

