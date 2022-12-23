import './App.css';
import MainPage from './pages/MainPage.jsx';
import { NavContext } from './context/NavContext.js';
import { useNav } from './hooks/nav.hook.js';

function App() {

  const {
    menuMob,
    menuDesk,
    handleLogOut,
    popupProfile,
    handleYourSpace,
    user,
    setUser
  } = useNav();

  return (
    <div className="App">
      <NavContext.Provider value={{
        menuMob,
        menuDesk,
        handleLogOut,
        user,
        setUser,
        popupProfile,
        handleYourSpace,
        user,
        setUser
      }}>
          <MainPage />
      </NavContext.Provider>
    </div>
  );
}

export default App;
