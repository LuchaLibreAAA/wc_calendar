import React from 'react';
import '../styles/MatchCard.css';
import fifaFlagImage from '../Flag_of_FIFA.svg.png';

/**
 * Country code mapping for flag API
 * Maps team names to ISO 3166-1 alpha-2 country codes
 * Used to fetch country flags from flagcdn.com
 * 
 * Comprehensive list covering all FIFA World Cup 2026 teams
 */
const COUNTRY_CODE_MAP = {
  // Group A
  'Mexico': 'mx',
  'South Africa': 'za',
  'South Korea': 'kr',
  'Czech Republic': 'cz',
  
  // Group B
  'Canada': 'ca',
  'Bosnia & Herzegovina': 'ba',
  'Qatar': 'qa',
  'Switzerland': 'ch',
  
  // Group C
  'Brazil': 'br',
  'Morocco': 'ma',
  'Haiti': 'ht',
  'Scotland': 'gb-sct',
  
  // Group D
  'USA': 'us',
  'Paraguay': 'py',
  'Australia': 'au',
  'Turkey': 'tr',
  
  // Group E
  'Germany': 'de',
  'Curaçao': 'cw',
  'Ivory Coast': 'ci',
  'Ecuador': 'ec',
  
  // Group F
  'Netherlands': 'nl',
  'Japan': 'jp',
  'Sweden': 'se',
  'Tunisia': 'tn',
  
  // Group G
  'Belgium': 'be',
  'Egypt': 'eg',
  'Serbia': 'rs',
  'Italy': 'it',
  
  // Group H
  'Spain': 'es',
  'Cape Verde': 'cv',
  'Saudi Arabia': 'sa',
  'Uruguay': 'uy',
  
  // Additional potential teams
  'France': 'fr',
  'England': 'gb-eng',
  'Argentina': 'ar',
  'Portugal': 'pt',
  'Poland': 'pl',
  'Denmark': 'dk',
  'Norway': 'no',
  'Greece': 'gr',
  'Hungary': 'hu',
  'Romania': 'ro',
  'Ukraine': 'ua',
  'Russia': 'ru',
  'Turkey': 'tr',
  'Israel': 'il',
  'Iran': 'ir',
  'China': 'cn',
  'India': 'in',
  'Thailand': 'th',
  'Vietnam': 'vn',
  'Indonesia': 'id',
  'Malaysia': 'my',
  'Singapore': 'sg',
  'Philippines': 'ph',
  'New Zealand': 'nz',
  'Fiji': 'fj',
  'Jamaica': 'jm',
  'Costa Rica': 'cr',
  'Mexico': 'mx',
  'Panama': 'pa',
  'Peru': 'pe',
  'Colombia': 'co',
  'Chile': 'cl',
  'Bolivia': 'bo',
  'Paraguay': 'py',
  'Venezuela': 've',
  'Costa Rica': 'cr',
  'Honduras': 'hn',
};

/**
 * Jersey color mapping for all nations
 * Maps team names to their primary jersey colors (hex)
 * Based on official FIFA team colors - no white colors
 * Bright colors (yellows, oranges) darkened 3 shades for contrast with dark text
 */
