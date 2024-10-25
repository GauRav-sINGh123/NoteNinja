'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarIcon, LinkIcon } from 'lucide-react'

interface Note {
  title: string
  content: string
  summary: string
  example: string|number
  sources: string[]
  createdAt: string
  mockId: string
}

export default function NoteDetailPage({ params }: { params: { noteId: string } }) {
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { user, isLoaded } = useUser()

  useEffect(() => {
    const fetchNote = async () => {
      if (!isLoaded || !user) return

      try {
        const docRef = doc(db, 'users', user.id, 'notes', params.noteId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setNote(docSnap.data() as Note)
        } else {
          setError('Note not found.')
        }
      } catch (err) {
        console.error('Error fetching note:', err)
        setError('Failed to fetch note. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [isLoaded, user, params.noteId])

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
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-center text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center mt-20 container mx-auto p-4 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{note?.title ?? 'Untitled Note'}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <time dateTime={note?.createdAt}>
              {new Date(note?.createdAt ?? '').toLocaleDateString()}
            </time>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Content</h2>
            <p className="text-muted-foreground whitespace-pre-wrap">{note?.content ?? 'No content available.'}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Example</h2>
            <p className="text-muted-foreground whitespace-pre-wrap mb-2 text-sm font-semibold">{note?.example??'No example available.'}</p>     
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-muted-foreground">{note?.summary ?? 'No summary available.'}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Sources</h3>
            {note?.sources?.length ? (
              <ul className="space-y-2">
                {note.sources.map((source) => (
                  <li key={source} className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No sources available.</p>
            )}
          </div>

          
        </CardContent>
      </Card>
    </div>
  )
}