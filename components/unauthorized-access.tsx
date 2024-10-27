import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LockIcon } from 'lucide-react';

interface UnauthorizedAccessProps {
  message?: string;
}

export default function UnauthorizedAccess({
  message = 'You need to be logged in to access this page.',
}: UnauthorizedAccessProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-red-100 dark:bg-red-900 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
            <LockIcon className="h-8 w-8 text-red-600 dark:text-red-300" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Unauthorized Access
          </CardTitle>
          <CardDescription>{message}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please sign in to your account or register if you don't have one.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full bg-purple-500 hover:bg-purple-400">
            <Link href="/">Sign In</Link>
          </Button>
          <Button
            asChild
            className="w-full text-white bg-purple-500 hover:bg-purple-400"
          >
            <Link href="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
