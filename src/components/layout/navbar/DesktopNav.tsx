
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationItem from './NavigationItem';
import DropdownMenu from './DropdownMenu';

interface DesktopNavProps {
  studentItems: { title: string; href: string }[];
  collegeItems: { title: string; href: string }[];
}

const DesktopNav: React.FC<DesktopNavProps> = ({ studentItems, collegeItems }) => {
  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-6">
          <NavigationItem href="/">Home</NavigationItem>
          <NavigationItem href="/about">About</NavigationItem>
          <DropdownMenu title="For Students" items={studentItems} />
          <DropdownMenu title="For Colleges" items={collegeItems} />
          <NavigationItem href="/features">Features</NavigationItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNav;
