'use client';
 
import {  Home, User,LayoutDashboard, Plus } from 'lucide-react';  
import Link from 'next/link';
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {name:"Plus", href:"/dashboard/create", icon:<Plus className="h-6 w-6" />},
  {name:"Home", href:"/", icon:<Home className="h-6 w-6" />},
  {name:"Dashboard", href:"/dashboard", icon:<LayoutDashboard className="h-6 w-6" />},
  {name:"Profile", href:"/dashboard/profile", icon:<User className="h-6 w-6" />},
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const path = usePathname();
  return (
    <>
      <div
        className={`bg-black/90 backdrop-blur-lg border-r border-white/10 shadow-lg transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-16'} 
          fixed left-0 top-0 h-full z-10`}
        style={{ width: '70px' }}  
      >
        <nav className="mt-24 flex flex-col items-center gap-3">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className={`flex items-center p-2 rounded transition duration-200 cursor-pointer 
                ${path === item.href ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}>
                <div className="h-6 w-6 transition-colors duration-200">
                  {item.icon}
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}