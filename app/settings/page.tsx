"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Lock, Palette, Globe, CreditCard, HelpCircle, LogOut, Menu } from "lucide-react"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const settingsTabs = [
  { icon: User, label: "Account", value: "account" },
  { icon: Bell, label: "Notifications", value: "notifications" },
  { icon: Lock, label: "Privacy", value: "privacy" },
  { icon: Palette, label: "Appearance", value: "appearance" },
  { icon: Globe, label: "Language", value: "language" },
  { icon: CreditCard, label: "Billing", value: "billing" },
  { icon: HelpCircle, label: "Help & Support", value: "help" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

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
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="flex flex-col lg:flex-row gap-6">
              <Card className="w-full lg:w-64 h-fit">
                <CardContent className="p-4">
                  <nav className="space-y-2">
                    {settingsTabs.map((tab) => (
                      <Button
                        key={tab.value}
                        variant={activeTab === tab.value ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveTab(tab.value)}
                      >
                        <tab.icon className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </Button>
                    ))}
                    <Button variant="ghost" className="w-full justify-start text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Log out</span>
                    </Button>
                  </nav>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader>
                  <CardTitle>{settingsTabs.find((tab) => tab.value === activeTab)?.label}</CardTitle>
                  <CardDescription>Manage your {activeTab} settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} className="w-full">
                    <TabsContent value="account">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <Button>Change Avatar</Button>
                        </div>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="John Doe" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                          </div>
                        </div>
                        <Button className="w-full sm:w-auto">Save Changes</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="notifications">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive email about your account activity.</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive push notifications on your devices.</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="privacy">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="visibility">Profile Visibility</Label>
                          <Select defaultValue="public">
                            <SelectTrigger id="visibility">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="friends">Friends Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account.
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="appearance">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="theme">Theme</Label>
                          <Select defaultValue="light">
                            <SelectTrigger id="theme">
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Reduce Animations</Label>
                            <p className="text-sm text-muted-foreground">Minimize motion for accessibility.</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="language">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="language">Preferred Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="billing">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="plan">Current Plan</Label>
                          <Select defaultValue="pro">
                            <SelectTrigger id="plan">
                              <SelectValue placeholder="Select plan" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="pro">Pro</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button>Manage Subscription</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="help">
                      <div className="space-y-4">
                        <p>Need assistance? Our support team is here to help.</p>
                        <Button>Contact Support</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

