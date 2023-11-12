import './App.css';
import { BrowserRouter as Router, Route, Routes,Outlet } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CollaborationDashboard from './components/Collaboration/CollaborationDashboard';
import CollaborationSession from './components/Collaboration/CollaborationSession';
import CompetitionDashboard from './components/Competition/CompetitionDashboard';
import CompetitionSession from './components/Competition/CompetitionSession';
import PracticePage from './components/Practice/PracticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route index element={<HomePage />} />
        <Route path="/collaboration" element={<CollaborationDashboard />}>
          <Route path="session/:sessionId" element={<CollaborationSession />} />
        </Route>
        <Route path="/competition" element={<CompetitionDashboard />}>
          <Route path="session/:sessionId" element={<CompetitionSession />} />
        </Route>
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
