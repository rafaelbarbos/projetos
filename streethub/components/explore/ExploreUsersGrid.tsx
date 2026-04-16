import type { User } from '@/types/feed';
import { ExploreUserCard } from './ExploreUserCard';

interface ExploreUsersGridProps {
  users: User[];
}

export function ExploreUsersGrid({ users }: ExploreUsersGridProps) {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {users.map((user) => (
        <ExploreUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
