import React from 'react';
import { Link } from 'react-router-dom';

const CompetitionDashboard = () => {
  const sessions = [
    { id: 1, title: "Session 1" },
    { id: 2, title: "Session 2" }
  ]

  return (
    <div>
      <h1>Competition Page</h1>
      <p>This is the competition page ladies and gentleman</p>
      <ul>
        {sessions.map(session => (
          <li key={session.id}>
            <Link to={`session/${session.id}`}>{session.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompetitionDashboard;
