import { useContext } from 'react'
import './App.css'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'

import { ThemeContext} from './context/ThemeContext'
import { usefeedbackStore } from './store/feedbackStore'
import type { feedbackStore } from './store/feedbackStore'


function App() {
  
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeContext not found");
  const { theme, toggleTheme } = ctx;

  const total = usefeedbackStore((state: feedbackStore) => state.totalCount());
  const feedbacks = usefeedbackStore((state: feedbackStore) => state.feedbacks);

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

  return (
      <div className={theme}>
        <FeedbackForm onAdd={handleAddFeedback} />
        <FeedbackList feedbacks={feedbacks} onLike={handleLike} onDislike={handleDislike} onDelete={handleDelete}/>

        <p>Total feedbacks: {total}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>


      </div>
      
  )
}

export default App
