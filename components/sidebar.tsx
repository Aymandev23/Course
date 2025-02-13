"use client"

import { motion } from "framer-motion"
import { BookOpen, Grid, Inbox, LogOut, Settings, Users, CheckSquare, LogIn, BarChart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: Grid, label: "Dashboard", href: "/" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
  { icon: BookOpen, label: "Lesson", href: "/lesson" },
  { icon: CheckSquare, label: "Task", href: "/task" },
  { icon: Users, label: "Group", href: "/group" },
  { icon: BarChart, label: "Statistics", href: "/statistics" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

const friends = [
  { name: "Bagas Mahple", status: "Friend", avatar: "/placeholder.svg" },
  { name: "Sir Dandy", status: "Old Friend", avatar: "/placeholder.svg" },
  { name: "Jhon Tosan", status: "Friend", avatar: "/placeholder.svg" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <div className="flex h-screen w-64 flex-col bg-white p-4 overflow-y-auto scrollbar-hide">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C5CFC] text-white">C</div>
        <span className="text-xl font-semibold">Coursue</span>
      </div>

      <div className="mt-8">
        <span className="px-2 text-xs font-semibold text-gray-500">OVERVIEW</span>
        <nav className="mt-2 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${
                    pathname === item.href ? "bg-[#7C5CFC]/10 text-[#7C5CFC]" : "text-gray-600"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-8">
        <span className="px-2 text-xs font-semibold text-gray-500">FRIENDS</span>
        <div className="mt-2 space-y-2">
          {friends.map((friend) => (
            <div key={friend.name} className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{friend.name}</span>
                <span className="text-xs text-gray-500">{friend.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <span className="px-2 text-xs font-semibold text-gray-500">ACCOUNT</span>
        <Link href="/login">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-500"
          onClick={async () => {
            try {
              await signOut()
            } catch (error) {
              console.error("Error signing out:", error)
            }
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

