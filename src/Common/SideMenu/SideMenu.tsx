import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const SideMenu = (props: Props) => {
  const navigate = useNavigate();
  return (
    <SwipeableDrawer
      anchor={"right"}
      open={props.isOpen}
      onClose={props.toggleDrawer}
      onOpen={props.toggleDrawer}
    >
      <Box
        role="presentation"
        onClick={props.toggleDrawer}
        onKeyDown={props.toggleDrawer}
      >
        <List>
        <ListItem button onClick={() => { navigate('/'); }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"בית"} />
          </ListItem>
          <ListItem button onClick={() => { navigate('/key'); }}>
            <ListItemIcon>
              <KeyIcon />
            </ListItemIcon>
            <ListItemText primary={"מפתחות"} />
          </ListItem>
          <ListItem button onClick={() => { navigate('/class'); }}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={"כיתות"} >
              <Link to="/class"></Link>
            </ListItemText>
          </ListItem> 
        </List>
      </Box>
    </SwipeableDrawer>
  );
};
