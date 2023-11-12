import './App.css';
import { BrowserRouter as Router, Route, Routes,Outlet } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CollaborationPage from './components/Collaboration/CollaborationPage';
import CompetitionPage from './components/Competition/CompetitionPage';
import PracticePage from './components/Practice/PracticePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route index element={<HomePage />} />
        <Route path="/collaboration" element={<CollaborationPage />} />
        <Route path="/competition" element={<CompetitionPage />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
