import type { StudentActivity } from '@/schemas/student';

export function ActivityList({ activities }: { activities: StudentActivity[] }) {
  return <ul>{activities.map((activity) => <li key={activity.id}>{activity.title}</li>)}</ul>;
}
