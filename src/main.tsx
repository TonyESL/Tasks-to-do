import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../momentum_daily_planner (1)';
import './style.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
