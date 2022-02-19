import {
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  toggleDrawer: () => void;
};

export const AppBarComponent = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ marginRight: "5%" }}
          >
            שורשים
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
