import { useState } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'

export type Feedback = {
  id: number
  text: string
  votes: number
}

export default function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [nextId, setNextId] = useState(1)

  const handleAdd = (text: string) => {
    setFeedbacks([{ id: nextId, text, votes: 0 }, ...feedbacks])
    setNextId(nextId + 1)
  }

  const handleVote = (id: number) => {
    setFeedbacks(fbs =>
      fbs.map(fb =>
        fb.id === id ? { ...fb, votes: fb.votes + 1 } : fb
      )
    )
  }

  const handleDelete = (id: number) => {
    setFeedbacks(fbs => fbs.filter(fb => fb.id !== id))
  }

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      padding: 40,
      background: 'linear-gradient(120deg, #f0f6ff 0%, #f0fdf4 100%)',
      borderRadius: 16,
      boxShadow: '0 4px 24px #4f8cff22',
      border: '2px solid #4f8cff'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        background: 'linear-gradient(90deg, #4f8cff 0%, #6ee7b7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: 1
      }}>
        Feedback Board
      </h1>
      <FeedbackForm onAdd={handleAdd} />
      <FeedbackList feedbacks={feedbacks} onVote={handleVote} onDelete={handleDelete} />
    </div>
  )
}
