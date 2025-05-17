
import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/authStore';
import { useIsMobile } from '../../hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated } = useAuthStore();
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(()=>{
    if (isMobile) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  },[isMobile]);
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-secondary/20">
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      )}

      {/* Sidebar */}
      {(showSidebar || !isMobile) && (
        <div
          className={`${
            isMobile
              ? 'fixed inset-0 z-40 w-[300px] shadow-lg transition-all duration-300 ease-in-out'
              : 'w-[300px]'
          }`}
        >
          <Sidebar onClose={() => isMobile && setShowSidebar(false)} />
        </div>
      )}

      {/* Mobile overlay */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 overflow-auto p-4 transition-all duration-300 ease-in-out ${
          isMobile ? 'w-full' : showSidebar ? '' : 'ml-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
