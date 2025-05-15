import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Button } from "@/components/ui/button";
  import { MoreVertical } from "lucide-react";
  import React from "react";
  
  type MenuOption = {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  
  type MenuOptionsProps = {
    options: MenuOption[];
    children?: React.ReactNode;
  };
  
  export const MenuOptions: React.FC<MenuOptionsProps> = ({ options, children }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children ? (
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              {children}
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {options.map((option, index) => (
            <DropdownMenuItem key={index} onClick={option.onClick} className="flex items-center gap-2">
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  