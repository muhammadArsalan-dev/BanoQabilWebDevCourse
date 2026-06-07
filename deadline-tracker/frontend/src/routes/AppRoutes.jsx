import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DeadlineDetails from '../pages/DeadlineDetails';
import Analytics from '../pages/Analytics';
import HistoryLog from '../pages/HistoryLog';

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. Static/Root Routing layout */}
      <Route path="/" element={<Dashboard />}>
        {/* 2. Nested sub-routes rendering internally inside dashboard panels */}
        <Route index element={<Analytics />} />
        <Route path="history" element={<HistoryLog />} />
      </Route>

      {/* 3. Dynamic Route Matching injecting parameter tokens */}
      <Route path="/deadline/:id" element={<DeadlineDetails />} />

      {/* Fallback Catch */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}