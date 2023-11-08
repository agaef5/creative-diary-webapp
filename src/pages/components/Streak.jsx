import { useState, useEffect } from 'react';
import { UserAuth } from '../../authentication/context/AuthContext';
import { GetEntries } from './EntryGroup';
import "../../styles/streak.css"

export function Streak() {
    const { user } = UserAuth();
    const entries = GetEntries(user.uid);
  
    const [consecutiveDays, setConsecutiveDays] = useState(0);
    const [lastSevenDays, setLastSevenDays] = useState([]);
  
    useEffect(() => {
      let currentStreak = 0;
      let maxStreak = 0;
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
          maxStreak = Math.max(maxStreak, currentStreak);
        } else {
          currentStreak = 0;
        }
      }
  
      setConsecutiveDays(maxStreak);
      setLastSevenDays(weekDays.reverse());
    }, [entries]);
  
    return ( 
      <div className='streakContainer'>
        <p className='MyStreak'>My Streak</p>
        <div className='streakCircle'>
            <div className='progress' style={{ transform: `rotate(${((consecutiveDays / 7) * 360)}deg)` }}></div>
            <p className='streakDays'>{consecutiveDays}{consecutiveDays === 0 ? null : '🔥'}</p>
        </div>
        
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