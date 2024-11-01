'use client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { API } from '@/services';
import { useStore } from '@/store';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [role, setRole] = useState('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const { toast } = useToast();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        description: 'Passwords do not match',
        title: 'Register',
      });
      return;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      toast({
        variant: 'destructive',
        description: 'Passwords must be at least 8 characters long',
        title: 'Register',
      });
      return;
    }

    try {
      const response = await API.post('/auth/register', {
        email: email,
        password: password,
        name: name,
        role: role,
      });

      if (response.status === 201) {
        setUser({
          ...response.data.user,
          accessToken: response.data.accessToken,
        });
        setIsLoggedIn(true);

        toast({
          variant: 'default',
          className: 'bg-green-500 text-white',
          description: 'You have successfully registered',
          title: 'Registration',
        });

        if (response.data.user.role === 'Admin') {
          router.push(`/admin/${response.data.user.id}/`);
        } else {
          router.push(`/user/${response.data.user.id}/`);
        }
      }
    } catch (error) {
      const e = error as AxiosError;

      if (e.response?.status === 400) {
        toast({
          variant: 'destructive',
          description: 'Invalid email or password',
          title: 'Register',
        });
      }

      if (e.response?.status === 409) {
        toast({
          variant: 'destructive',
          description: 'User with this email already exists',
          title: 'Register',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Sign up for CrazyAuth
          </CardTitle>
          <CardDescription className="text-center text-gray-500 dark:text-gray-400">
            Create an account to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
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
          <div className="space-y-2">
            <Select onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={() => handleSignUp()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Register
          </Button>
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              href="/"
              className="text-purple-600 hover:underline ml-1 dark:text-purple-400"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
