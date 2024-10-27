'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useStore } from '@/store';
import { BookOpenIcon, CalendarIcon, MessageCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserPage() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const user = useStore((state) => state.user);

  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/');
  }

  const [recentActivities] = useState([
    { id: 1, type: 'login', date: 'Today at 9:30 AM' },
    { id: 2, type: 'profile_update', date: 'Yesterday at 2:15 PM' },
    { id: 3, type: 'document_view', date: '2 days ago at 11:00 AM' },
    { id: 4, type: 'message_sent', date: '3 days ago at 4:45 PM' },
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login':
        return <CalendarIcon className="h-4 w-4 mr-2" />;
      case 'profile_update':
        return <Avatar className="h-4 w-4 mr-2" />;
      case 'document_view':
        return <BookOpenIcon className="h-4 w-4 mr-2" />;
      case 'message_sent':
        return <MessageCircleIcon className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
                <div className="mt-2">
                  <Badge variant="secondary">{user?.role}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Your latest actions on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="flex items-center text-sm">
                  {getActivityIcon(activity.type)}
                  <span className="flex-grow">
                    {activity.type.replace('_', ' ').charAt(0).toUpperCase() +
                      activity.type.replace('_', ' ').slice(1)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {activity.date}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
