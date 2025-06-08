import type { Feedback } from '../types'
import FeedbackItem from './FeedbackItem'

type FeedbackListProps = {
    feedbacks: Feedback[],
    onLike: (id: number) => void,
    onDislike: (id: number) => void,
    onDelete: (id: number) => void,
    onEdit: (id: number, text: string) => void
}



export default function FeedbackList({feedbacks, onLike, onDislike, onDelete, onEdit}: FeedbackListProps) {
    if(feedbacks.length === 0) {
        return <p>No feedbacks yet</p>
    }


    return (
        <ul>
            {feedbacks.map((feedback) => (
                <FeedbackItem key={feedback.id} feedback={feedback} onLike={onLike} onDislike={onDislike} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </ul>
    )
   
    
}