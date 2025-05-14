
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserTable } from '@/components/admin/UserTable';
import { ChatTable } from '@/components/admin/ChatTable';
import { useUsers, useAdminChats } from '@/hooks/useApi';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const { 
    data: users = [],
    isLoading: isLoadingUsers
  } = useUsers();
  
  const { 
    data: chats = [], 
    isLoading: isLoadingChats 
  } = useAdminChats();

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('You do not have permission to access this page');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
        
        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="chats">Chats</TabsTrigger>
          </TabsList>
          <TabsContent value="users">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Users</h2>
              <UserTable users={users} isLoading={isLoadingUsers} />
            </div>
          </TabsContent>
          <TabsContent value="chats">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Conversations</h2>
              <ChatTable chats={chats} isLoading={isLoadingChats} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
