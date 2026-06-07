import { BrowserRouter as Router } from 'react-router-dom';
import { DeadlineProvider } from './context/DeadlineContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <DeadlineProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DeadlineProvider>
  );
}