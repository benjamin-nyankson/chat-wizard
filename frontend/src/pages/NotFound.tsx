
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button className="mt-6" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
