
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

interface DropdownItem {
  title: string;
  href: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  onItemClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, onItemClick }) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-xr-gray-dark hover:text-xr-blue font-medium">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="w-full">
        <ul className="grid w-full gap-1 p-2">
          {items.map((item) => (
            <li key={item.href} className="row-span-1">
              <NavigationMenuLink asChild>
                <Link 
                  to={item.href}
                  className="flex items-center h-full w-full select-none space-y-1 rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  onClick={onItemClick}
                >
                  <div className="text-sm font-medium leading-none">{item.title}</div>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default DropdownMenu;
