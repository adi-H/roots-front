import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppBarComponent } from "./Common/AppBar/AppBar";
import { SideMenu } from "./Common/SideMenu/SideMenu";
import { Home } from "./Screens/Home/Home";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((currentState) => !currentState);
  };

  return (
    <>
      <AppBarComponent toggleDrawer={toggleDrawer} />
      <SideMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <Routes>
        <Route path="/" element={Home} />
      </Routes>
    </>
  );
}

export default App;
