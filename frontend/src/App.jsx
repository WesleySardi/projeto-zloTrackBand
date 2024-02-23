import { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Router
import { Routes, Route, useLocation } from "react-router-dom"

// Components
import Header from './components/Header';

// Pages
import Home from './pages/Home'
import DependentData from "./pages/DependentData";
import SmsHandler from "./pages/SmsHandler";
import EmergencyPhone from "./pages/EmergencyPhone";
import DependentFullData from "./pages/DependentFullData";

function App() {
  let location = useLocation();
  const [homeStyle, setHomeStyle] = useState(true)

  useEffect(() => {
    if (location.pathname === "/") setHomeStyle(true)
    else setHomeStyle(false)
  }, [location])

  const appStyle = {
    textAlign: 'center',
    height: "600px"
  }

  return (
    <div style={appStyle}>
        <Header homeStyle={homeStyle} />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/emergencyPhone" element={<EmergencyPhone />} />
            <Route path="/dependentFullData" element={<DependentFullData />} />
            <Route path="/dependentData" element={<DependentData />} />
            <Route path="/smsHandler" element={<SmsHandler />} />
          </Routes>
          <ToastContainer />
    </div>
  );
}

export default App;