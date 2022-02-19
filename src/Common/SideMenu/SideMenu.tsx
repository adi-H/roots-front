import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";

type Props = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

export const SideMenu = (props: Props) => {
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
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"מפתחות"} />
          </ListItem>
        </List>
      </Box>
    </SwipeableDrawer>
  );
};
