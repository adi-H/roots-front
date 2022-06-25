import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavigationRoute } from "../../App";
import { useHeights } from "../../Hooks/useHeights";

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
  const { toolbar: TOOLBAR_HEIGHT } = useHeights();

  return (
    <Paper elevation={3} sx={{ zIndex: 10 }}>
      <Box
        sx={{ flex: "0 1 " + TOOLBAR_HEIGHT, minHeight: TOOLBAR_HEIGHT }}
      ></Box>
      <BottomNavigation
        showLabels
        sx={{
          width: "100%",
          height: TOOLBAR_HEIGHT,
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
    </Paper>
  );
};

export default NavigationToolbar;
