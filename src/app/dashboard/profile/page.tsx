"use client"; 

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FileText, Coins } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";  

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

export default function Profile() {
  const { user, isLoaded } = useUser();
  const [noteCount, setNoteCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!isLoaded || !user) return;

      try {
        const notesRef = collection(db, "users", user.id, "notes");
        const querySnapshot = await getDocs(notesRef);
        setNoteCount(querySnapshot.size); 
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-4 mt-16 max-w-3xl">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="w-full max-w-md mx-auto mt-28 max-h-screen">
        <CardHeader className="flex flex-col items-center justify-center pb-2">
          <motion.div variants={itemVariants}>
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.imageUrl} alt="Profile picture" />
              <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
            </Avatar>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mt-4"
          >
            {user?.fullName}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground">
            {user?.username ? `@${user?.username}` : ""}
          </motion.p>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.p
            variants={itemVariants}
            className="text-sm text-center"
          >
            {user?.emailAddresses[0].emailAddress}
          </motion.p>
          <Separator />
          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center"
          >
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Notes</span>
            </div>
            <motion.span
              className="text-sm font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {noteCount}
            </motion.span>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex justify-between items-center"
          >
            <div className="flex items-center">
              <Coins className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Available Credits</span>
            </div>
            <motion.span
              className="text-sm font-bold"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              100
            </motion.span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
