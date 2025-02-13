"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Plus, Users, MessageSquare, Calendar, MoreHorizontal, Menu } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AddGroupPopup } from "@/components/add-group-popup"

const upcomingEvents = [
  {
    id: 1,
    title: "UI/UX Design Workshop",
    date: "Aug 15, 2023",
    time: "2:00 PM - 4:00 PM",
    attendees: 12,
  },
  {
    id: 2,
    title: "JavaScript Coding Challenge",
    date: "Aug 18, 2023",
    time: "6:00 PM - 8:00 PM",
    attendees: 8,
  },
  {
    id: 3,
    title: "Data Visualization Seminar",
    date: "Aug 20, 2023",
    time: "10:00 AM - 12:00 PM",
    attendees: 15,
  },
]

export default function GroupPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddGroupPopupOpen, setIsAddGroupPopupOpen] = useState(false)
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "UI/UX Design Team",
      description: "Collaborate on design projects and share inspiration",
      members: 8,
      category: "Design",
      lastActive: "2 hours ago",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      name: "JavaScript Study Group",
      description: "Learn and practice JavaScript together",
      members: 12,
      category: "Programming",
      lastActive: "1 day ago",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      name: "Data Science Enthusiasts",
      description: "Discuss latest trends in data science and machine learning",
      members: 15,
      category: "Data Science",
      lastActive: "3 hours ago",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      name: "Web Development Workshop",
      description: "Build web projects together and share knowledge",
      members: 10,
      category: "Web Development",
      lastActive: "5 hours ago",
      image: "/placeholder.svg?height=100&width=200",
    },
  ])

  const filteredGroups = groups.filter((group) => {
    if (selectedTab === "all") return true
    return group.category.toLowerCase() === selectedTab.toLowerCase()
  })

  const handleAddGroup = (newGroup: any) => {
    // Here you would typically send this data to your backend
    console.log("New group:", newGroup)
    // For now, let's just add it to our groups array
    const groupWithId = { ...newGroup, id: groups.length + 1 }
    setGroups([...groups, groupWithId])
  }

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Groups</h1>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input className="pl-10 w-full" placeholder="Search groups" />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button variant="outline" size="icon" className="flex-1 sm:flex-none">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1 sm:flex-none" onClick={() => setIsAddGroupPopupOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList className="flex flex-wrap">
                    <TabsTrigger value="all" onClick={() => setSelectedTab("all")}>
                      All Groups
                    </TabsTrigger>
                    <TabsTrigger value="design" onClick={() => setSelectedTab("design")}>
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="programming" onClick={() => setSelectedTab("programming")}>
                      Programming
                    </TabsTrigger>
                    <TabsTrigger value="data science" onClick={() => setSelectedTab("data science")}>
                      Data Science
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4">
                    {filteredGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </TabsContent>
                  <TabsContent value="design" className="space-y-4">
                    {filteredGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </TabsContent>
                  <TabsContent value="programming" className="space-y-4">
                    {filteredGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </TabsContent>
                  <TabsContent value="data science" className="space-y-4">
                    {filteredGroups.map((group) => (
                      <GroupCard key={group.id} group={group} />
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Stay updated with group activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <li key={event.id} className="flex items-start space-x-4">
                          <div className="bg-primary/10 text-primary rounded-md p-2">
                            <Calendar className="h-4 w-4" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            <p className="text-sm text-gray-500">{event.time}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-4 w-4 mr-1" />
                              {event.attendees} attendees
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
      <AddGroupPopup
        isOpen={isAddGroupPopupOpen}
        onClose={() => setIsAddGroupPopupOpen(false)}
        onAddGroup={handleAddGroup}
      />
    </div>
  )
}

function GroupCard({ group }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden">
              <img src={group.image} alt={group.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">{group.name}</CardTitle>
              <CardDescription className="hidden sm:block text-xs sm:text-sm">{group.description}</CardDescription>
            </div>
          </div>
          <Badge className="text-xs">{group.category}</Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="sm:hidden text-xs mb-4">{group.description}</CardDescription>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">{group.members} members</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-500" />
                <span className="text-xs sm:text-sm text-gray-500">Chat</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-500">Last active: {group.lastActive}</span>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

