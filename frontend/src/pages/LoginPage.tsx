
import React, { useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chats');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to SmartChart</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to continue to your account
          </p>
        </div>
        <AuthForm type="login" />
      </div>
    </div>
  );
};

export default LoginPage;
