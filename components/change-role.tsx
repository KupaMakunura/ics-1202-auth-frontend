'use client';

import { useState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ShieldIcon, UserIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';
import { API } from '@/services';

export default function ChangeRole() {
  const [selectedRole, setSelectedRole] = useState<'Admin' | 'User'>();
  const user = useStore((state) => state.user);

  const { id } = useParams();

  const handleRoleChange = async () => {
    try {
      const response = await API.put(
        `/users/${id}/role/`,
        {
          role: selectedRole,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          variant: 'default',
          className: 'bg-green-500 text-white',
          description: 'You have successfully updated  a role',
          title: 'Update Role',
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Change Role</CardTitle>
        <CardDescription>
          Select a new role to change your permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          value={selectedRole}
          onValueChange={(value) => setSelectedRole(value as 'Admin' | 'User')}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin">
              <div className="flex items-center">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Admin
              </div>
            </SelectItem>
            <SelectItem value="User">
              <div className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                User
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => handleRoleChange()}
          className="w-full bg-purple-500 hover:bg-purple-400 text-white"
        >
          Change Role
        </Button>
      </CardFooter>
    </Card>
  );
}
