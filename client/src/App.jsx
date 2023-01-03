import React from 'react';

import './App.css';
import Navbar from './components/Navbar.jsx'
import MainPage from './pages/MainPage.jsx';
import PersonalAccount from './pages/PersonalAccount';
import AdminPanel from './pages/AdminPanel';
import CreateReview from './pages/CreateReview/CreateReview.jsx';

import { Routes, Route} from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserRole } from './redux/reducers/userSlice';
import GlobalStyles from '@mui/material/GlobalStyles';

function App() {
  const userEmail = useSelector(selectUserEmail)
  const userRole = useSelector(selectUserRole)

  return (
    <div className="App">
      <GlobalStyles styles={{ 
        a: {textDecoration: 'none', color: 'inherit'}
       }} />
      <Navbar/>
      {
        userEmail ?
          <React.Fragment>
            <Routes>
              <Route exact path='/' element={<MainPage/>}/>
              <Route exact path='/account' element={<PersonalAccount/>}/>
              <Route exact path='/create-review' element={<CreateReview isEdit={false}/>}/>
              <Route exact path='/edit-review/:id' element={<CreateReview isEdit={true} />}/>
              <Route exact path='/review/:id' />
              { userRole === 'admin' ? <Route exact path='/admin' element={<AdminPanel/>} /> : null }
            </Routes>
          </React.Fragment> :
          <React.Fragment>
            <MainPage />
          </React.Fragment>
      }
    </div>
  );
}

export default App;
