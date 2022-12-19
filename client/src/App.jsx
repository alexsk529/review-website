import './App.css';
import Navbar from './components/Navbar.jsx';
import { NavContext } from './context/NavContext.js';
import { useNav } from './hooks/nav.hook.js';

function App() {

  const {
    mobileMoreAnchorEl,
    isMobileMenuOpen,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    anchorEl,
    isMenuOpen,
    handleMenuOpen,
    handleMenuClose,
    handleLogOut,
    handleProfile,
    handleYourSpace,
    user,
    setUser
  } = useNav();

  return (
    <div className="App">
      <NavContext.Provider value={{
        mobileMoreAnchorEl,
        isMobileMenuOpen,
        handleMobileMenuOpen,
        handleMobileMenuClose,
        anchorEl,
        isMenuOpen,
        handleMenuOpen,
        handleMenuClose,
        handleLogOut,
        handleProfile,
        handleYourSpace,
        user,
        setUser
      }}>
        <Navbar />
      </NavContext.Provider>
    </div>
  );
}

export default App;
