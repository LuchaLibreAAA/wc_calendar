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
const data={
  "updated": 1780456639,
  "count": 104,
  "matches": [
    {
      "id": 1,
      "date": "2026-06-11",
      "ts": 1781204400,
      "venue": "Mexico City",
      "city": "Mexico City",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "Mexico",
      "homeLogo": "",
      "away": "South Africa",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8,
        "previewId": "0zqFBs38H2E",
        "previewThumb": "https://i.ytimg.com/vi/0zqFBs38H2E/hqdefault.jpg",
        "previewCh": "manual",
        "previewEmbed": true
      }
    },
    {
      "id": 2,
      "date": "2026-06-11",
      "ts": 1781229600,
      "venue": "Guadalajara (Zapopan)",
      "city": "Guadalajara (Zapopan)",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "South Korea",
      "homeLogo": "",
      "away": "Czech Republic",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 7,
      "date": "2026-06-12",
      "ts": 1781290800,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Canada",
      "homeLogo": "",
      "away": "Bosnia & Herzegovina",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 19,
      "date": "2026-06-12",
      "ts": 1781312400,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "USA",
      "homeLogo": "",
      "away": "Paraguay",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 8,
      "date": "2026-06-13",
      "ts": 1781377200,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Qatar",
      "homeLogo": "",
      "away": "Switzerland",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 13,
      "date": "2026-06-13",
      "ts": 1781388000,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Brazil",
      "homeLogo": "",
      "away": "Morocco",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 14,
      "date": "2026-06-13",
      "ts": 1781398800,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Haiti",
      "homeLogo": "",
      "away": "Scotland",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 20,
      "date": "2026-06-13",
      "ts": 1781409600,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "Australia",
      "homeLogo": "",
      "away": "Turkey",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 25,
      "date": "2026-06-14",
      "ts": 1781456400,
      "venue": "Houston",
      "city": "Houston",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Germany",
      "homeLogo": "",
      "away": "Curaçao",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 31,
      "date": "2026-06-14",
      "ts": 1781467200,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Netherlands",
      "homeLogo": "",
      "away": "Japan",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 26,
      "date": "2026-06-14",
      "ts": 1781478000,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Ivory Coast",
      "homeLogo": "",
      "away": "Ecuador",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 32,
      "date": "2026-06-14",
      "ts": 1781488800,
      "venue": "Monterrey (Guadalupe)",
      "city": "Monterrey (Guadalupe)",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Sweden",
      "homeLogo": "",
      "away": "Tunisia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 43,
      "date": "2026-06-15",
      "ts": 1781539200,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Spain",
      "homeLogo": "",
      "away": "Cape Verde",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 37,
      "date": "2026-06-15",
      "ts": 1781550000,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "Belgium",
      "homeLogo": "",
      "away": "Egypt",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 44,
      "date": "2026-06-15",
      "ts": 1781560800,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Saudi Arabia",
      "homeLogo": "",
      "away": "Uruguay",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 38,
      "date": "2026-06-15",
      "ts": 1781571600,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "Iran",
      "homeLogo": "",
      "away": "New Zealand",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 49,
      "date": "2026-06-16",
      "ts": 1781636400,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "France",
      "homeLogo": "",
      "away": "Senegal",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 50,
      "date": "2026-06-16",
      "ts": 1781647200,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "Iraq",
      "homeLogo": "",
      "away": "Norway",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 55,
      "date": "2026-06-16",
      "ts": 1781658000,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Argentina",
      "homeLogo": "",
      "away": "Algeria",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 56,
      "date": "2026-06-16",
      "ts": 1781668800,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Austria",
      "homeLogo": "",
      "away": "Jordan",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 61,
      "date": "2026-06-17",
      "ts": 1781715600,
      "venue": "Houston",
      "city": "Houston",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "Portugal",
      "homeLogo": "",
      "away": "DR Congo",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 67,
      "date": "2026-06-17",
      "ts": 1781726400,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "England",
      "homeLogo": "",
      "away": "Croatia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 68,
      "date": "2026-06-17",
      "ts": 1781737200,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "Ghana",
      "homeLogo": "",
      "away": "Panama",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 62,
      "date": "2026-06-17",
      "ts": 1781748000,
      "venue": "Mexico City",
      "city": "Mexico City",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "Uzbekistan",
      "homeLogo": "",
      "away": "Colombia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 3,
      "date": "2026-06-18",
      "ts": 1781798400,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "Czech Republic",
      "homeLogo": "",
      "away": "South Africa",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 9,
      "date": "2026-06-18",
      "ts": 1781809200,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Switzerland",
      "homeLogo": "",
      "away": "Bosnia & Herzegovina",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 10,
      "date": "2026-06-18",
      "ts": 1781820000,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Canada",
      "homeLogo": "",
      "away": "Qatar",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 4,
      "date": "2026-06-18",
      "ts": 1781830800,
      "venue": "Guadalajara (Zapopan)",
      "city": "Guadalajara (Zapopan)",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "Mexico",
      "homeLogo": "",
      "away": "South Korea",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 21,
      "date": "2026-06-19",
      "ts": 1781895600,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "USA",
      "homeLogo": "",
      "away": "Australia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 15,
      "date": "2026-06-19",
      "ts": 1781906400,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Scotland",
      "homeLogo": "",
      "away": "Morocco",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 16,
      "date": "2026-06-19",
      "ts": 1781915400,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Brazil",
      "homeLogo": "",
      "away": "Haiti",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 22,
      "date": "2026-06-19",
      "ts": 1781924400,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "Turkey",
      "homeLogo": "",
      "away": "Paraguay",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 33,
      "date": "2026-06-20",
      "ts": 1781974800,
      "venue": "Houston",
      "city": "Houston",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Netherlands",
      "homeLogo": "",
      "away": "Sweden",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 27,
      "date": "2026-06-20",
      "ts": 1781985600,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Germany",
      "homeLogo": "",
      "away": "Ivory Coast",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 28,
      "date": "2026-06-20",
      "ts": 1782000000,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Ecuador",
      "homeLogo": "",
      "away": "Curaçao",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 34,
      "date": "2026-06-20",
      "ts": 1782014400,
      "venue": "Monterrey (Guadalupe)",
      "city": "Monterrey (Guadalupe)",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Tunisia",
      "homeLogo": "",
      "away": "Japan",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 45,
      "date": "2026-06-21",
      "ts": 1782057600,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Spain",
      "homeLogo": "",
      "away": "Saudi Arabia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 39,
      "date": "2026-06-21",
      "ts": 1782068400,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "Belgium",
      "homeLogo": "",
      "away": "Iran",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 46,
      "date": "2026-06-21",
      "ts": 1782079200,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Uruguay",
      "homeLogo": "",
      "away": "Cape Verde",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 40,
      "date": "2026-06-21",
      "ts": 1782090000,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "New Zealand",
      "homeLogo": "",
      "away": "Egypt",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 57,
      "date": "2026-06-22",
      "ts": 1782147600,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Argentina",
      "homeLogo": "",
      "away": "Austria",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 51,
      "date": "2026-06-22",
      "ts": 1782162000,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "France",
      "homeLogo": "",
      "away": "Iraq",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 52,
      "date": "2026-06-22",
      "ts": 1782172800,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "Norway",
      "homeLogo": "",
      "away": "Senegal",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 58,
      "date": "2026-06-22",
      "ts": 1782183600,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Jordan",
      "homeLogo": "",
      "away": "Algeria",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 63,
      "date": "2026-06-23",
      "ts": 1782234000,
      "venue": "Houston",
      "city": "Houston",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "Portugal",
      "homeLogo": "",
      "away": "Uzbekistan",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 69,
      "date": "2026-06-23",
      "ts": 1782244800,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "England",
      "homeLogo": "",
      "away": "Ghana",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 70,
      "date": "2026-06-23",
      "ts": 1782255600,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "Panama",
      "homeLogo": "",
      "away": "Croatia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 64,
      "date": "2026-06-23",
      "ts": 1782266400,
      "venue": "Guadalajara (Zapopan)",
      "city": "Guadalajara (Zapopan)",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "Colombia",
      "homeLogo": "",
      "away": "DR Congo",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 11,
      "date": "2026-06-24",
      "ts": 1782327600,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Switzerland",
      "homeLogo": "",
      "away": "Canada",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 12,
      "date": "2026-06-24",
      "ts": 1782327600,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Group B",
      "status": "NS",
      "elapsed": null,
      "home": "Bosnia & Herzegovina",
      "homeLogo": "",
      "away": "Qatar",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 17,
      "date": "2026-06-24",
      "ts": 1782338400,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Scotland",
      "homeLogo": "",
      "away": "Brazil",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 18,
      "date": "2026-06-24",
      "ts": 1782338400,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Group C",
      "status": "NS",
      "elapsed": null,
      "home": "Morocco",
      "homeLogo": "",
      "away": "Haiti",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 5,
      "date": "2026-06-24",
      "ts": 1782349200,
      "venue": "Mexico City",
      "city": "Mexico City",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "Czech Republic",
      "homeLogo": "",
      "away": "Mexico",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 6,
      "date": "2026-06-24",
      "ts": 1782349200,
      "venue": "Monterrey (Guadalupe)",
      "city": "Monterrey (Guadalupe)",
      "round": "Group A",
      "status": "NS",
      "elapsed": null,
      "home": "South Africa",
      "homeLogo": "",
      "away": "South Korea",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 29,
      "date": "2026-06-25",
      "ts": 1782417600,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Curaçao",
      "homeLogo": "",
      "away": "Ivory Coast",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 30,
      "date": "2026-06-25",
      "ts": 1782417600,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Group E",
      "status": "NS",
      "elapsed": null,
      "home": "Ecuador",
      "homeLogo": "",
      "away": "Germany",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 35,
      "date": "2026-06-25",
      "ts": 1782428400,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Japan",
      "homeLogo": "",
      "away": "Sweden",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 36,
      "date": "2026-06-25",
      "ts": 1782428400,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Group F",
      "status": "NS",
      "elapsed": null,
      "home": "Tunisia",
      "homeLogo": "",
      "away": "Netherlands",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 23,
      "date": "2026-06-25",
      "ts": 1782439200,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "Turkey",
      "homeLogo": "",
      "away": "USA",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 24,
      "date": "2026-06-25",
      "ts": 1782439200,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Group D",
      "status": "NS",
      "elapsed": null,
      "home": "Paraguay",
      "homeLogo": "",
      "away": "Australia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 53,
      "date": "2026-06-26",
      "ts": 1782500400,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "Norway",
      "homeLogo": "",
      "away": "France",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 54,
      "date": "2026-06-26",
      "ts": 1782500400,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Group I",
      "status": "NS",
      "elapsed": null,
      "home": "Senegal",
      "homeLogo": "",
      "away": "Iraq",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 47,
      "date": "2026-06-26",
      "ts": 1782518400,
      "venue": "Houston",
      "city": "Houston",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Cape Verde",
      "homeLogo": "",
      "away": "Saudi Arabia",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 48,
      "date": "2026-06-26",
      "ts": 1782518400,
      "venue": "Guadalajara (Zapopan)",
      "city": "Guadalajara (Zapopan)",
      "round": "Group H",
      "status": "NS",
      "elapsed": null,
      "home": "Uruguay",
      "homeLogo": "",
      "away": "Spain",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 41,
      "date": "2026-06-26",
      "ts": 1782529200,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "Egypt",
      "homeLogo": "",
      "away": "Iran",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 42,
      "date": "2026-06-26",
      "ts": 1782529200,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Group G",
      "status": "NS",
      "elapsed": null,
      "home": "New Zealand",
      "homeLogo": "",
      "away": "Belgium",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 71,
      "date": "2026-06-27",
      "ts": 1782594000,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "Panama",
      "homeLogo": "",
      "away": "England",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 72,
      "date": "2026-06-27",
      "ts": 1782594000,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Group L",
      "status": "NS",
      "elapsed": null,
      "home": "Croatia",
      "homeLogo": "",
      "away": "Ghana",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 65,
      "date": "2026-06-27",
      "ts": 1782603000,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "Colombia",
      "homeLogo": "",
      "away": "Portugal",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 66,
      "date": "2026-06-27",
      "ts": 1782603000,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Group K",
      "status": "NS",
      "elapsed": null,
      "home": "DR Congo",
      "homeLogo": "",
      "away": "Uzbekistan",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 59,
      "date": "2026-06-27",
      "ts": 1782612000,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Algeria",
      "homeLogo": "",
      "away": "Austria",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 60,
      "date": "2026-06-27",
      "ts": 1782612000,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Group J",
      "status": "NS",
      "elapsed": null,
      "home": "Jordan",
      "homeLogo": "",
      "away": "Argentina",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 73,
      "date": "2026-06-28",
      "ts": 1782673200,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "2A",
      "homeLogo": "",
      "away": "2B",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 76,
      "date": "2026-06-29",
      "ts": 1782752400,
      "venue": "Houston",
      "city": "Houston",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1C",
      "homeLogo": "",
      "away": "2F",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 74,
      "date": "2026-06-29",
      "ts": 1782765000,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1E",
      "homeLogo": "",
      "away": "3A/B/C/D/F",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 75,
      "date": "2026-06-29",
      "ts": 1782781200,
      "venue": "Monterrey (Guadalupe)",
      "city": "Monterrey (Guadalupe)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1F",
      "homeLogo": "",
      "away": "2C",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 78,
      "date": "2026-06-30",
      "ts": 1782838800,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "2E",
      "homeLogo": "",
      "away": "2I",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 77,
      "date": "2026-06-30",
      "ts": 1782853200,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1I",
      "homeLogo": "",
      "away": "3C/D/F/G/H",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 79,
      "date": "2026-06-30",
      "ts": 1782867600,
      "venue": "Mexico City",
      "city": "Mexico City",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1A",
      "homeLogo": "",
      "away": "3C/E/F/H/I",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 80,
      "date": "2026-07-01",
      "ts": 1782921600,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1L",
      "homeLogo": "",
      "away": "3E/H/I/J/K",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 82,
      "date": "2026-07-01",
      "ts": 1782936000,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1G",
      "homeLogo": "",
      "away": "3A/E/H/I/J",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 81,
      "date": "2026-07-01",
      "ts": 1782950400,
      "venue": "San Francisco Bay Area (Santa Clara)",
      "city": "San Francisco Bay Area (Santa Clara)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1D",
      "homeLogo": "",
      "away": "3B/E/F/I/J",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 84,
      "date": "2026-07-02",
      "ts": 1783018800,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1H",
      "homeLogo": "",
      "away": "2J",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 83,
      "date": "2026-07-02",
      "ts": 1783033200,
      "venue": "Toronto",
      "city": "Toronto",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "2K",
      "homeLogo": "",
      "away": "2L",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 85,
      "date": "2026-07-02",
      "ts": 1783047600,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1B",
      "homeLogo": "",
      "away": "3E/F/G/I/J",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 88,
      "date": "2026-07-03",
      "ts": 1783101600,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "2D",
      "homeLogo": "",
      "away": "2G",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 86,
      "date": "2026-07-03",
      "ts": 1783116000,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1J",
      "homeLogo": "",
      "away": "2H",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 87,
      "date": "2026-07-03",
      "ts": 1783128600,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Round of 32",
      "status": "NS",
      "elapsed": null,
      "home": "1K",
      "homeLogo": "",
      "away": "3D/E/I/J/L",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 90,
      "date": "2026-07-04",
      "ts": 1783184400,
      "venue": "Houston",
      "city": "Houston",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W73",
      "homeLogo": "",
      "away": "W75",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 89,
      "date": "2026-07-04",
      "ts": 1783198800,
      "venue": "Philadelphia",
      "city": "Philadelphia",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W74",
      "homeLogo": "",
      "away": "W77",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 91,
      "date": "2026-07-05",
      "ts": 1783281600,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W76",
      "homeLogo": "",
      "away": "W78",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 92,
      "date": "2026-07-05",
      "ts": 1783296000,
      "venue": "Mexico City",
      "city": "Mexico City",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W79",
      "homeLogo": "",
      "away": "W80",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 93,
      "date": "2026-07-06",
      "ts": 1783364400,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W83",
      "homeLogo": "",
      "away": "W84",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 94,
      "date": "2026-07-06",
      "ts": 1783382400,
      "venue": "Seattle",
      "city": "Seattle",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W81",
      "homeLogo": "",
      "away": "W82",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 95,
      "date": "2026-07-07",
      "ts": 1783440000,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W86",
      "homeLogo": "",
      "away": "W88",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 96,
      "date": "2026-07-07",
      "ts": 1783454400,
      "venue": "Vancouver",
      "city": "Vancouver",
      "round": "Round of 16",
      "status": "NS",
      "elapsed": null,
      "home": "W85",
      "homeLogo": "",
      "away": "W87",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 97,
      "date": "2026-07-09",
      "ts": 1783627200,
      "venue": "Boston (Foxborough)",
      "city": "Boston (Foxborough)",
      "round": "Quarter-final",
      "status": "NS",
      "elapsed": null,
      "home": "W89",
      "homeLogo": "",
      "away": "W90",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 98,
      "date": "2026-07-10",
      "ts": 1783710000,
      "venue": "Los Angeles (Inglewood)",
      "city": "Los Angeles (Inglewood)",
      "round": "Quarter-final",
      "status": "NS",
      "elapsed": null,
      "home": "W93",
      "homeLogo": "",
      "away": "W94",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 99,
      "date": "2026-07-11",
      "ts": 1783803600,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Quarter-final",
      "status": "NS",
      "elapsed": null,
      "home": "W91",
      "homeLogo": "",
      "away": "W92",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 100,
      "date": "2026-07-11",
      "ts": 1783818000,
      "venue": "Kansas City",
      "city": "Kansas City",
      "round": "Quarter-final",
      "status": "NS",
      "elapsed": null,
      "home": "W95",
      "homeLogo": "",
      "away": "W96",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 101,
      "date": "2026-07-14",
      "ts": 1784055600,
      "venue": "Dallas (Arlington)",
      "city": "Dallas (Arlington)",
      "round": "Semi-final",
      "status": "NS",
      "elapsed": null,
      "home": "W97",
      "homeLogo": "",
      "away": "W98",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 102,
      "date": "2026-07-15",
      "ts": 1784142000,
      "venue": "Atlanta",
      "city": "Atlanta",
      "round": "Semi-final",
      "status": "NS",
      "elapsed": null,
      "home": "W99",
      "homeLogo": "",
      "away": "W100",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 103,
      "date": "2026-07-18",
      "ts": 1784408400,
      "venue": "Miami (Miami Gardens)",
      "city": "Miami (Miami Gardens)",
      "round": "Match for third place",
      "status": "NS",
      "elapsed": null,
      "home": "L101",
      "homeLogo": "",
      "away": "L102",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    },
    {
      "id": 104,
      "date": "2026-07-19",
      "ts": 1784487600,
      "venue": "New York/New Jersey (East Rutherford)",
      "city": "New York/New Jersey (East Rutherford)",
      "round": "Final",
      "status": "NS",
      "elapsed": null,
      "home": "W101",
      "homeLogo": "",
      "away": "W102",
      "awayLogo": "",
      "goalsH": null,
      "goalsA": null,
      "media": {
        "v": 8
      }
    }
  ],
  "mediaUpdated": 1781269230
}
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

    setMatches(data.matches);
    groupMatchesByDate(data.matches);
    setError(null);
  } catch (err) {
    console.error('Error fetching matches:', err);
    setError('Failed to load match data. Please try again later ..');
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
