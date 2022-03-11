import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AppBarComponent } from "./Common/AppBar/AppBar";
import { SideMenu } from "./Common/SideMenu/SideMenu";
import { Home } from "./Screens/Home/Home";
import Classes from "./Screens/Classes/Classes";
import Keys from './Screens/Keys/Keys'

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
        <Route path="/" element={<Home />} />
        <Route path="/class" element={<Classes />} />
        <Route path="/key" element={<Keys />} />
      </Routes>
    </>
  );
}

export default App;
