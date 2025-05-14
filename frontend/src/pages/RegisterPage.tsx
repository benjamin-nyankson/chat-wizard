
import React, { useEffect } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="mt-2 text-muted-foreground">
            Sign up to start chatting with AI
          </p>
        </div>
        <AuthForm type="register" />
      </div>
    </div>
  );
};

export default RegisterPage;
