import { useState, useEffect } from 'react';
import { UserAuth } from '../../authentication/context/AuthContext';
import { GetEntries } from './EntryGroup';

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
      <div>
        <p>Consecutive days with entries: {consecutiveDays}</p>
        <div>
          Last seven days:
          <ul>
            {lastSevenDays.map((day, index) => (
              <li
                key={index}
                style={{ color: day.hasEntry ? 'green' : 'black' }}
              >
                {`${day.day} - ${day.hasEntry ? 'Entry added' : 'No entry'}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }