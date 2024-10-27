'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import UnauthorizedAccess from '@/components/unauthorized-access';
import { API } from '@/services';
import { useStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for the chart
const data = [
  { name: 'Jan', users: 400, admins: 24 },
  { name: 'Feb', users: 300, admins: 13 },
  { name: 'Mar', users: 200, admins: 8 },
  { name: 'Apr', users: 278, admins: 19 },
  { name: 'May', users: 189, admins: 15 },
  { name: 'Jun', users: 239, admins: 21 },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>();
  const user = useStore((state) => state.user);
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    const fetchUsers = async () => {
      if (isLoggedIn) {
        try {
          const response = await API.get('users/', {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          });
          setUsers(response.data.users as any);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();
  }, [user, isLoggedIn]);

  if (!isLoggedIn) {
    if (!isLoggedIn) {
      return <UnauthorizedAccess />;
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>
              Monthly user and admin registrations
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="admins" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Link href={`/admin/${user.id}/edit`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
          <CardFooter>
            <Button className="bg-purple-500 hover:bg-purple-400 text-white">
              <Link href={`/user/${user?.id}/edit`}>Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
