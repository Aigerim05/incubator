import FeedbackItem from './FeedbackItem';

type Feedback = {
  id: number;
  text: string;
  votes: number;
};

type FeedbackListProps = {
  feedbacks: Feedback[];
  onVote: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function FeedbackList({ feedbacks, onVote, onDelete }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return <div style={{ marginBottom: 24 }}>No feedback yet. Be the first to add one!</div>;
  }
  return (
    <div style={{ marginBottom: 24 }}>
      {feedbacks.map(fb => (
        <FeedbackItem
          key={fb.id}
          feedback={fb}
          onVote={onVote}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 