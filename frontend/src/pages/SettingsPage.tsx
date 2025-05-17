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
import { useUpdateUserProfile } from '@/hooks/useApi';


const SettingsPage = () => {
  const { clearChats } = useChatStore();
  const { user,token,setuser } = useAuthStore();
  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");
  const { mutate:updateUserProfile, isPending } = useUpdateUserProfile();

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
const validEmail =email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim);
  
  const disableButton = (name?.trim() === user?.name?.trim() && email.trim() === user?.email.trim()) || !name.trim() || !email.trim()|| !validEmail;
  const emailError = email.trim() === "" || !validEmail;

  const emailErrorMessage =  !email.trim()  ? "Email is required" : "Please enter a valid email address"

  const handleUpdateProfile = async () => {
    if (disableButton) return;

 
  updateUserProfile(
    {
      userId: user.id,
      data: { name, email },
    },
    {
      onSuccess: (data) => {
        setuser({...user, name, email });
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        toast.error("Failed to update profile");
      },
    }
  );
  }

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
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={name.trim() === "" ? true : false}
                  errorMessage="Name is required"
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
                  type="email"
                  error={emailError}
                  errorMessage={emailErrorMessage}
                />
              </div>
              <Button disabled={disableButton} onClick={handleUpdateProfile}>Save Changes</Button>
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
