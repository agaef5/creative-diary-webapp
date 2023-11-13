import { useState, useEffect } from 'react';
import { UserAuth } from '../../authentication/context/AuthContext';
import { GetEntries } from './EntryGroup';
import "../../styles/streak.css"
import "../../index.css"
import { CircularProgress } from '@mui/joy';


export function Streak() {
    const { user } = UserAuth();
    const entries = GetEntries(user.uid);
  
    const [consecutiveDays, setConsecutiveDays] = useState(0);
    const [lastSevenDays, setLastSevenDays] = useState([]);
  
    useEffect(() => {
      let currentStreak = 0;
      // let maxStreak = 0;
      const today = new Date().setHours(0, 0, 0, 0);
      const weekDays = [];
  
      for (let i = 0; i < 7; i++) {
        const day = new Date(today - i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
        const foundEntry = entries.find(
          (entry) => new Date(entry.timestamp).setHours(0, 0, 0, 0) === day
        );
        const weekDayName = new Date(day).toLocaleString('en-us', { weekday: 'long' });
        weekDays.push({ day: weekDayName, hasEntry: !!foundEntry });
  
        if (foundEntry) {
          currentStreak++;
          // maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
  
      setConsecutiveDays(currentStreak);
      setLastSevenDays(weekDays.reverse());
    }, [entries]);

    const progress = (consecutiveDays / 7) * 100; 
  
    return ( 
      <div className='streakContainer shadow'>
        <p className='MyStreak'>My Streak</p>
        <CircularProgress   sx={{
              "--CircularProgress-size": "200px",
              "--CircularProgress-trackThickness": "16px",
              "--CircularProgress-progressThickness": "16px",
              "--CircularProgress-progressColor": 'var(--accCol)'
              }} 
            variant="plain"  color="var(--text)" determinate value={progress}>
            <p className='streakDays'>{consecutiveDays}{consecutiveDays === 0 ? null : '🔥'}</p>
        </CircularProgress>
        
        <div>
          <div className='allDaysInStreak'>
            {lastSevenDays.map((day, index) => (
              <div className='dayInStreak'
                key={index}
                style={{ backgroundColor: day.hasEntry ? 'var(--accCol)' : 'var(--textInput)' }}
              >
                {day.day.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }