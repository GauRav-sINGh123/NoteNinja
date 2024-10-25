'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { collection, setDoc, doc } from 'firebase/firestore'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { v4 as uuidv4 } from 'uuid'
import { chatSession } from '@/config/gemini'
import { db } from '@/config/firebase'
import { toast } from 'sonner'

interface Data {
  subjectName: string
  topics: string
}

export default function CreateAINotes() {
  const [data, setData] = useState<Data>({ subjectName: '', topics: '' })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { isLoaded, user } = useUser()  
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value })
  }

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!data.subjectName.trim() || !data.topics.trim()) {
      setError('Please fill in both Subject Name and Topics.')
      return
    }

    if (!isLoaded || !user) {
      toast.error('You must be logged in to create notes.')
      return
    }

    setLoading(true)

    const InputPrompt = `Generate a brief single note for the following subject and topics: ${data.subjectName} - ${data.topics}. Generate only these fields: title, content,one example and field name should be example, summary, and sources in JSON format.`

    try {
      const result = await chatSession.sendMessage(InputPrompt)
      const rawResponse = await result.response.text()
      const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim()
      const parsedData = JSON.parse(cleanedResponse)
      
      const mockId = uuidv4()  

      await setDoc(doc(collection(db, 'users', user?.id, 'notes'), mockId), {
        mockId,  
        ...parsedData,
        createdAt: new Date().toISOString(),
      })

      router.push(`/dashboard/notes/${mockId}`) 
      toast.success('Notes Generated!')

    } catch (error) {
      toast.error(error as string)
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" flex items-center justify-center p-4 mt-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create AI Notes</CardTitle>
          <CardDescription>
            Enter a subject and topics to generate AI-powered study notes.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subjectName">Subject Name</Label>
              <Input
                id="subjectName"
                placeholder="e.g., World History"
                value={data.subjectName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topics">Topics</Label>
              <Input
                id="topics"
                placeholder="e.g., World War II, Cold War, Industrial Revolution"
                value={data.topics}
                onChange={handleChange}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Create Notes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
