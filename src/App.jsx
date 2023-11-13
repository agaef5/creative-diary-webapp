import {Navigate, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Calendar from './pages/Calendar'
import Account, { SecurityPrivacy, Settings, Subscription } from './pages/Account'
import WelcomePage from './authentication/WelcomePage'
import { UserAuth } from './authentication/context/AuthContext'
import { BrainDump, ChooseInputType, CreativityBooster, DailyChallenge } from './pages/components/EntryTypes'
import { GroupPage, ProjectPage, ProjectsGroupPage, TagsPage } from './pages/GroupAndProjectPage'
import { EntryEdit } from './pages/EntryEdit'
import LogIn from './authentication/forms/LogIn'
import CreateAccount from './authentication/forms/CreateAccount'
import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { database } from '../firebase-config'

// coded by Aga
function App() {

  const ProtectedRoute = ({children}) => {
    const{user} = UserAuth();
    if(!user) {
      return <Navigate to="/"/>
    }
    return children;
  }

  const [theme, setTheme] = useState('light');
  const [accColor, setAccColor] = useState("green");
  const { user } = UserAuth();
  const userID = user ? user.uid : '';

  useEffect(() => {
    const themeRef = ref(database, `users/${userID}/theme`);

    onValue(themeRef, (snapshot) => {
      const theme = snapshot.val();
      if (theme) {
        setTheme(theme);
      }
    });
  }, [userID]);

  useEffect(() => {
    const accColorRef = ref(database, `users/${userID}/color`);
    onValue(accColorRef, (snapshot) => {
      const color = snapshot.val();
      if (color) {
        setAccColor(color);
      }
    });
  }, [userID]);
  

  return (
    <>
    
        <div id="AppContainer" className={`${theme} ${accColor}`}>
        <Routes>
              <Route path="/" element={<WelcomePage/>}>
                <Route index element={<LogIn/>}/>
                <Route path="createAccount" element={<CreateAccount/>}/>
              </Route>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                  <Route index path="BrainDump" element={<ProtectedRoute><BrainDump/></ProtectedRoute>}/>
                  <Route path="DailyChallenge" element={<ProtectedRoute><DailyChallenge/></ProtectedRoute>}/>
                  <Route path="CreativityBooster" element={<ProtectedRoute><CreativityBooster/></ProtectedRoute>}/>
                  <Route path="ChooseEntryType" element={<ProtectedRoute><ChooseInputType/></ProtectedRoute>}/>
              </Route>
              <Route path="/group/:inputType" element={<ProtectedRoute><GroupPage/></ProtectedRoute>}/>
              <Route path="/tags/:tagID/:tagName?" element={<ProtectedRoute><TagsPage/></ProtectedRoute>}/>
              <Route path="/projects" element={<ProtectedRoute><ProjectsGroupPage/></ProtectedRoute>}/>
              <Route path="/projects/:projectName/:projectID" element={<ProtectedRoute><ProjectPage/></ProtectedRoute>}/>
              <Route path="/library" element={<ProtectedRoute><Library/></ProtectedRoute>}/>
              <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
              <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}>
                  <Route path="settings" element={<ProtectedRoute><Settings  setTheme={setTheme} setAccColor={setAccColor} /></ProtectedRoute>}/>
                  <Route path="subscription" element={<ProtectedRoute><Subscription/></ProtectedRoute>}/>
                  <Route path="security" element={<ProtectedRoute><SecurityPrivacy/></ProtectedRoute>}/>
              </Route>
              <Route path=":entryID" element={<ProtectedRoute><EntryEdit/></ProtectedRoute>}/>
            </Routes>
        </div>
    
      
    </>
  )
}

export default App
