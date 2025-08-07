import { NotificationsFeed } from "@/components/notifications-feed"

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <NotificationsFeed />
    </div>
  )
}
