import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const upcomingEvents = [
  {
    title: "Web Accessibility Workshop",
    date: "2023-08-15",
    time: "14:00 - 16:00",
  },
  {
    title: "React Performance Optimization",
    date: "2023-08-18",
    time: "10:00 - 12:00",
  },
  {
    title: "Introduction to GraphQL",
    date: "2023-08-22",
    time: "15:00 - 17:00",
  },
]

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Stay updated with these upcoming learning opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="bg-primary/10 text-primary rounded-md p-2">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-medium leading-none">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  {event.time}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Button variant="outline" className="w-full mt-4">
          View All Events
        </Button>
      </CardContent>
    </Card>
  )
}

