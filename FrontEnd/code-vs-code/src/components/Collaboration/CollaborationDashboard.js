import React from 'react';
import { Link } from 'react-router-dom';

function CollaborationDashboard() {
  const sessions = [
    { id: 1, title: "Session 1" },
    { id: 2, title: "Session 2" }
  ]

  return (
    <div>
      <h1>Collaboration Dashboard</h1>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <Link to={`/collaboration/session/${session.id}`}>{session.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollaborationDashboard;
