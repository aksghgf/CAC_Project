// StrictMode a special wrapper that helps you catch problems in development
// StrictMode helps me ensure I’m not using deprecated features or bad patterns.
import { StrictMode } from 'react';
//  “React 18 introduced createRoot for performance improvements and better scheduling. It's the new standard.”
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);