import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { RequireAuth } from "./Common/RequireAuth/RequireAuth";
import { BroshShishi } from "./Screens/BroshShishi/BroshShishi";
import { Matzal } from "./Screens/Matzal/Matzal";
import { Calendar } from "./Screens/Calendar/Calendar";
import { Home } from "./Screens/Home/Home";
import Classes from "./Screens/Classes/ClassRegister/ClassRegister";
import Keys from "./Screens/Keys/Keys";
import { Login } from "./Screens/Login/Login";
import { Logistics } from "./Screens/Logistics/Logistics";
import { User } from "./types/types";
import { SocketIOService } from "./Services/SocketIOService";
import { ClassNavigation } from "./Screens/ClassNavigation/ClassNavigation";
import {
  Newspaper,
  Article,
  Favorite,
  Home as HomeIcon,
  LocationOn,
  Restore,
  School,
  Warehouse,
} from "@mui/icons-material";
import NavigationToolbar from "./Common/NavigationToolbar/NavigationToolbar";
import { Box, Stack } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type NavigationRoute = {
  path: string;
  element: JSX.Element;
  label?: string;
  value?: string;
  icon?: React.ReactNode;
};

export const UserContext = React.createContext<User>(null!);

function App() {
  const getUserContext = (): User => {
    const base64Url = document.cookie.split("=")[1];

    if (base64Url) {
      return jwt_decode(base64Url);
    }

    return null!;
  };

  const [loggedUser, setLoggedUser] = useState<User>(() => {
    return getUserContext();
  });
  const location = useLocation();

  useEffect(() => {
    storeUserContext();
  }, []);

  const storeUserContext = () => {
    const user = getUserContext();
    SocketIOService.auth(document.cookie.split("=")[1]);
    setLoggedUser(user);
  };

  const navigationRoutes: NavigationRoute[] = [
    {
      path: "/broshShishi",
      element: (
        <RequireAuth>
          <BroshShishi />
        </RequireAuth>
      ),
      label: "ברושישי",
      value: "broshishi",
      icon: <Newspaper />,
    },
    {
      path: "/matzal",
      element: (
        <RequireAuth>
          <Matzal />
        </RequireAuth>
      ),
      label: 'מצ"ל',
      value: "matzal",
      icon: <Article />,
    },
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
      label: "בית",
      value: "home",
      icon: <HomeIcon />,
    },
    {
      path: "/classNavigation",
      element: (
        <RequireAuth>
          <ClassNavigation />
        </RequireAuth>
      ),
      label: "כיתות",
      value: "classes",
      icon: <School />,
    },
    {
      path: "/logistics",
      element: (
        <RequireAuth>
          <Logistics />
        </RequireAuth>
      ),
      label: "לוגיסטיקה",
      value: "logistics",
      icon: <Warehouse />,
    },
    {
      path: "/login",
      element: <Login storeUserContext={storeUserContext} />,
    },
    {
      path: "/calendar",
      element: (
        <RequireAuth>
          <Calendar />
        </RequireAuth>
      ),
    },
    {
      path: "/class",
      element: (
        <RequireAuth>
          <Classes />
        </RequireAuth>
      ),
    },
    {
      path: "/key",
      element: (
        <RequireAuth>
          <Keys />
        </RequireAuth>
      ),
    },
  ];

  return (
    <UserContext.Provider value={loggedUser}>
      <Stack height="100%">
        <Box sx={{ flex: "1 1 auto" }}>
          <Routes>
            {navigationRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </Box>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="colored"
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {loggedUser && (
          <NavigationToolbar navigationRoutes={navigationRoutes} />
        )}
      </Stack>
    </UserContext.Provider>
  );
}

export default App;
