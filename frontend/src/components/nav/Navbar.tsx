import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import Logo from "../Logo";
import { useAuthStore } from "@/store/authStore";
import { log } from "console";


export const Navbar = () => {
    const { user, logout,isAuthenticated } = useAuthStore();
    
  return (
    <header className="w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        
      
        <Logo/>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          
          <ThemeToggle />
          <p>{user?.email}</p>
          { isAuthenticated && <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>{user?.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/chats">Chats</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Logout")}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              { isAuthenticated ? <div className="flex flex-col gap-4 mt-8">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
                <Link to="/settings" className="hover:underline">Settings</Link>
                <Button variant="destructive" onClick={() => logout()}>
                  Logout
                </Button>
              </div> : 
              <div className="flex flex-col gap-4 mt-8">
                <Link to="/login" className="hover:underline">Login</Link>
                <Link to="/register" className="hover:underline">Register</Link>
                
              </div>
              }
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
