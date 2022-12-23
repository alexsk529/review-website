import './App.css';
import MainPage from './pages/MainPage.jsx';
import { NavContext } from './context/NavContext.js';
import { UserContext } from './context/UserContext.js';
import { useNav } from './hooks/nav.hook.js';
import { useUser } from './hooks/user.hook';

function App() {

  const {
    menuMob,
    menuDesk,
    handleLogOut,
    popupProfile,
    handleYourSpace
  } = useNav();

  const {user, setUser} = useUser();

  return (
    <div className="App">
      <NavContext.Provider value={{
        menuMob,
        menuDesk,
        handleLogOut,
        user,
        setUser,
        popupProfile,
        handleYourSpace
      }}>
        <UserContext.Provider value={{user, setUser}}>
          <MainPage />
        </UserContext.Provider>
      </NavContext.Provider>
    </div>
  );
}

export default App;
