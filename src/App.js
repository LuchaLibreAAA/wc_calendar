/**
 * App Component
 * Main entry point for the FIFA World Cup Calendar Application
 * 
 * Purpose:
 *   - Root component that renders the calendar
 *   - Sets up the overall app structure and styling
 * 
 * Future Improvements:
 *   - Add navigation/filters for different views
 *   - Implement search functionality
 *   - Add user preferences (theme, timezone, etc.)
 *   - Integrate with live API for real-time updates
 */

import React from 'react';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Main Calendar Component */}
      <Calendar />
    </div>
  );
}

export default App;
