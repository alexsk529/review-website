import React from 'react';

import './App.css';
import Navbar from './components/Navbar.jsx'
import MainPage from './pages/MainPage.jsx';
import PersonalAccount from './pages/PersonalAccount/PersonalAccount.jsx';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';
import CreateReview from './pages/CreateReview/CreateReview.jsx';

import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserRole } from './redux/reducers/userSlice';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseLine from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReviewMain from './pages/ReviewMain/ReviewMain';

function App() {
    const userEmail = useSelector(selectUserEmail);
    const userRole = useSelector(selectUserRole);

    const mode = useSelector(state => state.mode)

    const getTheme = (mode) => ({
        palette: {
            mode,
            ...(mode === 'light') ?
                {
                    primary: {
                        main: '#ce93d8',
                    },
                    error: {
                        main: '#d90077',
                    },
                    success: {
                        main: '#6f2da8'
                    },
                    warning: {
                        main: '#b5338a'
                    },
                    background: {
                        default: '#f3ebf6',
                    },
                    text: {
                        primary: 'rgba(140,85,170,0.87)',
                        secondary: '#263238',
                        disabled: '#263238',
                        icon: '#263238'
                    }
                } :
                {
                    primary: {
                        main: '#ce93d8',
                    },
                    error: {
                        main: '#d90077',
                    },
                    success: {
                        main: '#6f2da8'
                    },
                    warning: {
                        main: '#b5338a'
                    },
                    background: {
                        default: '#46045e',
                        paper: '#38004c',
                    },
                    text: {
                        primary: '#ffffff',
                        secondary: '#feffff',
                        disabled: '#263238',
                        icon: '#263238'
                    }
                }
        },
        shape: {
            borderRadius: 20
        }
    })

    const theme = React.useMemo(() => createTheme(getTheme(mode)), [mode])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseLine />
            <div className="App">
                <GlobalStyles styles={{
                    a: { textDecoration: 'none', color: 'inherit' }
                }} />
                <Navbar />
                {
                    userEmail ?
                        <React.Fragment>
                            <Routes>
                                <Route exact path='/' element={<MainPage />} />
                                <Route exact path='/account' element={<PersonalAccount />} />
                                <Route exact path='/create-review' element={<CreateReview isEdit={false} />} />
                                <Route exact path='/edit-review/:id' element={<CreateReview isEdit={true} />} />
                                <Route exact path='/review/:id' element={< ReviewMain />} />
                                {userRole === 'admin' ? <Route exact path='/admin' element={<AdminPanel />} /> : null}
                                {userRole === 'admin' ? <Route exact path='/account-admin/:email' element={<PersonalAccount />} /> : null}
                            </Routes>
                        </React.Fragment> :
                        <React.Fragment>
                            <Routes>
                                <Route exact path='/' element={<MainPage />} />
                                <Route exact path='/review/:id' element={< ReviewMain />} />
                            </Routes>
                        </React.Fragment>
                }
            </div>
        </ThemeProvider>
    );
}

export default App;
