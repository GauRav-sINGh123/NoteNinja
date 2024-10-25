import LoginButton from "./navbar/LoginButton";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image src="/ninja.svg" alt="Logo" width={32} height={32} 
            className="text-white" 
            style={{ filter: 'invert(1)' }} 
            />
             <Link href="/">
              <span className="text-xl font-bold">NoteNinja</span>
            </Link>
          </div>
          <LoginButton/>              
        </div>
      </div>
    </nav>
  );
}