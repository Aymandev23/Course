import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const recommendedCourses = [
  {
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, prototypes, and async programming",
    category: "Development",
  },
  {
    title: "Responsive Web Design Mastery",
    description: "Create stunning, responsive layouts for any device",
    category: "Design",
  },
  {
    title: "Data Visualization with D3.js",
    description: "Learn to create interactive data visualizations",
    category: "Data Science",
  },
]

export function RecommendedCourses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Courses</CardTitle>
        <CardDescription>Based on your interests and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recommendedCourses.map((course, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="bg-primary/10 text-primary rounded-md p-2">
                {course.category === "Development" && "💻"}
                {course.category === "Design" && "🎨"}
                {course.category === "Data Science" && "📊"}
              </div>
              <div className="space-y-1">
                <p className="font-medium leading-none">{course.title}</p>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4">
          View All Recommendations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

