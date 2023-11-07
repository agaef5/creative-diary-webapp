import { useState, useEffect } from 'react';
import { EntryGroup, GetEntries } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import Calendar from "react-calendar";
import { UserAuth } from '../authentication/context/AuthContext';
import 'react-calendar/dist/Calendar.css';
import { currentDayAndDate } from './Dashboard';
import '../styles/calendar.css';

export default function CalendarPage() {
    const {user} = UserAuth();
    const entries = GetEntries(user.uid);
    const [inputType, setInputType] = useState(null);
    const [chosenDate, setChosenDate] = useState(new Date());
    const [markedDates, setMarkedDates] = useState([]);

    useEffect(() => {
        const dates = entries
            .filter(entry => entry.inputType === inputType)
            .map(entry => new Date(entry.timestamp));
        setMarkedDates(dates);
    }, [entries, inputType]);

    function handleClick(value){
        setInputType(value);
    }

    const currentDayAndDate = () => {
        const today = new Date();
        const options = { weekday: 'long' };
        const day = String(today.getDate()).padStart(2, '0');
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
        const year = today.getFullYear();
        const formattedDate =
          new Intl.DateTimeFormat('en-US', options).format(today) +
          ', ' +
          day +
          ' ' +
          month +
          ' ' +
          year;
        return formattedDate;
    };

    return (
        <div>
            <SideBar/>
            <h1>Calendar Page</h1>
        
            <button onClick={() => handleClick("BrainDump")}>Brain Dump</button>
            <button onClick={() => handleClick("DailyChallenge")}>Daily Challenge</button>
            <button onClick={() => handleClick("CreativityBooster")} >Creativity Booster</button>

            
            <div id='CalendarPageContainer' style={{display: 'flex'}}>
            <div>
                <Calendar style= {{ width: '51.875rem'}}
                      value={chosenDate}
                      onChange={setChosenDate}
                      tileContent={({ date }) =>
                          markedDates.find(
                              markedDate => new Date(markedDate).toDateString() === date.toDateString()
                          ) ? <div style={{ backgroundColor: inputType === 'BrainDump' ? 'green' : (inputType === 'DailyChallenge' ? 'red' : 'blue'), width: 6, height: 6, borderRadius: '50%' }}></div> : null
                      }
                  />
                
            </div>
            <div>
            <p style={{ fontWeight: '500', textAlign: 'center', marginBottom: '2rem', marginTop: 0}}>{currentDayAndDate()}</p>
            <EntryGroup isColumn={true} date={chosenDate?.toLocaleDateString('en-GB')} inputType={inputType}/>
            </div>
            </div>
        </div>
    );
}