const JERSEY_COLOR_MAP = {
  // Group A
  'Mexico': '#165C3F',
  'South Africa': '#007A5E',
  'South Korea': '#C60C30',
  'Czech Republic': '#11457E',
  
  // Group B
  'Canada': '#E24B4A',
  'Bosnia & Herzegovina': '#0066B2',
  'Qatar': '#8B0000',
  'Switzerland': '#DA291C',
  
  // Group C
  'Brazil': '#B39000',
  'Morocco': '#C60C30',
  'Haiti': '#00209F',
  'Scotland': '#0066B2',
  
  // Group D
  'USA': '#3C3B6B',
  'Paraguay': '#E1173F',
  'Australia': '#B39000',
  'Turkey': '#E81E1E',
  
  // Group E
  'Germany': '#000000',
  'Curaçao': '#3A6DB0',
  'Ivory Coast': '#CC5700',
  'Ecuador': '#B39000',
  
  // Group F
  'Netherlands': '#CC4820',
  'Japan': '#0066B2',
  'Sweden': '#006BB6',
  'Tunisia': '#E1173F',
  
  // Group G
  'Belgium': '#000000',
  'Egypt': '#E1173F',
  'Serbia': '#003DA5',
  'Italy': '#0066CC',
  
  // Group H
  'Spain': '#B39000',
  'Cape Verde': '#0066B2',
  'Saudi Arabia': '#00843D',
  'Uruguay': '#4B9FD8',
  
  // Additional teams
  'France': '#002395',
  'England': '#C8102E',
  'Argentina': '#4B9FD8',
  'Portugal': '#006B3F',
  'Poland': '#DC143C',
  'Denmark': '#C8102E',
  'Norway': '#BA0C2F',
  'Greece': '#0066B2',
  'Hungary': '#00AA44',
  'Romania': '#002395',
  'Ukraine': '#4B7FBF',
  'Russia': '#0039A6',
  'Israel': '#0066B2',
  'Iran': '#CE1126',
  'China': '#CC0000',
  'India': '#CC7A1F',
  'Thailand': '#2E4053',
  'Vietnam': '#B39900',
  'Indonesia': '#CC0000',
  'Malaysia': '#003DA5',
  'Singapore': '#0066B2',
  'Philippines': '#0066B2',
  'New Zealand': '#000000',
  'Fiji': '#003DA5',
  'Jamaica': '#B39000',
  'Costa Rica': '#0066B2',
  'Panama': '#003DA5',
  'Peru': '#DC143C',
  'Colombia': '#B39000',
  'Chile': '#0066B2',
  'Bolivia': '#B39000',
  'Venezuela': '#003DA5',
  'Honduras': '#0066B2',
  'Senegal': '#007A5E',
  'Nigeria': '#007A5E',
  'Kenya': '#000000',
  'Ghana': '#B39000',
  'Cameroon': '#007A5E',
  'Algeria': '#007A5E',
  'Mali': '#B39900',
  'Uzbekistan': '#0066B2',
  'DR Congo': '#007A5E',
  'Austria': '#ED2939',
  'Jordan': '#000000',
  'Iraq': '#CE1126',
  'Norway': '#BA0C2F',
  'Croatia': '#E1173F',
};

/**
 * Determines if a color is "light" (high brightness)
 * Used to decide if white text is needed
 * @param {String} hexColor - Hex color code
 * @returns {Boolean} - True if color is light
 */
const isLightColor = (hexColor) => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
};

/**
 * Get jersey color for a team
 * Falls back to dark gray if team not found
 * @param {String} teamName - Name of the team
 * @returns {String} - Hex color code
 */
const getJerseyColor = (teamName) => {
  return JERSEY_COLOR_MAP[teamName] || '#4A4A4A';
};

/**
 * Detects if two colors clash (both light or both dark)
 * Returns true if they're too similar in brightness
 * @param {String} color1 - Hex color 1
 * @param {String} color2 - Hex color 2
 * @returns {Boolean} - True if colors clash
 */
const colorClash = (color1, color2) => {
  const isLight1 = isLightColor(color1);
  const isLight2 = isLightColor(color2);
  return isLight1 === isLight2;
};

/**
 * Gets the flag image URL for a country
 * Uses flagsapi.com API for high-quality flags
 * Format: https://flagsapi.com/{COUNTRY_CODE}/flat/64.png
 * Falls back to FIFA flag if country code not found or image fails to load
 * 
 * @param {String} teamName - Name of the team/country
 * @returns {String} - URL to the country flag image
 */
const getFlagUrl = (teamName) => {
  const countryCode = COUNTRY_CODE_MAP[teamName];
  if (!countryCode) {
    console.warn(`Flag not found for team: ${teamName}, using FIFA flag fallback`);
    // Fallback to FIFA flag
    return fifaFlagImage;
  }
  // High-quality PNG flags from flagsapi.com
  return `https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`;
};

/**
 * MatchCard Component
 * Displays individual match information in a card format
 * 
 * Props:
 *   match - Match object containing match details
 *   isToday - Boolean indicating if match is on current day (for highlighting)
 *   currentTime - Current time Date object for status calculation
 */
