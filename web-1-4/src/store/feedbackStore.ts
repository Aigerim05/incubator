import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import type { Feedback } from '../types';


export type feedbackStore = {
    feedbacks: Feedback[];
    addFeedback: (feedback: Feedback) => void;
    deleteFeedback: (id: number) => void;
    totalCount: () => number;
    addLike: (id: number) => void;        // <-- add this
    addDislike: (id: number) => void; 
}

export const usefeedbackStore = create<feedbackStore>((set, get) => ({
    feedbacks: [],
    addFeedback: (feedback: Feedback) => {
        set((state: feedbackStore) => ({ feedbacks: [...state.feedbacks, feedback] }))
    },
    deleteFeedback: (id: number) => {
        set((state: feedbackStore) => ({ feedbacks: state.feedbacks.filter((feedback) => feedback.id !== id) }))
    },
    totalCount: () => get().feedbacks.length,
    addLike: (id: number) => {
        set((state: feedbackStore) => ({
            feedbacks: state.feedbacks.map(f =>
                f.id === id ? { ...f, like: f.like + 1 } : f
            )
        }))
    },
    addDislike: (id: number) => {
        set((state: feedbackStore) => ({
            feedbacks: state.feedbacks.map(f =>
                f.id === id ? { ...f, dislike: f.dislike + 1 } : f
            )
        }))
    },
}));

