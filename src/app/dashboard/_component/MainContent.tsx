'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, FileText, Trash} from 'lucide-react';
import { db } from '@/config/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  summary: string;
  createdAt: string;
}

export default function MainContent() {
  const { user, isLoaded } = useUser(); 
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchNotes = async () => {
      if (!isLoaded || !user) return;  

      try {
        const notesRef = collection(db, 'users', user.id, 'notes');
        const querySnapshot = await getDocs(notesRef);
        const notesData: Note[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];
        setNotes(notesData);
      } catch (err) {
       toast.error(err as string)
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isLoaded, user]);

  const handleDelete = async (noteId: string) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.id, 'notes', noteId));
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      toast.success('Note Deleted')
    } catch (err) {
     toast.error('Error deleting note:')
    }
  };

  if (loading) {
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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full bg-transparent"
        />
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:gap-0 gap-5">
          <h1 className="text-3xl font-bold text-white">My Notes</h1>
          <Link href="/dashboard/create">
            <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
              <Plus className="mr-2 h-5 w-5" /> Create Note
            </Button>
          </Link>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <Card className="bg-black/50 backdrop-blur-lg border-white/10">
            <CardContent className="p-12 flex flex-col items-center justify-center">
              <div className="bg-white/5 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-white/60" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No Notes Found</h3>
              <p className="text-gray-400 text-center max-w-sm mb-6">
                Start your journey by creating your first note with our AI-powered system.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div key={note.id} className="relative">
                <Link href={`/dashboard/notes/${note.id}`}>
                  <Card className="bg-black/50 backdrop-blur-lg border-white/10 hover:bg-white/5 hover:scale-105 ease-in-out transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                        {note.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-2">
                        Created at: {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-300 mt-2 line-clamp-3">
                        {note.summary}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          Read More →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-2 text-red-400 hover:text-red-600"
                  onClick={() => handleDelete(note.id)}
                >
                  <Trash className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
