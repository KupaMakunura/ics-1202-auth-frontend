'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { API } from '@/services';
import { useStore } from '@/store';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUser = useStore((state) => state.setUser);
  const user = useStore((state) => state.user);

  console.log(user);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      const response = await API.post('/auth/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser({
          ...response.data.user,
          accessToken: response.data.accessToken,
        });
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        description: 'Invalid email or password',
        title: 'Login',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 py-12">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Sign in to CrazyAuth
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            onClick={() => handleSignIn()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Sign In
          </Button>
          <div className="text-sm text-center text-gray-500 dark:text-gray-400">
            Don't have an account?
            <Link
              href="/register"
              className="text-purple-600 hover:underline ml-1 dark:text-purple-400"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
