
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

type AdminChat = {
  id: string;
  title: string;
  userId: string;
  userEmail: string;
  messageCount: number;
  createdAt: string;
};

type ChatTableProps = {
  chats: AdminChat[];
  isLoading: boolean;
};

export const ChatTable = ({ chats, isLoading }: ChatTableProps) => {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Loading chats...</div>
        </div>
      </div>
    );
  }
  
  if (chats.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">No chats found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Messages</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chats.map((chat) => (
            <TableRow key={chat.id}>
              <TableCell className="font-medium">{chat.title || 'Untitled Chat'}</TableCell>
              <TableCell>{chat.userEmail}</TableCell>
              <TableCell>{chat.messageCount}</TableCell>
              <TableCell>{format(new Date(chat.createdAt), 'MMM d, yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
