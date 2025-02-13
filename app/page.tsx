import { ProtectedRoute } from "@/components/protected-route"
import { MainContent } from "@/components/main-content"

export default function Home() {
  return (
    <ProtectedRoute>
      <MainContent />
    </ProtectedRoute>
  )
}

