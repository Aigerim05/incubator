import { useContext, useState } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import EditModal from './components/EditModal'

import { ThemeContext} from './context/ThemeContext'
import { usefeedbackStore } from './store/feedbackStore'
import type { feedbackStore } from './store/feedbackStore'

function App() {
  
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not found");
  const { theme, toggleTheme } = ctx;

  const total = usefeedbackStore((state: feedbackStore) => state.totalCount());

  const [sortByLikes, setSortByLikes] = useState(false);


  const handleAddFeedback = (name: string, feedback: string) => {
    usefeedbackStore.getState().addFeedback({id: feedbacks.length + 1, name, feedback, like: 0, dislike: 0})
  }

  const handleLike = (id: number) => {
    usefeedbackStore.getState().addLike(id)
  }
  const handleDislike = (id: number) => {
    usefeedbackStore.getState().addDislike(id)
  }

  const handleDelete = (id: number) => {
   usefeedbackStore.getState().deleteFeedback(id)
  }
  const handleSort = () =>{
    setSortByLikes(!sortByLikes);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
    setIsModalOpen(true);
  }

  const rawFeedbacks = usefeedbackStore((state: feedbackStore) => state.feedbacks);
  const sortedFeedbacks = usefeedbackStore.getState().getSortedByLikes();
  const feedbacks = sortByLikes ? sortedFeedbacks : rawFeedbacks;

  return (
      <div className={theme}>
        <FeedbackForm onAdd={handleAddFeedback} />
        <FeedbackList feedbacks={feedbacks} onLike={handleLike} onDislike={handleDislike} onDelete={handleDelete} onEdit={handleEdit}/>

        <p>Total feedbacks: {total}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={handleSort}>
          {sortByLikes ? 'Show Original Order' : 'Sort by Likes'}
        </button> 

        <EditModal
          isOpen={isModalOpen}
          currentText={editText}
          onClose={() => setIsModalOpen(false)}
          onSave={(newText) => {
            if (editId !== null) {
              usefeedbackStore.getState().editFeedback(editId, newText);
            }
          }}
        />
      </div>  
  )
}

export default App
