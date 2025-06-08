type FeedbackItemProps = {
    feedback: {
        id: number;
        name: string;
        feedback: string;
        like: number;
        dislike: number;
    };
    onLike: (id: number) => void;
    onDislike: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

export default function FeedbackItem({feedback, onLike, onDislike, onDelete, onEdit }: FeedbackItemProps) {
    
    return (
        <div className="feedback-card">
            
            <p>{feedback.id}</p>
            <h3>{feedback.name} :</h3> 
            <p>{feedback.feedback}</p>
            <p>Likes: {feedback.like}</p>
            <p>Dislikes: {feedback.dislike}</p>
            <div className="feedback-actions">
                <button onClick={() => onLike(feedback.id)}>Like</button>
                <button onClick={() => onDislike(feedback.id)}>Dislike</button>
                <button onClick={() => onDelete(feedback.id)}>Delete</button>
                <button onClick={() => onEdit(feedback.id, feedback.feedback)}>Edit</button>
            </div>
        </div>
    )
}