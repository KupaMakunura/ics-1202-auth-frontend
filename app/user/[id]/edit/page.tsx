'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import UnauthorizedAccess from '@/components/unauthorized-access';
import { toast } from '@/hooks/use-toast';
import { API } from '@/services';
import { useStore } from '@/store';
import { useState } from 'react';

export default function UserAccount() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isLoggedIn) {
    return <UnauthorizedAccess />;
  }

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        description: 'Passwords do not match',
        title: 'Update Info',
      });
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      toast({
        variant: 'destructive',
        description: 'Passwords must be at least 8 characters long',
        title: 'Update Info',
      });
      return;
    }

    try {
      const response = await API.put(
        `/users/${user?.id}`,
        {
          email: email,
          password: password,
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        setUser({
          ...response.data.user,
          accessToken: response.data.accessToken,
        });

        toast({
          variant: 'default',
          className: 'bg-green-500 text-white',
          description: 'You have successfully updated your information',
          title: 'Update Info',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Unexpected error occurred',
        title: 'Update Info',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl">
                {user?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold">{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => handleSubmit()}
            className="bg-purple-500 hover:bg-purple-400 text-white"
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
