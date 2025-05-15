import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chatStore";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { updateUserProfile } from "@/service/api";

const SettingsPage = () => {
  const { clearChats } = useChatStore();
  const { isAuthenticated, user } = useAuthStore();
  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");

  const handleClearChats = () => {
    if (
      confirm(
        "Are you sure you want to clear all chats? This action cannot be undone."
      )
    ) {
      clearChats();
      toast.success("All chats cleared successfully");
    }
  };

  // const valid

  
  const disableButton = (name?.trim() === user?.name?.trim() && email.trim() === user?.email.trim()) || !name.trim() || !email.trim();
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="mb-6 text-3xl font-bold">Settings</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="First Last"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Eamil"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button disabled={disableButton}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
              <CardDescription>
                Manage your chat history and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="destructive" onClick={handleClearChats}>
                Clear All Chats
              </Button>
              <p className="text-sm text-muted-foreground">
                This will permanently delete all your chat history. This action
                cannot be undone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
