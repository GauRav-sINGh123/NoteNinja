'use client'
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
function LoginButton() {
    const  {user,isLoaded}=useUser();
  
     if(!isLoaded) return <div>
        <Loader2 className="h-8 w-8 animate-spin text-white/60" />
     </div>;
  return (
     <div className="">
        {
        user ? (
            <div className="flex gap-2">
               <Link href="/dashboard"><Button variant="outline" className="rounded-full">Dashboard</Button></Link>
                <div  >
                    <UserButton appearance={{
                        elements: {
                            avatarBox: 'w-9 h-9',
                        },
                    }} />
                </div>
            </div>
        ) : (
        <Link href="/sign-in"><Button variant="outline" className="rounded-full">Sign In</Button></Link>
    )
    }
     </div>
  )
}

export default LoginButton