const MatchCard = ({ match, isToday, currentTime = new Date() }) => {
  // Convert Unix timestamp to readable time format (HH:MM)
  const getTimeFromTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Format date to readable format (e.g., "June 12, 2026")
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /**
   * Calculate match status based on current time vs match timestamp
   * @returns {String} - "Completed" or "Not Started"
   */
  const getMatchStatus = () => {
    // Current time in seconds
    const currentTimeSeconds = Math.floor(currentTime.getTime() / 1000);
    // Match time from JSON
    const matchTimeSeconds = match.ts;
    
    // If current time is past match time, it's completed
    if (currentTimeSeconds > matchTimeSeconds) {
      return 'Completed';
    }
    return 'Not Started';
  };

  // Resolve jersey colors based on home and away teams
  // If colors clash, use white for the away team
  const homeColor = getJerseyColor(match.home);
  const awayColor = getJerseyColor(match.away);
  const clash = colorClash(homeColor, awayColor);
  
  // If there's a clash, use white for away team
  const finalAwayColor = clash ? '#5a5a5a' : awayColor;
  
  const status = getMatchStatus();
  const isCompleted = status === 'Completed';

  return (
    <div
      className={`match-card ${isToday ? 'highlight' : ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        border: isToday ? `2px solid ${homeColor}` : '1px solid transparent',
        // Jersey colors blending diagonally - home to away
        background: `${homeColor}`,
        padding: '18px',
        color: '#2A2A2A',
      }}
    >
      {/* Today indicator - shows a badge for current day matches */}
      {isToday && (
        <div
          className="today-badge"
          style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(2px)',
            color: '#2A2A2A',
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 10px',
            borderRadius: '999px',
            marginBottom: '10px',
          }}
        >
          Today
        </div>
      )}

      {/* Match date and round information */}
      <div
        className="match-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <span
          className="round-badge"
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            background: 'rgba(255,255,255,0.18)',
            padding: '3px 8px',
            borderRadius: '6px',
          }}
        >
          {match.round}
        </span>
        <span className="match-date" style={{ fontSize: '12px', opacity: 0.85 }}>
          {formatDate(match.date)}
        </span>
      </div>

      {/* Match time and venue details */}
      <div
        className="match-time-venue"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '13px',
          opacity: 0.9,
          marginBottom: '14px',
        }}
      >
        <span className="match-time">⏰ {getTimeFromTimestamp(match.ts)}</span>
        <span className="match-venue">📍 {match.city}</span>
      </div>

      {/* Teams display - Home vs Away with real country flags, sitting on the dynamic gradient */}
      <div
        className="teams-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        {/* Home team with flag */}
        <div
          className="team home-team"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Real country flag - flat rectangular flag, no circular crop */}
          <img
            src={getFlagUrl(match.home)}
            alt={`${match.home} flag`}
            className="team-flag"
            loading="lazy"
            style={{
              width: '64px',
              height: '44px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
            onError={(e) => {
              // If image fails to load, use FIFA flag as fallback
              if (e.target.src !== fifaFlagImage) {
                e.target.src = fifaFlagImage;
                e.target.style.width = '64px';
                e.target.style.height = '44px';
                e.target.title = `Flag unavailable - using FIFA flag for ${match.home}`;
              }
            }}
          />
          <div
            className="team-name"
            style={{
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {match.home}
          </div>
        </div>

        {/* vs text */}
        <div
          className="vs-text"
          style={{
            fontSize: '13px',
            fontWeight: 700,
            opacity: 0.75,
            padding: '0 4px',
          }}
        >
          VS
        </div>

        {/* Away team with flag */}
        <div
          className="team away-team"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Real country flag - flat rectangular flag, no circular crop */}
          <img
            src={getFlagUrl(match.away)}
            alt={`${match.away} flag`}
            className="team-flag"
            loading="lazy"
            style={{
              width: '64px',
              height: '44px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
            onError={(e) => {
              // If image fails to load, use FIFA flag as fallback
              if (e.target.src !== fifaFlagImage) {
                e.target.src = fifaFlagImage;
                e.target.style.width = '64px';
                e.target.style.height = '44px';
                e.target.title = `Flag unavailable - using FIFA flag for ${match.away}`;
              }
            }}
          />
          <div
            className="team-name"
            style={{
              fontWeight: 600,
              fontSize: '14px',
              textAlign: 'center',
            }}
          >
            {match.away}
          </div>
        </div>
      </div>

      {/* Additional match details - status based on time */}
      <div
        className="match-footer"
        style={{
          marginTop: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          paddingTop: '10px',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isCompleted ? 'rgba(255,255,255,0.5)' : '#fff',
            display: 'inline-block',
          }}
        />
        <small className="match-status" style={{ fontSize: '12px', opacity: 0.9 }}>
          Status: {status}
        </small>
      </div>
    </div>
  );
};

export default MatchCard;