type FeedbackItemProps = {
  feedback: {
    id: number;
    text: string;
    votes: number;
  };
  onVote: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function FeedbackItem({ feedback, onVote, onDelete }: FeedbackItemProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      border: '2px solid #4f8cff',
      borderRadius: 10,
      marginBottom: 14,
      background: 'linear-gradient(90deg, #e0f2fe 0%, #f0fdf4 100%)',
      boxShadow: '0 2px 8px #4f8cff22'
    }}>
      <span style={{ fontWeight: 500, color: '#2563eb', fontSize: 16 }}>{feedback.text}</span>
      <div>
        <button
          onClick={() => onVote(feedback.id)}
          style={{
            marginRight: 12,
            background: '#4f8cff',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #4f8cff33'
          }}
        >
          👍 {feedback.votes}
        </button>
        <button
          onClick={() => onDelete(feedback.id)}
          style={{
            background: 'linear-gradient(90deg, #f87171 0%, #fbbf24 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 16px',
            fontWeight: 'bold',
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 1px 4px #f8717133'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
} 