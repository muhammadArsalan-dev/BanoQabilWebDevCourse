/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';

const DeadlineContext = createContext();

// Automatically detects if the production API environment variable is set, else uses localhost
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const LOCAL_API = `${BASE_URL}/api/deadlines`;

function deadlineReducer(state, action) {
  switch (action.type) {
    case 'SET_DEADLINES':
      return { ...state, deadlines: action.payload, loading: false };
    case 'ADD_DEADLINE':
      return { ...state, deadlines: [action.payload, ...state.deadlines] };
    case 'DELETE_DEADLINE': {
      const completedItem = state.deadlines.find(item => item.id === action.payload);
      const updatedHistory = completedItem 
        ? [{ ...completedItem, completedAt: new Date().toLocaleTimeString() }, ...state.history]
        : state.history;
      return { 
        ...state, 
        deadlines: state.deadlines.filter(item => item.id !== action.payload),
        history: updatedHistory
      };
    }
    default:
      return state;
    }
}

export function DeadlineProvider({ children }) {
  const [state, dispatch] = useReducer(deadlineReducer, { deadlines: [], history: [], loading: true });

  const fetchDeadlines = async () => {
    try {
      const res = await fetch(LOCAL_API);
      const data = await res.json();
      dispatch({ type: 'SET_DEADLINES', payload: data });
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDeadlines(); }, []);

  const addDeadline = async (formData) => {
    try {
      const res = await fetch(LOCAL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const newEntry = await res.json();
      dispatch({ type: 'ADD_DEADLINE', payload: newEntry });
    } catch (err) { console.error(err); }
  };

  const deleteDeadline = async (id) => {
    try {
      await fetch(`${LOCAL_API}/${id}`, { method: 'DELETE' });
      dispatch({ type: 'DELETE_DEADLINE', payload: id });
    } catch (err) { console.error(err); }
  };

  return (
    <DeadlineContext.Provider value={{ ...state, addDeadline, deleteDeadline }}>
      {children}
    </DeadlineContext.Provider>
  );
}

export function useDeadlines() { return useContext(DeadlineContext); }