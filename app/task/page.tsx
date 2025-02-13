"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Calendar, Clock, MoreHorizontal, Menu, Trash2, Edit } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AddTaskPopup } from "@/components/add-task-popup"
import { TaskDetailsModal } from "@/components/task-details-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const taskStats = [
  { label: "Total Tasks", value: 12 },
  { label: "Completed", value: 5 },
  { label: "In Progress", value: 4 },
  { label: "Not Started", value: 3 },
]

export default function TaskPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddTaskPopupOpen, setIsAddTaskPopupOpen] = useState(false)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete UI/UX Design Project",
      description: "Finish the final mockups for the client's website",
      dueDate: "2023-08-15",
      status: "In Progress",
      priority: "High",
      course: "UI/UX Design",
      assignee: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
      },
    },
    {
      id: 2,
      title: "JavaScript Coding Challenge",
      description: "Solve 5 algorithm problems on LeetCode",
      dueDate: "2023-08-10",
      status: "Not Started",
      priority: "Medium",
      course: "Advanced JavaScript",
      assignee: {
        name: "Emma Watson",
        avatar: "/placeholder.svg",
      },
    },
    {
      id: 3,
      title: "React Component Library",
      description: "Create a reusable component library for future projects",
      dueDate: "2023-08-20",
      status: "Completed",
      priority: "Low",
      course: "React Masterclass",
      assignee: {
        name: "John Doe",
        avatar: "/placeholder.svg",
      },
    },
    {
      id: 4,
      title: "Database Schema Design",
      description: "Design the database schema for the e-commerce project",
      dueDate: "2023-08-18",
      status: "In Progress",
      priority: "High",
      course: "Database Management",
      assignee: {
        name: "Sarah Smith",
        avatar: "/placeholder.svg",
      },
    },
  ])

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = selectedTab === "all" || task.status.toLowerCase() === selectedTab.toLowerCase()
      const matchesPriority = filterPriority === "all" || task.priority.toLowerCase() === filterPriority.toLowerCase()
      return matchesSearch && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  const handleAddTask = (newTask: any) => {
    const taskWithId = { ...newTask, id: tasks.length + 1 }
    setTasks([...tasks, taskWithId])
    updateTaskStats()
  }

  const handleUpdateTask = (updatedTask: any) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    updateTaskStats()
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    updateTaskStats()
  }

  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: task.status === "Completed" ? "In Progress" : "Completed" }
        }
        return task
      }),
    )
    updateTaskStats()
  }

  const updateTaskStats = () => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.status === "Completed").length
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length
    const notStartedTasks = tasks.filter((task) => task.status === "Not Started").length

    taskStats[0].value = totalTasks
    taskStats[1].value = completedTasks
    taskStats[2].value = inProgressTasks
    taskStats[3].value = notStartedTasks
  }

  useEffect(() => {
    updateTaskStats()
  }, [tasks, updateTaskStats])

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
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Tasks</h1>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      className="pl-10 w-full"
                      placeholder="Search tasks"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2 w-full sm:w-auto">
                    <Select value={filterPriority} onValueChange={setFilterPriority}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="flex-1 sm:flex-none" onClick={() => setIsAddTaskPopupOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Task
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {taskStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                      <div className="h-4 w-4 bg-primary rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <Progress value={(stat.value / taskStats[0].value) * 100} className="mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Tabs defaultValue="all" className="space-y-4">
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="all" onClick={() => setSelectedTab("all")}>
                    All Tasks
                  </TabsTrigger>
                  <TabsTrigger value="in progress" onClick={() => setSelectedTab("in progress")}>
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger value="completed" onClick={() => setSelectedTab("completed")}>
                    Completed
                  </TabsTrigger>
                  <TabsTrigger value="not started" onClick={() => setSelectedTab("not started")}>
                    Not Started
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleCompletion={handleToggleTaskCompletion}
                      onEdit={() => {
                        setSelectedTask(task)
                        setIsTaskDetailsModalOpen(true)
                      }}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="in progress" className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleCompletion={handleToggleTaskCompletion}
                      onEdit={() => {
                        setSelectedTask(task)
                        setIsTaskDetailsModalOpen(true)
                      }}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="completed" className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleCompletion={handleToggleTaskCompletion}
                      onEdit={() => {
                        setSelectedTask(task)
                        setIsTaskDetailsModalOpen(true)
                      }}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </TabsContent>
                <TabsContent value="not started" className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onToggleCompletion={handleToggleTaskCompletion}
                      onEdit={() => {
                        setSelectedTask(task)
                        setIsTaskDetailsModalOpen(true)
                      }}
                      onDelete={() => handleDeleteTask(task.id)}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </motion.div>
          </main>
        </div>
        <AddTaskPopup
          isOpen={isAddTaskPopupOpen}
          onClose={() => setIsAddTaskPopupOpen(false)}
          onAddTask={handleAddTask}
        />
        {selectedTask && (
          <TaskDetailsModal
            isOpen={isTaskDetailsModalOpen}
            onClose={() => setIsTaskDetailsModalOpen(false)}
            task={selectedTask}
            onUpdateTask={handleUpdateTask}
          />
        )}
      </div>
    </ProtectedRoute>
  )
}

function TaskCard({ task, onToggleCompletion, onEdit, onDelete }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <Checkbox checked={task.status === "Completed"} onCheckedChange={() => onToggleCompletion(task.id)} />
            <CardTitle
              className={`text-base sm:text-lg font-semibold ${task.status === "Completed" ? "line-through text-gray-500" : ""}`}
            >
              {task.title}
            </CardTitle>
          </div>
          <Badge
            variant={
              task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "destructive"
            }
          >
            {task.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="mt-2 text-sm">{task.description}</CardDescription>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">{task.dueDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">{task.priority} Priority</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                <AvatarImage src={task.assignee?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{task.assignee?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-xs sm:text-sm font-medium">{task.assignee?.name || "Unassigned"}</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Badge variant="outline" className="text-xs">
              {task.course}
            </Badge>
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

