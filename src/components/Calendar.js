import React, { useState, useEffect, useRef } from 'react';
import MatchCard from './MatchCard';
import '../styles/Calendar.css';

/**
 * Calendar Component
 * Main component that displays FIFA World Cup matches in a calendar view
 * Dynamically highlights matches from the current day
 * AUTO-SCROLLS to today's matches on load
 * 
 * Features:
 *   - Fetches ALL match data from data.json (no filtering)
 *   - Groups matches by date
 *   - Highlights today's matches dynamically
 *   - Auto-scrolls to today's section on component mount
 *   - Sorts matches chronologically with today first
 *   - Status based on current time vs match timestamp
 */
const Calendar = () => {
  // State management
  const [matches, setMatches] = useState([]); // All matches data
  const [groupedMatches, setGroupedMatches] = useState({}); // Matches grouped by date
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [selectedDate, setSelectedDate] = useState(null); // For filtering by date (future feature)
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date for highlighting
  
  // Ref for auto-scroll to today's section
  const todayRef = useRef(null);

  // Fetch matches data on component mount
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // Fetch the data from the public folder - LOAD ALL MATCHES
        const response = await fetch('/data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        console.log(`Loaded ${data.matches.length} total matches`);
        
        // Set the matches data - NO FILTERING, ALL MATCHES INCLUDED
        setMatches(data.matches);
        
        // Group matches by date
        groupMatchesByDate(data.matches);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching matches:', err);
        setError('Failed to load match data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();

    // Optional: Update current date every minute for real-time highlighting
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to today's matches on load
  useEffect(() => {
    // Delay scroll to ensure DOM is rendered
    const scrollTimer = setTimeout(() => {
      if (todayRef.current) {
        todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500);

    return () => clearTimeout(scrollTimer);
  }, [groupedMatches]);

  /**
   * Groups matches by their date
   * Useful for organizing matches in a calendar view
   * 
   * @param {Array} matchesData - Array of match objects
   */
  const groupMatchesByDate = (matchesData) => {
    const grouped = {};

    // Iterate through matches and group by date
    matchesData.forEach((match) => {
      const date = match.date;
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(match);
    });

    // Sort matches within each date by timestamp
    Object.keys(grouped).forEach((date) => {
      grouped[date].sort((a, b) => a.ts - b.ts);
    });

    setGroupedMatches(grouped);
  };

  /**
   * Determines if a match is on today's date
   * Used for highlighting current day matches
   * 
   * @param {String} matchDate - Date string in YYYY-MM-DD format
   * @returns {Boolean} - True if match is on current day
   */
  const isMatchToday = (matchDate) => {
    // Format current date to YYYY-MM-DD
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    return matchDate === todayString;
  };

  /**
   * Formats a date string to readable format
   * 
   * @param {String} dateString - Date in YYYY-MM-DD format
   * @returns {String} - Formatted date (e.g., "June 12, 2026")
   */
  const formatDateHeader = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    // Add "Today" indicator in the header
    const isToday = dateString === todayString;
    const dateLabel = date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return isToday ? `${dateLabel} (Today)` : dateLabel;
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="calendar-container loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading matches...</p>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="calendar-container error">
        <div className="error-message">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Get all dates and sort them - today's date first, then chronologically
  const sortedDates = Object.keys(groupedMatches).sort((a, b) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    
    // If a is today, it comes first
    if (a === today) return -1;
    // If b is today, it comes first
    if (b === today) return 1;
    // Otherwise sort chronologically
    return a.localeCompare(b);
  });

  return (
    <div className="calendar-container">
      {/* Header section */}
      <div className="calendar-header">
        <h1>FIFA World Cup 2026 Calendar</h1>
        <p className="subtitle">Track all matches across all groups</p>
        <div className="stats">
          <span>{matches.length} Total Matches</span>
          <span>•</span>
          <span>{sortedDates.length} Days</span>
        </div>
      </div>

      {/* Main calendar content */}
      <div className="calendar-content">
        {sortedDates.length === 0 ? (
          // Empty state
          <div className="empty-state">
            <p>No matches found</p>
          </div>
        ) : (
          // Render matches grouped by date - ALL MATCHES INCLUDED
          sortedDates.map((date) => {
            const isToday = isMatchToday(date);
            return (
              <div 
                key={date} 
                className={`date-group ${isToday ? 'today-group' : ''}`}
                ref={isToday ? todayRef : null}
              >
                {/* Date header with today indicator */}
                <div className="date-header">
                  <h2>{formatDateHeader(date)}</h2>
                  {isToday && <div className="today-indicator">🔴 Live Day</div>}
                </div>

                {/* Matches for this date */}
                <div className="matches-grid">
                  {groupedMatches[date].map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      isToday={isToday}
                      currentTime={currentDate}
                    />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer note - room for future improvements */}
      <div className="calendar-footer">
        <p>💡 Upcoming features: Live scores, Match notifications, Team statistics</p>
      </div>
    </div>
  );
};

export default Calendar;
