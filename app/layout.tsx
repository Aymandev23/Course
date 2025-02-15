import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import "./globals.css"
import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Coursue - Online Learning Platform",
  description: "Sharpen your skills with professional online courses",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden`}>
        <AuthProvider>
          <ProtectedRoute>{children}</ProtectedRoute>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'