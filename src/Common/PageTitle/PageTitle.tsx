import { Box, Paper, Typography } from "@mui/material";
import { BackButton } from "./BackButton";

type Props = { title: string };

export const PageTitle = (props: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Paper
        sx={{
          backgroundColor: "rgba(66, 66, 66, 0.7)",
          borderRadius: "0px 25px 25px 0px",
          width: "60%",
          margin: "8% 0 8% 0",
          boxShadow: "2",
          textShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          style={{ color: "white", marginRight: "4%" }}
          fontWeight={"bold"}
          fontSize={"2rem"}
        >
          {props.title}
        </Typography>
      </Paper>
      <Box sx={{ display: "flex", width: "15%", alignItems: "center" }}>
        <BackButton />
      </Box>
    </Box>
  );
};
