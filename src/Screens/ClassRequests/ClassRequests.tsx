import { TabContext, TabPanel } from "@mui/lab";
import {
  Badge,
  Paper,
  styled,
  SwipeableDrawer,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { PageTitle } from "../../Common/PageTitle/PageTitle";
import { useAuth } from "../../Hooks/useAuth";
import { useHeights } from "../../Hooks/useHeights";
import AuthorityUtils, { AuthorityCheck } from "../../utils/AuthorityUtils";
import { calcAvailableHeight } from "../../utils/LayoutUtils";
import MyRequests from "./Panels/MyRequests";
import ViewRequests from "./Panels/ViewRequests";

const StyledBadge = styled(Badge)(({ theme }) => ({
  transform: "translateX(-10px)",
  "& .MuiBadge-badge": {
    width: "15px",
    aspectRatio: "1 / 1",
    right: "-20px",
    top: -1,
    transform: "translateX(50%)",
  },
}));

type TabPanelProps = {
  label: string;
  component: React.ReactNode;
  authorityCheck?: AuthorityCheck;
};

const TABS_HEIGHT = "48px";
const tabPanels: TabPanelProps[] = [
  {
    label: "הבקשות שלי",
    component: <MyRequests />,
  },
  {
    label: "בקשות נכנסות",
    component: <ViewRequests />,
    authorityCheck: AuthorityUtils.canApproveClass,
  },
];

const ClassRequests = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const user = useAuth();
  const theme = useTheme();
  const { appbar: APPBAR_HEIGHT, toolbar: TOOLBAR_HEIGHT } = useHeights();
  const tabs: React.ReactNode[] = [];
  const panels: React.ReactNode[] = [];

  tabPanels.map(({ label, component, authorityCheck }, index) => {
    const authorized = !authorityCheck || authorityCheck(user.role.id);

    if (authorized) {
      tabs.push(
        <Tab
          key={index}
          label={
            <StyledBadge
              badgeContent={1}
              color={currentTab === index ? "secondary" : "warning"}
            >
              {label}
            </StyledBadge>
          }
          value={index}
        />
      );
      panels.push(
        <TabPanel
          sx={{ height: "100%", padding: 0 }}
          key={index}
          value={`${index}`}
          dir={theme.direction}
        >
          {component}
        </TabPanel>
      );
    }
  });

  function handleChangeTab(
    event: React.SyntheticEvent<Element, Event>,
    newTabValue: number
  ) {
    setCurrentTab(newTabValue);
  }

  return (
    <>
      <PageTitle title="צפייה בבקשות" />
      <TabContext value={`${currentTab}`}>
        <Paper
          sx={{
            position: "relative",
            zIndex: 9,
          }}
          elevation={3}
        >
          <Tabs
            sx={{ height: TABS_HEIGHT }}
            value={currentTab}
            onChange={handleChangeTab}
            centered
            variant="fullWidth"
            textColor="secondary"
            indicatorColor="secondary"
          >
            {tabs}
          </Tabs>
        </Paper>
        <SwipeableViews
          containerStyle={{
            minHeight: calcAvailableHeight([
              APPBAR_HEIGHT,
              TOOLBAR_HEIGHT,
              TABS_HEIGHT,
            ]),
          }}
          index={currentTab}
          onChangeIndex={setCurrentTab}
          axis={"x-reverse"}
        >
          {panels}
        </SwipeableViews>
      </TabContext>
    </>
  );
};

export default ClassRequests;
