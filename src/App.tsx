import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AppBarComponent } from "./Common/AppBar/AppBar";
import { SideMenu } from "./Common/SideMenu/SideMenu";
import { Home } from "./Screens/Home/Home";
import Classes from "./Screens/Classes/ClassRegister";
import Keys from './Screens/Keys/Keys'
import { Login } from "./Screens/Login/Login";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsDrawerOpen((currentState) => !currentState);
  };

  return (
    <>
      {location.pathname !== "/login" && (
        <>
          <AppBarComponent toggleDrawer={toggleDrawer} />
          <SideMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class" element={<Classes />} />
        <Route path="/key" element={<Keys />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
