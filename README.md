## FIFA World Cup 2026 Calendar App

A modern, sleek React application that displays FIFA World Cup 2026 match schedules with real-time current day highlighting.

### Features

✨ **Modern Design**
- Sleek gradient background with glassmorphism effects
- Responsive grid layout that adapts to all screen sizes
- Smooth animations and transitions
- Professional color scheme with cyan/blue accents

🏟️ **Match Display**
- Shows all World Cup matches organized by date
- Displays match time, teams, venue, and round information
- Team matchups with visual indicators

📅 **Dynamic Current Day Highlighting**
- Automatically identifies today's matches using JavaScript Date objects
- Highlights current day matches with distinctive styling
- "Today" badge and live day indicator
- Real-time updates (refreshes every minute)

📱 **Responsive**
- Works seamlessly on desktop, tablet, and mobile devices
- Optimized grid layout for different screen sizes
- Touch-friendly interface

### Project Structure

```
wc-calendar/
├── public/
│   ├── data.json              # World Cup match data
│   └── ...
├── src/
│   ├── components/
│   │   ├── Calendar.js        # Main calendar component with date grouping
│   │   └── MatchCard.js       # Individual match card component
│   ├── styles/
│   │   ├── Calendar.css       # Calendar layout and styling
│   │   ├── MatchCard.css      # Match card styling and animations
│   ├── App.js                 # Root app component
│   ├── App.css                # Global app styles
│   ├── index.css              # Base styles
│   └── index.js               # React entry point
└── package.json
```

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd d:\Fifawc\wc-calendar
   ```

2. **Install dependencies** (already done with Create React App):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. The app will automatically open at `http://localhost:3000`

### Usage

- **View Matches**: Scroll through all World Cup matches organized by date
- **Highlight Current Day**: Today's matches are automatically highlighted with:
  - Distinctive border styling (2px cyan border)
  - Blue gradient background
  - "Today" badge on each match
  - "🔴 Live Day" indicator on the date header
- **Hover Effects**: Hover over match cards for interactive effects
- **Responsive Layout**: Resize your browser to see the responsive design

### Code Documentation

All components are thoroughly commented with:
- Component purpose and responsibility
- Props documentation
- Function descriptions
- Inline explanations of key logic

#### **Calendar.js**
- Main component managing match data and grouping
- Fetches data from `data.json`
- Groups matches by date
- Implements current day detection logic
- Provides date formatting utilities

#### **MatchCard.js**
- Displays individual match information
- Converts timestamps to readable times
- Shows team matchups and venue
- Handles today highlighting through props

#### **Styling Files**
- **Calendar.css**: Grid layout, animations, date grouping styles
- **MatchCard.css**: Card design, hover effects, responsive adjustments
- **App.css**: Global styles and color scheme

### Current Day Highlighting Logic

```javascript
// Determines if a match is on today's date
const isMatchToday = (matchDate) => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  return matchDate === todayString;
};
```

The app automatically compares match dates with today's date and applies:
- CSS class `.highlight` for styling
- "Today" badge display
- Date header indicator

### Data Format

Match data in `data.json`:
```json
{
  "id": 1,
  "date": "2026-06-11",
  "ts": 1781204400,
  "venue": "Mexico City",
  "round": "Group A",
  "home": "Mexico",
  "away": "South Africa",
  "status": "NS"
}
```

### Room for Improvement 🚀

The following features are designed to be easily added:

1. **Live Scores**
   - Add real-time score updates via API
   - Display final scores or live scores
   - Update MatchCard to show score section

2. **Match Notifications**
   - Browser notifications for upcoming matches
   - Push notifications integration
   - Time-based reminders (e.g., 1 hour before match)

3. **Team Statistics**
   - Team profiles and past performance
   - Player information
   - Group standings
   - Prediction models

4. **User Preferences**
   - Timezone selection
   - Favorite teams highlighting
   - Custom filters (by group, team, etc.)
   - Dark/Light theme toggle

5. **Advanced Filtering**
   - Search by team name
   - Filter by round (Group Stage, Knockout, etc.)
   - Filter by time range
   - Bookmark/Save matches

6. **Social Features**
   - Share matches on social media
   - Create watch parties
   - User comments and discussions

### Responsive Breakpoints

- **Desktop**: Full grid layout (3 columns)
- **Tablet**: 2-column grid
- **Mobile**: Single column layout with optimized spacing

### Build for Production

```bash
npm run build
```

This creates a production-ready build in the `build/` directory.

### Technologies Used

- **React 18**: UI framework
- **CSS3**: Modern styling with gradients, animations, and flexbox
- **JavaScript ES6+**: Modern JavaScript features
- **Create React App**: Project scaffolding and build tools

### Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations

- Component memoization ready for future optimization
- Efficient date grouping and sorting
- CSS animations instead of JavaScript for smooth performance
- Responsive images and lazy loading ready

### Accessibility Features

- Semantic HTML structure
- Clear visual hierarchy
- Color contrast compliance
- Keyboard navigable (ready for enhancement)
- Screen reader friendly

### Future Integration Points

1. **API Integration**:
   - Replace static data.json with live API
   - Real-time match updates
   - User authentication

2. **State Management**:
   - Integrate Redux/Zustand for complex state
   - User preferences storage
   - Caching mechanism

3. **Database**:
   - User profiles and preferences
   - Saved matches/favorites
   - Match history and statistics

### Available Scripts

#### `npm start`
Runs the app in the development mode at [http://localhost:3000](http://localhost:3000)

#### `npm test`
Launches the test runner in interactive watch mode

#### `npm run build`
Builds the app for production to the `build` folder

#### `npm run eject`
**Note: this is a one-way operation!**
Ejects from Create React App for full control over configuration

### Troubleshooting

**Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
PORT=3001 npm start
```

**Module Not Found**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

**Build Issues**
```bash
# Clear the build cache
npm run build -- --reset-cache
```

### License

This project is created for FIFA World Cup 2026 enthusiasts.

---

**Happy match watching! ⚽🏆**

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
