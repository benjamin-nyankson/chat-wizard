
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
};

type UserTableProps = {
  users: User[];
  isLoading: boolean;
};

export const UserTable = ({ users, isLoading }: UserTableProps) => {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Loading users...</div>
        </div>
      </div>
    );
  }
  
  if (users.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">No users found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    user.role === 'admin'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>{format(new Date(user.createdAt), 'MMM d, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
