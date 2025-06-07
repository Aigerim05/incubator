import type { Feedback } from '../types'
import FeedbackItem from './FeedbackItem'

type FeedbackListProps = {
    feedbacks: Feedback[],
    onLike: (id: number) => void,
    onDislike: (id: number) => void,
    onDelete: (id: number) => void
}



export default function FeedbackList({feedbacks, onLike, onDislike, onDelete}: FeedbackListProps) {
    if(feedbacks.length === 0) {
        return <p>No feedbacks yet</p>
    }


    return (
        <ul>
            {feedbacks.map((feedback) => (
                <FeedbackItem key={feedback.id} feedback={feedback} onLike={onLike} onDislike={onDislike} onDelete={onDelete} />
            ))}
        </ul>
    )
   
    
}