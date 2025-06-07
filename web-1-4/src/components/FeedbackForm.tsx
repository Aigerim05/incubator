import { useState } from "react"
import type { FormEvent } from 'react'

type FeedbackFormProps = {
    onAdd: (name: string, feedback: string, like: number, dislike: number) => void
}

export default function FeedbackForm({onAdd}: FeedbackFormProps) {

    const [name, setName] = useState('')
    const [feedback, setFeedback] = useState('')


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(name.trim() === '' || feedback.trim() === '') {
            alert('Please fill in all fields')
            return
        }
        onAdd(name.trim(), feedback.trim(), 0, 0)
        setName('')
        setFeedback('')
    }
    return (
        <div className="feedback-form">
        <h1>Leave your feedback here</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={name}
            placeholder="Name" 
            onChange={(e) =>setName(e.target.value)}
            />
            <input 
            type="text" 
            value={feedback}
            placeholder="Feedback" 
            onChange={(e) => setFeedback(e.target.value)
            }/>
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}