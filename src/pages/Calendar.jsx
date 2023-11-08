import { useState, useEffect } from 'react';
import { EntryGroup, GetEntries } from "./components/EntryGroup";
import { SideBar } from "./components/SideBar";
import Calendar from "react-calendar";
import { UserAuth } from '../authentication/context/AuthContext';
import '../styles/newcalendar.css';
import '../index.css';

export default function CalendarPage() {
    const {user} = UserAuth();
    const entries = GetEntries(user.uid);
    const [inputType, setInputType] = useState(null);
    const [chosenDate, setChosenDate] = useState(new Date());
    const [markedDates, setMarkedDates] = useState([]);
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        const dates = entries
            .filter(entry => entry.inputType === inputType)
            .map(entry => new Date(entry.timestamp));
        setMarkedDates(dates);
    }, [entries, inputType]);

    function handleClick(value) {
        if (activeButton === value) {
            setActiveButton(null);
            setInputType(null);
        } else {
            setActiveButton(value);
            setInputType(value);
        }
    }

    const currentDayAndDate = (date) => {
        const options = { weekday: 'long' };
        const day = String(date.getDate()).padStart(2);
        const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getFullYear();
        const formattedDate =
          new Intl.DateTimeFormat('en-US', options).format(date) +
          ', ' +
          day +
          ' ' +
          month +
          ' ' +
          year;
        return formattedDate;
    };

    return (
        <div className='calendarPage'>
            <SideBar/>

            <button className={`calendarChoice ${activeButton === "BrainDump" ? 'calendarChoiceActive' : ''}`} 
                    onClick={() => handleClick("BrainDump")}><span className='rowDot'> 
                    <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--brainDump'}}></div>
                    Brain Dump</span>
            </button>

            <button className={`calendarChoice ${activeButton === "DailyChallenge" ? 'calendarChoiceActive' : ''}`}
                    onClick={() => handleClick("DailyChallenge")}><span className='rowDot'>
                    <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--dailyChallenge'}}></div>
                    Daily Challenge</span>
            </button>

            <button className={`calendarChoice ${activeButton === "CreativityBooster" ? 'calendarChoiceActive' : ''}`}
                    onClick={() => handleClick("CreativityBooster")}><span className='rowDot'>
                    <div style={{width: 10, height: 10, borderRadius: '50%', backgroundColor: 'var(--creativityBooster'}}></div>
                    Creativity Booster</span>
            </button>

            
            <div className='calendarAndEntry'>
                <div>
                    <Calendar style= {{ width: '51.875rem'}}
                        value={chosenDate}
                        onChange={setChosenDate}
                        tileContent={({ date }) =>
                            markedDates.find(
                                markedDate => new Date(markedDate).toDateString() === date.toDateString()
                            ) ? <div style={{ backgroundColor: inputType === 'BrainDump' ? '#3AA768' : (inputType === 'DailyChallenge' ? '#EB4A4A' : '#56ADBA'), width: 6, height: 6, borderRadius: '50%', marginLeft: '2.75rem', marginBottom: '-0.875rem', marginTop: '0.5rem'}}></div> : null
                        }
                    />
                </div>
                <div className='calendarEntryGroupContainer'>
                    <p style={{ fontWeight: '500', fontSize: '1.5rem', marginBottom: '2rem', marginTop: 0}}>{currentDayAndDate(chosenDate)}</p>
                    <div className='entryGroupCalendar'>
                        <EntryGroup isColumn={true} date={chosenDate?.toLocaleDateString('en-GB')} inputType={inputType}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
