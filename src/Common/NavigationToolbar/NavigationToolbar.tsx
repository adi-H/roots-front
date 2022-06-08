import {
  BottomNavigation,
  BottomNavigationAction,
  styled,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationRoute } from "../../App";

const StyledBottomNavigationAction = styled(BottomNavigationAction)(
  ({ theme }) => ({
    minWidth: "10px",
    [theme.breakpoints.down("sm")]: {
      transform: "scale(0.8)",
    },
  })
);

type Props = {
  navigationRoutes: NavigationRoute[];
};

const NavigationToolbar = ({ navigationRoutes }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BottomNavigation
      showLabels
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
      }}
      value={
        navigationRoutes.find((route) => route.path === location.pathname)
          ?.value
      }
    >
      {navigationRoutes.map(
        ({ path, label, value, icon }) =>
          label &&
          value &&
          icon && (
            <StyledBottomNavigationAction
              key={value}
              label={label}
              value={value}
              icon={icon}
              onClick={() => navigate(path)}
            />
          )
      )}
    </BottomNavigation>
  );
};

export default NavigationToolbar;
